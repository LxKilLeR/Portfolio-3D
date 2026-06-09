import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/usePortfolio';
import { personalInfo } from '../../data/portfolioData';

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zM16 11.801V4.697l-5.803 3.546L16 11.801z"/>
  </svg>
);

const socialLinks = [
  { label: 'GitHub', icon: <GitHubIcon />, href: personalInfo.github, color: '#ffffff' },
  { label: 'LinkedIn', icon: <LinkedInIcon />, href: personalInfo.linkedin, color: '#0077b5' },
  { label: 'Email', icon: <EmailIcon />, href: `mailto:${personalInfo.email}`, color: '#6c63ff' },
];

const ContactSection = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.15 });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // --- Validation ---
  const validate = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = 'Name is required.';
    if (!data.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!data.message.trim()) errors.message = 'Message is required.';
    return errors;
  };

  const errors = validate(formData);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  // --- Web3Forms Integration ---
  const sendFormData = async (data) => {
    console.log('📧 Form submitted:', data);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'afc59ec2-fd52-40cc-a8d8-f28e728bc147',
        name: data.name,
        email: data.email,
        subject: data.subject || 'Portfolio Contact Form',
        message: data.message,
        from_name: data.name,
        replyto: data.email,
      }),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Failed to send message');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    // Abort if there are validation errors
    if (Object.keys(errors).length > 0) return;

    setStatus('sending');
    try {
      await sendFormData(formData);
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Inline error style
  const errorStyle = {
    color: '#f87171',
    fontSize: '12px',
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
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
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.12)',
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
            <form onSubmit={handleSubmit} noValidate className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your Name"
                    autoComplete="name"
                    className="form-input"
                    style={{ cursor: 'none', borderColor: touched.name && errors.name ? '#f87171' : undefined }}
                  />
                  {touched.name && errors.name && <div style={errorStyle}>⚠ {errors.name}</div>}
                </div>
                <div>
                  <label htmlFor="contact-email" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="form-input"
                    style={{ cursor: 'none', borderColor: touched.email && errors.email ? '#f87171' : undefined }}
                  />
                  {touched.email && errors.email && <div style={errorStyle}>⚠ {errors.email}</div>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  autoComplete="off"
                  className="form-input"
                  style={{ cursor: 'none' }}
                />
              </div>

              <div>
                <label htmlFor="contact-message" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="form-input"
                  style={{ resize: 'vertical', cursor: 'none', borderColor: touched.message && errors.message ? '#f87171' : undefined }}
                />
                {touched.message && errors.message && <div style={errorStyle}>⚠ {errors.message}</div>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="magnetic-btn magnetic-btn-primary"
                style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.8 : 1, transition: 'opacity 0.2s ease' }}
              >
                {status === 'sending' ? (
                  <>⏳ Sending...</>
                ) : status === 'sent' ? (
                  <>✓ Message Sent!</>
                ) : status === 'error' ? (
                  <>✕ Failed — Try Again</>
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

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(248,113,113,0.1)',
                    border: '1px solid rgba(248,113,113,0.2)',
                    borderRadius: '10px',
                    color: '#f87171',
                    fontSize: '14px',
                    textAlign: 'center',
                  }}
                >
                  ❌ Something went wrong. Please try again later.
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
            Raj Yadav
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            © {new Date().getFullYear()} Raj Yadav. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
