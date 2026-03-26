import { useEffect, useRef } from 'react';
import { useScrollProgress } from '../../hooks/usePortfolio';

/**
 * Custom animated cursor component
 * Tracks mouse position with smooth lag effect
 */
const Cursor = () => {
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (dotRef.current) { 
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top = `${pos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', moveCursor);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
};

/**
 * Scroll progress indicator bar
 */
export const ScrollProgress = () => {
  const progress = useScrollProgress();
  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress * 100}%` }}
      aria-hidden="true"
    />
  );
};

/**
 * Mouse follow light effect
 */
export const MouseLight = () => {
  const lightRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (lightRef.current) {
        lightRef.current.style.left = `${e.clientX}px`;
        lightRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={lightRef} className="mouse-light" aria-hidden="true" />;
};

export default Cursor;
