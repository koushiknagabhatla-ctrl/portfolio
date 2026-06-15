import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './PhotographyDirectory.css';

const categories = [
  { id: 'all', label: 'All Archive' },
  { id: 'people', label: 'People & Faces' },
  { id: 'bikes', label: 'Bikes & Rides' },
  { id: 'nature', label: 'Nature & Landscapes' },
];

const PhotographyDirectory = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.directory-header', 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      
      gsap.fromTo('.directory-list-item',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="photography-directory" ref={containerRef}>
      <div className="directory-header">
        <h1 className="directory-title">My Photography</h1>
        <p className="directory-subtitle">Gear → Sony A6600, 50mm 1.8 OSS Lens</p>
      </div>
      
      <nav className="directory-list-container" aria-label="Photography categories">
        <ul className="directory-list" role="list">
          {categories.map((cat) => (
            <li key={cat.id} className="directory-list-item" role="listitem">
              <Link to={`/photography/${cat.id}`} className="directory-link" aria-label={`View ${cat.label} photography`}>
                <span className="directory-link-text">
                  {cat.label}
                  <svg className="directory-arrow" width="0.45em" height="0.45em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
                <div className="hover-box" aria-hidden="true"></div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PhotographyDirectory;
