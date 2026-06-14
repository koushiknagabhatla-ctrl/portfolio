import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const titleRef = useRef(null);
  const contactsRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current.querySelectorAll('.char-reveal');
      gsap.fromTo(titleChars,
        { y: 50, rotateX: -90, opacity: 0 },
        {
          y: 0, rotateX: 0, opacity: 1,
          duration: 1, stagger: 0.02, ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const contactItems = contactsRef.current.querySelectorAll('.contact-item');
      gsap.fromTo(contactItems,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: contactsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const socialItems = socialsRef.current.querySelectorAll('a');
      gsap.fromTo(socialItems,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: socialsRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const title = "Let's connect and build something together.";

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h2 className="footer-title" ref={titleRef} style={{ perspective: '600px' }}>
              {title.split(' ').map((word, wIndex) => (
                <span 
                  key={wIndex} 
                  style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.3em' }}
                >
                  {word.split('').map((char, cIndex) => (
                    <span
                      key={`${wIndex}-${cIndex}`}
                      className="char-reveal"
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
            <div className="contact-details" ref={contactsRef}>
              <a href="mailto:koushiknagabhatla@gmail.com" className="contact-item" aria-label="Email Koushik">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>koushiknagabhatla@gmail.com</span>
              </a>
              <a href="tel:+917989237906" className="contact-item" aria-label="Call Koushik">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+91 7989237906</span>
              </a>
            </div>
          </div>
          
          <div className="footer-right" ref={socialsRef}>
            <h3 className="socials-title">SOCIALS</h3>
            <div className="socials-list">
              <a href="https://github.com/koushiknagabhatla-ctrl" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> Github
              </a>
              <a href="https://www.linkedin.com/in/koushik-nagabhatla-113a493a2" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn
              </a>
              <a href="https://www.instagram.com/__.koushik__.7" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
