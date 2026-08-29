import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import type { RoguePlanetPlacement } from './types'
import { cosmicVisibility } from './cosmicMotion'

type RoguePlanetProps = {
  placement: RoguePlanetPlacement
  isDark: boolean
  index: number
}

export function RoguePlanet({ placement, isDark, index }: RoguePlanetProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const opacity = Math.min(cosmicVisibility(isDark, placement.opacity), 1)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + placement.phase
    if (!groupRef.current) return

    const orbit = placement.orbitDrift * 1.75
    groupRef.current.position.x =
      placement.position[0] + Math.cos(t * orbit + index) * 0.26
    groupRef.current.position.y =
      placement.position[1] + Math.sin(t * 0.16 + index) * 0.12
    groupRef.current.position.z =
      placement.position[2] + Math.sin(t * orbit * 0.85 + placement.phase) * 0.2
    groupRef.current.rotation.y = t * orbit * 0.28

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.18 + placement.phase) * 0.22
      meshRef.current.rotation.z = t * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[placement.size, 10, 10]} />
        <meshStandardMaterial
          color={placement.color}
          emissive={placement.color}
          emissiveIntensity={isDark ? 0.32 : 0.24}
          roughness={0.72}
          metalness={0.08}
          transparent
          opacity={opacity}
        />
      </mesh>

      {placement.ring && (
        <mesh rotation={[Math.PI / 2.2, 0.15, 0]}>
          <torusGeometry args={[placement.size * 1.7, placement.size * 0.22, 4, 32]} />
          <meshBasicMaterial
            color={isDark ? '#c4b5fd' : '#6366f1'}
            transparent
            opacity={0.52 * opacity}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}
