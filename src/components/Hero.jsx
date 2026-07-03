import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

import heroImg from '../assets/hero.webp';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        y: -200,
        opacity: 0,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
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
          scrub: true
        }
      });

      gsap.to(imageWrapperRef.current, {
        y: -250,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
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
            <h1 className="hero-title" ref={titleRef}>
              {title}
            </h1>

            <div className="hero-text" ref={textContainerRef}>
              <p className="hero-paragraph">
                I am a 4th year B.Tech student with a strong interest in software development and web technologies.
              </p>
              <p className="hero-paragraph">
                I enjoy building projects that help me improve my problem solving and coding skills.
              </p>
              <p className="hero-paragraph">
                I am eager to learn new technologies, gain real-world experience, and contribute to a team where I can grow as a developer.
              </p>
            </div>
          </div>
          <div className="hero-image-wrapper" ref={imageWrapperRef}>
            <img
              src={heroImg}
              alt="Koushik Nagabhatla — Developer and photographer, portrait"
              className="hero-img"
              width="420"
              height="560"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
