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
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => (
  <>
    <Hero />
    <WorksPage />
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

  const isPhotographyPage = normalizedPath.startsWith('/photography');

  useEffect(() => {
    if (isPhotographyPage) {
      document.body.style.backgroundColor = '#000000';
      document.documentElement.style.backgroundColor = '#000000';
      document.body.classList.add('no-grain');
    } else {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
      document.body.classList.remove('no-grain');
    }
  }, [isPhotographyPage]);

  if (isDirtyUrl) {
    return null;
  }

  // Task 1 & 3: Footer is removed from About and Photography pages. It ONLY displays on the Home page.
  const showFooter = normalizedPath === '/';

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
      <Navbar />
      <main id="main-content" style={{ backgroundColor: isPhotographyPage ? '#000000' : undefined, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/works" element={<Navigate to="/" replace />} />
          <Route path="/photography" element={<PhotographyDirectory />} />
          <Route path="/photography/:category" element={<Photography />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
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
