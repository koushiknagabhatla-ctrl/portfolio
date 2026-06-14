import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

import heroImg from '../assets/hero.webp';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // === TITLE: Character-by-character 3D reveal ===
      const titleChars = titleRef.current.querySelectorAll('.char-reveal');
      gsap.fromTo(titleChars,
        { y: 80, rotateX: -90, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: 'power4.out',
          delay: 0.1
        }
      );

      // === PARAGRAPH REVEAL ===
      const paragraphs = textContainerRef.current.querySelectorAll('.hero-paragraph');
      gsap.fromTo(paragraphs,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power4.out',
          delay: 0.8
        }
      );

      // === IMAGE REVEAL ===
      gsap.fromTo(imageRef.current,
        { x: 100, opacity: 0, scale: 0.9, rotate: 5 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.5,
          ease: 'power4.out',
          delay: 0.6
        }
      );

      // === SCROLL-DRIVEN PARALLAX EXIT ===
      gsap.to(titleRef.current, {
        y: -200,
        opacity: 0,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(textContainerRef.current, {
        y: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Apply scroll animation to the wrapper to prevent GSAP conflict with intro animation
      gsap.to(imageWrapperRef.current, {
        y: -250,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

    });

    return () => ctx.revert();
  }, []);

  const title = 'HI, THIS IS KOUSHIK';

  return (
    <section id="home" className="section hero-section" ref={sectionRef}>
      <div className="container">
        <div className="hero-layout">
          <div className="hero-content">
            <h1 className="hero-title" ref={titleRef} style={{ perspective: '800px' }}>
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
            </h1>

            <div className="hero-text" ref={textContainerRef}>
              <p className="hero-paragraph">
                I am a 4th year b-tech student with a strong interest in software development and web technologies.
              </p>
              <p className="hero-paragraph">
                i enjoy building projects that help me improve my problem solving and coding skills.
              </p>
              <p className="hero-paragraph">
                i am eager to learn new technologies, gain real-world experience, and contribute to a team where i can grow as a developer.
              </p>
            </div>
          </div>
          <div className="hero-image-wrapper" ref={imageWrapperRef}>
            <img src={heroImg} alt="Koushik" className="hero-img" ref={imageRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
