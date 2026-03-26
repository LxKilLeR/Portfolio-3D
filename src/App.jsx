import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cursor, { ScrollProgress, MouseLight } from './components/UI/Cursor';
import LoadingScreen from './components/UI/LoadingScreen';
import Navbar from './components/UI/Navbar';

// Lazy load heavy sections
const HeroSection = lazy(() => import('./components/Hero/HeroSection'));
const AboutSection = lazy(() => import('./components/About/AboutSection'));
const SkillsSection = lazy(() => import('./components/Skills/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/Projects/ProjectsSection'));
const ExperienceSection = lazy(() => import('./components/Experience/ExperienceSection'));
const ContactSection = lazy(() => import('./components/Contact/ContactSection'));

// Section fallback
const SectionFallback = () => (
  <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '2px solid rgba(108,99,255,0.3)',
      borderTop: '2px solid var(--accent)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

/**
 * Main App Component
 * Handles loading screen, smooth scroll setup, and section rendering
 */
function App() {
  const [loading, setLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);
    setTimeout(() => setAppReady(true), 100);
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  return (
    <>
      {/* Custom Cursor */}
      <Cursor />
      
      {/* Mouse follow light */}
      <MouseLight />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main App */}
      <AnimatePresence>
        {appReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation */}
            <Navbar />

            {/* Page Sections */}
            <main>
              <Suspense fallback={<SectionFallback />}>
                <HeroSection />
              </Suspense>
              
              <Suspense fallback={<SectionFallback />}>
                <AboutSection />
              </Suspense>
              
              <Suspense fallback={<SectionFallback />}>
                <SkillsSection />
              </Suspense>
              
              <Suspense fallback={<SectionFallback />}>
                <ProjectsSection />
              </Suspense>
              
              <Suspense fallback={<SectionFallback />}>
                <ExperienceSection />
              </Suspense>
              
              <Suspense fallback={<SectionFallback />}>
                <ContactSection />
              </Suspense>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background grid lines */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
}

export default App;
