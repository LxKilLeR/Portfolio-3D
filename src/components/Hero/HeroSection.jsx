import { useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

// Lazy load 3D scene for performance
const HeroScene = lazy(() => import('./HeroScene'));

const HeroSection = () => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Track normalized mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      titleRef.current?.querySelectorAll('.char') || [],
      { y: 100, opacity: 0, rotateX: -80 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.04, ease: 'back.out(1.2)' }
    ).fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );
    return () => tl.kill();
  }, []);

  const titleWords = ['Creative', 'Developer'];
  const line2 = ['& 3D', 'Specialist'];

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 3D Canvas Background */}
      <div className="hero-canvas">
        <Suspense fallback={<div style={{ background: 'var(--primary)', width: '100%', height: '100%' }} />}>
          <HeroScene mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </div>

      {/* Radial gradient overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,10,15,0.9) 100%)',
          zIndex: 0,
        }}
      />

      {/* Hero Content */}
      <div className="section-container hero-content" style={{ width: '100%', paddingTop: '80px' }}>
        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="section-tag">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
            Available for Work
          </span>
        </motion.div>

        {/* Main Title */}
        <div ref={titleRef} style={{ perspective: '1200px' }}>
          <h1 className="hero-title" style={{ marginBottom: '0.1em', lineHeight: 1.05 }}>
            {/* Line 1 */}
            <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
              {titleWords.map((word, wi) => (
                <span key={wi} style={{ display: 'inline-block', marginRight: '0.3em' }}>
                  {word.split('').map((char, ci) => (
                    <span
                      key={ci}
                      className="char"
                      style={{
                        display: 'inline-block',
                        color: wi === 0 ? 'white' : 'var(--accent)',
                        textShadow: wi === 1 ? '0 0 30px rgba(108,99,255,0.6)' : 'none',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div>
            {/* Line 2 */}
            <div style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
              {line2.map((word, wi) => (
                <span key={wi} style={{ display: 'inline-block', marginRight: '0.3em' }}>
                  {word.split('').map((char, ci) => (
                    <span
                      key={ci}
                      className="char"
                      style={{
                        display: 'inline-block',
                        color: wi === 0 ? 'var(--text-secondary)' : 'white',
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef}>
          <p style={{
            maxWidth: '520px',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: 1.7,
            margin: '24px 0 40px',
          }}>
            I build <span style={{ color: 'white', fontWeight: 600 }}>immersive 3D web experiences</span> and
            high-performance applications using React, Three.js, and cutting-edge web technologies.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              className="magnetic-btn magnetic-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
              <svg style={{ marginLeft: '8px', width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="magnetic-btn magnetic-btn-outline"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: 'var(--text-secondary)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, var(--accent), transparent)',
            }}
          />
        </motion.div>
      </div>

      {/* Floating tech labels */}
      {['Three.js', 'React', 'GSAP', 'WebGL'].map((tech, i) => (
        <motion.div
          key={tech}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          style={{
            position: 'absolute',
            top: `${20 + i * 18}%`,
            right: `${8 + (i % 2) * 6}%`,
            padding: '6px 14px',
            background: 'rgba(108,99,255,0.08)',
            border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: '50px',
            fontSize: '12px',
            color: 'var(--accent)',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            display: 'none',
          }}
          className="hero-float-label"
        >
          {tech}
        </motion.div>
      ))}

      <style>{`
        @media (min-width: 1024px) {
          .hero-float-label { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
