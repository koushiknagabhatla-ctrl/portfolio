import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-compact-content',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-compact" ref={footerRef} role="contentinfo">
      <div className="container footer-compact-content">
        <div className="footer-compact-row">
          <div className="footer-compact-left">
            <h3 className="footer-compact-title">Get in touch</h3>
            <a href="mailto:koushiknagabhatla@gmail.com" className="footer-email">
              koushiknagabhatla@gmail.com
            </a>
          </div>

          <div className="footer-compact-socials">
            <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/koushik-nagabhatla-113a493a2" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/__.koushik__.7" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>

        <div className="footer-compact-bottom">
          <span>&copy; {new Date().getFullYear()} Koushik Nagabhatla</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
