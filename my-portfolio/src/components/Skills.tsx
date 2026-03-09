'use client'

import { useEffect, useRef, useState, type JSX } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const SKILL_SECTIONS = [
  {
    key: 'technical',
    label: 'TECHNICAL SKILLS',
    subheading: 'PROGRAMMING',
    items: ['C/C++', 'Python', 'JavaScript/TypeScript', 'HTML/CSS','MERN Stack'],
  },
  {
    key: 'frameworks',
    label: 'FRAMEWORKS',
    subheading: 'FRAMEWORKS',
    items: ['React', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Vite'],
  },
  {
    key: 'tools',
    label: 'TOOLS',
    subheading: 'TOOLS',
    items: ['MongoDB', 'Git / GitHub', 'Firebase', 'Vercel', 'REST APIs', 'Google Colab', 'Render' ],
  },
  {
    key: 'interests',
    label: 'Exploring',
    subheading: 'Currently Learning',
    items: ['Machine Learning', 'Data Science','Gen AI'],
  },
]

const hoverClassForTech = (tech: string): string => {
  if (['React', 'Tailwind CSS', 'Next.js'].includes(tech)) return 'hover:text-cyan-400'
  if (['Node.js', 'MongoDB', 'C/C++', 'Python'].includes(tech)) return 'hover:text-green-400'
  if (tech === 'JavaScript/TypeScript') return 'hover:text-yellow-300'
  if (tech === 'Firebase') return 'hover:text-orange-400'
  if (tech === 'Vercel') return 'hover:text-white'
  return 'hover:text-lime-300'
}

function getState(p: number): {
  index: number
  y: number
  scaleY: number
  skewX: number
  opacity: number
} {
  const total = SKILL_SECTIONS.length
  const raw   = p * total
  const index = Math.min(Math.floor(raw), total - 1)
  const frac  = raw - index

  const IN  = 0.28
  const OUT = 0.72
  const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

  let y: number, scaleY: number, skewX: number, opacity: number

  if (index === total - 1) {
    if (frac < IN) {
      const t = ease(frac / IN)
      y = 60 * (1 - t); scaleY = 0.7 + 0.3 * t; skewX = 6 * (1 - t); opacity = t
    } else {
      y = 0; scaleY = 1; skewX = 0; opacity = 1
    }
  } else if (frac < IN) {
    const t = ease(frac / IN)
    y = 60 * (1 - t); scaleY = 0.7 + 0.3 * t; skewX = 6 * (1 - t); opacity = t
  } else if (frac > OUT) {
    const t = ease((frac - OUT) / (1 - OUT))
    y = -60 * t; scaleY = 1 - 0.3 * t; skewX = -6 * t; opacity = 1 - t
  } else {
    y = 0; scaleY = 1; skewX = 0; opacity = 1
  }

  return { index, y, scaleY, skewX, opacity }
}

function SectionContent({ sec }: { sec: (typeof SKILL_SECTIONS)[0] }): JSX.Element {
  return (
    <>
      <style>{`
        .skills-title {
          font-family: "Press Start 2P", monospace;
          font-size: clamp(0.75rem, 3.5vw, 1.8rem);
          color: #ffffff;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          line-height: 1.6;
          text-align: center;
        }
        .skills-subheading {
          font-family: monospace;
          font-size: clamp(0.55rem, 1.5vw, 0.75rem);
          color: #555;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          display: block;
          text-align: center;
        }
        .skills-items {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.4rem 0.6rem;
          max-width: 520px;
          margin: 0 auto;
        }
        .skill-chip {
          font-family: monospace;
          font-size: clamp(0.65rem, 1.8vw, 0.9rem);
          color: #aaa;
          cursor: default;
          transition: color 0.15s ease;
          line-height: 1.8;
          white-space: nowrap;
        }
        .skill-sep {
          color: #333;
        }

        @media (max-width: 480px) {
          .skills-items {
            gap: 0.35rem 0.5rem;
          }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '640px', textAlign: 'center', padding: '0 1rem' }}>
        <h2 className="skills-title">{sec.label}</h2>
        <span className="skills-subheading">{sec.subheading}</span>
        <div className="skills-items">
          {sec.items.map((tech, i) => (
            <span key={tech} className={`skill-chip ${hoverClassForTech(tech)}`}>
              {tech}
              {i < sec.items.length - 1 && <span className="skill-sep"> — </span>}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default function Skills(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<Element | null>(null)
  const [state, setState] = useState({
    index: 0, y: 60, scaleY: 0.7, skewX: 6, opacity: 0,
  })

  // detect custom scroller (SmoothScrollWrapper) if present
  useEffect(() => {
    const el = sectionRef.current?.closest('.sb-inner') as Element | null
    scrollerRef.current = el ?? null
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current ?? window

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      scroller,
      start: 'top top',
      end: '+=400%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => setState(getState(self.progress)),
    })
    return () => st.kill()
  }, [])

  const progress = state.index / (SKILL_SECTIONS.length - 1)

  return (
    <>
      <style>{`
        /* Dots — hide on very small screens, show compact version */
        .skills-dots {
          position: absolute;
          right: clamp(0.8rem, 3vw, 2rem);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          z-index: 20;
        }

        /* On mobile, move dots to bottom center as horizontal row */
        @media (max-width: 480px) {
          .skills-dots {
            right: unset;
            top: unset;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            flex-direction: row;
            gap: 0.5rem;
          }
        }
      `}</style>

      <section
        id="skills"
        ref={sectionRef}
        className="border-t border-[#1a1a1a]"
        style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          background: '#0a0a0a',
        }}
      >

        {/* SKILLS ghost label — top center */}
        <div style={{
          position: 'absolute',
          top: 'clamp(1rem, 3vw, 2rem)',
          left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          <span style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 'clamp(0.90rem, 0.8vw, 0.65rem)',
            color: '#fff',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            userSelect: 'none',
            opacity: 0.9,
          }}>
            SKILLS
          </span>
        </div>

        {/* Section indicator dots */}
        <div className="skills-dots">
          {SKILL_SECTIONS.map((s, i) => (
            <div
              key={s.key}
              style={{
                // desktop: horizontal bar; mobile: square dot
                width:      i === state.index ? 'clamp(12px, 2vw, 20px)' : '6px',
                height:     '2px',
                background: i === state.index ? '#ffffff' : '#333',
                borderRadius: '999px',
                transition: 'width 0.4s ease, background 0.4s ease',
              }}
            />
          ))}
        </div>

        {/* Animated content */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 clamp(1rem, 4vw, 3rem)',
          overflow: 'hidden',
        }}>
          <div style={{
            transform: `translateY(${state.y}px) scaleY(${state.scaleY}) skewX(${state.skewX}deg)`,
            opacity: state.opacity,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            transformOrigin: 'center bottom',
            willChange: 'transform, opacity',
          }}>
            <SectionContent sec={SKILL_SECTIONS[state.index]} />
          </div>
        </div>

        {/* Bottom progress line */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '1px',
          background: '#1a1a1a',
        }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #2a2a2a, #666)',
            transition: 'width 0.3s ease',
          }} />
        </div>

      </section>
    </>
  )
}
