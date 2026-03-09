'use client'

import { useState, useEffect, type JSX } from 'react'
import { socialLinks } from '../data'

// ── SVG ICONS ──────────────────────────────────────────
function IconGithub() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function IconTwitter() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function IconDiscord() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

function IconEmail() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )
}

function IconExternal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
    </svg>
  )
}

function getIcon(href: string): JSX.Element {
  const h = href.toLowerCase()
  if (h.includes('github'))                          return <IconGithub />
  if (h.includes('linkedin'))                        return <IconLinkedin />
  if (h.includes('twitter') || h.includes('x.com')) return <IconTwitter />
  if (h.includes('instagram'))                       return <IconInstagram />
  if (h.includes('discord'))                         return <IconDiscord />
  if (h.includes('mailto'))                          return <IconEmail />
  return <IconExternal />
}

const SOCIAL_COLORS: Record<string, { face: string; dark: string; light: string }> = {
  github:    { face: '#d0d0d0', dark: '#707070', light: '#ffffff' },
  linkedin:  { face: '#5ba4cf', dark: '#1a5a8a', light: '#aaddff' },
  twitter:   { face: '#7ec8f7', dark: '#2a7abf', light: '#cceeff' },
  'x.com':   { face: '#e0e0e0', dark: '#888888', light: '#ffffff' },
  instagram: { face: '#e07cc0', dark: '#8a2a6a', light: '#ffccee' },
  discord:   { face: '#8a9cf7', dark: '#3a4abf', light: '#ccddff' },
  mailto:    { face: '#f9f97a', dark: '#b8b800', light: '#ffffcc' },
}

function getSocialColor(href: string) {
  const key = Object.keys(SOCIAL_COLORS).find(k => href.toLowerCase().includes(k))
  return key ? SOCIAL_COLORS[key] : { face: '#f9f97a', dark: '#b8b800', light: '#ffffcc' }
}

// ── 3D PIXEL SOCIAL BUTTON ─────────────────────────────
function PixelSocialBtn({
  link,
  index,
  size = 72,
}: {
  link: { label: string; href: string }
  index: number
  size?: number
}): JSX.Element {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const col = getSocialColor(link.href)

  const shadow = pressed
    ? `inset -2px -2px 0px ${col.dark}, inset 2px 2px 0px ${col.light}, 0px 0px 0px #0a0a0a`
    : hovered
      ? `inset -4px -4px 0px ${col.dark}, inset 4px 4px 0px ${col.light}, 7px 9px 0px #0a0a0a`
      : `inset -4px -4px 0px ${col.dark}, inset 4px 4px 0px ${col.light}, 5px 6px 0px #0a0a0a`

  const transform = pressed
    ? 'translate(5px, 6px)'
    : hovered
      ? 'translate(-2px, -3px)'
      : 'translate(0, 0)'

  return (
    <a
      href={link.href}
      target={link.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        background: col.face,
        border: '3px solid #0a0a0a',
        boxShadow: shadow,
        transform,
        transition: 'transform 0.1s ease, box-shadow 0.1s ease',
        imageRendering: 'pixelated',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0a0a0a',
      }}>
        {getIcon(link.href)}

        <span style={{ position:'absolute', top:3, left:3, width:4, height:4, background:col.light, pointerEvents:'none' }} />
        <span style={{ position:'absolute', bottom:3, right:3, width:4, height:4, background:col.dark, pointerEvents:'none' }} />
        <span style={{ position:'absolute', top:3, left:7, width:2, height:2, background:col.light, opacity:0.5, pointerEvents:'none' }} />
        <span style={{ position:'absolute', top:7, left:3, width:2, height:2, background:col.light, opacity:0.5, pointerEvents:'none' }} />

        {hovered && !pressed && (
          <div style={{
            position:'absolute', inset:0, pointerEvents:'none',
            backgroundImage:'repeating-linear-gradient(0deg,rgba(0,0,0,0.06) 0px,rgba(0,0,0,0.06) 1px,transparent 1px,transparent 4px)',
          }} />
        )}

        <div style={{
          position:'absolute', top:-9, right:-9,
          width:'17px', height:'17px',
          background:'#0a0a0a',
          border:'2px solid #1e1e1e',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <span style={{ fontFamily:'monospace', fontSize:'7px', color:'#303030', lineHeight:1 }}>
            {String(index + 1).padStart(2,'0')}
          </span>
        </div>
      </div>

      <span style={{
        fontFamily:'monospace',
        fontSize:'9px',
        color: hovered ? col.face : '#252525',
        letterSpacing:'0.18em',
        textTransform:'uppercase',
        transition:'color 0.15s ease',
        whiteSpace:'nowrap',
      }}>
        {link.label}
      </span>
    </a>
  )
}

// ── SOCIAL SECTION ─────────────────────────────────────
function SocialSection(): JSX.Element {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isMobile ? 'flex-start' : 'flex-end',
      justifyContent: 'center',
      gap: '1rem',
      paddingTop: isMobile ? '0' : '4rem',
      width: isMobile ? '100%' : 'auto',
      flexShrink: 0,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1.2rem' }}>
        <div style={{ width:'20px', height:'1px', background:'#9b9b9b' }} />
        <span style={{ fontFamily:'monospace', fontSize:'9px', color:'#acacac', letterSpacing:'0.2em', textTransform:'uppercase' }}>
          find me on
        </span>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: isMobile ? '1.2rem' : '1.6rem',
        justifyContent: isMobile ? 'flex-start' : 'flex-end',
      }}>
        {socialLinks.map((link, i) => (
          <PixelSocialBtn
            key={link.label}
            link={link}
            index={i}
            size={isMobile ? 56 : 72}
          />
        ))}
      </div>
    </div>
  )
}

// ── MAIN ───────────────────────────────────────────────
export default function Contact(): JSX.Element {
  return (
    <section
      id="contact"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid #0e0e0e',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="px-6 md:px-16 lg:px-24 py-20 md:py-32"
    >
      {/* scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)',
        zIndex: 0,
      }} />

      {/* wrapper */}
      <div
        style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}
        className="flex flex-col md:flex-row md:items-start md:justify-between gap-12"
      >
        {/* LEFT — content */}
        <div style={{ flex: '1', minWidth: '0', maxWidth: '620px', width: '100%' }}>
          <h2 style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 'clamp(0.9rem, 4vw, 2.2rem)',
            color: '#ffffff',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
            margin: '0 0 1.6rem 0',
          }}>
            Got a project?{' '}
            <span style={{ color: '#f9f97a' }}>Let's talk.</span>
          </h2>

          <p style={{
            fontFamily: 'monospace',
            fontSize: 'clamp(0.65rem, 2.5vw, 0.85rem)',
            color: '#bfbfbf',
            lineHeight: 1.9,
            margin: '0 0 2.5rem 0',
            letterSpacing: '0.04em',
          }}>
            // I'm open to freelance projects, part-time roles,<br />
            // and interesting collaborations.<br />
            // Please do reach out.
          </p>

          <div style={{ width: '100%', height: '1px', background: '#111', marginBottom: '2rem' }} />

          {/* email button */}
          <a
            href="mailto:adityathukral23@gmail.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: 'clamp(0.38rem, 2vw, 0.6rem)',
              color: '#0a0a0a',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '12px 20px',
              background: '#f9f97a',
              border: '3px solid #0a0a0a',
              boxShadow: 'inset -3px -3px 0px #b8b800, inset 3px 3px 0px #ffffcc, 5px 5px 0px #0a0a0a',
              imageRendering: 'pixelated', cursor: 'pointer',
              transition: 'transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease',
              userSelect: 'none',
              maxWidth: '100%',
              wordBreak: 'break-all',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translate(-2px,-4px)'
              el.style.boxShadow = 'inset -3px -3px 0px #b8b800, inset 3px 3px 0px #ffffcc, 7px 9px 0px #0a0a0a'
              el.style.background = '#ffff99'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translate(0,0)'
              el.style.boxShadow = 'inset -3px -3px 0px #b8b800, inset 3px 3px 0px #ffffcc, 5px 5px 0px #0a0a0a'
              el.style.background = '#f9f97a'
            }}
            onMouseDown={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translate(5px,5px)'
              el.style.boxShadow = 'inset -1px -1px 0px #b8b800, inset 1px 1px 0px #ffffcc, 0px 0px 0px #0a0a0a'
              el.style.background = '#d4d400'
            }}
            onMouseUp={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translate(-2px,-4px)'
              el.style.boxShadow = 'inset -3px -3px 0px #b8b800, inset 3px 3px 0px #ffffcc, 7px 9px 0px #0a0a0a'
              el.style.background = '#ffff99'
            }}
          >
            adityathukral23@gmail.com
          </a>
        </div>

        {/* RIGHT — socials */}
        <SocialSection />
      </div>
    </section>
  )
}
