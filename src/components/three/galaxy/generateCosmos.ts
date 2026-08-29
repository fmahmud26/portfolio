import type {
  AsteroidPlacement,
  RoguePlanetPlacement,
  SolarSystemPlacement,
  UnidentifiedObjectPlacement,
} from './types'

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const STAR_COLORS = [
  '#fbbf24',
  '#f97316',
  '#fcd34d',
  '#fde68a',
  '#fdba74',
  '#fca5a5',
  '#93c5fd',
  '#f0abfc',
  '#fef08a',
  '#fb923c',
]

const PLANET_COLORS = [
  '#94a3b8',
  '#6366f1',
  '#117a8a',
  '#a78bfa',
  '#f472b6',
  '#34d399',
  '#fb7185',
  '#818cf8',
  '#38bdf8',
  '#c084fc',
  '#4ade80',
  '#facc15',
]

const ANCHOR_SYSTEMS: SolarSystemPlacement[] = [
  { position: [-5.8, 4.8, -2], scale: 0.72, opacity: 0.84, phase: 0.4, starColor: '#fbbf24', planets: 4, orbitSpeed: 0.52 },
  { position: [6.2, 3.2, -3.5], scale: 0.62, opacity: 0.76, phase: 1.1, starColor: '#f97316', planets: 4, orbitSpeed: 0.48 },
  { position: [-4.2, 1.2, -5], scale: 0.56, opacity: 0.68, phase: 2.4, starColor: '#fcd34d', planets: 3, orbitSpeed: 0.44 },
  { position: [5.4, -0.8, -7], scale: 0.5, opacity: 0.62, phase: 3.6, starColor: '#fb923c', planets: 3, orbitSpeed: 0.42 },
  { position: [-6.0, -3.5, -9], scale: 0.42, opacity: 0.54, phase: 4.8, starColor: '#fde68a', planets: 3, orbitSpeed: 0.38 },
  { position: [4.8, -6.2, -11], scale: 0.36, opacity: 0.48, phase: 6.0, starColor: '#fdba74', planets: 2, orbitSpeed: 0.34, far: true },
]

function generateSystems(count: number, seed: number, ySpread: number): SolarSystemPlacement[] {
  const rand = mulberry32(seed)
  const systems: SolarSystemPlacement[] = []

  for (let i = 0; i < count; i++) {
    const t = i / Math.max(count - 1, 1)
    const y = 5.5 - t * ySpread - rand() * 1.2
    const x = (rand() - 0.5) * 16
    const z = -2.5 - rand() * 28
    const far = z < -11 || t > 0.72

    systems.push({
      position: [x, y, z],
      scale: far ? 0.08 + rand() * 0.14 : 0.18 + rand() * 0.28,
      opacity: far ? 0.22 + rand() * 0.2 : 0.38 + rand() * 0.32,
      phase: rand() * Math.PI * 2,
      starColor: STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)] ?? '#fbbf24',
      planets: far ? 2 : 3 + Math.floor(rand() * 2),
      orbitSpeed: 0.2 + rand() * 0.32,
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
    const y = 6 - t * ySpread - rand() * 1.4
    const x = (rand() - 0.5) * 18
    const z = -1.5 - rand() * 32
    const far = z < -14

    planets.push({
      position: [x, y, z],
      size: far ? 0.025 + rand() * 0.04 : 0.045 + rand() * 0.07,
      color: PLANET_COLORS[Math.floor(rand() * PLANET_COLORS.length)] ?? '#6366f1',
      phase: rand() * Math.PI * 2,
      opacity: far ? 0.28 + rand() * 0.28 : 0.48 + rand() * 0.38,
      ring: !far && rand() > 0.78,
      orbitDrift: rand() * 0.45 + 0.12,
    })
  }

  return planets
}

const ASTEROID_COLORS = ['#78716c', '#57534e', '#a8a29e', '#6b7280', '#9ca3af', '#44403c']

function generateAsteroids(count: number, seed: number, ySpread: number): AsteroidPlacement[] {
  const rand = mulberry32(seed)
  const asteroids: AsteroidPlacement[] = []

  for (let i = 0; i < count; i++) {
    const t = i / Math.max(count - 1, 1)
    const y = 7 - t * ySpread - rand() * 1.6
    const x = (rand() - 0.5) * 20
    const z = -1 - rand() * 30
    const far = z < -12

    asteroids.push({
      position: [x, y, z],
      scale: far ? 0.018 + rand() * 0.035 : 0.035 + rand() * 0.08,
      phase: rand() * Math.PI * 2,
      opacity: far ? 0.32 + rand() * 0.28 : 0.52 + rand() * 0.38,
      spin: 0.35 + rand() * 0.65,
      drift: rand() * 0.35 + 0.14,
      seed: Math.floor(rand() * 1_000_000),
      color: ASTEROID_COLORS[Math.floor(rand() * ASTEROID_COLORS.length)] ?? '#78716c',
    })
  }

  return asteroids
}

function pickCraftVariant(rand: () => number): UnidentifiedObjectPlacement['variant'] {
  const roll = rand()
  if (roll > 0.68) return 'satellite'
  if (roll > 0.44) return 'saucer'
  if (roll > 0.22) return 'probe'
  return 'mothership'
}

function generateUnidentifiedObjects(
  count: number,
  seed: number,
  ySpread: number,
): UnidentifiedObjectPlacement[] {
  const rand = mulberry32(seed)
  const objects: UnidentifiedObjectPlacement[] = []

  for (let i = 0; i < count; i++) {
    const t = i / Math.max(count - 1, 1)
    const y = 6.5 - t * ySpread - rand() * 1.2
    const x = (rand() - 0.5) * 18
    const z = -1.5 - rand() * 24

    objects.push({
      position: [x, y, z],
      scale: 0.14 + rand() * 0.26,
      phase: rand() * Math.PI * 2,
      opacity: 0.48 + rand() * 0.44,
      drift: rand() * 0.32 + 0.12,
      traverse: rand() * 0.055 + 0.018,
      variant: pickCraftVariant(rand),
      pulseSpeed: 0.65 + rand() * 1.2,
    })
  }

  return objects
}

export const DESKTOP_SOLAR_SYSTEMS: SolarSystemPlacement[] = [
  ...ANCHOR_SYSTEMS,
  ...generateSystems(16, 0x51c4e9, 24),
]

export const MOBILE_SOLAR_SYSTEMS: SolarSystemPlacement[] = [
  ANCHOR_SYSTEMS[0]!,
  ANCHOR_SYSTEMS[2]!,
  ANCHOR_SYSTEMS[4]!,
  ...generateSystems(7, 0x71d6f0, 20),
]

export const DESKTOP_ROGUE_PLANETS: RoguePlanetPlacement[] = generateRoguePlanets(48, 0x8a3ffc, 26)

export const MOBILE_ROGUE_PLANETS: RoguePlanetPlacement[] = generateRoguePlanets(22, 0x9b52ff, 22)

export const DESKTOP_ASTEROIDS: AsteroidPlacement[] = generateAsteroids(32, 0x3d7a12, 28)

export const MOBILE_ASTEROIDS: AsteroidPlacement[] = generateAsteroids(16, 0x4d8a22, 24)

export const DESKTOP_UNIDENTIFIED_OBJECTS: UnidentifiedObjectPlacement[] = generateUnidentifiedObjects(
  18,
  0x2a9f88,
  26,
)

export const MOBILE_UNIDENTIFIED_OBJECTS: UnidentifiedObjectPlacement[] = generateUnidentifiedObjects(
  8,
  0x3aaf98,
  22,
)
