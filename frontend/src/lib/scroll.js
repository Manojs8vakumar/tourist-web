import Lenis from 'lenis';

/**
 * One rAF loop for scroll-driven animations with buttery-smooth Lenis easing.
 */

const subscribers = new Set();
let lenis = null;

export function startScroll(reducedMotion = false) {
  if (!reducedMotion) {
    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2
      });
    } catch (e) {
      console.warn('Lenis initialization bypassed:', e);
    }
  }

  let raf = 0;
  const loop = (time) => {
    lenis?.raf(time);
    subscribers.forEach((fn) => {
      try {
        fn(time);
      } catch (err) {
        console.error('onFrame error:', err);
      }
    });
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function onFrame(fn) {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

/** Smooth-scrolls to an in-page hash like `#log`, or to the top for `#top`. */
export function scrollToHash(hash) {
  const target = hash === '#top' ? 0 : document.querySelector(hash);
  if (target === null) return;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.1 });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
