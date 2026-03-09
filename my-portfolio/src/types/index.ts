export interface Service {
  number: string
  title: string
  description: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface Project {
  links: any
  year: string
  title: string
  description: string
  tags: string[]
}

export interface SocialLink {
  label: string
  href: string
}
