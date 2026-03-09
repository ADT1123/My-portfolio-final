import type { JSX } from 'react'
import { socialLinks } from '../data'

export default function Contact(): JSX.Element {
  return (
    <section id="contact" className="px-8 md:px-16 lg:px-24 py-32 border-t border-[#1a1a1a]">

      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-8">
          Got a project?<br />
          <span className="text-[#f9f97a]">Let's talk.</span>
        </h2>

        <p className="text-[#ffffff] text-lg leading-relaxed mb-12 max-w-lg">
          I'm open to freelance projects, part-time roles, and interesting
          collaborations. Please do reach out.
        </p>

        {/* Primary CTA */}
        <a
          href="mailto:adityathukral23@gmail.com"
          className="inline-block text-base text-black bg-white px-8 py-4 hover:bg-[#e0e0e0] transition-colors duration-200 font-medium tracking-wide mb-16"
        >
          adityathukral23@gmail.com →
        </a>

        {/* Social links */}
        <div className="flex flex-wrap gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#555] hover:text-white transition-colors duration-200 tracking-widest uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
