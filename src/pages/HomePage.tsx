import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { BackToTop } from '../components/ui/BackToTop'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Skills } from '../sections/Skills'
import { Experience } from '../sections/Experience'
import { Certifications } from '../sections/Certifications'
import { Education } from '../sections/Education'
import { Contact } from '../sections/Contact'

export function HomePage() {
  return (
    <>
      <Navbar />
      <main className="w-full pb-16 sm:pb-20">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
