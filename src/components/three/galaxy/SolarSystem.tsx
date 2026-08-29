import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group, Mesh } from 'three'

export type SolarSystemPlacement = {
  position: [number, number, number]
  scale: number
  opacity: number
  phase: number
  starColor: string
  /** 2–4 planets; distant systems use fewer automatically when lite */
  planets: number
  orbitSpeed: number
  /** Distant systems — fewer details, smaller glow */
  far?: boolean
}

type PlanetSpec = {
  orbit: number
  size: number
  speed: number
  color: string
  tilt: number
  ring?: boolean
}

const PLANET_PALETTE: PlanetSpec[] = [
  { orbit: 0.62, size: 0.075, speed: 1.65, color: '#94a3b8', tilt: 0.12 },
  { orbit: 0.92, size: 0.095, speed: 1.15, color: '#6366f1', tilt: -0.08 },
  { orbit: 1.28, size: 0.11, speed: 0.82, color: '#117a8a', tilt: 0.18, ring: true },
  { orbit: 1.68, size: 0.085, speed: 0.52, color: '#a78bfa', tilt: -0.14 },
]

type SolarSystemProps = {
  placement: SolarSystemPlacement
  isDark: boolean
  index: number
}

export function SolarSystem({ placement, isDark, index }: SolarSystemProps) {
  const rootRef = useRef<Group>(null)
  const orbitRefs = useRef<(Group | null)[]>([])
  const sunRef = useRef<Mesh>(null)
  const glowRef = useRef<Mesh>(null)

  const far = placement.far ?? false
  const planetSpecs = useMemo(
    () => PLANET_PALETTE.slice(0, Math.min(placement.planets, far ? 2 : 4)),
    [placement.planets, far],
  )

  const starEmissive = isDark ? placement.starColor : '#6366f1'
  const glowOpacity = (isDark ? 0.22 : 0.32) * placement.opacity * (far ? 0.65 : 1)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + placement.phase
    const speed = placement.orbitSpeed

    if (rootRef.current) {
      rootRef.current.position.y =
        placement.position[1] + Math.sin(t * 0.11 + index) * 0.06 * (far ? 0.5 : 1)
      rootRef.current.rotation.y = Math.sin(t * 0.04 + placement.phase) * 0.05
    }

    orbitRefs.current.forEach((orbit, i) => {
      if (!orbit) return
      const spec = planetSpecs[i]
      if (!spec) return
      orbit.rotation.y = t * spec.speed * speed
    })

    if (sunRef.current) {
      sunRef.current.scale.setScalar(1 + Math.sin(t * 1.1) * 0.04)
    }

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = glowOpacity + Math.sin(t * 0.7) * 0.025
    }
  })

  return (
    <group ref={rootRef} position={placement.position} scale={placement.scale}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[far ? 0.42 : 0.58, 16, 16]} />
        <meshBasicMaterial color={placement.starColor} transparent opacity={glowOpacity} depthWrite={false} />
      </mesh>

      <mesh ref={sunRef}>
        <sphereGeometry args={[far ? 0.14 : 0.2, 20, 20]} />
        <meshStandardMaterial
          color={isDark ? '#faf8ff' : '#fff7ed'}
          emissive={starEmissive}
          emissiveIntensity={(isDark ? 0.85 : 0.65) * placement.opacity}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {planetSpecs.map((spec, i) => (
        <group key={i} rotation={[spec.tilt, 0, 0]}>
          <group ref={(el) => { orbitRefs.current[i] = el }}>
            <mesh position={[spec.orbit, 0, 0]}>
              <sphereGeometry args={[spec.size, 14, 14]} />
              <meshStandardMaterial
                color={spec.color}
                emissive={spec.color}
                emissiveIntensity={isDark ? 0.08 : 0.12}
                roughness={0.72}
                metalness={0.08}
                transparent
                opacity={placement.opacity}
              />
            </mesh>

            {spec.ring && !far && (
              <mesh position={[spec.orbit, 0, 0]} rotation={[Math.PI / 2.4, 0.2, 0]}>
                <torusGeometry args={[spec.size * 1.85, spec.size * 0.28, 6, 48]} />
                <meshBasicMaterial
                  color={isDark ? '#c4b5fd' : '#818cf8'}
                  transparent
                  opacity={0.38 * placement.opacity}
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
            color={isDark ? '#64748b' : '#94a3b8'}
            transparent
            opacity={0.06 * placement.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}
