export type GalaxyPlacement = {
  position: [number, number, number]
  scale: number
  opacity: number
  phase: number
  tilt: [number, number, number]
  spin: number
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

export type RoguePlanetPlacement = {
  position: [number, number, number]
  size: number
  color: string
  phase: number
  opacity: number
  ring?: boolean
  orbitDrift: number
}
