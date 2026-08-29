import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { GitHubIcon } from '../components/ui/BrandIcons'
import { profile, stats, focusAreas } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

import { HeroScene } from '../components/three/HeroScene'

const fadeUp = (delay: number, reduced: boolean) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
      }

export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative flex min-h-screen min-h-[100dvh] w-full items-center overflow-hidden">
      <HeroScene />

      <Container className="relative w-full pt-24 pb-24 sm:pt-28 md:pt-32 lg:pt-36">
        <div className="relative z-10 w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          <div
            className="absolute -left-3 top-2 hidden h-[calc(100%-0.5rem)] w-px bg-linear-to-b from-accent/80 via-cyan/50 to-transparent sm:-left-5 lg:block"
            aria-hidden="true"
          />

          <motion.div
            {...fadeUp(0.25, reducedMotion)}
            className="hero-badge glass mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full px-4 py-2 text-sm sm:mb-8"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              {!reducedMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <Sparkles size={14} className="shrink-0 text-accent" aria-hidden="true" />
            <span className="text-muted">{profile.availability}</span>
          </motion.div>

          <motion.div {...fadeUp(0.32, reducedMotion)} className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent/45 sm:w-10" aria-hidden="true" />
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase sm:text-xs">
              {profile.tagline}
            </p>
          </motion.div>

          <motion.h1
            {...fadeUp(0.38, reducedMotion)}
            className="font-display mt-4 text-[clamp(2.35rem,7vw,5.75rem)] leading-[1.06] font-bold tracking-tight text-balance sm:mt-5"
          >
            {profile.name.split(' ')[0]}
            <br />
            <span className="hero-name-glow text-gradient">{profile.name.split(' ')[1]}</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.44, reducedMotion)}
            className="mt-3 font-display text-lg font-medium text-foreground sm:mt-4 sm:text-xl"
          >
            {profile.title}
          </motion.p>

          <motion.p
            {...fadeUp(0.48, reducedMotion)}
            className="mt-4 reading-width text-base leading-relaxed text-muted sm:mt-5 sm:text-lg lg:text-[1.125rem]"
          >
            {profile.heroPitch}
          </motion.p>

          <motion.div
            {...fadeUp(0.56, reducedMotion)}
            className="mt-6 flex flex-wrap gap-2 sm:mt-8"
          >
            {focusAreas.map((area, i) => (
              <motion.span
                key={area}
                {...(reducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, scale: 0.94 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { delay: 0.62 + i * 0.05, duration: 0.4 },
                    })}
                className="glass rounded-full px-3 py-1.5 text-xs text-muted sm:text-sm"
              >
                {area}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.64, reducedMotion)}
            className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-4 sm:gap-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="surface-panel rounded-xl px-3 py-2.5 sm:rounded-2xl sm:px-4 sm:py-3"
              >
                <div className="font-display text-base font-bold text-gradient sm:text-lg lg:text-xl">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[10px] leading-snug text-muted sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.72, reducedMotion)}
            className="btn-group mt-8 sm:mt-10"
          >
            <Button href="#projects" variant="primary" size="lg">
              View selected work
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
            <Button href={`mailto:${profile.email}`} variant="outlined" size="lg">
              Email me
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
            <Button href={profile.github} variant="ghost" size="lg" external>
              <GitHubIcon size={16} />
              GitHub
            </Button>
          </motion.div>
        </div>

        {!reducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-10"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-muted"
            >
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase">Scroll</span>
              <ArrowDown size={15} />
            </motion.div>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
