import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/usePortfolio';
import { personalInfo } from '../../data/portfolioData';

const socialLinks = [
  { label: 'GitHub', icon: '⌥', href: personalInfo.github, color: '#ffffff' },
  { label: 'LinkedIn', icon: '🔗', href: personalInfo.linkedin, color: '#0077b5' },
  { label: 'Twitter', icon: '𝕏', href: personalInfo.twitter, color: '#1da1f2' },
  { label: 'Email', icon: '✉', href: `mailto:${personalInfo.email}`, color: '#6c63ff' },
];

const ContactSection = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.15 });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate send
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('sent');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" ref={sectionRef} style={{ padding: '120px 0 80px', position: 'relative' }}>
      {/* Background decoration */}
      <div aria-hidden style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '500px',
        background: 'radial-gradient(ellipse, rgba(108,99,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">
            Let's Build Something{' '}
            <span className="gradient-text">Amazing</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '16px', maxWidth: '480px', margin: '16px auto 0', lineHeight: 1.7 }}>
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Let's turn your ideas into reality.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}>
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card" style={{ padding: '32px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
              }} />

              <h3 style={{ fontSize: '22px', fontWeight: 800, fontFamily: "'Outfit', sans-serif", marginBottom: '8px' }}>
                Let's connect
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '32px' }}>
                I'm currently open to new opportunities and interesting projects.
                Whether you have a question or just want to say hi, my inbox is always open!
              </p>

              {[
                { icon: '📧', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: '📍', label: 'Location', value: personalInfo.location, href: null },
                { icon: '✅', label: 'Status', value: 'Available for work', href: null },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(108,99,255,0.1)',
                    border: '1px solid rgba(108,99,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '2px' }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ color: 'white', fontSize: '14px', textDecoration: 'none', cursor: 'none' }}>{item.value}</a>
                    ) : (
                      <span style={{ color: item.label === 'Status' ? '#22c55e' : 'white', fontSize: '14px', fontWeight: item.label === 'Status' ? 600 : 400 }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  title={s.label}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${s.color}12`;
                    e.currentTarget.style.borderColor = `${s.color}30`;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 8px 20px ${s.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="form-input"
                    style={{ cursor: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="form-input"
                    style={{ cursor: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="form-input"
                  style={{ cursor: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="form-input"
                  style={{ resize: 'vertical', cursor: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="magnetic-btn magnetic-btn-primary"
                style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.8 : 1, transition: 'opacity 0.2s ease' }}
              >
                {status === 'sending' ? (
                  <>Sending...</>
                ) : status === 'sent' ? (
                  <>✓ Message Sent!</>
                ) : (
                  <>Send Message →</>
                )}
              </button>

              {status === 'sent' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    borderRadius: '10px',
                    color: '#22c55e',
                    fontSize: '14px',
                    textAlign: 'center',
                  }}
                >
                  🎉 Thanks! I'll get back to you within 24 hours.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            textAlign: 'center',
            marginTop: '80px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '20px',
            fontWeight: 900,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-1px',
            marginBottom: '12px',
          }}>
            &lt;RY/&gt;
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Crafted with ❤️ using React, Three.js & GSAP · © {new Date().getFullYear()} Raj Yadav
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
