import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Photography.css';
import photoDatabase from './photoDatabase.json';
import natureAudio from '../assets/solace.mp3';

gsap.registerPlugin(ScrollTrigger);

const Photography = () => {
  const { category } = useParams();
  const activeCategory = category || 'all';
  
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (activeCategory === 'nature' && audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(e => console.warn("Audio autoplay blocked by browser:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [activeCategory]);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current.querySelectorAll('.char-reveal');
      if (titleChars.length) {
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

  return (
    <section id="photography-gallery" className="section photography-section" ref={containerRef} aria-label={`${activeCategory} photography gallery`}>
      <audio ref={audioRef} src={natureAudio} loop preload="auto" />
      <div className="container">
        
        <Link to="/photography" className="back-btn" aria-label="Back to photography directory">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Directory
        </Link>

        <h1 className="section-title text-dark" ref={titleRef} style={{ perspective: '600px', marginTop: '30px' }}>
          {activeCategory.toUpperCase().split('').map((char, cIndex) => (
            <span
              key={cIndex}
              className="char-reveal"
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
        </h1>

        <div className="masonry-flex" role="list" aria-label="Photography grid">
          <div className="masonry-col">
            {leftColumn.map((srcPath, index) => {
              const globalIndex = index * 2;
              return (
                <div 
                  key={`left-${index}`} 
                  className="masonry-item"
                  role="listitem"
                >
                  <img 
                    src={srcPath} 
                    alt={`${activeCategory} photograph ${globalIndex + 1}`}
                    loading={globalIndex < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    width="800"
                    height="1000"
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
                  role="listitem"
                >
                  <img 
                    src={srcPath} 
                    alt={`${activeCategory} photograph ${globalIndex + 1}`}
                    loading={globalIndex < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    width="800"
                    height="1000"
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
