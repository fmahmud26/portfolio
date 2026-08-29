export const DARK_BG = '#2e2e36'
export const LIGHT_BG = '#edf1f7'

/** Galaxy motion tuning — differential spin reads as realistic spiral rotation. */
export const COMFORT = {
  discOpacity: { dark: 0.3, light: 0.46 },
  dustOpacity: { dark: 0.11, light: 0.2 },
  ringOpacity: { dark: { inner: 0.11, outer: 0.06 }, light: { inner: 0.22, outer: 0.14 } },
  haloOpacity: { dark: 0.035, light: 0.06 },
  coreEmissive: { dark: 0.32, light: 0.42 },
  particleSize: { dark: { disc: 0.032, dust: 0.02 }, light: { disc: 0.044, dust: 0.028 } },
  /** Base spin scalar passed into differential rotation (inner arms move faster). */
  spin: { disc: 0.42, dust: -0.18, ringInner: 0.22, ringOuter: -0.14, wobble: 0.012 },
  drift: { yaw: 0.018, pitch: 0.008, roll: 0.006 },
} as const

/** Scroll parallax range — scene shifts vertically as user scrolls main content. */
export const SCROLL_PARALLAX = { range: 34, offset: -17 } as const

export type GalaxyPlacement = {
  position: [number, number, number]
  scale: number
  opacity: number
  phase: number
  tilt: [number, number, number]
  /** Per-galaxy spin multiplier */
  spin: number
  /** Very distant — lighter geometry, fainter */
  far?: boolean
}

export type SolarSystemPlacement = {
  position: [number, number, number]
  scale: number
  opacity: number
  phase: number
  starColor: string
  planets: number
  orbitSpeed: number
  far?: boolean
}

export const DESKTOP_GALAXIES: GalaxyPlacement[] = [
  { position: [5.6, 4.6, -1.2], scale: 0.56, opacity: 0.82, phase: 0, tilt: [0.82, 0.26, 0.1], spin: 1.05 },
  { position: [-6.4, 2.4, -3.2], scale: 0.38, opacity: 0.62, phase: 1.1, tilt: [0.74, -0.18, 0.22], spin: 0.92 },
  { position: [4.6, 0.2, -5.8], scale: 0.32, opacity: 0.52, phase: 2.3, tilt: [0.88, 0.42, -0.12], spin: 0.88 },
  { position: [-4.2, -2.8, -7.5], scale: 0.26, opacity: 0.44, phase: 3.5, tilt: [0.68, 0.08, 0.28], spin: 0.82 },
  { position: [6.8, -5.6, -9.5], scale: 0.22, opacity: 0.36, phase: 4.7, tilt: [0.9, -0.32, 0.06], spin: 0.76 },
  { position: [-3.6, -8.8, -12.5], scale: 0.16, opacity: 0.28, phase: 5.9, tilt: [0.72, 0.14, -0.18], spin: 0.68, far: true },
  { position: [5.2, -12.2, -16], scale: 0.11, opacity: 0.22, phase: 7.1, tilt: [0.86, -0.22, 0.12], spin: 0.58, far: true },
  { position: [-7.8, -15.8, -21], scale: 0.07, opacity: 0.16, phase: 8.4, tilt: [0.64, 0.06, 0.24], spin: 0.48, far: true },
  { position: [8.4, -18.5, -26], scale: 0.05, opacity: 0.12, phase: 9.6, tilt: [0.78, -0.08, -0.1], spin: 0.38, far: true },
]

export const MOBILE_GALAXIES: GalaxyPlacement[] = [
  { position: [3.4, 3.2, -1.2], scale: 0.48, opacity: 0.78, phase: 0, tilt: [0.82, 0.22, 0.08], spin: 1 },
  { position: [-4.4, 0.6, -4.5], scale: 0.3, opacity: 0.54, phase: 1.8, tilt: [0.76, -0.14, 0.18], spin: 0.88 },
  { position: [3.6, -3.2, -7], scale: 0.24, opacity: 0.42, phase: 3.2, tilt: [0.7, 0.36, -0.1], spin: 0.8 },
  { position: [-3.2, -7.2, -11], scale: 0.15, opacity: 0.28, phase: 4.6, tilt: [0.74, 0.1, 0.2], spin: 0.65, far: true },
  { position: [4.8, -11.5, -16], scale: 0.09, opacity: 0.18, phase: 6, tilt: [0.68, -0.18, 0.08], spin: 0.52, far: true },
]

export const DESKTOP_SOLAR_SYSTEMS: SolarSystemPlacement[] = [
  { position: [-5.8, 3.2, -2.5], scale: 0.62, opacity: 0.68, phase: 0.4, starColor: '#fbbf24', planets: 4, orbitSpeed: 0.42 },
  { position: [6.4, 0.8, -5.2], scale: 0.48, opacity: 0.56, phase: 2.2, starColor: '#f97316', planets: 3, orbitSpeed: 0.38 },
  { position: [-4.6, -4.2, -8.5], scale: 0.36, opacity: 0.46, phase: 3.8, starColor: '#fcd34d', planets: 3, orbitSpeed: 0.34 },
  { position: [5.0, -7.8, -12], scale: 0.26, opacity: 0.34, phase: 5.4, starColor: '#fb923c', planets: 2, orbitSpeed: 0.28, far: true },
  { position: [-6.2, -11.5, -16.5], scale: 0.18, opacity: 0.26, phase: 6.9, starColor: '#fde68a', planets: 2, orbitSpeed: 0.22, far: true },
  { position: [7.2, -15.2, -22], scale: 0.12, opacity: 0.18, phase: 8.2, starColor: '#fdba74', planets: 2, orbitSpeed: 0.18, far: true },
]

export const MOBILE_SOLAR_SYSTEMS: SolarSystemPlacement[] = [
  { position: [-4.2, 2.4, -2.8], scale: 0.52, opacity: 0.62, phase: 0.6, starColor: '#fbbf24', planets: 3, orbitSpeed: 0.4 },
  { position: [4.6, -2.6, -6.5], scale: 0.34, opacity: 0.44, phase: 2.8, starColor: '#f97316', planets: 2, orbitSpeed: 0.32 },
  { position: [-3.8, -8.5, -12], scale: 0.2, opacity: 0.28, phase: 5.1, starColor: '#fcd34d', planets: 2, orbitSpeed: 0.24, far: true },
]
