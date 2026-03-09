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
    title: 'Personal Virtual Assistant - Jarvis (ikik I am Tony Stark)',
    description: 'My first real project — a simple personal virtual assistant which does basic tasks.',
    tags: ['Python'],
    links: { github: 'https://github.com/ADT1123/jarvis.py' },
  },

  // ── 2022 ──
  {
    year: '2022',
    title: 'Discord Quote Bot',
    description: 'My first ever discord chat bot.',
    tags: ['Python'],
    links: { github: 'https://github.com/ADT1123/Quotes-Bot-coding.git' },
  },

  // ── 2023 ──
  {
    year: '2022-2023',
    title: 'Discord fun Chatbot',
    description: 'Fun Discord Chatbot for moderation and cool commands which hosted around 20+ servers.',
    tags: ['Node.js', 'MongoDB'],
    links: { github: 'https://github.com/ADT1123/jarvis.py' },
  },

  // ── 2024 ──

  // ── 2025 ──
  {
    year: '2025',
    title: 'UAS NMIMS Team website',
    description: 'Designed and developed my first ever react website for my team.',
    tags: ['React', 'Typescript', 'Javascript'],
    links: {live:'https://www.uasnmims.com' },
  },
  {
    year: '2025',
    title: 'Eka Gifts website',
    description: 'An e-commerce platform for gifting services and solutions with backend and payment integration.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express'],
    links: { live: 'https://www.ekagifts.com' },
  },

  // ── 2026 ──
  {
    year: '2026',
    title: 'Team Management Software Eka Gifts',
    description: 'A team management and task assessment software to track tasks and meetings. ',
    tags: ['React', 'TypeScript', 'Firebase', 'API Integration'],
    links:{ live: 'https://manage.ekagifts.com' },
  },

    {
    year: '2026',
    title: 'Team Management Software for a customer',
    description: 'A team management and task assessment software to track tasks and meetings. ',
    tags: ['React', 'TypeScript', 'Firebase', 'API Integration'],
    links:{ live: 'https://manage.ppcwithprachi.com' },
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub',    href: 'https://github.com/ADT1123' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/aditya-thukral-036059215' },
  { label: 'Email',     href: 'mailto:adityathukral23@gmail.com' },
  { label: 'Instagram', href: 'https://www.instagram.com/adityathukral011/' },
  { label: 'Discord',   href: 'https://discord.com/users/visual_north_1' },
]
