import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group, Mesh } from 'three'

import type { SolarSystemPlacement } from './types'
import { cosmicVisibility } from './cosmicMotion'

type PlanetSpec = {
  orbit: number
  size: number
  speed: number
  color: string
  tilt: number
  spin: number
  ring?: boolean
}

const PLANET_PALETTE: PlanetSpec[] = [
  { orbit: 0.62, size: 0.075, speed: 1.65, color: '#94a3b8', tilt: 0.12, spin: 0.42 },
  { orbit: 0.92, size: 0.095, speed: 1.15, color: '#6366f1', tilt: -0.08, spin: 0.28 },
  { orbit: 1.28, size: 0.11, speed: 0.82, color: '#117a8a', tilt: 0.18, spin: 0.22, ring: true },
  { orbit: 1.68, size: 0.085, speed: 0.52, color: '#a78bfa', tilt: -0.14, spin: 0.18 },
]

type SolarSystemProps = {
  placement: SolarSystemPlacement
  isDark: boolean
  index: number
}

export function SolarSystem({ placement, isDark, index }: SolarSystemProps) {
  const rootRef = useRef<Group>(null)
  const orbitRefs = useRef<(Group | null)[]>([])
  const planetRefs = useRef<(Mesh | null)[]>([])
  const sunRef = useRef<Mesh>(null)
  const glowRef = useRef<Mesh>(null)

  const far = placement.far ?? false
  const planetSpecs = useMemo(
    () => PLANET_PALETTE.slice(0, Math.min(placement.planets, far ? 2 : 4)),
    [placement.planets, far],
  )

  const opacity = cosmicVisibility(isDark, placement.opacity)
  const starEmissive = isDark ? placement.starColor : '#6366f1'
  const glowOpacity = (isDark ? 0.48 : 0.42) * opacity * (far ? 0.75 : 1)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + placement.phase
    const speed = placement.orbitSpeed * 1.65

    if (rootRef.current) {
      rootRef.current.position.y =
        placement.position[1] + Math.sin(t * 0.18 + index) * 0.14 * (far ? 0.6 : 1)
      rootRef.current.position.x =
        placement.position[0] + Math.cos(t * 0.12 + placement.phase) * 0.18
      rootRef.current.position.z =
        placement.position[2] + Math.sin(t * 0.08 + placement.phase) * 0.1
      rootRef.current.rotation.y = Math.sin(t * 0.07 + placement.phase) * 0.09 + t * 0.012
    }

    orbitRefs.current.forEach((orbit, i) => {
      if (!orbit) return
      const spec = planetSpecs[i]
      if (!spec) return
      orbit.rotation.y = t * spec.speed * speed
    })

    planetRefs.current.forEach((planet, i) => {
      if (!planet) return
      const spec = planetSpecs[i]
      if (!spec) return
      planet.rotation.y = t * spec.spin
      planet.rotation.x = Math.sin(t * 0.22 + spec.tilt + i) * 0.08
    })

    if (sunRef.current) {
      sunRef.current.scale.setScalar(1 + Math.sin(t * 1.35) * 0.07)
      sunRef.current.rotation.y = t * 0.15
    }

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = glowOpacity + Math.sin(t * 0.85) * 0.06
    }
  })

  return (
    <group ref={rootRef} position={placement.position} scale={placement.scale}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[far ? 0.48 : 0.66, 16, 16]} />
        <meshBasicMaterial
          color={placement.starColor}
          transparent
          opacity={glowOpacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={sunRef}>
        <sphereGeometry args={[far ? 0.15 : 0.22, 20, 20]} />
        <meshStandardMaterial
          color={isDark ? '#faf8ff' : '#fff7ed'}
          emissive={starEmissive}
          emissiveIntensity={(isDark ? 1.25 : 0.88) * opacity}
          roughness={0.32}
          metalness={0.05}
        />
      </mesh>

      {planetSpecs.map((spec, i) => (
        <group key={i} rotation={[spec.tilt, 0, 0]}>
          <group ref={(el) => { orbitRefs.current[i] = el }}>
            <mesh
              ref={(el) => { planetRefs.current[i] = el }}
              position={[spec.orbit, 0, 0]}
            >
              <sphereGeometry args={[spec.size, 14, 14]} />
              <meshStandardMaterial
                color={spec.color}
                emissive={spec.color}
                emissiveIntensity={isDark ? 0.32 : 0.24}
                roughness={0.68}
                metalness={0.1}
                transparent
                opacity={Math.min(opacity, 1)}
              />
            </mesh>

            {spec.ring && !far && (
              <mesh position={[spec.orbit, 0, 0]} rotation={[Math.PI / 2.4, 0.2, 0]}>
                <torusGeometry args={[spec.size * 1.85, spec.size * 0.28, 6, 48]} />
                <meshBasicMaterial
                  color={isDark ? '#c4b5fd' : '#6366f1'}
                  transparent
                  opacity={0.58 * opacity}
                  depthWrite={false}
                />
              </mesh>
            )}
          </group>
        </group>
      ))}

      {!far && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.48, 2.05, 64]} />
          <meshBasicMaterial
            color={isDark ? '#94a3b8' : '#64748b'}
            transparent
            opacity={0.16 * opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}
