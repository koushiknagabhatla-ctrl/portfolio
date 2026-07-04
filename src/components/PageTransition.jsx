import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PageTransition.css';

gsap.registerPlugin(ScrollTrigger);

// Timings replicated from the reference implementation (Taxi.js desktop
// transition): new page rises from 100vh at scale 0.8 while the old page
// drifts up -50vh and dims, both over 1.4s expo.inOut. Used on all viewport
// sizes — the reference's mobile crossfade was too subtle to register.
const CARD_DURATION = 1.4;
const CARD_EASE = 'expo.inOut';

const isDarkPath = (pathname) =>
  pathname.startsWith('/photography') || pathname.startsWith('/about');

function PageTransition({ location, lenisRef, children }) {
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const pageRef = useRef(null);
  const overlayRef = useRef(null);
  const phaseRef = useRef('idle'); // 'idle' | 'capturing' | 'animating'

  const removeOverlay = () => {
    if (overlayRef.current) {
      gsap.killTweensOf(overlayRef.current);
      overlayRef.current.remove();
      overlayRef.current = null;
    }
  };

  const finishNow = () => {
    const page = pageRef.current;
    if (page) {
      gsap.killTweensOf(page);
      gsap.set(page, { clearProps: 'all' });
    }
    removeOverlay();
    document.documentElement.classList.remove('page-transitioning');
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    if (lenisRef.current) {
      lenisRef.current.start();
      lenisRef.current.scrollTo(0, { immediate: true, lock: true, force: true });
    }
    // Triggers created mid-transition measured a fixed, transformed page;
    // recompute now that the page is back in normal flow, and once more
    // after the next paint to catch any late layout settling.
    ScrollTrigger.refresh();
    requestAnimationFrame(() => ScrollTrigger.refresh());
    phaseRef.current = 'idle';
  };

  const captureSnapshot = () => {
    const page = pageRef.current;
    if (!page) return false;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    const overlay = document.createElement('div');
    overlay.className = 'page-transition-snapshot';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.backgroundColor = getComputedStyle(page).backgroundColor;

    const clone = page.cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    clone.querySelectorAll('audio, video, iframe, script').forEach((el) => el.remove());
    clone.style.position = 'absolute';
    clone.style.top = `${-scrollY}px`;
    clone.style.left = '0';
    clone.style.width = '100%';
    clone.style.minHeight = '100vh';

    overlay.appendChild(clone);
    document.body.appendChild(overlay);
    overlayRef.current = overlay;
    return true;
  };

  // Phase 1 — real location changed: snapshot the outgoing page before React
  // swaps the route, lock interaction, then let the new page render.
  useLayoutEffect(() => {
    if (location.key === displayedLocation.key) return;

    const samePage = location.pathname === displayedLocation.pathname;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (phaseRef.current !== 'idle') finishNow();

    if (samePage || reduceMotion || !captureSnapshot()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- route swap must commit synchronously before paint
      setDisplayedLocation(location);
      return;
    }

    phaseRef.current = 'capturing';
    document.documentElement.classList.add('page-transitioning');
    if (lenisRef.current) lenisRef.current.stop();
    setDisplayedLocation(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Phase 2 — new route committed (pre-paint): position it and animate.
  useLayoutEffect(() => {
    if (phaseRef.current !== 'capturing') return;
    const page = pageRef.current;
    const overlay = overlayRef.current;
    if (!page || !overlay) {
      finishNow();
      return;
    }
    phaseRef.current = 'animating';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;

    gsap.set(page, {
      y: '100vh',
      scale: 0.8,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 600,
    });
    gsap.to(overlay, {
      y: '-50vh',
      opacity: 0.8,
      duration: CARD_DURATION,
      ease: CARD_EASE,
    });
    gsap.to(page, {
      y: '0vh',
      scale: 1,
      duration: CARD_DURATION,
      ease: CARD_EASE,
      onComplete: finishNow,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedLocation]);

  // Safety: never leak the snapshot overlay or the interaction lock if this
  // component unmounts mid-transition.
  useLayoutEffect(
    () => () => {
      if (overlayRef.current) {
        gsap.killTweensOf(overlayRef.current);
        overlayRef.current.remove();
        overlayRef.current = null;
      }
      document.documentElement.classList.remove('page-transitioning');
    },
    []
  );

  return (
    <div
      ref={pageRef}
      className={`page-wrap${isDarkPath(displayedLocation.pathname) ? ' page-wrap--dark' : ''}`}
    >
      {children(displayedLocation)}
    </div>
  );
}

export default PageTransition;
