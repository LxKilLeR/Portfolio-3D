import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/usePortfolio';
import { projects } from '../../data/portfolioData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * 3D tilt card for projects — uses CSS perspective + mouse tracking
 * Scroll animation powered by GSAP ScrollTrigger
 */
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const wrapperRef = useRef(null);
  const blurRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -12, y: dx * 12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  // GSAP ScrollTrigger — animates opacity, y, AND blur pseudo-element together
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const blur = blurRef.current;
    if (!wrapper || !blur) return;

    // Set initial hidden state
    gsap.set(wrapper, { opacity: 0, y: 50 });
    gsap.set(blur, { opacity: 0 });

    // Animate everything simultaneously on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Both tweens start at position 0 = same time, no delay
    tl.to(wrapper, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, 0)
    .to(blur, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-cursor-hover
      style={{ perspective: '1200px', opacity: 0 }}
    >
      <div
        ref={cardRef}
        className="project-card-blur"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: '20px',
          padding: '28px',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? '10px' : '0'})`,
          transition: 'transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: hovered ? `0 20px 60px ${project.color}20, 0 0 0 1px ${project.color}20` : '0 4px 24px rgba(0,0,0,0.2)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'none',
        }}
      >
        {/* GPU-accelerated blur pseudo-element control */}
        <div ref={blurRef} aria-hidden="true" style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          opacity: 0,
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }} />
        {/* Content wrapper — sits above blur layer */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Color accent line */}
        <div style={{
          position: 'absolute',
          top: -28,
          left: -28,
          right: -28,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          transition: 'opacity 0.3s ease',
          opacity: hovered ? 1 : 0.4,
        }} />

        {/* Background glow */}
        {hovered && (
          <div aria-hidden style={{
            position: 'absolute',
            top: '-60%',
            left: '-20%',
            width: '140%',
            height: '140%',
            background: `radial-gradient(ellipse, ${project.color}08 0%, transparent 60%)`,
            pointerEvents: 'none',
          }} />
        )}

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: `${project.color}18`,
              border: `1px solid ${project.color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              transition: 'transform 0.3s ease',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            💻
          </div>
          {project.featured && (
            <span style={{
              padding: '4px 10px',
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              borderRadius: '50px',
              fontSize: '11px',
              color: project.color,
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <h3 style={{ fontSize: '18px', fontWeight: 800, fontFamily: "'Outfit', sans-serif", marginBottom: '10px', color: 'white' }}>
          {project.title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, flex: 1, marginBottom: '20px' }}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              padding: '4px 10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '50px',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: '10px',
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              borderRadius: '10px',
              color: project.color,
              fontSize: '13px',
              fontWeight: 600,
              textAlign: 'center',
              textDecoration: 'none',
              transition: 'background 0.2s ease',
              cursor: 'none',
            }}
          >
            Live Demo ↗
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              textAlign: 'center',
              textDecoration: 'none',
              cursor: 'none',
            }}
          >
            GitHub →
          </a>
        </div>
        </div>{/* end content wrapper */}
      </div>
    </div>
  );
};

/**
 * Projects Section with 3D tilt cards
 */
const ProjectsSection = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="projects" ref={sectionRef} style={{ padding: '120px 0', position: 'relative' }}>
      {/* BG decoration */}
      <div aria-hidden style={{
        position: 'absolute',
        bottom: '10%',
        right: '-200px',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,107,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '60px' }}
        >
          <span className="section-tag">My Work</span>
          <h2 className="section-title">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '16px', maxWidth: '480px', lineHeight: 1.7 }}>
            A selection of projects that showcase my skills in building complex, performant web applications.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
