import { lazy, Suspense } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { BackToTop } from '../components/ui/BackToTop'
import { SkipLink } from '../components/ui/SkipLink'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Experience } from '../sections/Experience'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'
import { Credentials } from '../sections/Credentials'
import { Contact } from '../sections/Contact'

const GalaxyBackground = lazy(() =>
  import('../components/three/GalaxyBackground').then((m) => ({ default: m.GalaxyBackground })),
)

export function HomePage() {
  return (
    <div className="relative isolate">
      <SkipLink />
      <Navbar />
      <div className="relative">
        <Suspense fallback={null}>
          <GalaxyBackground />
        </Suspense>
        <div className="content-readability-veil pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
        <main id="main" className="relative z-10 w-full pb-16 sm:pb-20">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Credentials />
          <Contact />
        </main>
      </div>
      <Footer />
      <BackToTop />
    </div>
  )
}
