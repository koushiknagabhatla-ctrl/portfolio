import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorksPage from './components/WorksPage';
import AboutPage from './components/AboutPage';
import Photography from './components/Photography';
import PhotographyDirectory from './components/PhotographyDirectory';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Preloader from './components/Preloader';
import GrainOverlay from './components/GrainOverlay';
import PageTransition from './components/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const Home = () => (
  <>
    <Hero />
    <WorksPage />
  </>
);

const WebDev = () => (
  <>
    <Hero variant="webdev" />
    <WorksPage variant="webdev" />
  </>
);

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const lenisRef = useRef(null);

  const cleanedPath = location.pathname.replace(/[^a-zA-Z0-9/\-_]/g, '');
  const normalizedPath = cleanedPath === '/' ? '/' : cleanedPath.replace(/\/+$/, '');
  const isDirtyUrl = normalizedPath !== location.pathname;

  useEffect(() => {
    if (isDirtyUrl) {
      navigate(normalizedPath, { replace: true });
    }
  }, [isDirtyUrl, normalizedPath, navigate]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    const refreshTimer = setTimeout(() => {
      if (!document.documentElement.classList.contains('page-transitioning')) {
        ScrollTrigger.refresh();
      }
    }, 100);
    return () => clearTimeout(refreshTimer);
  }, [location.pathname]);

  const isPhotographyPage = normalizedPath.startsWith('/photography');
  const isAboutPage = normalizedPath.startsWith('/about');

  useEffect(() => {
    if (isPhotographyPage) {
      document.body.style.backgroundColor = '#000000';
      document.documentElement.style.backgroundColor = '#000000';
    } else {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    }
  }, [isPhotographyPage]);

  if (isDirtyUrl) {
    return null;
  }

  return (
    <div className="app" style={{ backgroundColor: isPhotographyPage ? '#000000' : undefined, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {loading && (
        <Preloader
          onComplete={() => {
            setLoading(false);
            setTimeout(() => ScrollTrigger.refresh(), 100);
          }}
        />
      )}
      <a href="#main-content" className="skip-link">Skip to content</a>
      {!isPhotographyPage && !isAboutPage && <GrainOverlay />}
      <Navbar />
      <PageTransition location={location} lenisRef={lenisRef}>
        {(displayedLocation) => {
          const displayedIsPhotography = displayedLocation.pathname.startsWith('/photography');
          return (
            <>
              <main id="main-content" style={{ backgroundColor: displayedIsPhotography ? '#000000' : undefined, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Routes location={displayedLocation}>
                  <Route path="/" element={<Home />} />
                  <Route path="/web-dev" element={<WebDev />} />
                  <Route path="/programming" element={<Navigate to="/web-dev" replace />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/works" element={<Navigate to="/" replace />} />
                  <Route path="/photography" element={<PhotographyDirectory />} />
                  <Route path="/photography/:category" element={<Photography />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              {(displayedLocation.pathname === '/' || displayedLocation.pathname === '/web-dev') && <Footer />}
            </>
          );
        }}
      </PageTransition>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
