import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.kaisei-footer__title',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="kaisei-footer" ref={footerRef} role="contentinfo">
      <div className="kaisei-container kaisei-footer__wrapper">
        <div className="kaisei-footer__head">
          <div className="kaisei-footer__col">
            <p className="kaisei-footer__label">[Menu]</p>
            <ul className="kaisei-footer__list">
              <li><Link to="/">Top</Link></li>
              <li><a href="#works">Works</a></li>
              <li><a href="#story">Story</a></li>
              <li><Link to="/photography">Photography</Link></li>
            </ul>
          </div>

          <div className="kaisei-footer__col">
            <p className="kaisei-footer__label">[Social]</p>
            <ul className="kaisei-footer__list">
              <li><a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/koushik-nagabhatla-113a493a2" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/__.koushik__.7" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>

          <div className="kaisei-footer__col">
            <p className="kaisei-footer__label">[Mail]</p>
            <p><a href="mailto:koushiknagabhatla@gmail.com" className="kaisei-footer__mail">koushiknagabhatla@gmail.com</a></p>
          </div>

          <div className="kaisei-footer__col">
            <p className="kaisei-footer__label">[Credit]</p>
            <p className="kaisei-footer__credit">
              Design & Development by<br />
              <span>Koushik Nagabhatla</span>
            </p>
          </div>
        </div>

        <div className="kaisei-footer__bottom">
          <h2 className="kaisei-footer__title">
            thank you
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
