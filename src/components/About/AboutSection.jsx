import { motion } from 'framer-motion';
import { useInView } from '../../hooks/usePortfolio';
import { personalInfo } from '../../data/portfolioData';

const stats = [
  { value: '20+', label: 'Projects Completed' },
  { value: '3+', label: 'Years Experience' },
  { value: '10k+', label: 'Users Served' },
  { value: '95+', label: 'Lighthouse Score' },
];

const AboutSection = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.15 });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* BG decoration */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '10%',
        left: '-200px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '80px',
          alignItems: 'center',
        }}>
          {/* Left — Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag">Who I Am</span>
              <h2 className="section-title" style={{ marginBottom: '24px' }}>
                Passionate About{' '}
                <span className="gradient-text">Crafting</span>
                <br />The Future Web
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '16px' }}>
                <p>
                  I'm <span style={{ color: 'white', fontWeight: 600 }}>{personalInfo.name}</span>, a full stack developer based in {personalInfo.location}
                  , specializing in building exceptional digital experiences
                  that live at the intersection of design and technology.
                </p>
                <p>
                  My passion lies in <span style={{ color: 'white', fontWeight: 600 }}>3D web development</span> and
                  creating interactive experiences that feel magical. I use React Three Fiber,
                  custom GLSL shaders, and WebGL to push the boundaries of what's possible in a browser.
                </p>
                <p>
                  When I'm not writing code, I'm exploring new technologies, contributing to open-source
                  projects, or studying computer graphics and shader programming.
                </p>
              </div>

              {/* Availability badge */}
              <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="#contact"
                  className="magnetic-btn magnetic-btn-primary"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  Let's Work Together
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn magnetic-btn-outline"
                >
                  View GitHub
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — Stats and Card */}
          <div>
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card"
              style={{ padding: '32px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}
            >
              <div aria-hidden style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
              }} />

              {/* Avatar placeholder */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 900,
                  fontFamily: "'Outfit', sans-serif",
                  flexShrink: 0,
                  boxShadow: '0 0 30px rgba(108,99,255,0.4)',
                }}>
                  R
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '18px', fontFamily: "'Outfit', sans-serif" }}>{personalInfo.name}</div>
                  <div style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600 }}>{personalInfo.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>📍 {personalInfo.location}</div>
                </div>
              </div>

              {/* Mini info */}
              {[
                { icon: '📧', label: personalInfo.email },
                { icon: '🟢', label: 'Open to opportunities' },
                { icon: '⚡', label: 'Specializes in 3D & WebGL' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ fontSize: '14px' }}>{item.icon}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass-card"
                  style={{ padding: '20px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: '28px', fontWeight: 900, fontFamily: "'Outfit', sans-serif", background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {stat.value}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px', lineHeight: 1.4 }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
