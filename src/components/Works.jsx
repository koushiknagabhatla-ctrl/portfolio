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
    let ctx = gsap.context(() => {
      // Header reveal
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

      // Rows stagger reveal
      rowsRef.current.forEach((row, index) => {
        if (!row) return;

        // Animate the row container (slide up and fade)
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

        // Animate the title text inside the row with a slight skew/clip reveal
        const title = row.querySelector('.work-title');
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
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="works" className="works-section" ref={sectionRef}>
      <div className="works-header" ref={headerRef}>
        <h2>PROJECTS I HAVE DONE</h2>
      </div>
      
      <div className="works-list">
        {worksList.map((work, index) => (
          <a 
            key={index} 
            href={work.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="work-row"
            ref={el => rowsRef.current[index] = el}
          >
            <div className="work-num">
              {String(index + 1).padStart(2, '0')}
            </div>
            
            <h3 className="work-title">{work.name}</h3>
            
            <div className="work-type">{work.desc}</div>
            
            <div className="work-arrow">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
                <line x1="5" y1="19" x2="19" y2="5"></line>
                <polyline points="9 5 19 5 19 15"></polyline>
              </svg>
            </div>

            {/* Floating Image Reveal */}
            <img src={work.image} alt={work.name} className="work-image" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Works;
