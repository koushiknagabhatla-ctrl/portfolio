import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorksPage.css';

import img1 from '../assets/projects/project1.webp';
import img2 from '../assets/projects/project2.webp';
import img3 from '../assets/projects/project3.webp';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: '01',
    name: 'TRAVELWISE', 
    category: 'FLIGHT BOOKING PLATFORM',
    desc: 'Full-stack Indian flight booking platform featuring real-time flight tracking, live fare comparison, and Supabase authentication. Engineered with React, FastAPI, and Supabase.',
    image: img1,
    url: 'https://travelwisetheta.vercel.app/' 
  },
  { 
    id: '02',
    name: 'PIXEL FORGE AI', 
    category: 'AI IMAGE PLATFORM',
    desc: 'AI image engineering platform powered by React/Vite and a serverless FastAPI Python backend. Integrates the Google Gemini API for intelligent image processing and enhancement.',
    image: img2,
    url: 'https://pixelforgeaisix.vercel.app/' 
  },
  { 
    id: '03',
    name: 'SK JALRAKSHAK', 
    category: 'IIT DELHI INCUBATED STARTUP',
    desc: 'Corporate website independently engineered from scratch for an IIT Delhi-incubated IoT startup. Built complete UI/UX, domain & DNS configuration, Vercel deployment, and on-page SEO.',
    image: img3,
    url: 'https://www.skjal.in/' 
  }
];

const WorksPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.awwwards-item');

      items.forEach((item) => {
        const imageWrapper = item.querySelector('.awwwards-img-wrapper');
        const img = item.querySelector('.awwwards-img');

        // Outer wrapper subtle floating movement
        gsap.fromTo(imageWrapper,
          { y: 35 },
          { 
            y: -35, 
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );

        // Inner image deep multi-layer parallax
        if (img) {
          gsap.fromTo(img,
            { yPercent: -14, scale: 1.15 },
            {
              yPercent: 14,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
        
        const textElements = item.querySelectorAll('.info-reveal');
        gsap.fromTo(textElements,
          { opacity: 0, y: 30 },
          {
             opacity: 1,
             y: 0,
             duration: 1.1,
             stagger: 0.12,
             ease: "power3.out",
             scrollTrigger: {
               trigger: item,
               start: "top 85%",
               toggleActions: 'play none none reverse'
             }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="works" className="awwwards-master-container" ref={containerRef}>
      <div className="awwwards-header">
        <h2 className="header-title">SELECTED WORKS</h2>
        <p className="header-subtitle">A curated collection of digital platforms &amp; engineering achievements.</p>
      </div>

      <div className="awwwards-projects-list" role="list">
        {projects.map((project) => (
          <article className="awwwards-item" key={project.id} role="listitem">
            <div className="awwwards-layout">
              <div className="awwwards-info">
                <div className="info-top-row">
                  <span className="project-category info-reveal">{project.id} // {project.category}</span>
                  <h3 className="awwwards-title info-reveal">{project.name}</h3>
                </div>
                
                <div className="info-bottom-row">
                  <p className="project-desc info-reveal">{project.desc}</p>
                  <div className="btn-wrapper info-reveal">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="view-btn" aria-label={`View ${project.name} project`}>
                      EXPLORE PROJECT
                    </a>
                  </div>
                </div>
              </div>

              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="awwwards-img-wrapper"
                aria-label={`${project.name} live application`}
                tabIndex="-1"
              >
                <img src={project.image} alt={`${project.name} — ${project.category}`} className="awwwards-img" loading="lazy" decoding="async" width="1200" height="675" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorksPage;
