import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const lenisRef = useRef(null);

  // --- URL Sanitization: strip special characters before Routes processes them ---
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
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
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
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [location.pathname]);

  // If URL contains special characters, render nothing while redirect happens.
  // This prevents the footer flash entirely — no content is painted with the dirty URL.
  if (isDirtyUrl) {
    return null;
  }

  const isKnownRoute = ['/', '/about', '/works', '/photography'].includes(normalizedPath)
    || /^\/photography\/(all|people|bikes|nature)$/.test(normalizedPath);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/photography" element={<PhotographyDirectory />} />
          <Route path="/photography/:category" element={<Photography />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {isKnownRoute && <Footer />}
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
