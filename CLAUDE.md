# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

**Stack:** React 19 + Vite + Tailwind CSS + Three.js ecosystem

**Key libraries:**
- **Rendering:** Three.js, React Three Fiber, Drei (3D helpers)
- **Animation:** GSAP, Framer Motion
- **Smooth scroll:** Lenis

**Structure:**
- `src/components/` - Feature-based sections (Hero, About, Skills, Projects, Experience, Contact) + UI shared components
- `src/hooks/` - Custom hooks (`useMouse`, `useScrollProgress`, `useInView`, `useWindowSize`)
- `src/data/` - Centralized portfolio content (`portfolioData.js`)
- `src/assets/` - Static assets (images, icons)

**Patterns:**
- Heavy components (3D scenes) use `Suspense` + lazy loading with spinner fallback
- Custom cursor with scroll progress indicator and mouse-follow light effect
- All content driven by `portfolioData.js` - update this file to modify portfolio info
- ESLint ignores `dist/`, allows `^[A-Z_]` unused vars (for React components/types)
