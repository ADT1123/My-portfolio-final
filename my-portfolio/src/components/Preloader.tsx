import { useEffect, useRef, useState, type JSX } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

const TERMINAL_LINES = [
  { text: '> cd Portfolio', delay: 0,    color: '#7af985' },
  { text: '> npm run dev',         delay: 0.9,  color: '#85f97a' },
  { text: '',                      delay: 1.5,  color: '#555' },
  { text: '  VITE v5.4.0  ready', delay: 1.6,  color: '#22c55e' },
  { text: '',                      delay: 2.0,  color: '#555' },
  { text: '  ➜  Local:   http://localhost:8000/', delay: 2.1, color: '#7dd3fc' },
  { text: '  ➜  Network: http://192.168.1.1:8000/', delay: 2.4, color: '#555' },
]

export default function Preloader({ onComplete }: PreloaderProps): JSX.Element {
  const containerRef  = useRef<HTMLDivElement>(null)
  const progressRef   = useRef<HTMLDivElement>(null)
  const nameRef       = useRef<HTMLDivElement>(null)
  const terminalRef   = useRef<HTMLDivElement>(null)
  const cursorRef     = useRef<HTMLSpanElement>(null)

  const [count, setCount]           = useState(0)
  const [visibleLines, setVisible]  = useState<number[]>([])
  const [showMain, setShowMain]     = useState(false)
  const [typedLines, setTyped]      = useState<Record<number, string>>({})

  // ── Step 1: type terminal lines ────────────────────────
  useEffect(() => {
    let cancelled = false

    async function typeAll() {
      for (let i = 0; i < TERMINAL_LINES.length; i++) {
        const line = TERMINAL_LINES[i]
        await new Promise(r => setTimeout(r, line.delay * 1000 - (TERMINAL_LINES[i - 1]?.delay ?? 0) * 1000))
        if (cancelled) return

        setVisible(prev => [...prev, i])

        // type effect only for command lines
        if (line.text.startsWith('>')) {
          for (let c = 0; c <= line.text.length; c++) {
            if (cancelled) return
            await new Promise(r => setTimeout(r, 38))
            setTyped(prev => ({ ...prev, [i]: line.text.slice(0, c) }))
          }
        } else {
          setTyped(prev => ({ ...prev, [i]: line.text }))
        }
      }

      // after terminal done — show main loader
      await new Promise(r => setTimeout(r, 400))
      if (!cancelled) setShowMain(true)
    }

    typeAll()
    return () => { cancelled = true }
  }, [])

  // ── Step 2: progress bar after terminal ────────────────
  useEffect(() => {
    if (!showMain) return

    // fade terminal out
    gsap.to(terminalRef.current, {
      opacity: 0, y: -12, duration: 0.45, ease: 'power2.in',
    })

    const tl = gsap.timeline()

    tl.fromTo(nameRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )

    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate() {
        const v = Math.round(this.targets()[0].val)
        setCount(v)
        if (progressRef.current) progressRef.current.style.width = `${v}%`
      },
    }, '-=0.1')

    tl.to([nameRef.current, progressRef.current?.parentElement?.parentElement], {
      opacity: 0, y: -16, duration: 0.5, ease: 'power2.in',
    }, '+=0.2')

    tl.to(containerRef.current, {
      yPercent: -100, duration: 0.9, ease: 'power4.inOut', onComplete,
    }, '-=0.1')

    return () => { tl.kill() }
  }, [showMain])

  // ── cursor blink ───────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      if (cursorRef.current)
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === '0' ? '1' : '0'
    }, 530)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        imageRendering: 'pixelated',
        WebkitFontSmoothing: 'none',
      }}
    >
      {/* ── TERMINAL ─────────────────────────────────── */}
      <div
        ref={terminalRef}
        style={{
          position: 'absolute',
          width: 'clamp(280px, 88vw, 560px)',
          display: showMain ? 'none' : 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* terminal titlebar */}
        <div style={{
          background: '#1a1a1a',
          border: '1px solid #222',
          borderBottom: 'none',
          padding: '7px 12px',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
          <span style={{
            fontFamily: 'monospace', fontSize: '10px', color: '#444',
            letterSpacing: '0.12em', marginLeft: '8px',
          }}>
            terminal — zsh
          </span>
        </div>

        {/* terminal body */}
        <div style={{
          background: '#0d0d0d',
          border: '1px solid #222',
          padding: 'clamp(10px, 2vw, 18px) clamp(12px, 2.5vw, 20px)',
          minHeight: 'clamp(140px, 20vh, 200px)',
          fontFamily: '"Courier New", "Fira Code", monospace',
          fontSize: 'clamp(10px, 2.2vw, 13px)',
          lineHeight: 1.85,
        }}>
          {TERMINAL_LINES.map((line, i) => (
            visibleLines.includes(i) && (
              <div key={i} style={{ color: line.color, whiteSpace: 'pre' }}>
                {typedLines[i] ?? ''}
                {/* blinking cursor on last visible command line */}
                {i === Math.max(...visibleLines) && line.text.startsWith('>') && (
                  <span ref={cursorRef} style={{ color: '#f9f97a', transition: 'opacity 0.1s' }}>█</span>
                )}
              </div>
            )
          ))}
          {/* idle cursor after all lines typed */}
          {visibleLines.length === TERMINAL_LINES.length && (
            <div style={{ color: '#555' }}>
              <span ref={cursorRef} style={{ color: '#f9f97a' }}>█</span>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN LOADER (name + progress) ────────────── */}
      <div
        ref={nameRef}
        style={{
          display: showMain ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          opacity: 0,
          width: 'clamp(200px, 80vw, 520px)',
        }}
      >
        {/* name */}
        <span style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 'clamp(0.85rem, 3vw, 1.6rem)',
          color: '#ffffff',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          WebkitFontSmoothing: 'none',
        }}>
          Aditya Thukral
        </span>

        {/* progress */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{
            width: '100%', height: '3px',
            background: '#1a1a1a', position: 'relative', overflow: 'hidden',
          }}>
            <div
              ref={progressRef}
              style={{
                position: 'absolute', top: 0, left: 0,
                height: '100%', width: '0%',
                background: '#f9f97a',
                transition: 'width 0.05s linear',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 'clamp(6px, 1.5vw, 8px)',
              color: '#ffffff', letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>
              Loading
            </span>
            <span style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 'clamp(6px, 1.5vw, 8px)',
              color: '#f9f97a', letterSpacing: '0.1em',
            }}>
              {count}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
