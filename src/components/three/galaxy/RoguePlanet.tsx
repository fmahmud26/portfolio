import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import type { RoguePlanetPlacement } from './types'

type RoguePlanetProps = {
  placement: RoguePlanetPlacement
  isDark: boolean
  index: number
}

export function RoguePlanet({ placement, isDark, index }: RoguePlanetProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + placement.phase
    if (!groupRef.current) return

    groupRef.current.position.y =
      placement.position[1] + Math.sin(t * 0.09 + index) * 0.05
    groupRef.current.rotation.y = t * placement.orbitDrift * 0.15

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.12 + placement.phase) * 0.12
    }
  })

  return (
    <group ref={groupRef} position={placement.position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[placement.size, 10, 10]} />
        <meshStandardMaterial
          color={placement.color}
          emissive={placement.color}
          emissiveIntensity={isDark ? 0.06 : 0.1}
          roughness={0.78}
          metalness={0.06}
          transparent
          opacity={placement.opacity}
        />
      </mesh>

      {placement.ring && (
        <mesh rotation={[Math.PI / 2.2, 0.15, 0]}>
          <torusGeometry args={[placement.size * 1.7, placement.size * 0.22, 4, 32]} />
          <meshBasicMaterial
            color={isDark ? '#c4b5fd' : '#818cf8'}
            transparent
            opacity={0.28 * placement.opacity}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}
