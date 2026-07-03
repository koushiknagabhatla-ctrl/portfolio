import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Lock page scrolling during loading
    document.body.style.overflow = 'hidden';

    // Check motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCounter(100);
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }

    const counterObj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }
    });

    // Count up animation
    tl.to(counterObj, {
      val: 100,
      duration: 2.2,
      ease: 'power1.inOut',
      onUpdate: () => {
        setCounter(Math.floor(counterObj.val));
      }
    })
    // Brief hold at 100
    .to({}, { duration: 0.3 })
    // Slide up exit animation
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut'
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div className="preloader-container" ref={containerRef}>
      <div className="preloader-logo-wrapper">
        <img src="/porsche-logo.png" alt="Porsche" className="preloader-logo" />
      </div>
      <div className="preloader-counter">
        {counter}
      </div>
    </div>
  );
}

export default Preloader;
