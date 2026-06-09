// Portfolio Data - Projects, Skills, Experience
export const personalInfo = {
  name: "Raj Yadav",
  title: "Full Stack Developer",
  subtitle: "Web Application Specialist",
  description: "I am a passionate developer focused on building scalable web applications and engaging user experiences.",
  email: "rajyadav101500@gmail.com",
  github: "https://github.com/LxKilLeR",
  linkedin: "https://www.linkedin.com/in/raj-yadav-b00b74330/",
  location: "India",
  available: true,
};

export const skills = [
  // Languages
  { name: "C#", icon: "🔷", color: "#239120", level: 70, category: "Language" },
  { name: "Dart", icon: "🎯", color: "#0175C2", level: 75, category: "Language" },
  { name: "Java", icon: "☕", color: "#f89820", level: 80, category: "Language" },
  { name: "JavaScript", icon: "JS", color: "#f7df1e", level: 90, category: "Language" },
  { name: "Python", icon: "🐍", color: "#3776AB", level: 80, category: "Language" },
  // Frontend
  { name: "HTML5", icon: "🌐", color: "#e34c26", level: 90, category: "Frontend" },
  { name: "CSS3", icon: "🎨", color: "#264de4", level: 90, category: "Frontend" },
  { name: "React", icon: "⚛️", color: "#61dafb", level: 85, category: "Frontend" },
  { name: "Next.js", icon: "▲", color: "#ffffff", level: 80, category: "Frontend" },
  { name: "Three.js", icon: "🔮", color: "#6c63ff", level: 75, category: "Frontend" },
  { name: "TailwindCSS", icon: "💨", color: "#38bdf8", level: 85, category: "Styling" },
  { name: "Bootstrap", icon: "🅱️", color: "#7952b3", level: 80, category: "Styling" },
  // Backend
  { name: "Node.js", icon: "🟢", color: "#339933", level: 80, category: "Backend" },
  { name: "Express.js", icon: "⚡", color: "#ffffff", level: 80, category: "Backend" },
  { name: "NestJS", icon: "🐱", color: "#e0234e", level: 70, category: "Backend" },
  // Database
  { name: "MongoDB", icon: "🍃", color: "#47a248", level: 80, category: "Database" },
  { name: "MySQL", icon: "🐬", color: "#4479a1", level: 75, category: "Database" },
  { name: "Firebase", icon: "🔥", color: "#ffca28", level: 78, category: "Database" },
  // Tools & Platforms
  { name: "OpenCV", icon: "👁️", color: "#5c3ee8", level: 65, category: "Tools" },
  { name: "Unity", icon: "🎮", color: "#ffffff", level: 60, category: "Tools" },
  { name: "Sketch", icon: "✏️", color: "#f7b500", level: 65, category: "Tools" },
  // Deployment
  { name: "Vercel", icon: "▲", color: "#ffffff", level: 80, category: "Deployment" },
  { name: "Netlify", icon: "🌐", color: "#00c7b7", level: 78, category: "Deployment" },
  { name: "Cloudflare", icon: "☁️", color: "#f38020", level: 72, category: "Deployment" },
  { name: "Render", icon: "🚀", color: "#46e3b7", level: 75, category: "Deployment" },
  { name: "Windows Terminal", icon: "💻", color: "#4d4d4d", level: 80, category: "Tools" },
];

export const projects = [
  {
    id: 1,
    title: "AI Job Portal",
    description: "An AI-powered job portal built with JavaScript. Features smart job matching and modern UI.",
    tech: ["JavaScript", "HTML", "CSS", "React"],
    color: "#6c63ff",
    image: null,
    live: "https://github.com/LxKilLeR/Ai-job-portal",
    github: "https://github.com/LxKilLeR/Ai-job-portal",
    featured: true,
  },
  {
    id: 2,
    title: "Trial Civic - SIH Project",
    description: "Smart India Hackathon project on Crowdsourced Civic Issue Reporting and Resolution System.",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "#ff6b6b",
    image: null,
    live: "https://github.com/LxKilLeR/trialcivic",
    github: "https://github.com/LxKilLeR/trialcivic",
    featured: true,
  },
  {
    id: 3,
    title: "LearnOS Dashboard",
    description: "A comprehensive dashboard application built with TypeScript for educational management.",
    tech: ["TypeScript", "React", "Node.js"],
    color: "#00d4ff",
    image: null,
    live: "https://github.com/LxKilLeR/learnos-dashboard",
    github: "https://github.com/LxKilLeR/learnos-dashboard",
    featured: false,
  },
  {
    id: 4,
    title: "PrimeTrade Fullstack Assignment",
    description: "A fullstack application demonstrating scalable architecture and real-time data handling.",
    tech: ["JavaScript", "Node.js", "Express", "MongoDB"],
    color: "#88ce02",
    image: null,
    live: "https://github.com/LxKilLeR/primetrade-fullstack-assignment",
    github: "https://github.com/LxKilLeR/primetrade-fullstack-assignment",
    featured: false,
  }
];

export const experience = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2024 — Present",
    description: "Building modern web applications using React, Next.js, and Node.js. Continuously learning and building open-source projects.",
    tech: ["JavaScript", "TypeScript", "React", "Node.js"],
    type: "work",
  },
  {
    id: 2,
    role: "Participant",
    company: "Smart India Hackathon",
    period: "2024",
    description: "Developed 'Trial Civic', a crowdsourced civic issue reporting and resolution system.",
    tech: ["HTML", "CSS", "JavaScript"],
    type: "work",
  },
  {
    id: 3,
    role: "Game Developer",
    company: "Unity Projects",
    period: "2026 — Present",
    description: "Developing interactive games and simulations using Unity and C#. Experienced in game mechanics, physics, UI design, and publishing game builds.",
    tech: ["Unity", "C#", "Blender", "Game Design"],
    type: "work",
  },
  {
    id: 4,
    role: "B.Tech Computer Science & Engineering",
    company: "University",
    period: "2024 — 2028",
    description: "Pursuing B.Tech in Computer Science & Engineering. Actively learning full-stack development, data structures & algorithms, and building real-world projects.",
    tech: ["C", "Java", "Python", "DSA"],
    type: "education",
  }
];
