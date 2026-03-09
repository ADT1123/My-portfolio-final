import Hero from './components/Hero'
import Services from './components/Services'
import Skills from './components/Skills'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import { useState, type JSX } from 'react'
import CustomScrollbar from './CustomScrollbar.tsx'
import TypeBlaster from './components/TypeBlaster'


export default function App(): JSX.Element {
  const [loading, setLoading] = useState(true)
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Hero />
      <Skills />
      <Work />
      {/* Services section starts here after pin releases */}
      <section id="services">
        <Services />
      </section>
      <TypeBlaster />
      <Contact />
      <Footer />
      </>
    </main>
  )
}
