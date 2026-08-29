import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/** Slow time-based drift — motion in the background only, not tied to scroll. */
export function AmbientCosmicDrift({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.058) * 0.09 + t * 0.0065
    groupRef.current.rotation.x = Math.sin(t * 0.042) * 0.028
    groupRef.current.position.x = Math.sin(t * 0.09) * 0.34
    groupRef.current.position.z = Math.cos(t * 0.072) * 0.22
    groupRef.current.position.y = Math.sin(t * 0.05) * 0.12
  })

  return <group ref={groupRef}>{children}</group>
}
