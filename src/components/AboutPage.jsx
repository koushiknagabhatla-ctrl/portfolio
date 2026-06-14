import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutPage.css';

const AboutPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {

      // 1. Image Parallax: Images pan vertically inside their wrappers
      const images = gsap.utils.toArray('.aww-image');
      images.forEach(img => {
        gsap.to(img, {
          yPercent: 15, // Reduced slightly for better performance and subtlety
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // 2. Text Reveal: Gentle slide-up and fade-in
      const texts = gsap.utils.toArray('.aww-reveal');
      texts.forEach(text => {
        gsap.fromTo(text, 
          { opacity: 0, y: 40 },
          {
            opacity: 1, 
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
            }
          }
        );
      });

      // 3. Clip-Path Image Reveal (Curtain opening effect)
      const wrappers = gsap.utils.toArray('.aww-clip-reveal');
      wrappers.forEach(wrapper => {
        gsap.fromTo(wrapper,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="aww-master-container" ref={containerRef}>
      
      {/* Intro Hero - Edge to Edge */}
      <section className="aww-section hero-section">
        <div className="aww-image-wrapper aww-clip-reveal full-bleed">
          {/* Added loading="lazy" and decoding="async" for 0 lag */}
          <img className="aww-image" src="/about/ultra_1.webp" alt="The Journey" decoding="async" />
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
              Writing code. Debugging logic. Building systems from absolute scratch. I love the silence of the process, the architecture of thought. It's a world where absolute chaos is engineered into perfect order.
            </p>
          </div>
        </div>
      </section>

      {/* Overlapping grid section for cinematic depth */}
      <section className="aww-section overlap-section">
        <div className="aww-overlap-grid">
          <div className="aww-image-wrapper aww-clip-reveal square overlap-left">
            <img className="aww-image" src="/about/ultra_2.webp" alt="Details" loading="lazy" decoding="async" />
          </div>
          <div className="aww-image-wrapper aww-clip-reveal portrait overlap-right shift-down">
            <img className="aww-image" src="/about/ultra_3.webp" alt="Vibe" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* Chapter 2: The Rider */}
      <section className="aww-section offset-image-section">
        <div className="aww-grid reverse">
          <div className="aww-col img-col">
            <div className="aww-image-wrapper aww-clip-reveal portrait-thin">
              <img className="aww-image" src="/about/ultra_4.webp" alt="The Open Road" loading="lazy" decoding="async" />
            </div>
            <div className="aww-caption aww-reveal">
              <span>LOCATION: THE HIGHWAY</span>
              <span>[ 01 ]</span>
            </div>
          </div>
          <div className="aww-col text-col middle-align">
            <p className="aww-poetic aww-reveal">
              But the moment I close my laptop, I need the exact opposite. 
            </p>
            <p className="aww-poetic aww-reveal">
              I need the roar of a bike engine. I need the cold wind hitting my chest. I need the absolute, undeniable freedom of the open road, where the only algorithm is the throttle and the horizon.
            </p>
          </div>
        </div>
      </section>

      {/* Edge to edge transition */}
      <section className="aww-section full-bleed-section">
        <div className="aww-image-wrapper aww-clip-reveal full-bleed cinematic-height">
          <img className="aww-image" src="/about/ultra_5.webp" alt="Bike Perspective" loading="lazy" decoding="async" />
        </div>
        <h2 className="aww-massive-title centered mix-blend aww-reveal">The Horizon.</h2>
      </section>

      {/* Intense Gallery Block */}
      <section className="aww-section gallery-grid-section">
         <div className="aww-gallery-grid">
            <div className="aww-image-wrapper aww-clip-reveal portrait">
              <img className="aww-image" src="/about/ultra_6.webp" alt="Memory 1" loading="lazy" decoding="async" />
            </div>
            <div className="aww-image-wrapper aww-clip-reveal landscape shift-down-heavy">
              <img className="aww-image" src="/about/ultra_7.webp" alt="Memory 2" loading="lazy" decoding="async" />
            </div>
            <div className="aww-image-wrapper aww-clip-reveal square">
              <img className="aww-image" src="/about/ultra_8.webp" alt="Memory 3" loading="lazy" decoding="async" />
            </div>
         </div>
      </section>

      {/* Chapter 3: The Explorer */}
      <section className="aww-section text-section margin-top-massive">
        <div className="aww-grid">
          <div className="aww-col text-col">
            <p className="aww-poetic aww-reveal">
              I love to travel because it strips away the noise. It reminds me that the world is massive, chaotic, and unimaginably beautiful.
            </p>
            <p className="aww-poetic aww-reveal">
              Photography isn't just a hobby for me. It's how I freeze those fleeting seconds. It's how I remember the places, the light, and the shadows that made me feel alive.
            </p>
          </div>
          <div className="aww-col empty-col"></div>
        </div>
      </section>

      {/* Dual Panoramic Gallery */}
      <section className="aww-section dual-panoramic">
        <div className="aww-image-wrapper aww-clip-reveal panoramic right-align">
          <img className="aww-image" src="/about/ultra_9.webp" alt="Raw Wilderness" loading="lazy" decoding="async" />
        </div>
        <div className="aww-caption right-align-caption aww-reveal">
          <span>NATURE // UNTAMED</span>
        </div>

        <div className="aww-image-wrapper aww-clip-reveal panoramic left-align shift-down-medium">
          <img className="aww-image" src="/about/ultra_10.webp" alt="Scale" loading="lazy" decoding="async" />
        </div>
        <div className="aww-caption left-align-caption aww-reveal shift-down-medium">
          <span>PERSPECTIVE</span>
        </div>
      </section>

      {/* Triple split */}
      <section className="aww-section triple-split">
        <div className="aww-grid-triple">
          <div className="aww-image-wrapper aww-clip-reveal portrait">
            <img className="aww-image" src="/about/ultra_11.webp" alt="Grid 1" loading="lazy" decoding="async" />
          </div>
          <div className="aww-image-wrapper aww-clip-reveal portrait shift-down-slight">
            <img className="aww-image" src="/about/ultra_12.webp" alt="Grid 2" loading="lazy" decoding="async" />
          </div>
          <div className="aww-image-wrapper aww-clip-reveal portrait shift-down-heavy">
            <img className="aww-image" src="/about/ultra_13.webp" alt="Grid 3" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* Outro */}
      <section className="aww-section outro-section margin-top-massive">
        <div className="aww-image-wrapper aww-clip-reveal full-bleed half-height">
          <img className="aww-image" src="/about/ultra_14.webp" alt="Conclusion" loading="lazy" decoding="async" />
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
