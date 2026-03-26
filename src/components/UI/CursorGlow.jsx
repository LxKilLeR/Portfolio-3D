import { useEffect, useRef } from 'react';

/**
 * Decorative purple circle + dot that follows the mouse.
 * Separate from the existing Cursor component.
 * Uses mix-blend-mode: difference for colour-inversion.
 */
const CursorGlow = () => {
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      // Dot snaps instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top = `${mouse.current.y}px`;
      }
      // Circle trails with LERP 0.12
      circlePos.current.x += (mouse.current.x - circlePos.current.x) * 0.12;
      circlePos.current.y += (mouse.current.y - circlePos.current.y) * 0.12;
      if (circleRef.current) {
        circleRef.current.style.left = `${circlePos.current.x}px`;
        circleRef.current.style.top = `${circlePos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const isInteractive = (el) =>
      el.matches?.('a, button, input, textarea, select, [data-cursor-hover]') ||
      el.closest?.('a, button, input, textarea, select, [data-cursor-hover]') ||
      ['IMG', 'VIDEO', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LABEL'].includes(el.tagName);

    const onMouseOver = (e) => {
      if (isInteractive(e.target) && circleRef.current) {
        circleRef.current.style.width = '62px';
        circleRef.current.style.height = '62px';
      }
    };
    const onMouseOut = (e) => {
      if (isInteractive(e.target) && circleRef.current) {
        circleRef.current.style.width = '40px';
        circleRef.current.style.height = '40px';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const base = {
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    mixBlendMode: 'difference',
    zIndex: 9997,
  };

  return (
    <>
      <div ref={dotRef} aria-hidden="true" style={{ ...base, width: '6px', height: '6px', background: '#ffffff' }} />
      <div ref={circleRef} aria-hidden="true" style={{ ...base, width: '30px', height: '30px', background: '#ffffff', transition: 'width 0.25s ease, height 0.25s ease' }} />
    </>
  );
};

export default CursorGlow;
