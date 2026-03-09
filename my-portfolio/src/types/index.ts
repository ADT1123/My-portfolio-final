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
  year: string
  title: string
  description: string
  tags: string[]
  links?: {
    live?: string
    github?: string
  }
}

export interface SocialLink {
  label: string
  href: string
}
