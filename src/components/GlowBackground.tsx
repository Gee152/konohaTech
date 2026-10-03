import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const BASE_URL = import.meta.env.BASE_URL ? import.meta.env.BASE_URL.replace(/\/+$/, '') + '/' : '/';

export function resolveVideoUrl(path?: string): string {
  if (!path) {
    return `${BASE_URL}video/bg-scroll.mp4`;
  }
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:')) {
    return path;
  }
  if (path.startsWith(BASE_URL)) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}${cleanPath}`;
}

interface GlowBackgroundProps {
  videoSrc?: string;
}

export default function GlowBackground({ videoSrc }: GlowBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const isSeekingRef = useRef(false);
  const pendingSeekTimeRef = useRef<number | null>(null);
  const seekWatchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetProgressRef = useRef(0);
  const currentSmoothProgressRef = useRef(0);

  const resolvedSrc = resolveVideoUrl(videoSrc);

  // Priming the hardware video decoder for Safari / WebKit & iOS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const markVideoReady = () => {
      if (video.readyState >= 1) {
        setIsVideoLoaded(true);
      }
      if (video.paused && video.currentTime === 0) {
        try {
          video.currentTime = 0.001;
        } catch {
          // Ignore
        }
      }
    };

    const primeDecoder = () => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
            markVideoReady();
          })
          .catch(() => {
            markVideoReady();
          });
      }
    };

    if (video.readyState >= 1) {
      markVideoReady();
    }

    video.addEventListener('loadedmetadata', markVideoReady);
    video.addEventListener('loadeddata', markVideoReady);
    video.addEventListener('canplay', markVideoReady);
    video.addEventListener('playing', markVideoReady);

    const onFirstInteraction = () => {
      primeDecoder();
      window.removeEventListener('touchstart', onFirstInteraction);
      window.removeEventListener('scroll', onFirstInteraction);
      window.removeEventListener('pointerdown', onFirstInteraction);
    };

    window.addEventListener('touchstart', onFirstInteraction, { passive: true });
    window.addEventListener('scroll', onFirstInteraction, { passive: true });
    window.addEventListener('pointerdown', onFirstInteraction, { passive: true });

    return () => {
      video.removeEventListener('loadedmetadata', markVideoReady);
      video.removeEventListener('loadeddata', markVideoReady);
      video.removeEventListener('canplay', markVideoReady);
      video.removeEventListener('playing', markVideoReady);
      window.removeEventListener('touchstart', onFirstInteraction);
      window.removeEventListener('scroll', onFirstInteraction);
      window.removeEventListener('pointerdown', onFirstInteraction);
    };
  }, [resolvedSrc]);

  // 60fps LERP video scrubbing across the entire website scroll
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const winHeight = window.innerHeight || 1;
      const totalScrollable = Math.max(docHeight - winHeight, 1);
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      targetProgressRef.current = Math.min(Math.max(scrollY / totalScrollable, 0), 1);
    };

    const applyVideoSeek = (targetTime: number) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      const maxTime = Math.max(video.duration - 0.03, 0);
      const clampedTime = Math.min(Math.max(targetTime, 0), maxTime);

      if (isSeekingRef.current || video.seeking) {
        pendingSeekTimeRef.current = clampedTime;
        return;
      }

      if (Math.abs(video.currentTime - clampedTime) <= 0.015) {
        return;
      }

      isSeekingRef.current = true;
      pendingSeekTimeRef.current = null;

      try {
        video.currentTime = clampedTime;
      } catch {
        isSeekingRef.current = false;
      }

      // Safeguard watchdog timer
      if (seekWatchdogRef.current) clearTimeout(seekWatchdogRef.current);
      seekWatchdogRef.current = setTimeout(() => {
        isSeekingRef.current = false;
        if (pendingSeekTimeRef.current !== null) {
          const next = pendingSeekTimeRef.current;
          pendingSeekTimeRef.current = null;
          applyVideoSeek(next);
        }
      }, 90);
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (seekWatchdogRef.current) clearTimeout(seekWatchdogRef.current);

      const video = videoRef.current;
      if (video && video.readyState >= 1 && !isVideoLoaded) {
        setIsVideoLoaded(true);
      }

      if (pendingSeekTimeRef.current !== null) {
        const next = pendingSeekTimeRef.current;
        pendingSeekTimeRef.current = null;
        applyVideoSeek(next);
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('seeked', handleSeeked);
    }

    const isSlowConnection = typeof navigator !== 'undefined' && (
      (navigator as any).connection?.saveData ||
      ['slow-2g', '2g', '3g'].includes((navigator as any).connection?.effectiveType)
    );

    const updateLoop = () => {
      const diff = targetProgressRef.current - currentSmoothProgressRef.current;
      const threshold = isSlowConnection ? 0.001 : 0.0004;
      if (Math.abs(diff) < threshold) {
        currentSmoothProgressRef.current = targetProgressRef.current;
      } else {
        // Smooth lerp coefficient (0.2 for responsiveness + fluidity)
        currentSmoothProgressRef.current += diff * (isSlowConnection ? 0.15 : 0.2);
      }

      if (video && video.duration && !isNaN(video.duration)) {
        applyVideoSeek(currentSmoothProgressRef.current * video.duration);
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (video) {
        video.removeEventListener('seeked', handleSeeked);
      }
      if (seekWatchdogRef.current) clearTimeout(seekWatchdogRef.current);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVideoLoaded]);

  const isSlowNet = typeof navigator !== 'undefined' && (
    (navigator as any).connection?.saveData ||
    ['slow-2g', '2g', '3g'].includes((navigator as any).connection?.effectiveType)
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#050505]">
      {/* 1. Scrollytelling Video Scrubbing Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src={resolvedSrc}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-65 sm:opacity-80' : 'opacity-40'
          }`}
          muted
          playsInline
          preload={isSlowNet ? 'metadata' : 'auto'}
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={resolvedSrc} type="video/mp4" />
          <source src={`${BASE_URL}video/bg-scroll.mp4`} type="video/mp4" />
          <source src="/konohaTech/video/bg-scroll.mp4" type="video/mp4" />
          <source src="/video/bg-scroll.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Scrim to balance contrast, readability and video depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/25 to-[#050505]/45 pointer-events-none" />
      </div>

      {/* 2. Absolute Glow Red Atmospheric Spheres */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#df2531] opacity-15 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -90, 60, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[#df2531] opacity-10 blur-[130px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-[20%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-[#9e141d] opacity-5 blur-[100px]"
      />

      {/* 3. Subtle Cyber Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
      />
      
      {/* 4. Ambient top and bottom vignette shadows */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </div>
  );
}
