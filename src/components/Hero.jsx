import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

import heroImg from '../assets/hero.webp';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const storyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Title Parallax on Scroll
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          yPercent: -30,
          opacity: 0.85,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // 2. Editorial Portrait Parallax (Image moves smoothly inside wrapper)
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -12, scale: 1.15 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }

      // 3. Smooth Fade-up for Story & Approach items
      const fadeItems = gsap.utils.toArray('.kaisei-profile__item, .kaisei-approach__item');
      fadeItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="kaisei-home-wrapper" ref={sectionRef}>
      {/* 2. MAIN HERO SECTION */}
      <section className="kaisei-hero">
        <div className="kaisei-hero__watermark">
          自己紹介
        </div>
        <div className="kaisei-container kaisei-hero__grid">
          <h1 className="kaisei-hero__title" ref={titleRef}>
            I&apos;M<br />
            FRONT-END &amp; IOT<br />
            DEVELOPER &amp; ENGINEER
          </h1>

          <div className="kaisei-hero__footer-row">
            <p className="kaisei-hero__about-label">
              About me
            </p>
            <div className="kaisei-scroll" aria-label="Scroll">
              <span className="kaisei-scroll__text">Scroll</span>
              <span className="kaisei-scroll__text kaisei-scroll__text--clone" aria-hidden="true">Scroll</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STORYTELLING & IMAGE PLACEMENT EDITORIAL SECTION (Kaisei /about style) */}
      <section id="story" className="kaisei-story" ref={storyRef}>
        <div className="kaisei-container kaisei-story__grid">
          {/* Asymmetrical Portrait Image Placement */}
          <div className="kaisei-story__img-col">
            <div className="kaisei-story__img-wrapper">
              <img
                src={heroImg}
                alt="Koushik Nagabhatla Portrait"
                className="kaisei-story__img"
                ref={imgRef}
                width="500"
                height="680"
                loading="eager"
              />
            </div>

          </div>

          {/* Giant Tabular Number Display */}
          <div className="kaisei-story__stat-col">
            <span className="kaisei-story__stat-label">[Academic Year]</span>
            <div className="kaisei-story__stat-num">4<span className="kaisei-story__stat-unit">TH</span></div>
          </div>

          {/* Detailed Authentic Story Profile */}
          <div className="kaisei-story__profile-col">
            <h2 className="kaisei-story__section-title">info</h2>
            <div className="kaisei-story__profile-grid">
              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">[Profile]</span>
                <p className="kaisei-profile__text">
                  Fourth-year B.Tech Computer Science student at D.N.R College of Engineering & Technology with deep hands-on experience in modern web technologies and software engineering. Passionate about building scalable full-stack applications and high-fidelity UI/UX from scratch.
                </p>
              </div>

              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">[Tech Stack]</span>
                <p className="kaisei-profile__text">
                  React, JavaScript, Vite, Node.js, HTML5, CSS3, Supabase, ESP32 / Industrial IoT, Figma
                </p>
              </div>

              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">[Featured Works]</span>
                <p className="kaisei-profile__text">
                  TRAVELWISE — Full-Stack Flight Booking & Real-Time Tracking<br />
                  PIXEL FORGE AI — AI Image Platform powered by Gemini API<br />
                  SK JALRAKSHAK — Corporate Platform for IIT Delhi IoT Startup
                </p>
              </div>

              <div className="kaisei-profile__item">
                <span className="kaisei-meta__label">[Languages]</span>
                <p className="kaisei-profile__text">English, Telugu, Hindi</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. APPROACH & PHILOSOPHY SECTION */}
        <div className="kaisei-approach">
          <div className="kaisei-container kaisei-approach__grid">
            <div className="kaisei-approach__head">
              <h2 className="kaisei-approach__title">approach</h2>
              <p className="kaisei-approach__sub">Core values guiding my engineering & creative projects</p>
            </div>

            <div className="kaisei-approach__list">
              <div className="kaisei-approach__item">
                <h3 className="kaisei-approach__item-title">Communication</h3>
                <p className="kaisei-approach__item-desc">
                  I believe exceptional software begins with transparent dialogue. Whether defining architecture or refining user experience, I value clear communication to ensure every requirement is met with precision and purpose.
                </p>
              </div>

              <div className="kaisei-approach__item">
                <h3 className="kaisei-approach__item-title">Precision</h3>
                <p className="kaisei-approach__item-desc">
                  From pixel-perfect UI rendering and buttery 60 FPS animations to low-latency IoT hardware loops, I dedicate immense care to every detail, ensuring scalable and reliable engineering.
                </p>
              </div>

              <div className="kaisei-approach__item">
                <h3 className="kaisei-approach__item-title">Exploration</h3>
                <p className="kaisei-approach__item-desc">
                  Every project presents a new frontier. Blending my background in software systems with visual photography allows me to approach problems with curiosity, artistic intuition, and modern technical rigor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
