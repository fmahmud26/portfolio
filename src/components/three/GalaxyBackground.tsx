import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type Lenis from 'lenis'
import { useTheme } from '../../context/ThemeContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { GalaxyCore } from './galaxy/GalaxyCore'
import { SolarSystem } from './galaxy/SolarSystem'
import { RoguePlanet } from './galaxy/RoguePlanet'
import { DeepStarField } from './galaxy/DeepStarField'
import { AmbientCosmicDrift } from './galaxy/AmbientCosmicDrift'
import { cosmicVisibility } from './galaxy/cosmicMotion'
import {
  DESKTOP_GALAXIES,
  DESKTOP_ROGUE_PLANETS,
  DESKTOP_SOLAR_SYSTEMS,
  HERO_RIGHT_GALAXY,
  HERO_RIGHT_GALAXY_MOBILE,
  LIGHT_BG,
  DARK_BG,
  MOBILE_GALAXIES,
  MOBILE_ROGUE_PLANETS,
  MOBILE_SOLAR_SYSTEMS,
  SCROLL_PARALLAX,
  type GalaxyPlacement,
  type RoguePlanetPlacement,
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
      <ambientLight intensity={isDark ? 0.58 : 0.5} />
      <hemisphereLight
        args={[isDark ? '#ddd6fe' : '#c7d2fe', isDark ? DARK_BG : LIGHT_BG, isDark ? 0.4 : 0.26]}
      />
      <pointLight
        position={[3.5, 2, 4.5]}
        intensity={isDark ? 1.08 : 0.68}
        color={isDark ? '#c4b5fd' : '#6366f1'}
      />
      <pointLight position={[-1.5, -0.5, 2.5]} intensity={isDark ? 0.52 : 0.34} color="#94a3b8" />
      <pointLight position={[0, -4, -8]} intensity={isDark ? 0.42 : 0.2} color="#fbbf24" />
      <pointLight position={[-6, 3, -12]} intensity={isDark ? 0.34 : 0.14} color="#67e8f9" />
      <pointLight position={[7.5, 1.5, -2]} intensity={isDark ? 0.52 : 0.32} color={isDark ? '#c4b5fd' : '#6366f1'} />
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
  featured = false,
}: {
  galaxy: GalaxyPlacement
  index: number
  isDark: boolean
  isMobile: boolean
  featured?: boolean
}) {
  const groupRef = useRef<Group>(null)
  const drift = featured ? 0.07 : 0.14

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + galaxy.phase
    if (!groupRef.current) return

    groupRef.current.position.y =
      galaxy.position[1] + Math.sin(t * 0.2 + index) * drift
    groupRef.current.rotation.y = Math.sin(t * 0.08 + galaxy.phase) * 0.06 + t * 0.01
    groupRef.current.position.x =
      galaxy.position[0] + Math.cos(t * 0.1 + galaxy.phase) * drift
    groupRef.current.position.z =
      galaxy.position[2] + Math.sin(t * 0.07 + galaxy.phase) * drift * 0.5
  })

  return (
    <group ref={groupRef} position={galaxy.position} scale={galaxy.scale}>
      <GalaxyCore
        isDark={isDark}
        isMobile={isMobile}
        opacityScale={cosmicVisibility(isDark, galaxy.opacity)}
        phase={galaxy.phase}
        initialTilt={galaxy.tilt}
        spinScale={galaxy.spin}
        lite={!featured && (galaxy.far ?? true)}
      />
    </group>
  )
}

function CosmicField({
  isDark,
  isMobile,
  galaxies,
  solarSystems,
  roguePlanets,
  heroGalaxy,
}: {
  isDark: boolean
  isMobile: boolean
  galaxies: GalaxyPlacement[]
  solarSystems: SolarSystemPlacement[]
  roguePlanets: RoguePlanetPlacement[]
  heroGalaxy: GalaxyPlacement
}) {
  return (
    <ScrollParallax>
      <SceneLights isDark={isDark} />
      <AmbientCosmicDrift>
        <DeepStarField isDark={isDark} isMobile={isMobile} scrollY={getScrollProgress} />

        <AnimatedGalaxy
          galaxy={heroGalaxy}
          index={0}
          isDark={isDark}
          isMobile={isMobile}
          featured
        />

        {roguePlanets.map((planet, index) => (
          <RoguePlanet
            key={`planet-${planet.phase}-${index}`}
            placement={planet}
            isDark={isDark}
            index={index}
          />
        ))}

        {solarSystems.map((system, index) => (
          <SolarSystem
            key={`solar-${system.phase}-${index}`}
            placement={system}
            isDark={isDark}
            index={index}
          />
        ))}

        {galaxies.map((galaxy, index) => (
          <AnimatedGalaxy
            key={`galaxy-${galaxy.phase}-${index}`}
            galaxy={galaxy}
            index={index}
            isDark={isDark}
            isMobile={isMobile}
          />
        ))}
      </AmbientCosmicDrift>
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
  const roguePlanets = isMobile ? MOBILE_ROGUE_PLANETS : DESKTOP_ROGUE_PLANETS
  const heroGalaxy = isMobile ? HERO_RIGHT_GALAXY_MOBILE : HERO_RIGHT_GALAXY

  if (reducedMotion) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div
        className="cosmic-deep-starfield sticky top-0 h-[100dvh] w-full overflow-hidden"
        style={{ background: isDark ? DARK_BG : LIGHT_BG }}
      >
        <div className="cosmic-deep-starfield__sky absolute inset-0" aria-hidden="true" />

        <Canvas
          camera={{ position: [0, 0, 14], fov: 52 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', display: 'block', position: 'relative', zIndex: 1 }}
        >
          <CosmicField
            isDark={isDark}
            isMobile={isMobile}
            galaxies={galaxies}
            solarSystems={solarSystems}
            roguePlanets={roguePlanets}
            heroGalaxy={heroGalaxy}
          />
        </Canvas>

        <div className="cosmic-vignette absolute inset-0 z-[2]" aria-hidden="true" />
      </div>
    </div>
  )
}
