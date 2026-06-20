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
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure visibility is reset after hydration
      gsap.set([titleRef.current, textContainerRef.current, imageWrapperRef.current], { visibility: 'visible' });

      // 1. Sleek Masked Text Reveal (ref.digital style)
      const titleWords = titleRef.current.querySelectorAll('.word-inner');
      gsap.fromTo(titleWords,
        { y: '120%', rotateZ: 5 },
        {
          y: '0%',
          rotateZ: 0,
          duration: 1.6,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.2
        }
      );

      // 2. Fade up paragraphs smoothly
      const paragraphs = textContainerRef.current.querySelectorAll('.hero-paragraph');
      gsap.fromTo(paragraphs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.8
        }
      );

      // 3. Cinematic Image Reveal (Clip Path + Scale)
      gsap.fromTo(imageWrapperRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.6,
          ease: 'power4.inOut',
          delay: 0.4
        }
      );

      gsap.fromTo(imageRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.6,
          ease: 'power4.inOut',
          delay: 0.4
        }
      );

      // Scroll Parallax Effects
      gsap.to(titleRef.current, {
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

      gsap.to(textContainerRef.current, {
        y: -100,
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
        y: -200,
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
            <h1 className="hero-title" ref={titleRef} style={{ visibility: 'hidden' }}>
              {title.split(' ').map((word, wIndex) => (
                <span 
                  key={wIndex} 
                  className="word-mask"
                  style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.1em', marginRight: '0.3em' }}
                >
                  <span
                    className="word-inner"
                    style={{ display: 'inline-block', transformOrigin: 'left bottom', willChange: 'transform' }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <div className="hero-text" ref={textContainerRef} style={{ visibility: 'hidden' }}>
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
          <div className="hero-image-wrapper" ref={imageWrapperRef} style={{ visibility: 'hidden' }}>
            <img
              src={heroImg}
              alt="Koushik Nagabhatla — Developer and photographer, portrait"
              className="hero-img"
              ref={imageRef}
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
