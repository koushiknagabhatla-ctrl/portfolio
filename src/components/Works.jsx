import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css';

import img1 from '../assets/projects/project1.png';
import img2 from '../assets/projects/project2.png';
import img3 from '../assets/projects/project3.png';

gsap.registerPlugin(ScrollTrigger);

const worksList = [
  { 
    name: 'TRAVELWISE', 
    desc: 'Flight Booking & Tracking',
    image: img1,
    url: 'https://travelwise-theta.vercel.app/' 
  },
  { 
    name: 'PIXEL FORGE', 
    desc: 'AI Image Editing',
    image: img2,
    url: 'https://pixelforge-ai-six.vercel.app/' 
  },
  { 
    name: 'SK JALRAKSHAK', 
    desc: 'Water Conservation',
    image: img3,
    url: 'https://www.skjal.in/' 
  }
];

const Works = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      rowsRef.current.forEach((row) => {
        if (!row) return;

        gsap.fromTo(row,
          { y: 100, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        const title = row.querySelector('.work-title');
        if (title) {
          gsap.fromTo(title,
            { y: 60, skewY: 5, opacity: 0 },
            {
              y: 0, skewY: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2,
              scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="works" className="works-section" ref={sectionRef} aria-label="Projects">
      <div className="works-header" ref={headerRef}>
        <h2>PROJECTS I HAVE DONE</h2>
      </div>
      
      <div className="works-list" role="list">
        {worksList.map((work, index) => (
          <a 
            key={index} 
            href={work.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="work-row"
            role="listitem"
            ref={el => rowsRef.current[index] = el}
            aria-label={`View project: ${work.name} — ${work.desc}`}
          >
            <div className="work-num" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </div>
            
            <h3 className="work-title">{work.name}</h3>
            
            <div className="work-type">{work.desc}</div>
            
            <div className="work-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
                <line x1="5" y1="19" x2="19" y2="5"></line>
                <polyline points="9 5 19 5 19 15"></polyline>
              </svg>
            </div>

            <img src={work.image} alt="" className="work-image" loading="lazy" decoding="async" width="500" height="350" aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Works;
