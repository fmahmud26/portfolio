import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import type { AsteroidPlacement } from './types'
import { buildRockGeometry } from './buildRockGeometry'
import { cosmicVisibility } from './cosmicMotion'

type AsteroidProps = {
  placement: AsteroidPlacement
  isDark: boolean
  index: number
}

export function Asteroid({ placement, isDark, index }: AsteroidProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const opacity = Math.min(cosmicVisibility(isDark, placement.opacity), 1)

  const geometry = useMemo(
    () => buildRockGeometry(placement.seed, placement.scale < 0.04 ? 0 : 1),
    [placement.seed, placement.scale],
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + placement.phase
    if (!groupRef.current) return

    const drift = placement.drift * 1.6
    groupRef.current.position.x =
      placement.position[0] + Math.cos(t * drift + index * 0.7) * 0.32
    groupRef.current.position.y =
      placement.position[1] + Math.sin(t * 0.14 + index) * 0.14
    groupRef.current.position.z =
      placement.position[2] + Math.sin(t * drift * 0.9 + placement.phase) * 0.24

    if (meshRef.current) {
      meshRef.current.rotation.x = t * placement.spin * 0.55 + placement.phase
      meshRef.current.rotation.y = t * placement.spin * 0.42
      meshRef.current.rotation.z = t * placement.spin * 0.28 + index * 0.2
    }
  })

  return (
    <group ref={groupRef} position={placement.position} scale={placement.scale}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color={placement.color}
          emissive={placement.color}
          emissiveIntensity={isDark ? 0.12 : 0.08}
          roughness={0.92}
          metalness={0.18}
          flatShading
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  )
}
