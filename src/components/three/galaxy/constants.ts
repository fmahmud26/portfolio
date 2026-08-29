export const DARK_BG = '#2e2e36'
export const LIGHT_BG = '#e9eef5'

/** Galaxy motion tuning — differential spin reads as realistic spiral rotation. */
export const COMFORT = {
  discOpacity: { dark: 0.58, light: 0.44 },
  dustOpacity: { dark: 0.28, light: 0.24 },
  ringOpacity: { dark: { inner: 0.28, outer: 0.18 }, light: { inner: 0.26, outer: 0.16 } },
  haloOpacity: { dark: 0.12, light: 0.09 },
  coreEmissive: { dark: 0.72, light: 0.56 },
  particleSize: { dark: { disc: 0.044, dust: 0.03 }, light: { disc: 0.048, dust: 0.03 } },
  spin: { disc: 0.58, dust: -0.26, ringInner: 0.34, ringOuter: -0.22, wobble: 0.02 },
  drift: { yaw: 0.032, pitch: 0.014, roll: 0.01 },
} as const

/** Scroll parallax range — scene shifts vertically as user scrolls main content. */
export const SCROLL_PARALLAX = { range: 38, offset: -19 } as const

export type { GalaxyPlacement, RoguePlanetPlacement, SolarSystemPlacement } from './types'

export {
  DESKTOP_ROGUE_PLANETS,
  DESKTOP_SOLAR_SYSTEMS,
  MOBILE_ROGUE_PLANETS,
  MOBILE_SOLAR_SYSTEMS,
} from './generateCosmos'

import type { GalaxyPlacement } from './types'

/** Prominent galaxy beside hero copy — right side, vertically aligned with name/pitch. */
export const HERO_RIGHT_GALAXY: GalaxyPlacement = {
  position: [7.85, 19.6, -3.4],
  scale: 0.5,
  opacity: 0.92,
  phase: 0.85,
  tilt: [0.74, -0.36, 0.1],
  spin: 1.08,
}

export const HERO_RIGHT_GALAXY_MOBILE: GalaxyPlacement = {
  position: [5.1, 18.9, -3.8],
  scale: 0.34,
  opacity: 0.84,
  phase: 1.15,
  tilt: [0.7, -0.26, 0.08],
  spin: 1,
}

/** Faint distant galaxies — solar systems dominate the scene. */
export const DESKTOP_GALAXIES: GalaxyPlacement[] = [
  { position: [7.2, 5.2, -18], scale: 0.16, opacity: 0.48, phase: 0, tilt: [0.82, 0.26, 0.1], spin: 1.05, far: true },
  { position: [-8.0, 0.5, -22], scale: 0.12, opacity: 0.4, phase: 2.1, tilt: [0.74, -0.18, 0.22], spin: 0.92, far: true },
  { position: [6.4, -8.5, -26], scale: 0.09, opacity: 0.32, phase: 4.4, tilt: [0.88, 0.12, -0.1], spin: 0.82, far: true },
  { position: [-5.8, -16.0, -30], scale: 0.07, opacity: 0.26, phase: 6.2, tilt: [0.68, 0.08, 0.2], spin: 0.72, far: true },
]

export const MOBILE_GALAXIES: GalaxyPlacement[] = [
  { position: [5.0, 4.0, -16], scale: 0.13, opacity: 0.42, phase: 0, tilt: [0.82, 0.22, 0.08], spin: 0.95, far: true },
  { position: [-4.5, -6.0, -24], scale: 0.09, opacity: 0.3, phase: 3.2, tilt: [0.76, -0.1, 0.15], spin: 0.78, far: true },
]
