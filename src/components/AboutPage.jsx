import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutPage.css';
import { IMG_V } from '../imgVersion.js';

gsap.registerPlugin(ScrollTrigger);

import heroBg from '../assets/about-hero.webp';
import outroBg from '../assets/about-outro.webp';

const AboutPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imageWrappers = gsap.utils.toArray('.aww-image-wrapper');
      imageWrappers.forEach(wrapper => {
        const img = wrapper.querySelector('.aww-image');
        if (!img) return;

        if (wrapper.closest('.hero-section')) {
          gsap.fromTo(img,
            { yPercent: 0 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: "bottom top",
                scrub: true
              }
            }
          );
          return;
        }

        gsap.fromTo(img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="aww-master-container" ref={containerRef}>
      
      <section className="aww-section hero-section" aria-label="About hero">
        <div className="aww-image-wrapper full-bleed">
          <img className="aww-image" src={heroBg} alt="Koushik Nagabhatla — Beyond the Code" loading="eager" decoding="async" fetchPriority="high" width="1920" height="1080" />
          <div className="aww-hero-gradient"></div>
        </div>
        <h1 className="aww-massive-title mix-blend">Beyond<br/>the Code.</h1>
        <div className="kaisei-scroll aww-hero-scroll" aria-label="Scroll">
          <span className="kaisei-scroll__text">Scroll</span>
          <span className="kaisei-scroll__text kaisei-scroll__text--clone" aria-hidden="true">Scroll</span>
        </div>
      </section>

      <section className="aww-section text-section" aria-label="About introduction">
        <div className="aww-grid">
          <div className="aww-col empty-col"></div>
          <div className="aww-col text-col">
            <p className="aww-poetic">
              Most days, you'll find me behind a screen. 
            </p>
            <p className="aww-poetic">
              Designing networks. Tracing packets. Building topologies from absolute scratch, then attacking them to find out what actually holds. I love the silence of the process, the architecture of thought. It's a world where absolute chaos is engineered into perfect order.
            </p>
          </div>
        </div>
      </section>

      <section className="aww-section gallery-section" aria-label="Portrait gallery">
        <div className="aww-grid-triple">
          <div className="aww-image-wrapper portrait-thin">
            <img className="aww-image" src={`/about/ultra_2.webp${IMG_V}`} srcSet={`/about/ultra_2.webp${IMG_V} 800w, /about/2x/ultra_2.webp${IMG_V} 1600w`} sizes="(max-width: 900px) 100vw, 30vw" alt="Portrait photograph 1" loading="lazy" decoding="async" width="800" height="1067" />
          </div>
          <div className="aww-image-wrapper portrait shift-down-slight">
            <img className="aww-image" src={`/about/ultra_3.webp${IMG_V}`} srcSet={`/about/ultra_3.webp${IMG_V} 800w, /about/2x/ultra_3.webp${IMG_V} 1600w`} sizes="(max-width: 900px) 100vw, 30vw" alt="Portrait photograph 2" loading="lazy" decoding="async" width="800" height="1000" />
          </div>
          <div className="aww-image-wrapper portrait-thin shift-down-heavy">
            <img className="aww-image" src={`/about/ultra_4.webp${IMG_V}`} srcSet={`/about/ultra_4.webp${IMG_V} 800w, /about/2x/ultra_4.webp${IMG_V} 1600w`} sizes="(max-width: 900px) 100vw, 30vw" alt="Portrait photograph 3" loading="lazy" decoding="async" width="800" height="1067" />
          </div>
        </div>
      </section>

      <section className="aww-section offset-image-section margin-top-massive" aria-label="The road and riding">
        <div className="aww-grid reverse">
          <div className="aww-col img-col">
            <div className="aww-image-wrapper portrait">
              <img className="aww-image" src={`/about/ultra_5.webp${IMG_V}`} srcSet={`/about/ultra_5.webp${IMG_V} 800w, /about/2x/ultra_5.webp${IMG_V} 1600w`} sizes="(max-width: 900px) 100vw, 45vw" alt="The open highway" loading="lazy" decoding="async" width="800" height="1000" />
            </div>

          </div>
          <div className="aww-col text-col middle-align">
            <p className="aww-poetic">
              But the moment I close my laptop, I need the exact opposite. 
            </p>
            <p className="aww-poetic">
              I need the roar of a bike engine. I need the cold wind hitting my chest. I need the absolute, undeniable freedom of the open road, where the only algorithm is the throttle and the horizon.
            </p>
          </div>
        </div>
      </section>

      <section className="aww-section full-bleed-section" aria-label="Cinematic landscape">
        <div className="aww-image-wrapper full-bleed cinematic-height">
          <img className="aww-image" src={`/about/ultra_6.webp${IMG_V}`} srcSet={`/about/ultra_6.webp${IMG_V} 800w, /about/2x/ultra_6.webp${IMG_V} 1600w`} sizes="100vw" alt="Bike ride perspective" loading="lazy" decoding="async" width="1920" height="900" />
        </div>
        <h2 className="aww-massive-title centered mix-blend">The Horizon.</h2>
      </section>

      <section className="aww-section text-section margin-top-massive" aria-label="Photography and travel">
        <div className="aww-grid">
          <div className="aww-col text-col">
            <p className="aww-poetic">
              I love to travel because it strips away the noise. It reminds me that the world is massive, chaotic, and unimaginably beautiful.
            </p>
            <p className="aww-poetic">
              Photography isn't just a hobby for me. It's how I freeze those fleeting seconds. It's how I remember the places, the light, and the shadows that made me feel alive.
            </p>
          </div>
          <div className="aww-col img-col shift-down">
             <div className="aww-image-wrapper landscape">
               <img className="aww-image" src={`/about/ultra_7.webp${IMG_V}`} srcSet={`/about/ultra_7.webp${IMG_V} 800w, /about/2x/ultra_7.webp${IMG_V} 1600w`} sizes="(max-width: 900px) 100vw, 45vw" alt="Travel landscape" loading="lazy" decoding="async" width="1200" height="750" />
             </div>
          </div>
        </div>
      </section>

      <section className="aww-section dual-panoramic" aria-label="Nature panoramic photos">
        <div className="aww-image-wrapper panoramic right-align">
          <img className="aww-image" src={`/about/ultra_8.webp${IMG_V}`} srcSet={`/about/ultra_8.webp${IMG_V} 800w, /about/2x/ultra_8.webp${IMG_V} 1600w`} sizes="(max-width: 900px) 95vw, 85vw" alt="Raw wilderness panoramic" loading="lazy" decoding="async" width="1600" height="686" />
        </div>

        <div className="aww-image-wrapper panoramic left-align shift-down-medium">
          <img className="aww-image" src={`/about/ultra_9.webp${IMG_V}`} srcSet={`/about/ultra_9.webp${IMG_V} 800w, /about/2x/ultra_9.webp${IMG_V} 1600w`} sizes="(max-width: 900px) 95vw, 85vw" alt="Scale and perspective" loading="lazy" decoding="async" width="1600" height="686" />
        </div>

      </section>

      <section className="aww-section overlap-section margin-top-massive" aria-label="Statue photograph">
        <div className="aww-overlap-grid">
          <div className="aww-image-wrapper square statue-solo">
            <img className="aww-image" src={`/about/ultra_10.webp${IMG_V}`} srcSet={`/about/ultra_10.webp${IMG_V} 800w, /about/2x/ultra_10.webp${IMG_V} 1600w`} sizes="(max-width: 900px) 100vw, 30vw" alt="Statue" loading="lazy" decoding="async" width="800" height="800" />
          </div>
        </div>
      </section>

      <section className="aww-section outro-section margin-top-massive" aria-label="Closing message">
        <div className="aww-image-wrapper full-bleed" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img className="aww-image" src={outroBg} alt="Conclusion — looking forward" loading="lazy" decoding="async" width="1920" height="1080" />
          <div className="aww-hero-gradient"></div>
          <h2 className="aww-massive-title centered mix-blend" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: '1.1', width: '90%', paddingBottom: '0.2em' }}>Let's build<br/>something beautiful.</h2>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
