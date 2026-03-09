'use client'

import React, { useEffect, useRef, useState, type JSX } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE_START = 2021
const TIMELINE_END   = 2026
const YELLOW         = '#f9f97a'
const PX             = 4

const ALL_YEARS = Array.from(
  { length: TIMELINE_END - TIMELINE_START + 1 },
  (_, i) => String(TIMELINE_START + i)
)

const grouped = projects.reduce<Record<string, typeof projects>>((acc, p) => {
  const y = String(p.year)
  if (!acc[y]) acc[y] = []
  acc[y].push(p)
  return acc
}, {})

// ── CHARACTER ──────────────────────────────────────────
const CHAR_RIGHT_F0: number[][] = [
  [0,0,3,3,3,3,3,0,0,0,0,0,0,0],
  [0,3,3,3,3,3,3,3,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,3,0,0,0,0,0],
  [0,1,1,1,1,1,4,4,1,0,0,0,0,0],
  [0,1,1,6,1,1,4,5,1,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,0,0,0,0,0,0,0],
  [0,0,2,2,2,2,2,2,0,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,0,0,0,0,0],
  [0,0,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,1,1,0,0,1,1,0,0,0,0,0,0],
  [0,0,1,1,0,0,1,1,0,0,0,0,0,0],
  [0,0,1,1,0,0,1,1,0,0,0,0,0,0],
  [0,1,1,0,0,0,0,1,1,0,0,0,0,0],
]

const CHAR_RIGHT_F1: number[][] = [
  [0,0,3,3,3,3,3,0,0,0,0,0,0,0],
  [0,3,3,3,3,3,3,3,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,3,0,0,0,0,0],
  [0,1,1,1,1,1,4,4,1,0,0,0,0,0],
  [0,1,1,6,1,1,4,5,1,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,0,0,0,0,0,0,0],
  [0,0,2,2,2,2,2,2,1,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,0,0,0,0,0],
  [0,2,2,2,2,2,2,2,2,0,0,0,0,0],
  [0,0,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,1,1,0,1,1,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,0,0,0,0,0,0,0],
  [0,0,1,1,1,0,0,0,0,0,0,0,0,0],
  [0,1,1,0,0,0,0,1,1,0,0,0,0,0],
]

function buildShadow(frame: 0 | 1): string {
  const cmap: Record<number, string> = {
    1: '#d5ff79', 2: '#275252', 3: '#000000',
    4: '#d5ff79', 5: '#000000', 6: '#000000',
  }
  const rows = frame === 0 ? CHAR_RIGHT_F0 : CHAR_RIGHT_F1
  const out: string[] = []
  rows.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (!cell) return
      out.push(`${c * PX}px ${r * PX}px 0 ${cmap[cell] ?? '#fff'}`)
    })
  })
  return out.join(', ')
}

function PixelCharacter({ frame }: { frame: 0 | 1 }): JSX.Element {
  return (
    <div style={{ position: 'relative', width: PX * 14, height: PX * 16, imageRendering: 'pixelated', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: PX, height: PX, boxShadow: buildShadow(frame) }} />
    </div>
  )
}

function ScrollBar({ progress }: { progress: number }): JSX.Element {
  return (
    <div style={{
      position: 'absolute', right: 20, top: '50%',
      transform: 'translateY(-50%)', zIndex: 10,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      pointerEvents: 'none',
    }}>
      <span style={{
        fontFamily: 'monospace', fontSize: 7, color: '#252525',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        writingMode: 'vertical-rl', marginBottom: 2,
      }}>scroll</span>
      <div style={{ width: 1, height: 130, background: '#181818', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: `${Math.min(progress * 100, 100)}%`,
          background: YELLOW, transition: 'height 0.05s linear',
        }} />
        <div style={{
          position: 'absolute', left: '50%',
          top: `${Math.min(progress * 100, 98)}%`,
          transform: 'translate(-50%, -50%)',
          width: 4, height: 4, borderRadius: '50%',
          background: YELLOW, transition: 'top 0.05s linear',
        }} />
      </div>
      {progress < 0.97 && (
        <div style={{ color: '#252525', fontSize: 9, marginTop: 2, animation: 'wkPulse 1.4s ease-in-out infinite' }}>↓</div>
      )}
    </div>
  )
}

export default function Work(): JSX.Element {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const titleRef      = useRef<HTMLDivElement>(null)
  const timelineRef   = useRef<HTMLDivElement>(null)
  const charRef       = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const cardGroupRef  = useRef<(HTMLDivElement | null)[]>([])
  const yearLabelRef  = useRef<(HTMLDivElement | null)[]>([])
  const poleRef       = useRef<(HTMLDivElement | null)[]>([])
  const scrollerRef   = useRef<Element | null>(null)

  const [charFrame, setCharFrame] = useState<0 | 1>(0)
  const [scrollProg, setScrollProg] = useState(0)
  const unlockedRef = useRef(false)
  const [unlocked, setUnlocked] = useState(false)
  const frameTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const startWalk = () => {
    if (frameTimer.current) return
    frameTimer.current = setInterval(() => setCharFrame(f => f === 0 ? 1 : 0), 135)
  }
  const stopWalk = () => {
    if (frameTimer.current) { clearInterval(frameTimer.current); frameTimer.current = null }
    setCharFrame(0)
  }

  useEffect(() => {
    const el = sectionRef.current?.closest('.sb-inner') as Element | null
    scrollerRef.current = el ?? null
  }, [])

  // ── THE REAL FIX ──────────────────────────────────────
  // Instead of intercepting wheel events on scroll area (which breaks page scroll),
  // we use pointer-events: none on the scroll area when locked.
  // The section itself gets the wheel event → bubbles to scroller → GSAP works.
  // When unlocked → pointer-events: auto → user can scroll freely.
  // Auto-scroll is done purely via scrollAreaRef.current.scrollTo() in GSAP callbacks.
  // ──────────────────────────────────────────────────────

  useEffect(() => {
    const scroller = scrollerRef.current ?? window
    const total    = ALL_YEARS.length

    const TITLE_SCROLL = 70
    const PER_YEAR     = 110
    const totalScroll  = TITLE_SCROLL + total * PER_YEAR
    const titleEnd     = TITLE_SCROLL / totalScroll
    const segSize      = PER_YEAR / totalScroll
    const lastYearPct  = titleEnd + segSize * total - 0.01

    const ctx = gsap.context(() => {
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: 'top top',
          end: `+=${totalScroll}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => {
            setScrollProg(self.progress)
            const should = self.progress >= lastYearPct
            if (unlockedRef.current !== should) {
              unlockedRef.current = should
              setUnlocked(should)
            }
          },
        },
      })

      master.to(titleRef.current, {
        scale: 14, opacity: 0, ease: 'power1.in', duration: titleEnd * 0.85,
      }, 0)

      master.fromTo(timelineRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: titleEnd * 0.3 },
        titleEnd * 0.72
      )

      gsap.set(charRef.current, { left: '1%' })

      ALL_YEARS.forEach((_year, i) => {
        const polePct  = ((i + 1) / (total + 1)) * 100
        const segStart = titleEnd + i * segSize
        const arriveAt = titleEnd + (i + 1) * segSize - 0.008

        master.to(charRef.current, {
          left: `calc(${polePct}% - ${PX * 7}px)`,
          ease: 'none',
          duration: arriveAt - segStart,
          onStart: startWalk,
          onComplete: stopWalk,
        }, segStart)

        master.to(yearLabelRef.current[i], { color: YELLOW, duration: 0.02 }, arriveAt)

        master.to(poleRef.current[i], {
          background: '#2e2e2e', height: `${PX * 10}px`, duration: 0.02,
        }, arriveAt)

        const groupEl = cardGroupRef.current[i]
        if (groupEl) {
          master.fromTo(groupEl,
            { opacity: 0, y: 8 },
            {
              opacity: 1, y: 0, ease: 'power2.out', duration: 0.04,
              onStart: () => {
                // programmatic scroll — no user event needed, works regardless of pointer-events
                const area = scrollAreaRef.current
                if (!area) return
                area.scrollTo({ top: Math.max(0, groupEl.offsetTop - 60), behavior: 'smooth' })
              },
            },
            arriveAt
          )

          const cards = groupEl.querySelectorAll('.wk-card')
          if (cards.length) {
            master.fromTo(cards,
              { opacity: 0, y: 5 },
              { opacity: 1, y: 0, ease: 'power2.out', duration: 0.03, stagger: 0.01 },
              arriveAt + 0.01
            )
          }
        }
      })
    }, sectionRef)

    return () => { ctx.revert(); stopWalk() }
  }, [])

  return (
    <>
      <style>{`
        @keyframes wkPulse {
          0%,100% { opacity:0.3; transform:translateY(0); }
          50%      { opacity:1;   transform:translateY(3px); }
        }
        #work ::-webkit-scrollbar { display:none; }

        .wk-scanlines {
          position:absolute; inset:0; pointer-events:none; z-index:1;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px
          );
        }

        .wk-tl-wrap {
          position:absolute; inset:0; z-index:3; opacity:0;
          display:flex; flex-direction:column;
          overflow:hidden; box-sizing:border-box;
        }

        .wk-header {
          display:flex; align-items:center; gap:10px;
          padding: clamp(1rem,2vh,1.6rem) clamp(1.2rem,5vw,4rem);
          flex-shrink:0;
        }

        /*
          ── THE KEY CSS FIX ──
          overflow-y: auto so DOM can scroll (needed for .scrollTo())
          pointer-events: none by default → wheel events fall through
            to the section/page → GSAP ScrollTrigger gets them → page scrolls
          pointer-events: auto only after unlocked → user can scroll freely
        */
        .wk-scroll-area {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0 clamp(2.5rem,5vw,4rem) 1rem clamp(1.2rem,5vw,4rem);
          scrollbar-width: none;
          overscroll-behavior: none;
          pointer-events: none;
        }
        .wk-scroll-area.unlocked {
          pointer-events: auto;
        }
        .wk-scroll-area::-webkit-scrollbar { display:none; }

        .wk-year-group { opacity:0; margin-bottom:1.6rem; }

        .wk-year-pill {
          display:inline-flex; align-items:center; gap:8px;
          font-family:'"Press Start 2P",monospace';
          font-size: clamp(0.48rem,1vw,0.68rem);
          color:${YELLOW}; letter-spacing:0.14em; margin-bottom:0.8rem;
        }
        .wk-year-pill::before {
          content:''; width:4px; height:4px;
          background:${YELLOW}; display:inline-block; flex-shrink:0;
        }

        .wk-card {
          opacity:0; display:flex; align-items:flex-start; gap:1.6rem;
          padding:1rem 0; border-top:1px solid #111;
          cursor:default;
          transition: background 0.2s ease, padding-left 0.2s ease;
        }
        .wk-card:hover { background:#0d0d0d; padding-left:0.6rem; }

        .wk-card-num  { font-family:monospace; font-size:10px; color:#1e1e1e; flex-shrink:0; padding-top:3px; min-width:22px; }
        .wk-card-body { flex:1; min-width:0; }
        .wk-card-title { font-size:clamp(0.82rem,1.7vw,1.05rem); font-weight:600; color:#fff; margin:0 0 0.28rem 0; word-break:break-word; }
        .wk-card-desc  { font-size:clamp(0.66rem,1.2vw,0.78rem); color:#424242; line-height:1.65; margin:0 0 0.6rem 0; }
        .wk-card-tags  { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:0.55rem; }
        .wk-card-tag   { font-family:monospace; font-size:9px; color:#303030; border:1px solid #191919; padding:2px 7px; white-space:nowrap; letter-spacing:0.06em; }
        .wk-card-links { display:flex; gap:12px; flex-wrap:wrap; }
        .wk-card-link  {
          font-family:monospace; font-size:10px; color:#505050;
          text-decoration:none; letter-spacing:0.12em; text-transform:uppercase;
          border-bottom:1px solid #202020; padding-bottom:1px;
          transition:color 0.2s,border-color 0.2s;
        }
        .wk-card-link:hover { color:${YELLOW}; border-color:${YELLOW}; }

        .wk-road {
          flex-shrink:0; position:relative;
          height:clamp(110px,20vh,175px);
          border-top:1px solid #0e0e0e; overflow:visible;
        }
        .wk-road-dash {
          position:absolute; left:0; right:0; bottom:42px; height:1px;
          background: repeating-linear-gradient(90deg,#161616 0px,#161616 14px,transparent 14px,transparent 28px);
        }
        .wk-road-ground { position:absolute; left:0; right:0; bottom:0; height:1px; background:#111; }
        .wk-pole {
          position:absolute; bottom:42px; width:1px; height:28px;
          background:#161616; transition:background 0.35s,height 0.35s;
        }
        .wk-road-year {
          position:absolute; bottom:80px; transform:translateX(-50%);
          font-family:monospace; font-size:clamp(9px,1.4vw,12px); color:#222;
          letter-spacing:0.2em; white-space:nowrap; transition:color 0.35s; user-select:none;
        }
        .wk-char { position:absolute; bottom:42px; z-index:5; image-rendering:pixelated; }

        @media (max-width:600px) {
          .wk-card { flex-direction:column; gap:0.35rem; padding:0.85rem 0; }
          .wk-scroll-area { padding:0 2.5rem 1rem 1.2rem; }
          .wk-header { padding:0.85rem 1.2rem; }
          .wk-road-year { font-size:8px; letter-spacing:0.08em; }
        }
      `}</style>

      <section
        id="work"
        ref={sectionRef}
        style={{ position:'relative', width:'100%', height:'100vh', overflow:'hidden', background:'#0a0a0a' }}
      >
        <div className="wk-scanlines" />
        <ScrollBar progress={scrollProg} />

        <div ref={titleRef} style={{
          position:'absolute', inset:0, zIndex:2,
          display:'flex', alignItems:'center', justifyContent:'center',
          pointerEvents:'none', willChange:'transform,opacity',
        }}>
          <h2 style={{
            fontFamily:'"Press Start 2P",monospace',
            fontSize:'clamp(2rem,7vw,7rem)',
            color:'#fff', letterSpacing:'-0.02em', lineHeight:1, margin:0,
          }}>MY WORK</h2>
        </div>

        <div ref={timelineRef} className="wk-tl-wrap">
          <div className="wk-header">
            <span style={{ fontFamily:'monospace', fontSize:'10px', color:'#202020', letterSpacing:'0.2em', textTransform:'uppercase' }}></span>
            <span style={{ fontFamily:'monospace', fontSize:'10px', color:'#202020', letterSpacing:'0.2em', textTransform:'uppercase' }}></span>
          </div>

          {/* pointer-events:none when locked, auto when unlocked */}
          <div
            ref={scrollAreaRef}
            className={`wk-scroll-area${unlocked ? ' unlocked' : ''}`}
          >
            <h2 style={{
              fontFamily:'"Press Start 2P",monospace',
              fontSize:'clamp(0.6rem,1.8vw,1rem)',
              color:'#fff', letterSpacing:'0.06em', margin:'0 0 1.6rem 0',
            }}>
              My Projects
            </h2>

            {ALL_YEARS.map((year, yi) => {
              const yearProjects = grouped[year] ?? []
              const prevCount = ALL_YEARS.slice(0, yi)
                .reduce((s, y) => s + (grouped[y]?.length ?? 0), 0)

              return (
                <div
                  key={year}
                  ref={el => { cardGroupRef.current[yi] = el }}
                  className="wk-year-group"
                >
                  <div className="wk-year-pill" style={{ fontFamily:'"Press Start 2P",monospace' }}>
                    {year}
                  </div>

                  {yearProjects.length === 0 ? (
                    <div style={{
                      fontFamily:'monospace', fontSize:'10px',
                      color:'#181818', letterSpacing:'0.1em',
                      padding:'0.4rem 0', borderTop:'1px solid #0e0e0e',
                    }}>
                      // nothing shipped yet.
                    </div>
                  ) : yearProjects.map((project, pi) => (
                    <div key={project.title} className="wk-card">
                      <span className="wk-card-num">{String(prevCount + pi + 1).padStart(2,'0')}</span>
                      <div className="wk-card-body">
                        <h3 className="wk-card-title">{project.title}</h3>
                        <p className="wk-card-desc">{project.description}</p>
                        <div className="wk-card-tags">
                          {project.tags.map(tag => <span key={tag} className="wk-card-tag">{tag}</span>)}
                        </div>
                        <div className="wk-card-links">
                          {project.links?.live && (
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="wk-card-link">Live ↗</a>
                          )}
                          {project.links?.github && (
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="wk-card-link">GitHub ↗</a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          <div className="wk-road">
            <div className="wk-road-dash" />
            <div className="wk-road-ground" />
            {ALL_YEARS.map((year, yi) => {
              const pct = ((yi + 1) / (ALL_YEARS.length + 1)) * 100
              return (
                <React.Fragment key={year}>
                  <div ref={el => { poleRef.current[yi] = el }} className="wk-pole" style={{ left:`${pct}%` }} />
                  <div ref={el => { yearLabelRef.current[yi] = el }} className="wk-road-year" style={{ left:`${pct}%` }}>{year}</div>
                </React.Fragment>
              )
            })}
            <div ref={charRef} className="wk-char">
              <PixelCharacter frame={charFrame} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
