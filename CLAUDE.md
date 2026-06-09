# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start development server with HMR on http://localhost:5173
npm run build            # Build for production to dist/
npm run lint             # Run ESLint (React 19 + Hooks rules)
npm run preview          # Preview production build locally
npm run generate:portfolio # Generate portfolio data using AI (requires ANTHROPIC_API_KEY)
```

## Architecture

**Stack:** React 19 + Vite + Tailwind CSS + Three.js ecosystem

**Key libraries:**
- **3D Rendering:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animation:** GSAP with `@gsap/react` and ScrollTrigger, Framer Motion
- **Styling:** Tailwind CSS 3.4 with extensive custom theme (glow effects, glass morphism)
- **Smooth utilities:** Lenis (smooth scroll - referenced but not yet integrated)

**Component Structure:**
- `src/App.jsx` - Root component with loading state, global UI (cursor, scroll progress), and lazy-loaded sections
- `src/components/` - Feature-based sections: Hero, About, Skills, Projects, Experience, Contact
- `src/components/UI/` - Shared UI: Custom cursor, cursor glow, loading screen, navbar
- `src/components/*Scene.jsx` - 3D canvas scenes using R3F (HeroScene, SkillsScene)
- `src/hooks/` - Custom hooks unified in `usePortfolio.js`
- `src/data/portfolioData.js` - Single source of truth for all portfolio content

## Key Patterns

**Lazy Loading & Suspense:**
- All section components are lazy-loaded in `App.jsx` with dedicated `SectionFallback` spinner
- 3D scenes inside sections use `Suspense` with `null` fallback for parallel asset loading
- Loading screen animation uses Framer Motion `AnimatePresence`

**3D Scenes (React Three Fiber):**
- Each scene is a separate component with its own `Canvas`
- Uses `useFrame` for per-frame animations
- Leverages Drei helpers: `Points`, `PointMaterial`, `Sphere`, `MeshDistortMaterial`
- Mouse tracking via refs passed as props (`mouseX`, `mouseY`)
- GSAP ScrollTrigger integration for scroll-based animations via `useGSAP` hook
- `dp`r controlled: `[1, 2]` for responsive pixel density

**Animation Strategy:**
- **GSAP + ScrollTrigger:** Scroll-driven animations (camera, object transformations)
- **Framer Motion:** UI transitions (loading screen fade, page opacity)
- **useGSAP:** provides scope-bound cleanup and React integration

**Custom Hooks (src/hooks/usePortfolio.js):**
- `useMouse` - tracks mouse position with smooth lerp (unused, has `smoothMouse` ref)
- `useScrollProgress` - returns scroll progress 0-1 for progress bar
- `useInView` - intersection observer for reveal-on-scroll, supports `once` option
- `useWindowSize` - responsive viewport dimensions

**UI Effects:**
- Custom cursor: dot that follows mouse with `requestAnimationFrame`
- Scroll progress: fixed bar at top showing page scroll position
- Mouse light: radial gradient that follows cursor
- Grid background: fixed CSS gradient pattern with accent color
- Glassmorphism + glow utilities in `tailwind.config.js`

**Data Management:**
- All content in `portfolioData.js`: `personalInfo`, `skills`, `projects`, `experience`
- Skills: 10 items with categories, colors, icons, levels
- Projects: 6 items, `featured` boolean for potential filtering
- Experience: mix of work and education with `type` discriminator

**ESLint Configuration:**
- React Hooks recommended rules + Vite refresh plugin
- Allows uppercase variables without `no-unused-vars` warnings (for React component props/types)
- Ignores `dist/` directory

## AI-Powered Content Generation

The `scripts/generate-portfolio.js` script uses the Anthropic Claude API to generate fresh portfolio data.

**Setup:**
1. Get free API key from https://console.anthropic.com/
2. Set environment variable: `export ANTHROPIC_API_KEY="your-key"`
3. Run: `npm run generate:portfolio`

**Custom prompts:**
```bash
ANTHROPIC_API_KEY=key node scripts/generate-portfolio.js --prompt "Generate for a React Native developer"
```

The script generates complete `src/data/portfolioData.js` with realistic skills, projects, and experience entries matching the portfolio's data structure.
