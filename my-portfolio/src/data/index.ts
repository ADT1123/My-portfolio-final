import type { Service, Skill, Project, SocialLink } from '../types'

export const services: Service[] = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'Building fast, accessible, and production-ready web applications using modern frameworks and best practices.',
  },
  {
    number: '02',
    title: 'UI / UX Design',
    description:
      'Crafting clean interfaces with a focus on usability, hierarchy, and visual clarity. No clutter, just function.',
  },
  {
    number: '03',
    title: 'API & Backend',
    description:
      'Designing and developing RESTful APIs, databases, and server-side logic that scales reliably.',
  },
  {
    number: '04',
    title: 'Consulting',
    description:
      'Technical consulting for startups and teams — architecture reviews, stack selection, and code audits.',
  },
]

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST / GraphQL'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'Figma', 'Vite', 'Vercel'],
  },
]

export const projects: Project[] = [
  // ── 2021 ──
  {
    year: '2021',
    title: 'First Steps',
    description: 'My first real project — a simple personal blog built while learning HTML, CSS and JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    links: undefined,
  },

  // ── 2022 ──
  {
    year: '2022',
    title: 'Portfolio v1',
    description: 'First React portfolio site. Learned component architecture and basic state management.',
    tags: ['React', 'CSS Modules'],
    links: undefined,
  },

  // ── 2023 ──
  {
    year: '2023',
    title: 'Weather Dashboard',
    description: 'Real-time weather app with city search, 7-day forecast and animated charts.',
    tags: ['React', 'OpenWeather API', 'Chart.js'],
    links: undefined,
  },
  {
    year: '2023',
    title: 'Task Flow',
    description: 'Kanban-style task manager with drag-and-drop, labels, and local persistence.',
    tags: ['React', 'TypeScript', 'localStorage'],
    links: undefined,
  },

  // ── 2024 ──
  {
    year: '2024',
    title: 'Project Gamma',
    description: 'An AI-powered content generator with a clean minimal dashboard.',
    tags: ['Python', 'FastAPI', 'React'],
    links: undefined,
  },

  // ── 2025 ──
  {
    year: '2025',
    title: 'Project Alpha',
    description: 'A real-time collaborative tool built with React and WebSockets.',
    tags: ['React', 'Node.js', 'Socket.IO'],
    links: undefined,
  },
  {
    year: '2025',
    title: 'Project Beta',
    description: 'An e-commerce platform with a custom CMS and payment integration.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    links: undefined,
  },

  // ── 2026 ──
  // add here when ready
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub',   href: 'https://github.com/ADT1123' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aditya-thukral-036059215' },
  { label: 'Email',    href: 'mailto:adityathukral23@gmail.com' },
  { label: 'Instagram', href: 'https://www.instagram.com/adityathukral011/' },
  { label: 'Discord',   href: 'https://discord.com/users/visual_north_1' },  
]
