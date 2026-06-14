import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Photography.css';
import photoDatabase from './photoDatabase.json';

gsap.registerPlugin(ScrollTrigger);

const Photography = () => {
  const { category } = useParams();
  const activeCategory = category || 'all';
  
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const titleRef = useRef(null);

  // Filter images based on the photoDatabase
  let filteredImages = [];
  if (activeCategory === 'all') {
    filteredImages = [
      ...(photoDatabase.people || []),
      ...(photoDatabase.bikes || []),
      ...(photoDatabase.nature || [])
    ];
  } else {
    filteredImages = photoDatabase[activeCategory] || [];
  }

  const leftColumn = filteredImages.filter((_, i) => i % 2 === 0);
  const rightColumn = filteredImages.filter((_, i) => i % 2 !== 0);

  // Title Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      const titleChars = titleRef.current.querySelectorAll('.char-reveal');
      if(titleChars.length) {
        gsap.fromTo(titleChars,
          { y: 50, rotateX: -90, opacity: 0 },
          {
            y: 0, rotateX: 0, opacity: 1,
            duration: 1, stagger: 0.03, ease: 'power4.out',
            delay: 0.2
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [activeCategory]); 

  // Image Reveals
  useEffect(() => {
    imagesRef.current = imagesRef.current.slice(0, filteredImages.length); 
    
    let ctx = gsap.context(() => {
      imagesRef.current.forEach((img, idx) => {
        if (!img) return;
        
        // Ensure initial state is set
        gsap.set(img, { opacity: 0, y: 80 });

        gsap.to(img, {
          y: 0, 
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 95%', // Triggers slightly before it enters screen
            toggleActions: 'play none none none'
          }
        });
      });
    }, containerRef);
    
    // Refresh ScrollTrigger to recalculate bounds once DOM renders
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    
    return () => {
      ctx.revert();
      window.removeEventListener('load', handleLoad);
    };
  }, [activeCategory, filteredImages.length]);

  return (
    <section id="photography-gallery" className="section photography-section" ref={containerRef}>
      <div className="container">
        
        <Link to="/photography" className="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Directory
        </Link>

        <h2 className="section-title text-dark" ref={titleRef} style={{ perspective: '600px', marginTop: '30px' }}>
          {activeCategory.toUpperCase().split('').map((char, cIndex) => (
            <span
              key={cIndex}
              className="char-reveal"
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
        </h2>

        <div className="masonry-flex">
          <div className="masonry-col">
            {leftColumn.map((srcPath, index) => {
              const globalIndex = index * 2;
              return (
                <div 
                  key={`left-${index}`} 
                  className="masonry-item"
                  ref={el => imagesRef.current[globalIndex] = el}
                  style={{ opacity: 0, transform: 'translateY(80px)' }} // Default CSS state to prevent flash before GSAP kicks in
                >
                  <img 
                    src={srcPath} 
                    alt={`Photography ${activeCategory}`}
                    loading={globalIndex < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>
          <div className="masonry-col">
            {rightColumn.map((srcPath, index) => {
              const globalIndex = index * 2 + 1;
              return (
                <div 
                  key={`right-${index}`} 
                  className="masonry-item"
                  ref={el => imagesRef.current[globalIndex] = el}
                  style={{ opacity: 0, transform: 'translateY(80px)' }} // Default CSS state to prevent flash before GSAP kicks in
                >
                  <img 
                    src={srcPath} 
                    alt={`Photography ${activeCategory}`}
                    loading={globalIndex < 4 ? 'eager' : 'lazy'}
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
