import React, { useEffect, useRef, useState } from 'react';
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
      { '--nav-translate-y': '-100%', opacity: 0 },
      { '--nav-translate-y': '0%', opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.1, clearProps: 'all' }
    );
  }, []);

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY.current) {
          setIsHidden(false);
        }

        lastScrollY.current = currentScrollY;
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${isHidden ? 'navbar-hidden' : ''}`} ref={navRef} aria-label="Main navigation">
      <div className="nav-links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>HOME</Link>
        <Link to="/about" className={isActive('/about') ? 'active' : ''}>ABOUT</Link>
        <Link to="/works" className={isActive('/works') ? 'active' : ''}>WORKS</Link>
        <Link to="/photography" className={isActive('/photography') ? 'active' : ''}>PHOTOGRAPHY</Link>
      </div>
      <div className="nav-socials">
        <a href="https://www.instagram.com/__.koushik__.7" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="https://www.linkedin.com/in/koushik-nagabhatla-113a493a2" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
