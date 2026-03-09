import { useEffect, useRef, useState, type JSX } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef  = useRef<HTMLDivElement>(null)
  const nameRef      = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate() {
        const v = Math.round(this.targets()[0].val)
        setCount(v)
        if (progressRef.current) progressRef.current.style.width = `${v}%`
      },
    })

    tl.to([nameRef.current, progressRef.current?.parentElement], {
      opacity: 0,
      y: -16,
      duration: 0.5,
      ease: 'power2.in',
    }, '+=0.2')

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete,
    }, '-=0.1')

    return () => { tl.kill() }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        // ✅ pixelated rendering on the entire preloader
        imageRendering: 'pixelated',
        fontSmooth: 'never',
        WebkitFontSmoothing: 'none',
        MozOsxFontSmoothing: 'unset',
      }}
    >
      {/* ── Name ── */}
      <div
        ref={nameRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 'clamp(1rem, 3vw, 1.6rem)',
            color: '#ffffff',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            // ✅ pixelated text — no smoothing
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'unset',
            textRendering: 'optimizeSpeed',
          }}
        >
          Aditya Thukral
        </span>
      </div>

      {/* ── Progress bar + percent ── */}
      <div
        style={{
          width: 'clamp(200px, 40vw, 520px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {/* Track */}
        <div
          style={{
            width: '100%',
            height: '3px',              // ✅ slightly bold — was 1px
            background: '#1a1a1a',
            position: 'relative',
            overflow: 'hidden',
            imageRendering: 'pixelated',
          }}
        >
          {/* Fill */}
          <div
            ref={progressRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '0%',
              background: '#f9f97a',
              transition: 'width 0.05s linear',
              imageRendering: 'pixelated',
            }}
          />
        </div>

        {/* Percent row */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: '"Press Start 2P", monospace',  // ✅ pixelated font
              fontSize: '8px',
              color: '#ffffff',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'unset',
            }}
          >
            Loading
          </span>
          <span
            style={{
              fontFamily: '"Press Start 2P", monospace',  // ✅ pixelated font
              fontSize: '8px',
              color: '#f9f97a',
              letterSpacing: '0.1em',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'unset',
            }}
          >
            {count}%
          </span>
        </div>
      </div>
    </div>
  )
}
