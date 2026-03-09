'use client'

import { useEffect, useRef, type JSX } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Work(): JSX.Element {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const rowRefs     = useRef<(HTMLDivElement | null)[]>([])
  const scrollerRef = useRef<Element | null>(null)

  useEffect(() => {
    // detect SmoothScrollWrapper scroller
    const el = sectionRef.current?.closest('.sb-inner') as Element | null
    scrollerRef.current = el ?? null
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current ?? window

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => {
            if (!projectsRef.current) return
            projectsRef.current.style.overflowY =
              self.progress > 0.95 ? 'auto' : 'hidden'
          },
        },
      })

      tl.to(titleRef.current, {
        scale: 10,
        opacity: 0,
        ease: 'none',
        duration: 1,
      }, 0)

      tl.fromTo(
        projectsRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, ease: 'none', duration: 0.5 },
        0.75
      )

      tl.fromTo(
        rowRefs.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: 'none', duration: 0.3, stagger: 0.08 },
        0.85
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{`
        /* ── Work section responsive styles ── */
        #work ::-webkit-scrollbar { display: none; }

        .work-projects-wrap {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 3;
          opacity: 0;
          overflow-y: hidden;
          overflow-x: hidden;
          padding: 4rem 6rem 6rem;
          will-change: opacity, transform;
          scrollbar-width: none;
          -ms-overflow-style: none;
          box-sizing: border-box;
        }

        .work-selected-title {
          font-size: clamp(1.4rem, 3.5vw, 3.5rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          margin: 0 0 2rem 0;
        }

        .work-row {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          padding: 2rem 0;
          border-top: 1px solid #1a1a1a;
          cursor: default;
          will-change: opacity, transform;
          transition: background 0.25s ease, padding-left 0.25s ease, padding-right 0.25s ease;
        }

        .work-year {
          font-family: monospace;
          font-size: 11px;
          color: #444;
          flex-shrink: 0;
          padding-top: 4px;
          min-width: 36px;
        }

        .work-idx {
          font-family: monospace;
          font-size: 11px;
          color: #222;
          flex-shrink: 0;
          padding-top: 4px;
          width: 20px;
        }

        .work-content { flex: 1; min-width: 0; }

        .work-project-title {
          font-size: clamp(0.95rem, 2vw, 1.2rem);
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.5rem 0;
          word-break: break-word;
        }

        .work-desc {
          color: #666;
          font-size: clamp(0.78rem, 1.5vw, 0.875rem);
          line-height: 1.6;
          margin: 0 0 0.9rem 0;
        }

        .work-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 0.9rem;
        }

        .work-tag {
          font-family: monospace;
          font-size: 10px;
          color: #555;
          border: 1px solid #222;
          padding: 2px 8px;
          white-space: nowrap;
        }

        .work-links { display: flex; gap: 14px; flex-wrap: wrap; }

        .work-link {
          font-family: monospace;
          font-size: 11px;
          color: #888;
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-bottom: 1px solid #333;
          padding-bottom: 1px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .work-link:hover { color: #fff; border-bottom-color: #fff; }

        .work-arrow {
          align-self: center;
          color: #333;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .work-projects-wrap {
            padding: 3.5rem 3rem 5rem;
          }
          .work-row { gap: 2rem; }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .work-projects-wrap {
            padding: 3rem 1.2rem 5rem;
          }
          .work-row {
            flex-direction: column;
            gap: 0.6rem;
            padding: 1.5rem 0;
          }
          .work-row-meta {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .work-year { padding-top: 0; }
          .work-idx  { padding-top: 0; }
          .work-arrow { display: none; }
          .work-selected-title {
            margin-bottom: 1.2rem;
          }
        }
      `}</style>

      <section
        id="work"
        ref={sectionRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#0a0a0a',
        }}
      >
        {/* ── MY WORK zoom title ── */}
        <div
          ref={titleRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        >
          <h2
            style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 'clamp(2rem, 7vw, 7rem)',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textAlign: 'center',
              margin: 0,
            }}
          >
            MY WORK
          </h2>
        </div>

        {/* ── Projects list ── */}
        <div ref={projectsRef} className="work-projects-wrap">

          {/* Section label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '1.8rem',
          }}>
            <span style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#444',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              04
            </span>
            <div style={{ width: 28, height: 1, background: '#333' }} />
            <span style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#444',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              Work
            </span>
          </div>

          <h2 className="work-selected-title">Selected Projects</h2>

          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4rem' }}>
            {projects.map((project, index) => (
              <div
                key={project.title}
                ref={(el) => { rowRefs.current[index] = el }}
                className="work-row"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0f0f0f'
                  e.currentTarget.style.paddingLeft = '0.8rem'
                  e.currentTarget.style.paddingRight = '0.8rem'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.paddingLeft = '0'
                  e.currentTarget.style.paddingRight = '0'
                }}
              >
                {/* On mobile: year+index in a row; on desktop: separate columns */}
                <div className="work-row-meta" style={{ display: 'contents' }}>
                  <span className="work-year">{project.year}</span>
                  <span className="work-idx">{String(index + 1).padStart(2, '0')}</span>
                </div>

                {/* Content */}
                <div className="work-content">
                  <h3 className="work-project-title">{project.title}</h3>
                  <p className="work-desc">{project.description}</p>

                  {/* Tags */}
                  <div className="work-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="work-tag">{tag}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="work-links">
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-link"
                      >
                        Live ↗
                      </a>
                    )}
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-link"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Arrow — hidden on mobile via CSS */}
                <div className="work-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
