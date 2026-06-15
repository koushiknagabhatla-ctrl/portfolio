import React, { useEffect, useRef, useState } from 'react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [expandedState, setExpandedState] = useState('closed'); // 'closed', 'initial', 'hover', 'pinned'
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);

  // Sync actual audio progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;
      const total = audio.duration;
      if (total) {
        setProgress((current / total) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setExpandedState('closed'); // Collapse when song ends
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Auto-minimize after 3 seconds only on initial play
  useEffect(() => {
    let timeout;
    if (expandedState === 'initial') {
      timeout = setTimeout(() => {
        setExpandedState('closed');
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [expandedState]);

  useEffect(() => {
    if (activeCategory !== 'nature') {
      setIsPlaying(false);
      setHasStarted(false);
      setExpandedState('closed');
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [activeCategory]);

  useEffect(() => {
    if (activeCategory === 'nature' && audioRef.current) {
      audioRef.current.volume = 1.0;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn("Audio play blocked by browser:", e));
      } else {
        audioRef.current.pause();
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying, activeCategory]);

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

  const handleIslandClick = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsPlaying(true);
      setExpandedState('initial'); // Auto expand when music starts
    } else {
      // Toggle pinned state
      if (expandedState === 'pinned') {
        setExpandedState('closed');
      } else {
        setExpandedState('pinned');
      }
    }
  };

  const handleIslandMouseEnter = () => {
    if (hasStarted && expandedState === 'closed') {
      setExpandedState('hover');
    }
  };

  const handleIslandMouseLeave = () => {
    setIsPressed(false);
    if (expandedState === 'hover') {
      setExpandedState('closed');
    }
  };

  const handlePlayPause = (e) => {
    e.stopPropagation(); // Don't collapse the island
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  const handleIslandInteractStart = () => setIsPressed(true);
  const handleIslandInteractEnd = () => setIsPressed(false);

  // Determine the island state class
  let islandState = 'prompt';
  if (hasStarted) {
    if (expandedState !== 'closed') {
      islandState = 'expanded';
    } else {
      islandState = 'minimized';
    }
  }

  return (
    <section id="photography-gallery" className="section photography-section" ref={containerRef} aria-label={`${activeCategory} photography gallery`}>
      <audio ref={audioRef} src={natureAudio} preload="auto" />
      
      {/* PERFECT DYNAMIC ISLAND */}
      {activeCategory === 'nature' && (
        <div 
          className={`ultimate-island ${islandState} ${isPressed ? 'pressed' : ''}`}
          onClick={handleIslandClick}
          onMouseEnter={handleIslandMouseEnter}
          onMouseLeave={handleIslandMouseLeave}
          onMouseDown={handleIslandInteractStart}
          onMouseUp={handleIslandInteractEnd}
          onTouchStart={handleIslandInteractStart}
          onTouchEnd={handleIslandInteractEnd}
          role="button"
          aria-label="Dynamic Island Media Controls"
        >
          {/* Ambient Lighting Layers */}
          <div className="island-ambient-glow"></div>
          <div className="island-background">
            <div className="island-gradient"></div>
            <div className="island-specular"></div>
          </div>
          
          {/* Content Wrapper */}
          <div className="island-content">
            
            {/* Prompt View */}
            <div className="island-view prompt-view">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
              <span>Enable audio for a masterpiece experience</span>
            </div>

            {/* Minimized View (Playing or Paused but Collapsed) */}
            <div className="minimized-view island-view">
              <div className="mini-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  {isPlaying ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/> /* Pause symbol when playing */
                  ) : (
                    <path d="M8 5v14l11-7z"/> /* Play symbol when paused */
                  )}
                </svg>
              </div>
              <div className="mini-art">
                {/* Album art spinning vinyl */}
                <img src={filteredImages[0]} alt="Album Art" />
              </div>
            </div>

            {/* Expanded View (Now Playing controls) */}
            <div className="island-view expanded-view">
              <div className="expanded-top">
                <div className="expanded-art">
                  <img src={filteredImages[0]} alt="Album Art" />
                </div>
                <div className="expanded-info">
                  <span className="expanded-title">Solace</span>
                  <span className="expanded-artist">Txmy</span>
                </div>
                <div className="expanded-controls">
                  <button className="control-btn" onClick={handlePrevious} aria-label="Restart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
                  </button>
                  <button className="control-btn play-pause-btn" onClick={handlePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? (
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    ) : (
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                  <button className="control-btn" onClick={(e) => { e.stopPropagation(); }} aria-label="Next">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
                  </button>
                </div>
              </div>
              <div className="expanded-bottom">
                <div className="progress-bar-container" onClick={handleProgressClick} style={{ cursor: 'pointer' }} title="Click to seek">
                  <div className="progress-bar-fill" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

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
