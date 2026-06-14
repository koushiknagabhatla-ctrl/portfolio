import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutPage.css';

const AboutPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {

      // Parallax removed to prevent zooming

      // 2. Text Reveal: Gentle slide-up and fade-in
      const texts = gsap.utils.toArray('.aww-reveal');
      texts.forEach(text => {
        gsap.fromTo(text, 
          { opacity: 0, y: 40 },
          {
            opacity: 1, 
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
            }
          }
        );
      });

      // ClipPath layer reveal removed to prevent the "layer coming up" bug.

    }, containerRef); // Scoped to prevent global conflicts

    return () => ctx.revert();
  }, []);

  return (
    <div className="aww-master-container" ref={containerRef}>
      
      {/* Intro Hero - Edge to Edge */}
      <section className="aww-section hero-section">
        <div className="aww-image-wrapper aww-clip-reveal full-bleed">
          <img className="aww-image" src="/about/epic_1.webp" alt="The Journey" />
        </div>
        <h1 className="aww-massive-title mix-blend aww-reveal">Beyond<br/>the Code.</h1>
        <div className="aww-meta bottom-left mix-blend aww-reveal">
          <span>CHAPTER 00</span>
          <span className="line-sep"></span>
          <span>THE HUMAN BEHIND THE SCREEN</span>
        </div>
      </section>

      {/* Chapter 1: The Builder */}
      <section className="aww-section text-section">
        <div className="aww-grid">
          <div className="aww-col empty-col"></div>
          <div className="aww-col text-col">
            <p className="aww-poetic aww-reveal">
              Most days, you'll find me behind a screen. 
            </p>
            <p className="aww-poetic aww-reveal">
              Writing code. Debugging logic. Building systems from absolute scratch. I love the silence of the process, the architecture of thought.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Rider */}
      <section className="aww-section offset-image-section">
        <div className="aww-grid reverse">
          <div className="aww-col img-col">
            <div className="aww-image-wrapper aww-clip-reveal portrait">
              <img className="aww-image" src="/about/epic_2.webp" alt="The Open Road" />
            </div>
            <div className="aww-caption aww-reveal">
              <span>LOCATION: HIGHWAY</span>
              <span>[ 01 ]</span>
            </div>
          </div>
          <div className="aww-col text-col middle-align">
            <p className="aww-poetic aww-reveal">
              But the moment I close my laptop, I need the exact opposite. 
            </p>
            <p className="aww-poetic aww-reveal">
              I need the roar of a bike engine. I need the cold wind hitting my chest. I need the absolute, undeniable freedom of the open road.
            </p>
          </div>
        </div>
      </section>

      {/* Edge to edge transition */}
      <section className="aww-section full-bleed-section">
        <div className="aww-image-wrapper aww-clip-reveal full-bleed cinematic-height">
          <img className="aww-image" src="/about/epic_6.webp" alt="Bike Perspective" />
        </div>
        <h2 className="aww-massive-title centered mix-blend aww-reveal">The Horizon.</h2>
      </section>

      {/* Chapter 3: The Explorer */}
      <section className="aww-section text-section">
        <div className="aww-grid">
          <div className="aww-col text-col">
            <p className="aww-poetic aww-reveal">
              I love to travel because it strips away the noise. It reminds me that the world is massive, chaotic, and unimaginably beautiful.
            </p>
            <p className="aww-poetic aww-reveal">
              Photography isn't just a hobby for me. It's how I freeze those fleeting seconds. It's how I remember the places that made me feel alive.
            </p>
          </div>
          <div className="aww-col empty-col"></div>
        </div>
      </section>

      {/* Gallery */}
      <section className="aww-section gallery-section">
        <div className="aww-grid asymmetric">
          <div className="aww-col img-col">
            <div className="aww-image-wrapper aww-clip-reveal landscape">
              <img className="aww-image" src="/about/epic_3.webp" alt="Raw Wilderness" />
            </div>
            <div className="aww-caption aww-reveal">
              <span>NATURE // UNTAMED</span>
              <span>[ 02 ]</span>
            </div>
          </div>
          <div className="aww-col img-col shift-down">
            <div className="aww-image-wrapper aww-clip-reveal portrait-thin">
              <img className="aww-image" src="/about/epic_5.webp" alt="Scale" />
            </div>
            <div className="aww-caption aww-reveal">
              <span>PERSPECTIVE</span>
              <span>[ 03 ]</span>
            </div>
          </div>
        </div>
      </section>

      <section className="aww-section gallery-single">
        <div className="aww-image-wrapper aww-clip-reveal panoramic">
          <img className="aww-image" src="/about/epic_7.webp" alt="Wide Horizon" />
        </div>
      </section>

      {/* Outro */}
      <section className="aww-section outro-section">
        <div className="aww-image-wrapper aww-clip-reveal full-bleed half-height">
          <img className="aww-image" src="/about/epic_8.webp" alt="Conclusion" />
        </div>
        <div className="outro-content">
          <h2 className="aww-huge-serif aww-reveal">Let's build</h2>
          <h2 className="aww-huge-serif indent aww-reveal">something</h2>
          <h2 className="aww-huge-serif double-indent aww-reveal">beautiful.</h2>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
