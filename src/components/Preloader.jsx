import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(
    () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 0)
  );
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const counterValRef = useRef({ val: 0 });

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        window.dispatchEvent(new Event('preloader:done'));
        if (onComplete) onComplete();
      }, 300);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }

    let isFinished = false;
    let morphStarted = false;
    const startTime = Date.now();
    const minDisplayTime = 900;
    const counterVal = counterValRef.current;

    const gatingImages = () =>
      Array.from(document.images).filter(
        img => !img.src.includes('data:image') && img.loading !== 'lazy'
      );

    const updateRealProgress = () => {
      if (isFinished) return;

      const relevantImages = gatingImages();
      
      if (relevantImages.length === 0) {
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

    const morphLogoToHeroCrest = () => {
      const logoEl = logoRef.current;
      const crest = document.querySelector('.kaisei-hero__crest');
      if (!logoEl || !crest) return false;

      const from = logoEl.getBoundingClientRect();
      const to = crest.getBoundingClientRect();
      if (!from.width || !from.height || !to.width || !to.height) return false;

      const clone = document.createElement('img');
      clone.src = logoEl.currentSrc || logoEl.src;
      clone.alt = '';
      clone.setAttribute('aria-hidden', 'true');
      Object.assign(clone.style, {
        position: 'fixed',
        top: `${from.top}px`,
        left: `${from.left}px`,
        width: `${from.width}px`,
        height: `${from.height}px`,
        margin: '0',
        zIndex: '1000000',
        pointerEvents: 'none',
        willChange: 'transform',
        transformOrigin: 'top left',
      });
      document.body.appendChild(clone);
      logoEl.style.visibility = 'hidden';
      crest.style.visibility = 'hidden';

      gsap.to(clone, {
        x: to.left - from.left,
        y: to.top - from.top,
        scaleX: to.width / from.width,
        scaleY: to.height / from.height,
        duration: 1.1,
        ease: 'power4.inOut',
        onComplete: () => {
          crest.style.visibility = '';
          clone.remove();
          document.body.style.overflow = '';
        },
      });
      return true;
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
          morphStarted = morphLogoToHeroCrest();
          window.dispatchEvent(new Event('preloader:done'));
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut',
            onComplete: () => {
              if (!morphStarted) document.body.style.overflow = '';
              if (onComplete) onComplete();
            }
          });
        }
      });
    };

    const interval = setInterval(() => {
      updateRealProgress();
      if (!isFinished && Date.now() - startTime >= minDisplayTime) {
        const allLoaded = gatingImages().every(img => img.complete);
        if (allLoaded || Date.now() - startTime >= 4000) {
          finishPreloader();
        }
      }
    }, 100);

    updateRealProgress();

    return () => {
      clearInterval(interval);
      gsap.killTweensOf(counterVal);
      if (!morphStarted) document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div className="preloader-container" ref={containerRef} role="status" aria-live="polite">
      <div className="preloader-logo-wrapper">
        <picture>
          <source srcSet="/porsche-logo.webp" type="image/webp" />
          <img src="/porsche-logo.png" alt="Porsche" className="preloader-logo" ref={logoRef} fetchPriority="high" decoding="sync" />
        </picture>
      </div>
      <div className="preloader-counter">
        {counter}
      </div>
    </div>
  );
}

export default Preloader;
