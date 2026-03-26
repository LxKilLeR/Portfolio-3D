import { useRef, Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../../data/portfolioData';
import { useInView } from '../../hooks/usePortfolio';

gsap.registerPlugin(ScrollTrigger);



/**
 * Individual skill card with hover animation
 */
const SkillCard = ({ skill, index }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card"
      data-cursor-hover
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
          opacity: 0.8,
        }}
      />

      {/* Icon and Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: `${skill.color}18`,
            border: `1px solid ${skill.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0,
          }}
        >
          {skill.icon}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'white' }}>{skill.name}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{skill.category}</div>
        </div>
      </div>

      {/* Skill Level Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Proficiency</span>
          <span style={{ fontSize: '11px', color: skill.color, fontWeight: 700 }}>{skill.level}%</span>
        </div>
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1.2, delay: index * 0.06 + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
              borderRadius: '2px',
              boxShadow: `0 0 8px ${skill.color}60`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Skills Section with 3D scene and skill cards
 */
const SkillsSection = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '120px 0', position: 'relative' }}>
      {/* Background decoration */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '20%',
        right: '-200px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
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
          <span className="section-tag">My Arsenal</span>
          <h2 className="section-title">
            Technical{' '}
            <span className="gradient-text">Skills</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '16px', maxWidth: '480px', lineHeight: 1.7 }}>
            A curated set of technologies I've mastered to build exceptional digital experiences.
          </p>
        </motion.div>



        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
