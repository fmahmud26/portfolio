import * as THREE from 'three'

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Irregular asteroid mesh from a seeded icosahedron displacement. */
export function buildRockGeometry(seed: number, detail = 0) {
  const rand = mulberry32(seed)
  const geometry = new THREE.IcosahedronGeometry(1, detail)
  const position = geometry.getAttribute('position')

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    const y = position.getY(i)
    const z = position.getZ(i)
    const len = Math.sqrt(x * x + y * y + z * z) || 1
    const nx = x / len
    const ny = y / len
    const nz = z / len
    const bump = 0.72 + rand() * 0.48
    position.setXYZ(i, nx * bump, ny * bump, nz * bump)
  }

  geometry.computeVertexNormals()
  return geometry
}
