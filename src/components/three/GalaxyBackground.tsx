import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import type { Group } from 'three'
import type Lenis from 'lenis'
import { useTheme } from '../../context/ThemeContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { GalaxyCore } from './galaxy/GalaxyCore'
import { SolarSystem } from './galaxy/SolarSystem'
import {
  DESKTOP_GALAXIES,
  DESKTOP_SOLAR_SYSTEMS,
  LIGHT_BG,
  DARK_BG,
  MOBILE_GALAXIES,
  MOBILE_SOLAR_SYSTEMS,
  SCROLL_PARALLAX,
  type GalaxyPlacement,
  type SolarSystemPlacement,
} from './galaxy/constants'

function getLenis() {
  return (window as Window & { __lenis?: Lenis }).__lenis
}

function getScrollProgress() {
  const lenis = getLenis()
  if (lenis) {
    return lenis.limit > 0 ? lenis.scroll / lenis.limit : 0
  }
  const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
  return max > 0 ? window.scrollY / max : 0
}

function SceneLights({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.46 : 0.38} />
      <hemisphereLight
        args={[isDark ? '#c4b5fd' : '#c7d2fe', isDark ? DARK_BG : LIGHT_BG, isDark ? 0.26 : 0.14]}
      />
      <pointLight
        position={[3.5, 2, 4.5]}
        intensity={isDark ? 0.72 : 0.48}
        color={isDark ? '#c4b5fd' : '#6366f1'}
      />
      <pointLight position={[-1.5, -0.5, 2.5]} intensity={isDark ? 0.32 : 0.22} color="#94a3b8" />
    </>
  )
}

function ScrollParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    const progress = getScrollProgress()
    groupRef.current.position.y = progress * SCROLL_PARALLAX.range + SCROLL_PARALLAX.offset
  })

  return <group ref={groupRef}>{children}</group>
}

function AnimatedGalaxy({
  galaxy,
  index,
  isDark,
  isMobile,
}: {
  galaxy: GalaxyPlacement
  index: number
  isDark: boolean
  isMobile: boolean
}) {
  const groupRef = useRef<Group>(null)
  const far = galaxy.far ?? false

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + galaxy.phase
    if (!groupRef.current) return

    const drift = far ? 0.04 : 0.08
    groupRef.current.position.y =
      galaxy.position[1] + Math.sin(t * 0.14 + index) * drift * (1 - index * 0.04)
    groupRef.current.rotation.y = Math.sin(t * 0.05 + galaxy.phase) * (far ? 0.02 : 0.04)
  })

  return (
    <group ref={groupRef} position={galaxy.position} scale={galaxy.scale}>
      <GalaxyCore
        isDark={isDark}
        isMobile={isMobile}
        opacityScale={galaxy.opacity}
        phase={galaxy.phase}
        initialTilt={galaxy.tilt}
        spinScale={galaxy.spin}
        lite={far || index > 0}
      />
    </group>
  )
}

function AnimatedSolarSystem({
  system,
  index,
  isDark,
}: {
  system: SolarSystemPlacement
  index: number
  isDark: boolean
}) {
  return (
    <SolarSystem placement={system} isDark={isDark} index={index} />
  )
}

function StarField({ count, isDark }: { count: number; isDark: boolean }) {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const progress = getScrollProgress()
    ref.current.rotation.y = clock.elapsedTime * 0.004 + progress * 0.42
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.015
    ref.current.position.y = progress * 8 - 4
  })

  if (count <= 0) return null

  return (
    <group ref={ref}>
      <Stars
        radius={160}
        depth={110}
        count={count}
        factor={isDark ? 1.35 : 1.85}
        fade
        speed={0.045}
      />
    </group>
  )
}

function CosmicField({
  isDark,
  isMobile,
  galaxies,
  solarSystems,
  starCount,
}: {
  isDark: boolean
  isMobile: boolean
  galaxies: GalaxyPlacement[]
  solarSystems: SolarSystemPlacement[]
  starCount: number
}) {
  return (
    <ScrollParallax>
      <SceneLights isDark={isDark} />
      <StarField count={starCount} isDark={isDark} />

      {galaxies.map((galaxy, index) => (
        <AnimatedGalaxy
          key={`galaxy-${galaxy.phase}-${index}`}
          galaxy={galaxy}
          index={index}
          isDark={isDark}
          isMobile={isMobile}
        />
      ))}

      {solarSystems.map((system, index) => (
        <AnimatedSolarSystem
          key={`solar-${system.phase}-${index}`}
          system={system}
          index={index}
          isDark={isDark}
        />
      ))}
    </ScrollParallax>
  )
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return mobile
}

export function GalaxyBackground() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  const galaxies = isMobile ? MOBILE_GALAXIES : DESKTOP_GALAXIES
  const solarSystems = isMobile ? MOBILE_SOLAR_SYSTEMS : DESKTOP_SOLAR_SYSTEMS
  const starCount = reducedMotion ? 0 : isDark ? (isMobile ? 80 : 130) : isMobile ? 70 : 110

  if (reducedMotion) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 14], fov: 52 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <color attach="background" args={[isDark ? DARK_BG : LIGHT_BG]} />
          <CosmicField
            isDark={isDark}
            isMobile={isMobile}
            galaxies={galaxies}
            solarSystems={solarSystems}
            starCount={starCount}
          />
        </Canvas>

        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? `radial-gradient(ellipse 72% 58% at 34% 44%, rgba(46,46,54,0.72) 0%, rgba(46,46,54,0.28) 52%, transparent 78%),
                 radial-gradient(ellipse 88% 68% at 50% 42%, transparent 0%, rgba(46,46,54,0.42) 68%, rgba(46,46,54,0.82) 100%)`
              : `radial-gradient(ellipse 72% 58% at 34% 44%, rgba(237,241,247,0.78) 0%, rgba(237,241,247,0.38) 52%, transparent 78%),
                 radial-gradient(ellipse 92% 78% at 50% 45%, transparent 0%, rgba(237,241,247,0.22) 72%, rgba(237,241,247,0.52) 100%)`,
          }}
        />
      </div>
    </div>
  )
}
