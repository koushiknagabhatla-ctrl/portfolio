import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(
    () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 0)
  );
  const containerRef = useRef(null);
  const counterValRef = useRef({ val: 0 });

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }, 300);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }

    let isFinished = false;
    const startTime = Date.now();
    const minDisplayTime = 900; // Minimum duration in ms for a cinematic feel
    const counterVal = counterValRef.current;

    // Function to calculate real asset loading percentage across any active page
    const updateRealProgress = () => {
      if (isFinished) return;

      const allImages = Array.from(document.images);
      // Filter out tiny tracking pixels or hidden images if any, keep real page assets
      const relevantImages = allImages.filter(img => !img.src.includes('data:image'));
      
      if (relevantImages.length === 0) {
        // If no images on current page yet, progress steadily
        const elapsed = Date.now() - startTime;
        const fallbackProg = Math.min(90, Math.floor((elapsed / minDisplayTime) * 100));
        animateTo(fallbackProg);
        return;
      }

      let loadedCount = 0;
      relevantImages.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
          loadedCount++;
        } else if (!img._tracked) {
          img._tracked = true;
          img.addEventListener('load', updateRealProgress, { once: true });
          img.addEventListener('error', updateRealProgress, { once: true });
        }
      });

      const actualRatio = loadedCount / relevantImages.length;
      const targetPercent = Math.min(100, Math.floor(actualRatio * 100));

      animateTo(targetPercent);

      // If all images loaded AND minimum time elapsed, trigger exit
      if (loadedCount === relevantImages.length && (Date.now() - startTime >= minDisplayTime)) {
        finishPreloader();
      }
    };

    const animateTo = (target) => {
      if (isFinished) return;
      gsap.to(counterVal, {
        val: target,
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: () => {
          setCounter(Math.min(100, Math.floor(counterVal.val)));
        }
      });
    };

    const finishPreloader = () => {
      if (isFinished) return;
      isFinished = true;

      gsap.to(counterVal, {
        val: 100,
        duration: 0.5,
        ease: 'power3.out',
        onUpdate: () => {
          setCounter(Math.min(100, Math.floor(counterVal.val)));
        },
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut',
            onComplete: () => {
              document.body.style.overflow = '';
              if (onComplete) onComplete();
            }
          });
        }
      });
    };

    // Check periodically as React child components mount and append DOM images
    const interval = setInterval(() => {
      updateRealProgress();
      if (!isFinished && Date.now() - startTime >= minDisplayTime) {
        const allImages = Array.from(document.images).filter(img => !img.src.includes('data:image'));
        const allLoaded = allImages.every(img => img.complete);
        if (allLoaded || Date.now() - startTime >= 4000) { // Safety max timeout 4s
          finishPreloader();
        }
      }
    }, 100);

    // Initial check
    updateRealProgress();

    return () => {
      clearInterval(interval);
      gsap.killTweensOf(counterVal);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div className="preloader-container" ref={containerRef} role="status" aria-live="polite">
      <div className="preloader-logo-wrapper">
        <picture>
          <source srcSet="/porsche-logo.webp" type="image/webp" />
          <img src="/porsche-logo.png" alt="Porsche" className="preloader-logo" fetchPriority="high" decoding="sync" />
        </picture>
      </div>
      <div className="preloader-counter">
        {counter}
      </div>
    </div>
  );
}

export default Preloader;
