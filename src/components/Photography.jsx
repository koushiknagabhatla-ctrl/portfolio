import { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './Photography.css';
import './Skiper.css';
import photoDatabase from '../data/photoDatabase.json';
import natureAudio from '../assets/solace.mp3';
import { IMG_V } from '../imgVersion.js';

const VALID_CATEGORIES = new Set(['all', 'people', 'bikes', 'nature']);

const srcSetFor = (src) =>
  `${src}${IMG_V} 800w, ${src.replace(/\/([^/]+)$/, '/2x/$1')}${IMG_V} 1200w`;

const GRID_SIZES = '(max-width: 768px) calc(100vw - 32px), 390px';

const ProgressiveImage = ({ src, alt, width, height, isEager }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);
  const srcSet = srcSetFor(src);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <>
      {isEager && (
        <link rel="preload" as="image" href={src + IMG_V} imageSrcSet={srcSet} imageSizes={GRID_SIZES} fetchPriority="high" />
      )}
      <img
        ref={imgRef}
        src={src + IMG_V}
        srcSet={srcSet}
        sizes={GRID_SIZES}
        alt={alt}
        width={width}
        height={height}
        loading={isEager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={isEager ? 'high' : 'auto'}
        className={isLoaded ? 'loaded' : ''}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </>
  );
};

const Photography = () => {
  const { category } = useParams();
  const activeCategory = category || 'all';
  const isValidCategory = VALID_CATEGORIES.has(activeCategory);
  
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [expandedState, setExpandedState] = useState('closed');
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [prevCategory, setPrevCategory] = useState(activeCategory);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);

  if (activeCategory !== prevCategory) {
    setPrevCategory(activeCategory);
    if (activeCategory !== 'nature') {
      setIsPlaying(false);
      setHasStarted(false);
      setExpandedState('closed');
    }
  }

  useEffect(() => {
    if (activeCategory !== 'nature' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [activeCategory]);

  useEffect(() => {
    const handleViewportChange = () => {
      if (window.visualViewport) {
        document.documentElement.style.setProperty('--vvp-height', `${window.visualViewport.height}px`);
      }
    };
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      handleViewportChange();
    }
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
    };
  }, []);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const current = audio.currentTime;
      const total = audio.duration;
      setCurrentTime(current);
      setDuration(total);
      if (total) {
        setProgress((current / total) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      setExpandedState('closed');
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (activeCategory === 'nature' && audioRef.current) {
      audioRef.current.volume = 1.0;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
    
    const currentAudio = audioRef.current;
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [isPlaying, activeCategory]);

  const filteredImages = activeCategory === 'all'
    ? [
        ...(photoDatabase.people || []),
        ...(photoDatabase.bikes || []),
        ...(photoDatabase.nature || [])
      ]
    : photoDatabase[activeCategory] || [];

  const columns = [[], [], []];
  const columnHeights = [0, 0, 0];
  filteredImages.forEach((image, index) => {
    let shortest = 0;
    if (columnHeights[1] < columnHeights[shortest]) shortest = 1;
    if (columnHeights[2] < columnHeights[shortest]) shortest = 2;
    columns[shortest].push({ ...image, index });
    columnHeights[shortest] += image.height / image.width;
  });

  const handleIslandClick = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsPlaying(true);
      setExpandedState('pinned');
      
      setTimeout(() => {
        setExpandedState(current => current === 'pinned' ? 'closed' : current);
      }, 2000);
      
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    } else {
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
    if (expandedState === 'hover') {
      setExpandedState('closed');
    }
  };

  const handlePlayPause = (e) => {
    e.stopPropagation();
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
    if (!audioRef.current || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  const handleTouchStart = (e) => {
    if (expandedState === 'pinned') {
      touchStartY.current = e.touches[0].clientY;
      touchCurrentY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (expandedState === 'pinned') {
      touchCurrentY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = () => {
    if (expandedState === 'pinned') {
      const deltaY = touchCurrentY.current - touchStartY.current;
      if (deltaY > 80) {
        setExpandedState('closed');
      }
    }
  };

  let islandState = 'prompt';
  if (hasStarted) {
    if (expandedState !== 'closed') {
      islandState = 'expanded';
    } else {
      islandState = 'collapsed';
    }
  }

  if (!isValidCategory) {
    return <Navigate to="/photography" replace />;
  }

  return (
    <section id="photography-gallery" className="section photography-section" ref={containerRef} aria-label={`${activeCategory} photography gallery`}>
      <audio ref={audioRef} src={natureAudio} preload="none" />
      
      {activeCategory === 'nature' && (
        <div
          className={`skiper-island ${islandState}`}
          onClick={handleIslandClick}
          onMouseEnter={handleIslandMouseEnter}
          onMouseLeave={handleIslandMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Media Player"
        >
          <div className="sk-prompt">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
            <span>Enable audio for a masterpiece experience</span>
          </div>

          <div className="sk-collapsed">
            <div className={`sk-collapsed-art ${!isPlaying ? 'paused' : ''}`}>
              <img src={filteredImages[0]?.src + IMG_V} alt="Playing" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
            </div>
          </div>
          
          <div className="sk-expanded">
            <div className="sk-art">
              <img src={filteredImages[0]?.src + IMG_V} alt="Album Art" className={isPlaying ? 'spinning' : ''} />
            </div>
            
            <div className="sk-details">
              <div className="sk-text">
                <span className="sk-title">Solace</span>
                <span className="sk-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
              <div 
                className="sk-progress" 
                onClick={handleProgressClick}
                onTouchStart={handleProgressClick}
                onTouchMove={handleProgressClick}
              >
                <div className="sk-progress-fill" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
              </div>
            </div>

            <div className="sk-controls">
              <button className="sk-btn" onClick={handlePrevious} aria-label="Restart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
              </button>
              <button className="sk-btn sk-play" onClick={handlePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <button className="sk-btn" onClick={(e) => { e.stopPropagation(); }} aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <Link to="/photography" className="back-btn" aria-label="Back to photography directory">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Directory
        </Link>

        <h1 className="section-title text-dark" style={{ marginTop: '30px' }}>
          {activeCategory.toUpperCase()}
        </h1>

        <div className="masonry-flex" role="list" aria-label="Photography grid">
          {columns.map((column, colIndex) => (
            <div className="masonry-col" key={colIndex}>
              {column.map((image) => (
                <div key={image.src} className="masonry-item" role="listitem">
                  <ProgressiveImage
                    src={image.src}
                    alt={`${activeCategory} photograph ${image.index + 1}`}
                    width={image.width}
                    height={image.height}
                    isEager={image.index < 6}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Photography;
