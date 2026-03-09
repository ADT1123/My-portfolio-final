'use client'

import { useEffect, useRef, useState, type JSX } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const YELLOW = '#f9f97a'

const roles = [
  'Full Stack Developer',
  'Fast Learner',
  'Python Programmer',
]

const TERMINAL_LINES = [
  { cmd: 'npx create-next-app portfolio', delay: 0 },
  { cmd: '✓ Installing dependencies...', delay: 1200, dim: true },
  { cmd: 'git add . && git commit -m "init"', delay: 2800 },
  { cmd: '✓ 1 commit to main', delay: 3800, dim: true },
  { cmd: 'npm run dev', delay: 5200 },
  { cmd: '✓ Ready on localhost:3000', delay: 6200, dim: true },
  { cmd: "echo \"Let's build something.\"", delay: 7600 },
  { cmd: "> Let's build something.", delay: 8400, dim: true },
]

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; overflow-x: hidden; }

  .nav-link {
    position: relative;
    transition: color 0.2s ease;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: -2px;
    height: 1.5px; width: 0%;
    background: linear-gradient(90deg, ${YELLOW}, transparent);
    transition: width 0.28s cubic-bezier(0.76,0,0.24,1);
  }
  .nav-link:hover { color: #ffffff !important; }
  .nav-link:hover::after { width: 100%; }

  .hamburger span {
    display: block;
    width: 22px; height: 1.5px;
    background: #fff;
    transition: all 0.25s ease;
    transform-origin: center;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

  /* ── Desktop layout ── */
  .hero-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 100vh;
    gap: 2rem;
    padding: 80px clamp(1.2rem, 5vw, 6rem) 2.5rem;
    overflow: hidden;
  }
  .hero-left {
    flex-shrink: 0;
    max-width: 500px;
    width: 100%;
    overflow: hidden;
  }
  .hero-terminal {
    flex: 1;
    max-width: 420px;
    height: 300px;
  }

  /* Desktop title size — controlled by inline clamp */
  .hero-title {
    font-size: clamp(1rem, 3.2vw, 2rem);
  }

  .hero-scroll-desktop { display: flex; align-items: center; gap: 12px; margin-top: 2rem; }
  .hero-scroll-mobile  { display: none; }

  .nav-desktop-links { display: flex; }
  .nav-cta           { display: flex; }
  .nav-hamburger     { display: none; }
  .nav-mobile-menu   { display: none; pointer-events: none; }

  /* ── Mobile layout ── */
  @media (max-width: 768px) {
    .nav-desktop-links { display: none !important; }
    .nav-cta           { display: none !important; }
    .nav-hamburger     { display: flex !important; }
    .nav-mobile-menu   { display: flex !important; }

    .hero-inner {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      min-height: 100vh;
      padding: 88px 1.2rem 2rem;
      gap: 1.2rem;
      overflow: hidden;
      text-align: left;
    }

    /* Name + role — LEFT aligned on mobile */
    .hero-left {
      max-width: 100%;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    /* ── BIGGER font for "Aditya Thukral." on mobile ── */
    .hero-title {
      font-size: clamp(1.6rem, 7vw, 2.6rem) !important;
    }

    /* Terminal — full width, LEFT aligned */
    .hero-terminal {
      width: 100%;
      max-width: 100%;
      height: 220px;
      flex: none;
    }

    /* SCROLL — hide desktop, show mobile below terminal */
    .hero-scroll-desktop { display: none !important; }
    .hero-scroll-mobile  {
      display: flex !important;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      width: 100%;
    }
  }
`

// ── SQUIGGLE ───────────────────────────────────────────
function Squiggle({ children }: { children: string }): JSX.Element {
  return (
    <span style={{ position: 'relative', display: 'inline-block', color: YELLOW }}>
      {children}
      <svg
        style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '6px', overflow: 'visible' }}
        viewBox="0 0 100 6" preserveAspectRatio="none"
      >
        <path
          d="M0,3 Q5,0 10,3 Q15,6 20,3 Q25,0 30,3 Q35,6 40,3 Q45,0 50,3 Q55,6 60,3 Q65,0 70,3 Q75,6 80,3 Q85,0 90,3 Q95,6 100,3"
          fill="none" stroke="#d5fb00" strokeWidth="1.5" strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

// ── ABOUT CONTENT ──────────────────────────────────────
function AboutContent(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const lines = ref.current?.querySelectorAll('[data-line]')
    if (!lines) return
    gsap.fromTo(lines,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power2.out', delay: 0.2 }
    )
  }, [])
  return (
    <div ref={ref} style={{ maxWidth: '680px', width: '100%', padding: '0 clamp(1rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <p data-line style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 'clamp(0.6rem, 1.6vw, 1.1rem)', color: '#fff', lineHeight: 2, margin: 0 }}>
        I&apos;m <Squiggle>Aditya</Squiggle> — an{' '}
        <Squiggle>Aspiring Software Developer</Squiggle> focused on building
      </p>
      <p data-line style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 'clamp(0.6rem, 1.6vw, 1.1rem)', color: '#fff', lineHeight: 2, margin: 0 }}>
        <Squiggle>well engineered products</Squiggle>, that actually{' '}
        <Squiggle>work.</Squiggle>
      </p>
      <p data-line style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 'clamp(0.6rem, 1.6vw, 1.1rem)', color: '#fff', lineHeight: 2, margin: 0 }}>
        Passionate about <Squiggle>software engineering</Squiggle> and building things that matter.
      </p>
      <div data-line style={{ width: '100%', height: 1, background: '#1a1a1a', margin: '1.2rem 0' }} />
      <p data-line style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#c0c0c0', lineHeight: 1.8, margin: 0, letterSpacing: '0.04em' }}>
        // git commit -m{' '}
        <span style={{ color: '#cdfb00' }}>&apos;trying my best&apos;</span>. No cap.
      </p>
    </div>
  )
}

// ── NAVBAR ─────────────────────────────────────────────
function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = ['Work', 'About', 'Services', 'Contact']

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
        height: '60px', padding: '0 clamp(1rem, 4vw, 3rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'linear-gradient(to bottom, rgba(10,10,10,0.92), transparent)',
        borderBottom: scrolled ? '1px solid #1a1a1a' : '1px solid transparent',
        backdropFilter: 'blur(14px)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.95rem', color: '#fff', letterSpacing: '0.08em', userSelect: 'none', flexShrink: 0 }}>
          AT<span style={{ color: YELLOW }}>.</span>
        </span>
        <div className="nav-desktop-links" style={{ alignItems: 'center', gap: '2.5rem' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ fontFamily: 'monospace', fontSize: '11px', color: '#666', textDecoration: 'none', letterSpacing: '0.2em', textTransform: 'uppercase', paddingBottom: '2px' }}>
              {l}
            </a>
          ))}
        </div>
        <button
          className={`nav-hamburger hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: '5px', padding: '4px', zIndex: 101 }}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>
      <div className="nav-mobile-menu" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99,
        background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(16px)',
        padding: '80px 1.5rem 2rem', flexDirection: 'column', gap: '0.4rem',
        borderBottom: '1px solid #1a1a1a',
        transform: menuOpen ? 'translateY(0)' : 'translateY(-110%)',
        transition: 'transform 0.35s cubic-bezier(0.76,0,0.24,1)',
        pointerEvents: menuOpen ? 'all' : 'none',
      }} />
    </>
  )
}

// ── LIVE TERMINAL ──────────────────────────────────────
function LiveTerminal(): JSX.Element {
  const [lines, setLines] = useState<{ cmd: string; dim?: boolean }[]>([])
  const [cursor, setCursor] = useState(true)
  const cycleRef = useRef(0)

  useEffect(() => {
    const run = () => {
      setLines([])
      const timers: ReturnType<typeof setTimeout>[] = []
      TERMINAL_LINES.forEach(line => {
        timers.push(setTimeout(
          () => setLines(prev => [...prev, { cmd: line.cmd, dim: line.dim }]),
          line.delay
        ))
      })
      timers.push(setTimeout(run, 10500))
      cycleRef.current = timers[timers.length - 1] as unknown as number
    }
    run()
    const blink = setInterval(() => setCursor(c => !c), 530)
    return () => { clearInterval(blink); clearTimeout(cycleRef.current) }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '8px', overflow: 'hidden', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px 14px', background: '#161616', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map(c => (
          <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0 }} />
        ))}
        <span style={{ color: YELLOW, fontSize: 11, marginLeft: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Aditya @ my-code-works ~ trust 💀 ~
        </span>
      </div>
      <div style={{ padding: '14px', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.dim ? '#444' : '#22c55e', fontSize: 11, marginBottom: 6, lineHeight: 1.6, wordBreak: 'break-all' }}>
            {!l.dim && <span style={{ color: '#555', marginRight: 8 }}>$</span>}
            {l.cmd}
          </div>
        ))}
        <span style={{ color: '#22c55e', fontSize: 11 }}>
          $ <span style={{ opacity: cursor ? 1 : 0 }}>█</span>
        </span>
      </div>
    </div>
  )
}

// ── CYCLING ROLE ───────────────────────────────────────
function CyclingRole(): JSX.Element {
  const [index, setIndex] = useState(0)
  const [anim, setAnim] = useState<'idle' | 'out' | 'in'>('idle')

  useEffect(() => {
    const interval = setInterval(() => {
      setAnim('out')
      setTimeout(() => {
        setIndex(prev => (prev + 1) % roles.length)
        setAnim('in')
        setTimeout(() => setAnim('idle'), 350)
      }, 320)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const transforms: Record<string, string> = {
    idle: 'translateY(0) rotateX(0deg)',
    out:  'translateY(-50%) rotateX(-90deg)',
    in:   'translateY(50%) rotateX(90deg)',
  }

  return (
    <div style={{ overflow: 'hidden', height: '1.6em', marginBottom: '1.5rem', perspective: '500px', maxWidth: '100%' }}>
      <p style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize: 'clamp(0.42rem, 1.1vw, 0.6rem)',
        color: YELLOW, whiteSpace: 'nowrap', display: 'inline-block',
        transform: transforms[anim], opacity: anim === 'idle' ? 1 : 0,
        transition: 'transform 0.32s cubic-bezier(0.76,0,0.24,1), opacity 0.2s ease',
        transformOrigin: 'center center', margin: 0,
        maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {roles[index]}
      </p>
    </div>
  )
}

// ── SCRAMBLE TITLE ─────────────────────────────────────
function ScrambleTitle(): JSX.Element {
  const text = 'Aditya Thukral.'
  const ref  = useRef<HTMLHeadingElement>(null)
  const [running, setRunning] = useState(false)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => () => { tlRef.current?.kill() }, [])

  const handleHover = () => {
    if (running || !ref.current) return
    setRunning(true)
    const chars = Array.from(ref.current.querySelectorAll<HTMLSpanElement>('[data-char]'))
    const tl = gsap.timeline({ onComplete: () => { tlRef.current = null; setRunning(false) } })
    tl.to(chars, { duration: 0.4, x: () => gsap.utils.random(-8, 8), y: () => gsap.utils.random(-8, 8), rotation: () => gsap.utils.random(-25, 25), ease: 'power2.out', stagger: { each: 0.01, from: 'random' } })
    tl.to({}, { duration: 1.2 })
    tl.to(chars, { duration: 0.4, x: 0, y: 0, rotation: 0, ease: 'power2.inOut', stagger: { each: 0.01, from: 'random' } }, '>-0.35')
    tlRef.current = tl
  }

  return (
    <h1
      ref={ref}
      className="hero-title"   /* ← class added for mobile font override */
      onMouseEnter={handleHover}
      style={{
        fontFamily: '"Press Start 2P", monospace',
        color: '#fff',
        lineHeight: 1.45,
        cursor: 'default',
        marginBottom: '0.7rem',
        marginTop: 0,
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      }}
    >
      {text.split('').map((ch, i) =>
        ch === ' '
          ? <span key={i}>&nbsp;</span>
          : <span key={i} data-char style={{ display: 'inline-block', willChange: 'transform' }}>{ch}</span>
      )}
    </h1>
  )
}

// ── SCROLL INDICATOR ───────────────────────────────────
function ScrollIndicator({ className }: { className: string }): JSX.Element {
  return (
    <div className={className}>
      <div style={{ width: 28, height: 1, background: '#333', flexShrink: 0 }} />
      <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        SCROLL
      </span>
    </div>
  )
}

// ── HERO CONTENT ───────────────────────────────────────
function HeroContent(): JSX.Element {
  return (
    <div className="hero-inner">
      <div className="hero-left">
        <ScrambleTitle />
        <CyclingRole />
        <ScrollIndicator className="hero-scroll-desktop" />
      </div>
      <div className="hero-terminal">
        <LiveTerminal />
      </div>
      <ScrollIndicator className="hero-scroll-mobile" />
    </div>
  )
}

// ── HERO (ROOT) ────────────────────────────────────────
export default function Hero(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef      = useRef<HTMLDivElement>(null)
  const rightRef     = useRef<HTMLDivElement>(null)
  const aboutRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top', end: '+=100%',
          pin: true, scrub: 1, anticipatePin: 1,
        },
      })
      tl.to(leftRef.current,  { xPercent: -100, ease: 'power2.inOut', duration: 1 }, 0)
      tl.to(rightRef.current, { xPercent:  100, ease: 'power2.inOut', duration: 1 }, 0)
      tl.fromTo(aboutRef.current, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 1 }, 0)
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div ref={containerRef} id="hero" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}>
        <Navbar />
        <div ref={aboutRef} id="about" style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
          <AboutContent />
        </div>
        <div ref={leftRef} style={{ position: 'absolute', inset: 0, zIndex: 2, clipPath: 'inset(0 50% 0 0)', background: '#0a0a0a', willChange: 'transform', overflow: 'hidden' }}>
          <HeroContent />
        </div>
        <div ref={rightRef} style={{ position: 'absolute', inset: 0, zIndex: 2, clipPath: 'inset(0 0 0 50%)', background: '#0a0a0a', willChange: 'transform', overflow: 'hidden' }}>
          <HeroContent />
        </div>
      </div>
    </>
  )
}
