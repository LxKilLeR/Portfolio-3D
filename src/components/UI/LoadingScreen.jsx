import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

/**
 * Loading screen with animated logo and progress bar
 */
const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete,
        });
      },
    });

    // Animate loading bar
    tl.to(barRef.current, {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
    });

    // Animate percentage
    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(obj.val)}%`;
        }
      },
    }, '<');

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loading-screen">
      {/* Animated background grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Logo */}
        <div className="loading-logo" style={{ letterSpacing: '-4px' }}>
          &lt;RY/&gt;
        </div>
        
        {/* Subtitle */}
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '13px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginTop: '12px',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Portfolio
        </p>

        {/* Loading bar */}
        <div className="loading-bar" style={{ marginTop: '48px' }}>
          <div ref={barRef} className="loading-bar-fill" style={{ width: 0 }} />
        </div>

        {/* Percentage */}
        <div
          ref={percentRef}
          style={{
            marginTop: '12px',
            color: 'var(--accent)',
            fontSize: '12px',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
          }}
        >
          0%
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
