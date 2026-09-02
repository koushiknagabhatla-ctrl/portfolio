import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './Navbar.css';

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const drop = () => {
      gsap.fromTo(navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.1, clearProps: 'all' }
      );
    };

    if (document.querySelector('.preloader-container')) {
      gsap.set(navRef.current, { opacity: 0 });
      window.addEventListener('preloader:done', drop, { once: true });
      return () => window.removeEventListener('preloader:done', drop);
    }

    drop();
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 20) {
            setIsHidden(true);
            setIsOpen(false);
          } else if (currentScrollY < lastScrollY.current) {
            setIsHidden(false);
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`navbar ${isHidden ? 'navbar-hidden' : ''} ${isOpen ? 'navbar--open' : ''}`} ref={navRef}>
      <div className="navbar__logo"></div>

      {isOpen && (
        <button
          type="button"
          className="navbar__backdrop"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      <button
        type="button"
        className="navbar__toggle"
        aria-expanded={isOpen}
        aria-controls="primary-nav"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="navbar__toggle-bar" aria-hidden="true"></span>
        <span className="navbar__toggle-bar" aria-hidden="true"></span>
        <span className="navbar__toggle-bar" aria-hidden="true"></span>
      </button>

      <nav id="primary-nav" className="navbar__nav" aria-label="Main navigation">
        <ul className="navbar__list" onClick={() => setIsOpen(false)}>
          <li className="navbar__item">
            <Link to="/" className={`navbar__link ${isActive('/') ? 'active' : ''}`}>
              <span className="navbar__bracket">[</span>
              <span className="navbar__link-text">Home</span>
              <span className="navbar__bracket">]</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/programming" className={`navbar__link ${isActive('/programming') ? 'active' : ''}`}>
              <span className="navbar__bracket">[</span>
              <span className="navbar__link-text">Programming</span>
              <span className="navbar__bracket">]</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/about" className={`navbar__link ${isActive('/about') ? 'active' : ''}`}>
              <span className="navbar__bracket">[</span>
              <span className="navbar__link-text">About</span>
              <span className="navbar__bracket">]</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/photography" className={`navbar__link ${isActive('/photography') ? 'active' : ''}`}>
              <span className="navbar__bracket">[</span>
              <span className="navbar__link-text">Photography</span>
              <span className="navbar__bracket">]</span>
            </Link>
          </li>
          <li className="navbar__item">
            <a href="/NAGABHATLA_RAMA_KOUSHIK_Resume.pdf" download="NAGABHATLA RAMA KOUSHIK - Resume.pdf" target="_blank" rel="noopener noreferrer" className="navbar__link">
              <span className="navbar__bracket">[</span>
              <span className="navbar__link-text">Resume</span>
              <span className="navbar__bracket">]</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
