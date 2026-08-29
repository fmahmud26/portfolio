import * as THREE from 'three'

export type GalaxyDiscData = {
  geometry: THREE.BufferGeometry
  radii: Float32Array
  baseAngles: Float32Array
  yOffsets: Float32Array
  flatten: number
}

export type GalaxyDustData = {
  geometry: THREE.BufferGeometry
  radii: Float32Array
  baseAngles: Float32Array
  yOffsets: Float32Array
  flatten: number
}

/** Logarithmic spiral arms — radii/angles stored for differential rotation. */
export function buildGalaxyDisc(isDark: boolean, seed = 0): GalaxyDiscData {
  const arms = 2
  const pointsPerArm = 56
  const count = arms * pointsPerArm
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const radii = new Float32Array(count)
  const baseAngles = new Float32Array(count)
  const yOffsets = new Float32Array(count)
  const flatten = 0.48

  const inner = new THREE.Color(isDark ? '#cfc4ea' : '#4f46e5')
  const outer = new THREE.Color(isDark ? '#9290cc' : '#312e81')
  const accent = new THREE.Color(isDark ? '#a8bdd0' : '#0f766e')

  let index = 0
  for (let arm = 0; arm < arms; arm++) {
    const armOffset = (arm / arms) * Math.PI * 2 + seed * 0.22

    for (let i = 0; i < pointsPerArm; i++) {
      const t = i / Math.max(pointsPerArm - 1, 1)
      const radius = 0.85 + t * 3.15
      const spiralTightness = 1.85
      const angle = armOffset + t * spiralTightness + seed * 0.08
      const wobble = (Math.random() - 0.5) * 0.08
      const y = (Math.random() - 0.5) * (0.028 + t * 0.042)

      const i3 = index * 3
      radii[index] = radius + wobble
      baseAngles[index] = angle
      yOffsets[index] = y
      positions[i3] = Math.cos(angle) * (radius + wobble)
      positions[i3 + 1] = y
      positions[i3 + 2] = Math.sin(angle) * (radius + wobble) * flatten

      const isAccent = i % 17 === 0 && t > 0.25
      const c = isAccent ? accent : inner.clone().lerp(outer, t * 0.92 + (arm * 0.04))

      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
      sizes[index] = (0.026 + t * 0.018 + (isAccent ? 0.012 : 0)) * (isDark ? 1 : 1.28)
      index++
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  return { geometry, radii, baseAngles, yOffsets, flatten }
}

export function buildDustHalo(isDark: boolean, count: number, seed = 0): GalaxyDustData {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const radii = new Float32Array(count)
  const baseAngles = new Float32Array(count)
  const yOffsets = new Float32Array(count)
  const flatten = 0.44
  const tint = new THREE.Color(isDark ? '#9a94c4' : '#6366f1')

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const radius = 3.8 + Math.random() * 2.8
    const angle = Math.random() * Math.PI * 2 + seed
    const y = (Math.random() - 0.5) * 0.32

    radii[i] = radius
    baseAngles[i] = angle
    yOffsets[i] = y
    positions[i3] = Math.cos(angle) * radius
    positions[i3 + 1] = y
    positions[i3 + 2] = Math.sin(angle) * radius * flatten
    colors[i3] = tint.r
    colors[i3 + 1] = tint.g
    colors[i3 + 2] = tint.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  return { geometry, radii, baseAngles, yOffsets, flatten }
}

export function applyDifferentialRotation(
  geometry: THREE.BufferGeometry,
  radii: Float32Array,
  baseAngles: Float32Array,
  yOffsets: Float32Array,
  flatten: number,
  time: number,
  spin: number,
) {
  const position = geometry.getAttribute('position') as THREE.BufferAttribute
  const count = radii.length

  for (let i = 0; i < count; i++) {
    const radius = radii[i] ?? 1
    const angularVelocity = spin / Math.pow(Math.max(radius, 0.75), 1.35)
    const angle = (baseAngles[i] ?? 0) + time * angularVelocity
    const r = radius
    position.setXYZ(i, Math.cos(angle) * r, yOffsets[i] ?? 0, Math.sin(angle) * r * flatten)
  }

  position.needsUpdate = true
}
