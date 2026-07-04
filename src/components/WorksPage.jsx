import './WorksPage.css';

import img1 from '../assets/projects/project1.webp';
import img2 from '../assets/projects/project2.webp';
import img3 from '../assets/projects/project3.webp';

const projects = [
  {
    id: '01',
    name: 'TRAVELWISE',
    category: 'FLIGHT BOOKING PLATFORM',
    desc: 'Full-stack Indian flight booking platform featuring real-time flight tracking, live fare comparison, and Supabase authentication. Engineered with React, FastAPI, and Supabase.',
    stack: 'React · FastAPI · Supabase',
    role: 'Design & Development',
    image: img1,
    imageWidth: 1200,
    imageHeight: 597,
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
    imageWidth: 1200,
    imageHeight: 603,
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
    imageWidth: 1200,
    imageHeight: 597,
    url: 'https://www.skjal.in/'
  }
];

const WorksPage = () => {
  return (
    <section id="works" className="awwwards-master-container">
      <div className="awwwards-header">
        <h2 className="header-title">SELECTED WORKS</h2>
        <p className="header-subtitle">A curated collection of digital platforms &amp; engineering achievements.</p>
      </div>

      <div className="awwwards-projects-list" role="list">
        {projects.map((project) => (
          <article className="work-item" key={project.id} role="listitem">
            <div className="work-item__info">
              <span className="work-item__category">{project.id} // {project.category}</span>
              <h3 className="work-item__title">{project.name}</h3>
              <p className="work-item__desc">{project.desc}</p>

              <div className="work-item__detail">
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
                className="work-item__link"
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
              <img src={project.image} alt={`${project.name} — ${project.category}`} loading="lazy" decoding="async" width={project.imageWidth} height={project.imageHeight} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorksPage;
