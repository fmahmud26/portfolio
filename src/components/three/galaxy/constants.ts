export const DARK_BG = '#2e2e36'
export const LIGHT_BG = '#e9eef5'

/** Galaxy motion — calmer spin; hero spiral still reads as living. */
export const COMFORT = {
  discOpacity: { dark: 0.56, light: 0.48 },
  dustOpacity: { dark: 0.26, light: 0.24 },
  ringOpacity: { dark: { inner: 0.24, outer: 0.15 }, light: { inner: 0.26, outer: 0.16 } },
  haloOpacity: { dark: 0.12, light: 0.11 },
  coreEmissive: { dark: 0.66, light: 0.58 },
  particleSize: { dark: { disc: 0.042, dust: 0.028 }, light: { disc: 0.05, dust: 0.032 } },
  spin: { disc: 0.48, dust: -0.22, ringInner: 0.28, ringOuter: -0.18, wobble: 0.015 },
  drift: { yaw: 0.024, pitch: 0.01, roll: 0.008 },
} as const

/** Scroll parallax — slightly gentler so the hero galaxy lingers beside the name. */
export const SCROLL_PARALLAX = { range: 32, offset: -16 } as const

/** Soft depth fog — near stays past the hero galaxy so the signature stays crisp. */
export const COSMIC_FOG = {
  dark: { near: 24, far: 56 },
  light: { near: 22, far: 50 },
} as const

export type {
  GalaxyPlacement,
  RoguePlanetPlacement,
  SolarSystemPlacement,
  AsteroidPlacement,
  UnidentifiedObjectPlacement,
} from './types'

export {
  DESKTOP_ASTEROIDS,
  DESKTOP_ROGUE_PLANETS,
  DESKTOP_SOLAR_SYSTEMS,
  DESKTOP_UNIDENTIFIED_OBJECTS,
  MOBILE_ASTEROIDS,
  MOBILE_ROGUE_PLANETS,
  MOBILE_SOLAR_SYSTEMS,
  MOBILE_UNIDENTIFIED_OBJECTS,
} from './generateCosmos'

import type { GalaxyPlacement } from './types'

/**
 * Signature asset — beside hero copy on the right.
 * Parallax offset −16 → world Y ≈ 3.2 at page top (aligned with name/pitch).
 */
export const HERO_RIGHT_GALAXY: GalaxyPlacement = {
  position: [7.6, 19.2, -3.2],
  scale: 0.62,
  opacity: 0.98,
  phase: 0.85,
  tilt: [0.72, -0.34, 0.08],
  spin: 1.02,
}

export const HERO_RIGHT_GALAXY_MOBILE: GalaxyPlacement = {
  position: [4.8, 18.6, -3.6],
  scale: 0.42,
  opacity: 0.9,
  phase: 1.15,
  tilt: [0.68, -0.24, 0.06],
  spin: 0.95,
}

/** Sparse distant punctuation — three on desktop, one on mobile. */
export const DESKTOP_GALAXIES: GalaxyPlacement[] = [
  { position: [-7.5, 3.5, -22], scale: 0.11, opacity: 0.32, phase: 0, tilt: [0.8, 0.22, 0.08], spin: 0.9, far: true },
  { position: [6.8, -6.0, -28], scale: 0.08, opacity: 0.24, phase: 3.2, tilt: [0.86, 0.1, -0.08], spin: 0.78, far: true },
  { position: [-5.2, -14.5, -32], scale: 0.06, opacity: 0.2, phase: 5.8, tilt: [0.7, 0.06, 0.16], spin: 0.7, far: true },
]

export const MOBILE_GALAXIES: GalaxyPlacement[] = [
  { position: [-4.8, -4.0, -24], scale: 0.09, opacity: 0.28, phase: 1.4, tilt: [0.78, -0.08, 0.12], spin: 0.82, far: true },
]
