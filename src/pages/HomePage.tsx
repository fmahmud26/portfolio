import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { BackToTop } from '../components/ui/BackToTop'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Experience } from '../sections/Experience'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'
import { Certifications } from '../sections/Certifications'
import { Contact } from '../sections/Contact'

export function HomePage() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
