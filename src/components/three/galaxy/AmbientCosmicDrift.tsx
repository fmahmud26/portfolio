import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Subtle ambient breath — enough presence, not constant micro-jitter. */
export function AmbientCosmicDrift({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.04) * 0.045 + t * 0.0035
    groupRef.current.rotation.x = Math.sin(t * 0.028) * 0.014
    groupRef.current.position.x = Math.sin(t * 0.055) * 0.16
    groupRef.current.position.z = Math.cos(t * 0.045) * 0.1
    groupRef.current.position.y = Math.sin(t * 0.032) * 0.06
  })

  return <group ref={groupRef}>{children}</group>
}
