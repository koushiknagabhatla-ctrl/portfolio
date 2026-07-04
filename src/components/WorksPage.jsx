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
    stack: 'React · FastAPI · Supabase',
    role: 'Design & Development',
    image: img1,
    url: 'https://travelwisetheta.vercel.app/'
  },
  {
    id: '02',
    name: 'PIXEL FORGE AI',
    category: 'AI IMAGE PLATFORM',
    desc: 'AI image engineering platform powered by React/Vite and a serverless FastAPI Python backend. Integrates the Google Gemini API for intelligent image processing and enhancement.',
    stack: 'React · Vite · Gemini API',
    role: 'Design & Development',
    image: img2,
    url: 'https://pixelforgeaisix.vercel.app/'
  },
  {
    id: '03',
    name: 'SK JALRAKSHAK',
    category: 'IIT DELHI INCUBATED STARTUP',
    desc: 'Corporate website independently engineered from scratch for an IIT Delhi-incubated IoT startup. Built complete UI/UX, domain & DNS configuration, Vercel deployment, and on-page SEO.',
    stack: 'React · Vercel · SEO',
    role: 'Design & Development',
    image: img3,
    url: 'https://www.skjal.in/'
  }
];

const WorksPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.work-item');

      items.forEach((item) => {
        // Inner image parallax: img is 120% of its frame, slides up on scroll
        const img = item.querySelector('.work-item__img img');
        if (img) {
          gsap.fromTo(img,
            { yPercent: 0 },
            {
              yPercent: -16,
              ease: 'none',
              scrollTrigger: {
                trigger: item.querySelector('.work-item__img'),
                start: 'top bottom',
                end: 'bottom top',
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
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
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
          <article className="work-item" key={project.id} role="listitem">
            <div className="work-item__info">
              <span className="work-item__category info-reveal">{project.id} // {project.category}</span>
              <h3 className="work-item__title info-reveal">{project.name}</h3>
              <p className="work-item__desc info-reveal">{project.desc}</p>

              <div className="work-item__detail info-reveal">
                <div>
                  <span>Stack</span>
                  <p>{project.stack}</p>
                </div>
                <div>
                  <span>Role</span>
                  <p>{project.role}</p>
                </div>
              </div>

              <a
                className="work-item__link info-reveal"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Launch ${project.name} website`}
              >
                <span className="work-item__link-circle" aria-hidden="true">
                  <span className="work-item__link-dot"></span>
                </span>
                <span className="work-item__link-text">Launch Website</span>
              </a>
            </div>

            <a
              className="work-item__img"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live application`}
              tabIndex="-1"
            >
              <img src={project.image} alt={`${project.name} — ${project.category}`} loading="lazy" decoding="async" width="1200" height="675" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorksPage;
