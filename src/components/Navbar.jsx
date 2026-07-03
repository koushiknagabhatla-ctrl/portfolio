import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './Navbar.css';

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.1, clearProps: 'all' }
    );
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 20) {
            setIsHidden(true);
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

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isDarkPage = location.pathname.startsWith('/photography') || location.pathname.startsWith('/about');

  return (
    <header className={`navbar ${isHidden ? 'navbar-hidden' : ''} ${isDarkPage ? 'navbar-dark-page' : ''}`} ref={navRef} role="navigation" aria-label="Main navigation">
      <div className="navbar__logo">
        <Link to="/" className="navbar__logo-link" aria-label="Home">
          <img src="/porsche-logo.webp" alt="Porsche Crest" className="navbar__porsche-logo" width="90" height="50" />
        </Link>
      </div>

      <nav className="navbar__nav" role="menubar">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/" role="menuitem" className={`navbar__link ${isActive('/') ? 'active' : ''}`}>
              <span className="navbar__bracket">[</span>
              <span className="navbar__link-text">Home</span>
              <span className="navbar__bracket">]</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/about" role="menuitem" className={`navbar__link ${isActive('/about') ? 'active' : ''}`}>
              <span className="navbar__bracket">[</span>
              <span className="navbar__link-text">About</span>
              <span className="navbar__bracket">]</span>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/photography" role="menuitem" className={`navbar__link ${isActive('/photography') ? 'active' : ''}`}>
              <span className="navbar__bracket">[</span>
              <span className="navbar__link-text">Photography</span>
              <span className="navbar__bracket">]</span>
            </Link>
          </li>
          <li className="navbar__item">
            <a href="/NAGABHATLA_RAMA_KOUSHIK_Resume.pdf" download="NAGABHATLA RAMA KOUSHIK - Resume.pdf" target="_blank" rel="noopener noreferrer" role="menuitem" className="navbar__link">
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
