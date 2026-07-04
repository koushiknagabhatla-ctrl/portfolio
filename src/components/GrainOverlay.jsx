import { useEffect, useRef } from 'react';
import './GrainOverlay.css';

// Animated film-grain overlay: a persistent noise field where a fraction of
// pixels churn to a new random alpha each frame, drawn via an offscreen buffer.
const GrainOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const buffer = document.createElement('canvas');
    const bufferCtx = buffer.getContext('2d');

    const isDesktop = window.innerWidth >= 1024;
    const intensity = isDesktop ? 0.1 : 0.07;
    const frameInterval = isDesktop ? 10 : 40;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let imageData;
    let pixels;
    let rafId = null;
    let lastFrameTime = 0;
    let resizeTimer;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buffer.width = canvas.width;
      buffer.height = canvas.height;
      imageData = bufferCtx.createImageData(buffer.width, buffer.height);
      pixels = imageData.data;
    };

    const paint = () => {
      bufferCtx.putImageData(imageData, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(buffer, 0, 0);
    };

    const churn = (fraction) => {
      const totalPixels = pixels.length / 4;
      const count = Math.floor(totalPixels * fraction);
      for (let i = 0; i < count; i++) {
        const offset = Math.floor(Math.random() * totalPixels) * 4;
        pixels[offset + 3] = Math.random() * 255 * intensity;
      }
    };

    const drawStaticFrame = () => {
      churn(1);
      paint();
    };

    const render = (time) => {
      rafId = requestAnimationFrame(render);
      if (time - lastFrameTime < frameInterval) return;
      lastFrameTime = time;
      churn(0.02);
      paint();
    };

    const start = () => {
      if (prefersReducedMotion) {
        drawStaticFrame();
      } else {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        setSize();
        start();
      }, 150);
    };

    setSize();
    start();
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="grain-overlay" aria-hidden="true" />;
};

export default GrainOverlay;
