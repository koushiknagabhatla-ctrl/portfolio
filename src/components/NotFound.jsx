import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './NotFound.css';

const NotFound = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power4.out', delay: 0.1 }
      );

      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo(btnRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="not-found-section" ref={containerRef} aria-label="Page not found">
      <div className="container not-found-container">
        <h1 className="not-found-title" ref={titleRef}>404</h1>
        <p className="not-found-subtitle" ref={subtitleRef}>
          This page doesn't exist. The URL may be misspelled or the page may have moved.
        </p>
        <Link to="/" className="not-found-btn" ref={btnRef} aria-label="Return to home page">
          Return Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
