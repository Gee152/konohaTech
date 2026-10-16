// SCROLL & PARALLAX MANAGER
// High-performance, 60fps animations with calibrated spring physics
// 

// ------------------------------------------------------------------------
// MOUSE DRAG-TO-SCROLL FOR HORIZONTAL CAROUSELS
// Enables fluid mouse drag across cards in all horizontal carousels with
// velocity-based momentum glide, grab cursor feedback, and click protection
// ------------------------------------------------------------------------
export function setupMouseDragCarousels(container: Document | HTMLElement = document) {
  if (typeof window === 'undefined') return;
  const sliders = container.querySelectorAll<HTMLElement>('.mobile-carousel');

  sliders.forEach((slider) => {
    if ((slider as any).__mouseDragAttached) return;
    (slider as any).__mouseDragAttached = true;

    let isDown = false;
    let isDragging = false;
    let startX = 0;
    let initialScrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;

    // Check if carousel currently has horizontal overflow (swipeable mode)
    const hasOverflow = () => slider.scrollWidth > slider.clientWidth + 6;

    const updateCursor = () => {
      if (hasOverflow()) {
        if (!slider.classList.contains('cursor-grabbing')) {
          slider.classList.add('cursor-grab');
        }
      } else {
        slider.classList.remove('cursor-grab', 'cursor-grabbing');
      }
    };

    slider.addEventListener('mouseenter', updateCursor, { passive: true });
    window.addEventListener('resize', updateCursor, { passive: true });

    // Prevent native HTML5 image/link drag-and-drop ghost so our carousel dragging takes priority
    slider.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const currentX = e.pageX;
      const dx = currentX - startX;

      // Beyond 4px, activate drag state
      if (!isDragging && Math.abs(dx) > 4) {
        isDragging = true;
        // Temporarily disable CSS snap during drag to prevent fighting mouse coordinates
        slider.style.scrollSnapType = 'none';
        slider.style.scrollBehavior = 'auto';
        slider.classList.add('cursor-grabbing');
        slider.classList.remove('cursor-grab');
      }

      if (isDragging) {
        e.preventDefault();
        const now = Date.now();
        const dt = Math.max(now - lastTime, 1);
        velocity = (currentX - lastX) / dt;
        lastX = currentX;
        lastTime = now;
        slider.scrollLeft = initialScrollLeft - dx;
      }
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      if (isDragging) {
        slider.classList.remove('cursor-grabbing');
        updateCursor();

        // Restore smooth snap alignment so the card locks into place
        slider.style.scrollBehavior = 'smooth';
        slider.style.scrollSnapType = '';

        // If flicked with velocity, glide towards next card
        if (Math.abs(velocity) > 0.25) {
          slider.scrollLeft -= velocity * 150;
        }

        // Intercept and prevent accidental clicks on cards during a drag
        const preventClick = (ev: MouseEvent) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        window.addEventListener('click', preventClick, { capture: true, once: true });
        setTimeout(() => {
          window.removeEventListener('click', preventClick, { capture: true });
          slider.style.scrollBehavior = '';
        }, 120);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Only trigger on primary left mouse click
      if (e.button !== 0) return;
      if (!hasOverflow()) return;

      isDown = true;
      isDragging = false;
      startX = e.pageX;
      lastX = e.pageX;
      lastTime = Date.now();
      initialScrollLeft = slider.scrollLeft;
      velocity = 0;

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    slider.addEventListener('mousedown', onMouseDown);
  });
}

export function initScrollSystem() {
  if (typeof window === 'undefined') return;

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------------------
  // 1. SCROLL REVEAL OBSERVER
  // ------------------------------------------------------------------------
  const revealSelector = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-down, .scroll-reveal-up';

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.06
    }
  );

  const isTest = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';

  const observeElements = (container: Document | HTMLElement = document) => {
    const elements = container.querySelectorAll(revealSelector);
    elements.forEach((el) => {
      if (prefersReducedMotion || isTest) {
        el.classList.add('is-revealed');
        return;
      }
      revealObserver.observe(el);
    });
  };

  // Initial observe
  observeElements();

  // Watch for dynamically rendered elements (React components)
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          if (element.matches && element.matches(revealSelector)) {
            observeElements(element.parentElement || document);
          } else if (element.querySelectorAll) {
            const hasReveals = element.querySelectorAll(revealSelector).length > 0;
            if (hasReveals) {
              observeElements(element);
            }
          }

          if (element.matches && element.matches('.mobile-carousel')) {
            setupMouseDragCarousels(element.parentElement || document);
          } else if (element.querySelectorAll && element.querySelectorAll('.mobile-carousel').length > 0) {
            setupMouseDragCarousels(element);
          }
        }
      });
    });
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  // ------------------------------------------------------------------------
  // 2. SMOOTH DYNAMIC NUMBER COUNTERS (RAF Easing)
  // ------------------------------------------------------------------------
  const countersAnimated = new Set<HTMLElement>();

  function runNumberCounters() {
    const counterElements = Array.from(document.querySelectorAll<HTMLElement>('[data-counter-target]'));

    const startCounter = (el: HTMLElement) => {
      if (countersAnimated.has(el)) return;
      countersAnimated.add(el);

      const targetValue = parseFloat(el.getAttribute('data-counter-target') || '0');
      if (isNaN(targetValue) || targetValue <= 0) return;

      const duration = prefersReducedMotion ? 1200 : 3200; // ms: smooth high-end counting
      let startTime: number | null = null;

      const animateCounter = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Gentle ease-out deceleration curve so increments are steadily observable throughout
        const easeOutProgress = 1 - Math.pow(1 - progress, 1.5);
        const currentNumber = Math.round(targetValue * easeOutProgress);

        el.textContent = currentNumber.toString();

        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        } else {
          el.textContent = targetValue.toString();
          if (!prefersReducedMotion) {
            el.classList.add('counter-finished');
          }
        }
      };

      requestAnimationFrame(animateCounter);
    };

    const counterInViewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounter(entry.target as HTMLElement);
            counterInViewObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    counterElements.forEach((el) => {
      counterInViewObserver.observe(el);
    });
  }

  // ------------------------------------------------------------------------
  // 3. CINEMATIC SCROLL UNLOCK & CONVERGENCE TRIGGER FOR HERO
  // ------------------------------------------------------------------------
  let isCinematicUnlocked = false;
  let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
  const heroElement = document.getElementById('hero');

  const isHeroInView = () => {
    if (!heroElement) return true;
    const rect = heroElement.getBoundingClientRect();
    return rect.top < window.innerHeight - 40 && rect.bottom > 40;
  };

  const triggerCinematicUnlock = () => {
    if (isCinematicUnlocked) return;
    isCinematicUnlocked = true;

    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }

    document.documentElement.classList.add('cinematic-unlocked');
    document.body.classList.add('cinematic-unlocked');

    // Run dynamic number counters
    runNumberCounters();

    // Clean up one-time event listeners
    window.removeEventListener('scroll', checkFirstScroll);
    window.removeEventListener('wheel', checkFirstWheel);
    window.removeEventListener('touchmove', checkFirstTouch);
    window.removeEventListener('keydown', checkFirstKey);
  };

  const checkFirstScroll = () => {
    if (isHeroInView() && window.scrollY > 4) {
      triggerCinematicUnlock();
    }
  };

  const checkFirstWheel = (e: WheelEvent) => {
    if (isHeroInView() && Math.abs(e.deltaY) > 1) {
      triggerCinematicUnlock();
    }
  };

  const checkFirstTouch = () => {
    if (isHeroInView()) {
      triggerCinematicUnlock();
    }
  };

  const checkFirstKey = (e: KeyboardEvent) => {
    if (isHeroInView() && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.code)) {
      triggerCinematicUnlock();
    }
  };

  // Listen for initial user intent when Hero is visible
  window.addEventListener('scroll', checkFirstScroll, { passive: true });
  window.addEventListener('wheel', checkFirstWheel, { passive: true });
  window.addEventListener('touchmove', checkFirstTouch, { passive: true });
  window.addEventListener('keydown', checkFirstKey, { passive: true });

  // If page was loaded with Hero already in view and scrolled down
  if (isHeroInView() && window.scrollY > 8) {
    triggerCinematicUnlock();
  }

  // Graceful fallback: If Hero is currently in view and stays idle for 3.5s, unlock smoothly
  fallbackTimer = setTimeout(() => {
    if (!isCinematicUnlocked && isHeroInView()) {
      triggerCinematicUnlock();
    }
  }, 3500);

  // Dedicated Hero IntersectionObserver: When Hero scrolls into view, unlock immediately
  if (heroElement) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerCinematicUnlock();
            heroObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
      }
    );
    heroObserver.observe(heroElement);
  }

  // Backup observer for counter elements
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        triggerCinematicUnlock();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-counter-target]').forEach((el) => {
    counterObserver.observe(el);
  });

  // ------------------------------------------------------------------------
  // 4. DEEP PARALLAX ENGINE (60fps RAF loop)
  // ------------------------------------------------------------------------
  if (!prefersReducedMotion) {
    let ticking = false;
    let parallaxElements: HTMLElement[] = [];

    const refreshParallaxElements = () => {
      parallaxElements = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    };

    refreshParallaxElements();

    const updateParallax = () => {
      const windowHeight = window.innerHeight;

      for (let i = 0; i < parallaxElements.length; i++) {
        const el = parallaxElements[i];
        const speedAttr = el.getAttribute('data-parallax');
        const speed = speedAttr ? parseFloat(speedAttr) : 0.1;
        const rect = el.getBoundingClientRect();

        // Frustum Culling: Only compute if within or near viewport (-150px to +150px)
        if (rect.bottom >= -150 && rect.top <= windowHeight + 150) {
          const centerDelta = rect.top + rect.height / 2 - windowHeight / 2;
          const translateY = centerDelta * speed;
          el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
        }
      }

      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );

    // Initial update
    window.requestAnimationFrame(updateParallax);

    // Refresh elements list when DOM mutates
    window.addEventListener('resize', () => {
      refreshParallaxElements();
      window.requestAnimationFrame(updateParallax);
    }, { passive: true });
  }

  // ------------------------------------------------------------------------
  // 5. SMOOTH ANCHOR NAVIGATION
  // ------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        triggerCinematicUnlock();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. INITIALIZE MOUSE DRAG-TO-SCROLL FOR HORIZONTAL CAROUSELS
  // ------------------------------------------------------------------------
  setupMouseDragCarousels(document);
}

// Auto-initialize when loaded in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollSystem);
  } else {
    initScrollSystem();
  }
}
