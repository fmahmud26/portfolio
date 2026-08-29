export const DARK_BG = '#2e2e36'
export const LIGHT_BG = '#e9eef5'

/** Galaxy motion tuning — differential spin reads as realistic spiral rotation. */
export const COMFORT = {
  discOpacity: { dark: 0.3, light: 0.28 },
  dustOpacity: { dark: 0.11, light: 0.16 },
  ringOpacity: { dark: { inner: 0.11, outer: 0.06 }, light: { inner: 0.18, outer: 0.1 } },
  haloOpacity: { dark: 0.035, light: 0.05 },
  coreEmissive: { dark: 0.32, light: 0.38 },
  particleSize: { dark: { disc: 0.032, dust: 0.02 }, light: { disc: 0.04, dust: 0.024 } },
  spin: { disc: 0.42, dust: -0.18, ringInner: 0.22, ringOuter: -0.14, wobble: 0.012 },
  drift: { yaw: 0.018, pitch: 0.008, roll: 0.006 },
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

/** Faint distant galaxies — solar systems dominate the scene. */
export const DESKTOP_GALAXIES: GalaxyPlacement[] = [
  { position: [7.2, 5.2, -18], scale: 0.14, opacity: 0.22, phase: 0, tilt: [0.82, 0.26, 0.1], spin: 0.72, far: true },
  { position: [-8.0, 0.5, -22], scale: 0.1, opacity: 0.16, phase: 2.1, tilt: [0.74, -0.18, 0.22], spin: 0.62, far: true },
  { position: [6.4, -8.5, -26], scale: 0.07, opacity: 0.12, phase: 4.4, tilt: [0.88, 0.12, -0.1], spin: 0.52, far: true },
  { position: [-5.8, -16.0, -30], scale: 0.05, opacity: 0.08, phase: 6.2, tilt: [0.68, 0.08, 0.2], spin: 0.42, far: true },
]

export const MOBILE_GALAXIES: GalaxyPlacement[] = [
  { position: [5.0, 4.0, -16], scale: 0.11, opacity: 0.18, phase: 0, tilt: [0.82, 0.22, 0.08], spin: 0.65, far: true },
  { position: [-4.5, -6.0, -24], scale: 0.07, opacity: 0.12, phase: 3.2, tilt: [0.76, -0.1, 0.15], spin: 0.5, far: true },
]
