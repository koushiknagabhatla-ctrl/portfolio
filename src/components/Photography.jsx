import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Photography.css';

gsap.registerPlugin(ScrollTrigger);

// Dynamically import all images from the pfp directory
const images = import.meta.glob('../assets/pfp/*.{webp,jpg,jpeg,png,JPG}', { eager: true, import: 'default' });
const imageList = Object.values(images);

const Photography = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const titleRef = useRef(null);

  // Split into explicit columns to prevent CSS column reflow bugs
  const leftColumn = imageList.filter((_, i) => i % 2 === 0);
  const rightColumn = imageList.filter((_, i) => i % 2 !== 0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Title character reveal
      const titleChars = titleRef.current.querySelectorAll('.char-reveal');
      gsap.fromTo(titleChars,
        { y: 50, rotateX: -90, opacity: 0 },
        {
          y: 0, rotateX: 0, opacity: 1,
          duration: 1, stagger: 0.03, ease: 'power4.out',
          delay: 0.2
        }
      );

      // Photo reveals (Highly Optimized for 85+ Images)
      imagesRef.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(img,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 90%',
              toggleActions: 'play none none none' // Play once, don't reverse to save GPU
            }
          }
        );
      });
    }, containerRef);
    
    // Force refresh when window loads to fix any trigger shifts
    window.addEventListener('load', () => ScrollTrigger.refresh());
    
    return () => {
      ctx.revert();
      window.removeEventListener('load', () => ScrollTrigger.refresh());
    };
  }, []);

  const title = 'PHOTOGRAPHY';

  return (
    <section id="photography" className="section photography-section" ref={containerRef}>
      <div className="container">
        <h2 className="section-title text-dark" ref={titleRef} style={{ perspective: '600px' }}>
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
        <div className="masonry-flex">
          <div className="masonry-col">
            {leftColumn.map((src, index) => {
              const originalIndex = index * 2;
              return (
                <div 
                  key={originalIndex} 
                  className="masonry-item"
                  ref={el => imagesRef.current[originalIndex] = el}
                >
                  <img 
                    src={src} 
                    alt={`Photography ${originalIndex}`}
                    loading={originalIndex < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>
          <div className="masonry-col">
            {rightColumn.map((src, index) => {
              const originalIndex = index * 2 + 1;
              return (
                <div 
                  key={originalIndex} 
                  className="masonry-item"
                  ref={el => imagesRef.current[originalIndex] = el}
                >
                  <img 
                    src={src} 
                    alt={`Photography ${originalIndex}`}
                    loading={originalIndex < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Photography;
