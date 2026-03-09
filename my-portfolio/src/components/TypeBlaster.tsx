'use client'

import { useEffect, useRef, useState, type JSX } from 'react'

const WORDS = [
  'react', 'typescript', 'node', 'async', 'await',
  'promise', 'deploy', 'refactor', 'commit', 'backend',
  'frontend', 'socket', 'express', 'database', 'props',
  'state', 'hook', 'api', 'bug', 'feature', 'merge',
  'rebase', 'webpack', 'vite', 'docker', 'mongodb', 'javascript',
]

const ROASTS = [
  "skill issue. massive skill issue. 💀",
  "your keyboard is fine. you are not.",
  "You lost to a falling text. falling. text.",
  "npm run skill — module not found.",
  "404: talent not found.",
  "even ChatGPT types faster than you.",
  "git push origin L",
  "you just failed a typing interview. No worries mate",
  "touch grass. then try again.",
]

interface Word {
  id: number
  text: string
  typed: number
  x: number
  y: number
  speed: number
  active: boolean
  dying: boolean
}

export default function TypeBlaster(): JSX.Element {
  const [displayLives, setDisplayLives] = useState(3)
  const [displayScore, setDisplayScore] = useState(0)
  const [displayWords, setDisplayWords] = useState<Word[]>([])
  const [phase, setPhase]               = useState<'idle' | 'playing' | 'over'>('idle')
  const [roast, setRoast]               = useState('')
  const [inputVal,   setInputVal]       = useState('')
  const [inputShake, setInputShake]     = useState(false)
  const [inputError, setInputError]     = useState(false)

  const livesRef    = useRef(3)
  const scoreRef    = useRef(0)
  const wordsRef    = useRef<Word[]>([])
  const nextId      = useRef(0)
  const rafRef      = useRef<number | null>(null)
  const lastT       = useRef(0)
  const spawnTimer  = useRef(0)
  const phaseRef    = useRef<'idle' | 'playing' | 'over'>('idle')
  const inputRef    = useRef<HTMLInputElement>(null)

  const getSpeed = (score: number) => {
    if (score >= 40) return 0.9
    if (score >= 25) return 0.72
    if (score >= 15) return 0.58
    if (score >= 8)  return 0.46
    return 0.34
  }

  const getInterval = (score: number) => {
    if (score >= 40) return 600
    if (score >= 25) return 750
    if (score >= 15) return 950
    if (score >= 8)  return 1150
    return 1400
  }

  const spawnWord = () => {
    const text  = WORDS[Math.floor(Math.random() * WORDS.length)]
    const id    = nextId.current++
    const x     = 8 + Math.random() * 84
    const speed = getSpeed(scoreRef.current)
    wordsRef.current = [...wordsRef.current, {
      id, text, typed: 0, x, y: -4, speed, active: false, dying: false,
    }]
  }

  const endGame = () => {
    if (phaseRef.current === 'over') return
    phaseRef.current = 'over'
    setPhase('over')
    setRoast(ROASTS[Math.floor(Math.random() * ROASTS.length)])
    setInputVal('')
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }

  const startGame = () => {
    livesRef.current   = 3
    scoreRef.current   = 0
    wordsRef.current   = []
    nextId.current     = 0
    spawnTimer.current = 0
    lastT.current      = performance.now()
    phaseRef.current   = 'playing'
    setDisplayLives(3)
    setDisplayScore(0)
    setDisplayWords([])
    setPhase('playing')
    setRoast('')
    setInputVal('')
    setInputError(false)
    setInputShake(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // ── Game loop ──────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return
    const loop = (t: number) => {
      if (phaseRef.current !== 'playing') return
      const delta = Math.min(t - lastT.current, 80)
      lastT.current   = t
      spawnTimer.current += delta
      if (spawnTimer.current >= getInterval(scoreRef.current)) {
        spawnTimer.current = 0
        spawnWord()
      }
      let missed = 0
      wordsRef.current = wordsRef.current.map(w => {
        if (w.dying) return w
        // stop at 78% so words don't go behind input bar
        const newY = w.y + w.speed * (delta / 16.67)
        if (newY >= 78) {
          missed++
          const wid = w.id
          setTimeout(() => {
            wordsRef.current = wordsRef.current.filter(x => x.id !== wid)
            setDisplayWords([...wordsRef.current])
          }, 500)
          return { ...w, y: 78, dying: true }
        }
        return { ...w, y: newY }
      })
      if (missed > 0) {
        livesRef.current = Math.max(0, livesRef.current - missed)
        setDisplayLives(livesRef.current)
        if (livesRef.current <= 0) {
          setDisplayWords([...wordsRef.current])
          endGame()
          return
        }
      }
      setDisplayWords([...wordsRef.current])
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [phase])

  // ── Core typing logic ─────────────────────────────────
  const processKey = (key: string) => {
    if (phaseRef.current !== 'playing') return
    if (key.length !== 1 || !/[a-zA-Z]/.test(key)) return
    const k = key.toLowerCase()
    const ws = wordsRef.current.filter(w => !w.dying)

    let target = ws.find(w => w.active && w.text[w.typed]?.toLowerCase() === k)
    if (!target) {
      const candidates = ws.filter(w => !w.active && w.text[w.typed]?.toLowerCase() === k)
      target = candidates.sort((a, b) => b.y - a.y)[0]
    }

    if (!target) {
      setInputError(true)
      setInputShake(true)
      setInputVal('')
      setTimeout(() => { setInputShake(false); setInputError(false) }, 420)
      wordsRef.current = wordsRef.current.map(w => ({ ...w, active: false, typed: 0 }))
      return
    }

    const newTyped = target.typed + 1
    if (newTyped >= target.text.length) {
      wordsRef.current = wordsRef.current.filter(w => w.id !== target!.id)
      scoreRef.current++
      setDisplayScore(scoreRef.current)
      setInputVal('')
    } else {
      wordsRef.current = wordsRef.current.map(w =>
        w.id === target!.id
          ? { ...w, typed: newTyped, active: true }
          : { ...w, active: false }
      )
      setInputVal(target.text.slice(0, newTyped))
    }
  }

  // ── Physical keyboard ─────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) return
      processKey(e.key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  // ── Mobile input ──────────────────────────────────────
  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typed = e.target.value.slice(-1)
    if (typed) processKey(typed)
    e.target.value = ''
  }

  const livesFilled = Math.max(0, displayLives)

  return (
    <>
      <style>{`
        @keyframes tb-explode-0{0%{opacity:1;transform:translate(0,0) rotate(0deg)}100%{opacity:0;transform:translate(-20px,-25px) rotate(-45deg)}}
        @keyframes tb-explode-1{0%{opacity:1;transform:translate(0,0) rotate(0deg)}100%{opacity:0;transform:translate(15px,-20px) rotate(35deg)}}
        @keyframes tb-explode-2{0%{opacity:1;transform:translate(0,0) rotate(0deg)}100%{opacity:0;transform:translate(-5px,-30px) rotate(15deg)}}
        @keyframes tb-explode-3{0%{opacity:1;transform:translate(0,0) rotate(0deg)}100%{opacity:0;transform:translate(22px,-12px) rotate(-25deg)}}
        @keyframes tb-explode-4{0%{opacity:1;transform:translate(0,0) rotate(0deg)}100%{opacity:0;transform:translate(-25px,-8px) rotate(55deg)}}
        @keyframes tb-explode-5{0%{opacity:1;transform:translate(0,0) rotate(0deg)}100%{opacity:0;transform:translate(10px,-28px) rotate(-60deg)}}
        @keyframes tb-blink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes tb-shake{
          0%{transform:translateX(0)}
          20%{transform:translateX(-6px)}
          40%{transform:translateX(6px)}
          60%{transform:translateX(-4px)}
          80%{transform:translateX(4px)}
          100%{transform:translateX(0)}
        }
        @media (max-width: 480px) {
          .tb-word { font-size: 7px !important; }
        }
      `}</style>

      <section
        id="type-blaster"
        style={{
          width: '100%',
          minHeight: '80vh',
          background: '#050505',
          borderTop: '1px solid #161616',
          borderBottom: '1px solid #161616',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(0.75rem, 3vw, 2rem)',
          boxSizing: 'border-box',
          color: '#fff',
        }}
      >
        <h2 style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: 'clamp(0.6rem, 2.5vw, 1.4rem)',
          letterSpacing: '0.08em',
          marginBottom: '0.6rem',
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          LET'S PLAY A GAME NOW
        </h2>
        <p style={{
          fontSize: 'clamp(0.65rem, 1.5vw, 0.78rem)',
          color: '#555',
          maxWidth: 400,
          textAlign: 'center',
          marginBottom: '1.5rem',
          lineHeight: 1.8,
        }}>
          Blast the falling words by typing them. Miss 3 and you&apos;re cooked. Understood the rules?   
        </p>

        {/* ── Game box ── */}
        <div style={{
          position: 'relative',
          width: 'min(680px, 100%)',
          height: 'clamp(340px, 55vw, 460px)',
          borderRadius: '16px',
          border: '1px solid #1c1c1c',
          background: '#000',
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(255,255,255,0.02), 0 20px 60px rgba(0,0,0,0.8)',
        }}>

          {/* Scanlines */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          }} />

          {/* HUD */}
          <div style={{
            position: 'absolute', top: 10, left: 14, right: 14,
            display: 'flex', justifyContent: 'space-between',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '9px', color: '#555', zIndex: 4,
          }}>
            <span style={{ color: '#888' }}>{String(displayScore).padStart(4, '0')}</span>
            <span style={{ letterSpacing: '6px', fontSize: '11px' }}>
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} style={{ color: i < livesFilled ? '#ffffff' : '#222' }}>♥</span>
              ))}
            </span>
          </div>

          {/* Ground line — sits just above input bar */}
          <div style={{
            position: 'absolute', left: 0, right: 0,
            bottom: phase === 'playing' ? 52 : 30,
            height: '1px', background: '#1a1a1a', zIndex: 2,
            transition: 'bottom 0.2s ease',
          }} />

          {/* Words */}
          {displayWords.map(word => (
            <div
              key={word.id}
              className="tb-word"
              style={{
                position: 'absolute',
                left: `${word.x}%`,
                top: `${word.y}%`,
                transform: 'translateX(-50%)',
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '9px',
                whiteSpace: 'nowrap',
                zIndex: 3,
                display: 'flex',
                filter: word.active ? 'drop-shadow(0 0 6px rgba(255,255,255,0.5))' : 'none',
              }}
            >
              {word.dying ? (
                word.text.split('').map((char, i) => (
                  <span key={i} style={{
                    display: 'inline-block',
                    color: '#ff2222',
                    animation: `tb-explode-${i % 6} 0.45s ease-out forwards`,
                    opacity: 0,
                  }}>{char}</span>
                ))
              ) : (
                <>
                  <span style={{ color: '#fff' }}>{word.text.slice(0, word.typed)}</span>
                  {word.active && word.typed < word.text.length && (
                    <span style={{ color: '#fff', textDecoration: 'underline', opacity: 0.9 }}>
                      {word.text[word.typed]}
                    </span>
                  )}
                  <span style={{ color: word.active ? '#666' : '#333' }}>
                    {word.active
                      ? word.text.slice(word.typed + 1)
                      : word.text.slice(word.typed)}
                  </span>
                </>
              )}
            </div>
          ))}

          {/* ── Input bar — INSIDE game box, pinned to bottom ── */}
          {phase === 'playing' && (
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              background: 'rgba(0,0,0,0.95)',
              borderTop: '1px solid #111',
              boxSizing: 'border-box',
              height: '50px',
            }}>
              {/* Hidden real input — captures keyboard on mobile */}
              <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                onChange={handleMobileInput}
                aria-label="Type here"
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: 1,
                  height: 1,
                  pointerEvents: 'none',
                  top: 0, left: 0,
                }}
              />

              {/* Visual typed display */}
              <div style={{
                flex: 1,
                height: '32px',
                background: '#0a0a0a',
                border: `1px solid ${inputError ? '#ff2222' : inputVal ? '#333' : '#1a1a1a'}`,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '9px',
                letterSpacing: '0.12em',
                boxShadow: inputError ? '0 0 10px rgba(255,34,34,0.2)' : 'none',
                animation: inputShake ? 'tb-shake 0.38s ease' : 'none',
                transition: 'border-color 0.15s',
                minWidth: 0,
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}>
                {inputVal
                  ? <span style={{ color: '#fff' }}>{inputVal}</span>
                  : <span style={{ color: '#1e1e1e' }}>_ _ _</span>
                }
                {!inputError && (
                  <span style={{
                    display: 'inline-block',
                    width: '2px', height: '11px',
                    background: inputVal ? '#fff' : '#2a2a2a',
                    marginLeft: '4px',
                    animation: 'tb-blink 0.9s infinite',
                    verticalAlign: 'middle',
                    borderRadius: '1px',
                    flexShrink: 0,
                  }} />
                )}
              </div>

              {/* TAP button — mobile keyboard trigger */}
              <button
                onClick={() => inputRef.current?.focus()}
                aria-label="Tap to type"
                style={{
                  height: '32px',
                  padding: '0 12px',
                  background: '#0f0f0f',
                  border: '1px solid #1e1e1e',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: '#444',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.1em',
                  flexShrink: 0,
                  transition: 'border-color 0.15s, color 0.15s',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#444' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#444'; e.currentTarget.style.borderColor = '#1e1e1e' }}
              >
                TAP ⌨
              </button>
            </div>
          )}

          {/* Overlay — idle / game over */}
          {phase !== 'playing' && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 10,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.92)',
              padding: '2rem',
              textAlign: 'center',
            }}>
              {phase === 'over' ? (
                <>
                  <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 'clamp(10px, 3vw, 14px)', color: '#ff2222', marginBottom: '0.6rem', letterSpacing: '0.1em' }}>
                    GAME OVER
                  </p>
                  <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 'clamp(8px, 2vw, 10px)', color: '#fff', marginBottom: '0.4rem' }}>
                    SCORE: {String(displayScore).padStart(4, '0')}
                  </p>
                  <p style={{ fontFamily: 'monospace', fontSize: 'clamp(10px, 2vw, 11px)', color: '#ff4444', marginBottom: '1.6rem', maxWidth: '300px', lineHeight: 1.7 }}>
                    {roast}
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 'clamp(8px, 2vw, 12px)', color: '#fff', marginBottom: '0.5rem', letterSpacing: '0.08em', animation: 'tb-blink 1.4s infinite' }}>
                    TYPE BLASTER
                  </p>
                  <p style={{ fontFamily: 'monospace', fontSize: 'clamp(10px, 2vw, 11px)', color: '#444', marginBottom: '1.6rem', maxWidth: '280px', lineHeight: 1.8 }}>
                    type the words before they hit the ground.<br />
                    miss 3 → fired.
                  </p>
                </>
              )}
              <button
                onClick={startGame}
                style={{
                  fontFamily: '"Press Start 2P", monospace',
                  fontSize: 'clamp(7px, 1.5vw, 9px)',
                  letterSpacing: '0.12em',
                  padding: '0.7rem 1.8rem',
                  border: '1px solid #fff',
                  borderRadius: '999px',
                  background: 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                {phase === 'over' ? 'TRY AGAIN' : 'START'}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
