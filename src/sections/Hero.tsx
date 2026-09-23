import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { AnimatedStat } from '../components/ui/AnimatedStat'
import { Button } from '../components/ui/Button'
import { GitHubIcon } from '../components/ui/BrandIcons'
import { profile, stats } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { HeroScene } from '../components/three/HeroScene'

const fadeUp = (delay: number, reduced: boolean) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
      }

export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="relative flex min-h-screen min-h-[100dvh] w-full items-center overflow-hidden">
      <HeroScene />

      <Container className="relative w-full pt-28 pb-20 sm:pt-32 lg:pt-36">
        <div className="relative z-10 w-full max-w-2xl xl:max-w-3xl">
          <motion.div
            className="absolute -left-3 top-1.5 hidden w-px origin-top bg-linear-to-b from-accent/70 via-cyan/40 to-transparent lg:block"
            style={{ height: 'calc(100% - 0.25rem)' }}
            initial={reducedMotion ? false : { scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />

          <motion.div
            {...fadeUp(0.2, reducedMotion)}
            className="hero-badge glass mb-5 inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-left text-[0.6875rem] leading-snug sm:text-[0.8125rem]"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              {!reducedMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-50" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="min-w-0 text-foreground/75">{profile.availability}</span>
          </motion.div>

          <motion.p
            {...fadeUp(0.26, reducedMotion)}
            className="label-micro text-accent"
          >
            {profile.tagline}
          </motion.p>

          <motion.h1
            {...fadeUp(0.32, reducedMotion)}
            className="font-display mt-3 text-[clamp(2.125rem,5.5vw,4.25rem)] leading-[1.08] font-bold tracking-tight text-balance"
          >
            {profile.name.split(' ')[0]}
            <br />
            <span className="hero-name-glow text-gradient text-gradient--shimmer">{profile.name.split(' ')[1]}</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.38, reducedMotion)}
            className="mt-3 font-display text-base font-medium text-foreground sm:mt-3.5 sm:text-lg"
          >
            {profile.title}
          </motion.p>

          <motion.p
            {...fadeUp(0.42, reducedMotion)}
            className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-foreground/80 sm:text-base"
          >
            {profile.heroPitch}
          </motion.p>

          <motion.dl
            {...fadeUp(0.5, reducedMotion)}
            className="hero-stats mt-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="hero-stats__item"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: reducedMotion ? 0 : 0.55 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <AnimatedStat
                    value={stat.value}
                    className="hero-stat-value font-display text-xl font-semibold tracking-tight sm:text-2xl"
                  />
                  <span className="hero-stats__label">{stat.label}</span>
                </dd>
              </motion.div>
            ))}
          </motion.dl>

          <motion.div
            {...fadeUp(0.56, reducedMotion)}
            className="btn-group btn-group--stack-sm mt-7"
          >
            <Button href="#projects" variant="primary" size="md">
              View selected work
              <ArrowUpRight size={15} aria-hidden="true" />
            </Button>
            <Button href={`mailto:${profile.email}`} variant="outlined" size="md">
              Email me
            </Button>
            <Button href={profile.github} variant="ghost" size="md" external>
              <GitHubIcon size={15} />
              GitHub
            </Button>
          </motion.div>
        </div>

        {!reducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-muted/75"
            >
              <span className="hero-scroll-cue" aria-hidden="true" />
              <span className="label-micro tracking-[0.2em]">Scroll</span>
              <ArrowDown size={13} strokeWidth={1.75} />
            </motion.div>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
