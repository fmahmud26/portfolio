import type { RoguePlanetPlacement, SolarSystemPlacement } from './types'

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Warm but restrained stellar hues — indigo/teal family, not carnival purple. */
const STAR_COLORS = ['#f5e6c8', '#e8d4a8', '#c7d2fe', '#93c5fd', '#7dd3fc', '#a5b4fc', '#fde68a']

const PLANET_COLORS = [
  '#94a3b8',
  '#64748b',
  '#6366f1',
  '#4755c7',
  '#117a8a',
  '#0f766e',
  '#818cf8',
  '#38bdf8',
  '#67e8f9',
  '#8b9cf7',
]

/**
 * Sparse midfield systems — kept left / lower so the hero-right galaxy stays the signature.
 * Quiet luxury: few glowing suns, not a crowded diorama.
 */
const ANCHOR_SYSTEMS: SolarSystemPlacement[] = [
  {
    position: [-6.4, 2.8, -6],
    scale: 0.48,
    opacity: 0.55,
    phase: 0.4,
    starColor: '#f5e6c8',
    planets: 3,
    orbitSpeed: 0.38,
  },
  {
    position: [-5.2, -2.4, -10],
    scale: 0.36,
    opacity: 0.42,
    phase: 2.4,
    starColor: '#93c5fd',
    planets: 2,
    orbitSpeed: 0.32,
    far: true,
  },
  {
    position: [5.8, -8.5, -14],
    scale: 0.28,
    opacity: 0.34,
    phase: 4.8,
    starColor: '#a5b4fc',
    planets: 2,
    orbitSpeed: 0.28,
    far: true,
  },
]

function generateSystems(count: number, seed: number, ySpread: number): SolarSystemPlacement[] {
  const rand = mulberry32(seed)
  const systems: SolarSystemPlacement[] = []

  for (let i = 0; i < count; i++) {
    const t = i / Math.max(count - 1, 1)
    const y = 2 - t * ySpread - rand() * 1.2
    // Bias left / far — keep right-upper quadrant clear for hero galaxy
    const x = (rand() - 0.62) * 14
    const z = -8 - rand() * 26
    const far = true

    systems.push({
      position: [x, y, z],
      scale: 0.07 + rand() * 0.12,
      opacity: 0.18 + rand() * 0.18,
      phase: rand() * Math.PI * 2,
      starColor: STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)] ?? '#f5e6c8',
      planets: 2,
      orbitSpeed: 0.16 + rand() * 0.22,
      far,
    })
  }

  return systems
}

function generateRoguePlanets(count: number, seed: number, ySpread: number): RoguePlanetPlacement[] {
  const rand = mulberry32(seed)
  const planets: RoguePlanetPlacement[] = []

  for (let i = 0; i < count; i++) {
    const t = i / Math.max(count - 1, 1)
    const y = 4 - t * ySpread - rand() * 1.4
    const x = (rand() - 0.55) * 16
    const z = -6 - rand() * 28
    const far = z < -12

    planets.push({
      position: [x, y, z],
      size: far ? 0.02 + rand() * 0.03 : 0.032 + rand() * 0.045,
      color: PLANET_COLORS[Math.floor(rand() * PLANET_COLORS.length)] ?? '#6366f1',
      phase: rand() * Math.PI * 2,
      opacity: far ? 0.22 + rand() * 0.2 : 0.34 + rand() * 0.24,
      ring: !far && rand() > 0.88,
      orbitDrift: rand() * 0.28 + 0.08,
    })
  }

  return planets
}

/** Desktop: 3 anchors + 4 distant — was 22. */
export const DESKTOP_SOLAR_SYSTEMS: SolarSystemPlacement[] = [
  ...ANCHOR_SYSTEMS,
  ...generateSystems(4, 0x51c4e9, 22),
]

/** Mobile: 2 systems. */
export const MOBILE_SOLAR_SYSTEMS: SolarSystemPlacement[] = [
  ANCHOR_SYSTEMS[0]!,
  ANCHOR_SYSTEMS[2]!,
]

/** Desktop: 16 quiet rogues — was 48. */
export const DESKTOP_ROGUE_PLANETS: RoguePlanetPlacement[] = generateRoguePlanets(16, 0x8a3ffc, 24)

/** Mobile: 8. */
export const MOBILE_ROGUE_PLANETS: RoguePlanetPlacement[] = generateRoguePlanets(8, 0x9b52ff, 20)

/** Asteroids & craft retired from the live scene (kept types for optional future use). */
export const DESKTOP_ASTEROIDS: never[] = []
export const MOBILE_ASTEROIDS: never[] = []
export const DESKTOP_UNIDENTIFIED_OBJECTS: never[] = []
export const MOBILE_UNIDENTIFIED_OBJECTS: never[] = []
