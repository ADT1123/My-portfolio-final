import type { JSX } from "react"

const navLinks = ['Services', 'Skills', 'Work', 'Contact']

export default function Navbar(): JSX.Element {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0a0a0a] border-b border-[#1a1a1a]">
      <a href="#hero" className="font-mono text-sm text-white tracking-widest uppercase">
        YourName
      </a>
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="text-[#888] hover:text-white text-sm transition-colors duration-200 tracking-wide"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="text-sm text-black bg-white px-4 py-2 hover:bg-[#e0e0e0] transition-colors duration-200 font-medium"
      >
        Hire Me
      </a>
    </nav>
  )
}
