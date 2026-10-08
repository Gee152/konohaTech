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
  showVideo?: boolean;
}

export default function GlowBackground({ videoSrc, showVideo = true }: GlowBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const pendingSeekTimeRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const currentSmoothProgressRef = useRef(0);

  const resolvedSrc = resolveVideoUrl(videoSrc);

  // Initialize and prime the video decoder safely across Safari / iOS / WebKit
  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const onReady = () => {
      if (video && !video.paused) {
        try {
          video.pause();
        } catch {
          // Ignore
        }
      }
      if (video.duration && !isNaN(video.duration)) {
        setIsVideoLoaded(true);
      }
    };

    video.addEventListener('loadedmetadata', onReady);
    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplay', onReady);

    if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
      if (!video.paused) {
        try {
          video.pause();
        } catch {
          // Ignore
        }
      }
      setIsVideoLoaded(true);
    }

    // Decoder primer for Safari / iOS without autonomous playback
    const onUserInteraction = () => {
      if (!video) return;
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          video.pause();
          setIsVideoLoaded(true);
        }).catch(() => {
          setIsVideoLoaded(true);
        });
      }
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('pointerdown', onUserInteraction);
    };

    window.addEventListener('touchstart', onUserInteraction, { passive: true });
    window.addEventListener('pointerdown', onUserInteraction, { passive: true });

    return () => {
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('pointerdown', onUserInteraction);
    };
  }, [resolvedSrc, showVideo]);

  // Smooth video scrubbing synchronized with page scroll
  useEffect(() => {
    if (!showVideo) return;
    let animationFrameId: number | null = null;
    let lastSeekTimestamp = 0;
    let isLoopRunning = false;
    let cachedTotalScrollable = 1;

    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const isSlowConnection = typeof navigator !== 'undefined' && ('connection' in navigator) && (Boolean((navigator as any).connection?.saveData) || ['2g', '3g'].includes((navigator as any).connection?.effectiveType));

    const calculateScrollable = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const winHeight = window.innerHeight || 1;
      cachedTotalScrollable = Math.max(docHeight - winHeight, 1);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      targetProgressRef.current = Math.min(Math.max(scrollY / cachedTotalScrollable, 0), 1);
      
      // Wake up rendering loop on scroll if it was paused
      if (!isLoopRunning) {
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(updateLoop);
      }
    };

    const handleResize = () => {
      calculateScrollable();
      handleScroll();
    };

    const applyVideoSeek = (targetTime: number) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      // Crucial: ensure video is never playing autonomously
      if (!video.paused) {
        try {
          video.pause();
        } catch {
          // Ignore
        }
      }

      const now = performance.now();
      // Throttle seeks on touch / slow connection so hardware decoders remain fluid
      const minInterval = isSlowConnection ? 80 : isTouch ? 45 : 16;
      if (now - lastSeekTimestamp < minInterval) {
        pendingSeekTimeRef.current = targetTime;
        return;
      }

      const maxTime = Math.max(video.duration - 0.05, 0);
      const clampedTime = Math.min(Math.max(targetTime, 0), maxTime);

      if (Math.abs(video.currentTime - clampedTime) < 0.02) {
        return;
      }

      lastSeekTimestamp = now;
      pendingSeekTimeRef.current = null;

      try {
        if ('fastSeek' in video) {
          (video as any).fastSeek(clampedTime);
        } else {
          video.currentTime = clampedTime;
        }
      } catch {
        // Silently catch seek errors
      }
    };

    const handleSeeked = () => {
      const video = videoRef.current;
      if (video) {
        if (!video.paused) {
          try {
            video.pause();
          } catch {
            // Ignore
          }
        }
        if (video.duration && !isNaN(video.duration) && !isVideoLoaded) {
          setIsVideoLoaded(true);
        }
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

    const updateLoop = () => {
      const diff = targetProgressRef.current - currentSmoothProgressRef.current;
      
      // Idle pause when user is not scrolling and target reached
      if (Math.abs(diff) < 0.0005) {
        currentSmoothProgressRef.current = targetProgressRef.current;
        if (video && video.duration && !isNaN(video.duration)) {
          applyVideoSeek(currentSmoothProgressRef.current * video.duration);
        }
        isLoopRunning = false;
        animationFrameId = null;
        return; // Pause the RAF loop completely when resting
      }

      currentSmoothProgressRef.current += diff * (isTouch ? 0.25 : 0.2);

      if (video && video.duration && !isNaN(video.duration)) {
        applyVideoSeek(currentSmoothProgressRef.current * video.duration);
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    calculateScrollable();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (video) {
        video.removeEventListener('seeked', handleSeeked);
      }
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVideoLoaded, showVideo]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#050505]">
      {/* 1. Scrollytelling Video Scrubbing Layer */}
      {showVideo && (
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            src={resolvedSrc}
            className={`w-full h-full object-cover blur-[4px] scale-105 transition-opacity duration-700 ${
              isVideoLoaded ? 'opacity-65 sm:opacity-80' : 'opacity-40'
            }`}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
          />

          {/* Ambient Dark Scrim with backdrop blur to soften background and enhance contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/45 via-[#050505]/30 to-[#050505]/50 backdrop-blur-[3px] pointer-events-none" />
        </div>
      )}

      {/* 2. Absolute Glow Red Atmospheric Spheres with Mobile GPU optimization */}
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
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#df2531] opacity-15 blur-[60px] sm:blur-[120px] transform-gpu pointer-events-none"
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
        className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[#df2531] opacity-10 blur-[65px] sm:blur-[130px] transform-gpu pointer-events-none"
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
        className="absolute top-[40%] left-[20%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-[#9e141d] opacity-5 blur-[50px] sm:blur-[100px] transform-gpu pointer-events-none"
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
