import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import './WorksPage.css';

import img1 from '../assets/projects/project1.png';
import img2 from '../assets/projects/project2.png';
import img3 from '../assets/projects/project3.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: '01',
    name: 'TRAVELWISE', 
    category: 'FLIGHT TRACKING',
    desc: 'India\'s smart flight booking platform. Compare prices across airlines in real-time, track flights with AviationStack, and book securely with Supabase.',
    image: img1,
    url: 'https://travelwise-theta.vercel.app/' 
  },
  { 
    id: '02',
    name: 'PIXEL FORGE', 
    category: 'AI STUDIO',
    desc: 'An AI-powered creative studio designed for next-generation image generation and high-fidelity image enhancement.',
    image: img2,
    url: 'https://pixelforge-ai-six.vercel.app/' 
  },
  { 
    id: '03',
    name: 'SK JALRAKSHAK', 
    category: 'INDUSTRIAL IOT',
    desc: 'A revolutionary IoT-based intelligence grid providing AI-driven energy monitoring, water quality telemetry, and autonomous edge devices.',
    image: img3,
    url: 'https://www.skjal.in/' 
  }
];

const WorksPage = () => {
  const containerRef = useRef(null);

  // 1. Lenis Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => { lenis.raf(time * 1000) });
    };
  }, []);

  // 2. Cinematic GSAP Parallax & Reveals
  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.awwwards-item');

      items.forEach((item, i) => {
        const imageWrapper = item.querySelector('.awwwards-img-wrapper');
        const image = item.querySelector('.awwwards-img');

        // Cinematic Image Reveal (Clip Path)
        gsap.fromTo(imageWrapper, 
          { clipPath: "inset(0% 100% 0% 0%)" },
          { 
            clipPath: "inset(0% 0% 0% 0%)", 
            ease: "power4.inOut", 
            duration: 1.5,
            scrollTrigger: {
              trigger: item,
              start: "top 80%", 
            }
          }
        );

        // Subtle container parallax (Move the whole box, don't crop the image inside)
        gsap.fromTo(imageWrapper,
          { y: 50 },
          { 
            y: -50, 
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
        
        // Text fade in gracefully
        const textElements = item.querySelectorAll('.info-reveal');
        gsap.fromTo(textElements,
          { opacity: 0, y: 30 },
          {
             opacity: 1,
             y: 0,
             duration: 1,
             stagger: 0.15,
             ease: "power3.out",
             scrollTrigger: {
               trigger: item,
               start: "top 85%",
             }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="awwwards-master-container" ref={containerRef}>
      
      <div className="awwwards-header">
        <h1 className="header-title">SELECTED WORKS</h1>
        <p className="header-subtitle">A collection of cinematic interactive experiences.</p>
      </div>

      <div className="awwwards-projects-list">
        {projects.map((project, idx) => {
          return (
            <div className="awwwards-item" key={idx}>
              
              <div className="awwwards-layout">
                
                {/* Clean, Readable Typography Section - Full Width on Top */}
                <div className="awwwards-info">
                  <div className="info-top-row">
                    <span className="project-category info-reveal">{project.id} // {project.category}</span>
                    <h2 className="awwwards-title info-reveal">{project.name}</h2>
                  </div>
                  
                  <div className="info-bottom-row">
                    <p className="project-desc info-reveal">{project.desc}</p>
                    <div className="btn-wrapper info-reveal">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="view-btn">
                        VIEW PROJECT
                      </a>
                    </div>
                  </div>
                </div>

                {/* Parallax Image Section - 16:9 Aspect Ratio to prevent cropping */}
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="awwwards-img-wrapper"
                >
                  <img src={project.image} alt={project.name} className="awwwards-img" />
                  <div className="awwwards-img-overlay"></div>
                </a>

              </div>

            </div>
          );
        })}
      </div>

      <div className="awwwards-footer">
        <h2>MORE TO COME.</h2>
      </div>

    </div>
  );
};

export default WorksPage;
