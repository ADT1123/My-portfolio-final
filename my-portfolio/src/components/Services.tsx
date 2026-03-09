'use client'

import { useEffect, useRef, type JSX } from 'react'

const SERVICES = [
  {
    n: '01',
    t: 'Backend Development',
    d: 'Scalable, clean server-side logic with Node.js. REST APIs, auth systems, and databases.',
    tag: 'Node.js · Express · REST',
  },
  {
    n: '02',
    t: 'Frontend Development',
    d: 'Responsive, fast, and clean UIs using React, Next.js. Focused on performance and feel.',
    tag: 'React · Next.js · HTML/CSS',
  },
  {
    n: '03',
    t: 'Full Stack',
    d: 'End-to-end product development — from database schema to deployed UI.',
    tag: 'Full Stack · End-to-End',
  },
  {
    n: '04',
    t: 'Freelance Projects',
    d: 'Available for freelance work. Short-term or long-term — I am open for all.',
    tag: 'Freelance · Remote',
  },
]

const AVAILABILITY = [
  { label: 'Open to Work',           sub: 'Full-time or part-time roles' },
  { label: 'Open to Collaborate',    sub: 'Side projects & open source' },
  { label: 'Available for Freelance', sub: 'Remote · Flexible hours' },
]

// ── scroll fade hook ───────────────────────────────────
function useScrollFade(ref: React.RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(28px)'
    el.style.transition = `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0px)'
        } else {
          el.style.opacity = '0'
          el.style.transform = 'translateY(28px)'
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
}

// ── Service widget ────────────────────────────────────
function Widget({
  n, t, d, tag, className = '', delay = 0,
}: {
  n: string; t: string; d: string; tag: string
  className?: string; delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null!)
  useScrollFade(ref, delay)

  return (
    <div
      ref={ref}
      className={`svc-widget ${className}`}
    >
      <span className="svc-num">{n}</span>
      <div className="svc-body">
        <h3 className="svc-title">{t}</h3>
        <p className="svc-desc">{d}</p>
      </div>
      <span className="svc-tag">{tag}</span>
    </div>
  )
}


// ── Main component ────────────────────────────────────
export default function Services(): JSX.Element {
  return (
    <>
      <style>{`
        /* ── Base widget ── */
        .svc-widget {
          background: linear-gradient(145deg, #000 0%, #000 100%);
          border: 1px solid #484848;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 1px 2px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.03);
          box-sizing: border-box;
          min-height: 0;
        }
        .svc-num {
          font-family: monospace;
          font-size: 10px;
          color: #fff;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .svc-body { flex: 1; }
        .svc-title {
          font-size: clamp(0.85rem, 1.5vw, 1.05rem);
          font-weight: 600;
          color: #fefe88;
          letter-spacing: -0.01em;
          margin: 0 0 0.5rem 0;
          line-height: 1.35;
        }
        .svc-desc {
          font-size: clamp(0.72rem, 1.2vw, 0.8rem);
          line-height: 1.8;
          color: #979797;
          margin: 0;
        }
        .svc-tag {
          font-family: monospace;
          font-size: 9px;
          color: #878787;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 1rem;
          display: block;
        }

        /* ── Bento grid — desktop ── */
        .svc-bento {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: 220px 220px;
          gap: 10px;
          width: 100%;
          max-width: 880px;
        }
        .svc-col1 { grid-column: 1; grid-row: 1 / 3; }
        .svc-col2r1 { grid-column: 2; grid-row: 1; }
        .svc-col2r2 { grid-column: 2; grid-row: 2; }
        .svc-col3 { grid-column: 3; grid-row: 1 / 3; }

        /* ── Availability row ── */
        .avail-row {
          display: flex;
          gap: 10px;
          width: 100%;
          max-width: 880px;
          flex-wrap: wrap;
        }
        .avail-widget {
          background: linear-gradient(145deg, #141414, #0f0f0f);
          border: 1px solid #1c1c1c;
          border-radius: 16px;
          padding: 1.2rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 200px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.03);
          box-sizing: border-box;
        }
        .avail-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #b7ffe1;
          box-shadow: 0 0 8px rgba(46,204,113,0.5);
          flex-shrink: 0;
        }
        .avail-label {
          margin: 0;
          font-size: clamp(0.78rem, 1.3vw, 0.85rem);
          font-weight: 600;
          color: #ddd;
          letter-spacing: -0.01em;
        }
        .avail-sub {
          margin: 2px 0 0 0;
          font-size: 0.7rem;
          color: #3a3a3a;
          font-family: monospace;
        }

        /* ── Tablet (≤ 860px) — 2-column bento ── */
        @media (max-width: 860px) {
          .svc-bento {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            max-width: 640px;
          }
          .svc-col1  { grid-column: 1;     grid-row: 1; }
          .svc-col2r1{ grid-column: 2;     grid-row: 1; }
          .svc-col2r2{ grid-column: 1;     grid-row: 2; }
          .svc-col3  { grid-column: 2;     grid-row: 2; }
          .svc-widget { min-height: 200px; }
        }

        /* ── Mobile (≤ 520px) — 1-column ── */
        @media (max-width: 520px) {
          .svc-bento {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            max-width: 100%;
          }
          .svc-col1,
          .svc-col2r1,
          .svc-col2r2,
          .svc-col3 {
            grid-column: 1;
            grid-row: auto;
          }
          .svc-widget { min-height: 160px; }
          .avail-widget { min-width: 100%; flex: unset; }
          .avail-row { flex-direction: column; }
        }
      `}</style>

      <section
        id="services"
        style={{
          width: '100%',
          minHeight: '100vh',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)',
          borderTop: '1px solid #1a1a1a',
          boxSizing: 'border-box',
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 'clamp(0.65rem, 2vw, 1.5rem)',
            color: '#fff',
            letterSpacing: '0.08em',
            textAlign: 'center',
            margin: '0 0 0.5rem 0',
            lineHeight: 1.7,
          }}
        >
          SERVICES I PROVIDE
        </h2>

        {/* Bento grid */}
        <div className="svc-bento">
          <Widget n={SERVICES[0].n} t={SERVICES[0].t} d={SERVICES[0].d} tag={SERVICES[0].tag}
            className="svc-col1"  delay={0} />
          <Widget n={SERVICES[1].n} t={SERVICES[1].t} d={SERVICES[1].d} tag={SERVICES[1].tag}
            className="svc-col2r1" delay={100} />
          <Widget n={SERVICES[2].n} t={SERVICES[2].t} d={SERVICES[2].d} tag={SERVICES[2].tag}
            className="svc-col2r2" delay={200} />
          <Widget n={SERVICES[3].n} t={SERVICES[3].t} d={SERVICES[3].d} tag={SERVICES[3].tag}
            className="svc-col3"  delay={150} />
        </div>

      </section>
    </>
  )
}
