import { motion } from 'framer-motion';
import { useInView } from '../../hooks/usePortfolio';
import { experience } from '../../data/portfolioData';

/**
 * Animated Experience/Timeline Section
 */
const ExperienceSection = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="experience" ref={sectionRef} style={{ padding: '120px 0', position: 'relative' }}>
      {/* BG decoration */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '20%',
        left: '-200px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,99,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '80px', textAlign: 'center' }}
        >
          <span className="section-tag">My Journey</span>
          <h2 className="section-title">
            Experience &{' '}
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Center line (desktop) */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(108,99,255,0.5) 10%, rgba(108,99,255,0.5) 90%, transparent)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
            }}
            className="timeline-line-desktop"
          />

          {/* Left line (mobile) */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
            style={{
              position: 'absolute',
              left: '14px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(108,99,255,0.4) 10%, rgba(108,99,255,0.4) 90%, transparent)',
              transformOrigin: 'top',
            }}
            className="timeline-line-mobile"
          />

          {experience.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  marginBottom: '48px',
                  position: 'relative',
                }}
                className={isLeft ? 'timeline-item-left' : 'timeline-item-right'}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                  className="timeline-dot-wrapper"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '24px',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                  }}
                >
                  <div className="timeline-dot" style={{
                    width: '16px',
                    height: '16px',
                    background: item.type === 'education' ? 'var(--accent-2)' : 'var(--accent)',
                    borderRadius: '50%',
                    border: '3px solid var(--primary)',
                    boxShadow: `0 0 20px ${item.type === 'education' ? 'var(--accent-2)' : 'var(--accent)'}`,
                  }} />
                </motion.div>

                {/* Content card */}
                <div
                  className="glass-card timeline-card"
                  style={{
                    padding: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Background shimmer */}
                  <div aria-hidden style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${item.type === 'education' ? 'var(--accent-2)' : 'var(--accent)'}, transparent)`,
                    opacity: 0.6,
                  }} />

                  {/* Type badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      background: item.type === 'education' ? 'rgba(0,212,255,0.1)' : 'rgba(108,99,255,0.1)',
                      border: `1px solid ${item.type === 'education' ? 'rgba(0,212,255,0.2)' : 'rgba(108,99,255,0.2)'}`,
                      borderRadius: '50px',
                      color: item.type === 'education' ? 'var(--accent-2)' : 'var(--accent)',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      {item.type === 'education' ? '🎓 Education' : '💼 Work'}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '12px', fontFamily: "'JetBrains Mono', monospace" }}>
                      {item.period}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, fontFamily: "'Outfit', sans-serif", marginBottom: '4px' }}>
                    {item.role}
                  </h3>
                  <p style={{ color: item.type === 'education' ? 'var(--accent-2)' : 'var(--accent)', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
                    {item.company}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
                    {item.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.tech.map((t) => (
                      <span key={t} style={{
                        padding: '3px 8px',
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .timeline-line-desktop { display: block !important; }
          .timeline-line-mobile { display: none !important; }
          .timeline-dot-wrapper { display: block !important; }
          .timeline-item-left .timeline-card { margin-right: 54%; }
          .timeline-item-right .timeline-card { margin-left: 54%; }
        }
        @media (max-width: 768px) {
          .timeline-line-desktop { display: none !important; }
          .timeline-line-mobile { display: block !important; }
          .timeline-dot-wrapper { left: 14px !important; }
          .timeline-item-left .timeline-card,
          .timeline-item-right .timeline-card { margin-left: 36px; margin-right: 0; }
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;
