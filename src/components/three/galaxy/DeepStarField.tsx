import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import type { Points } from 'three'

type DeepStarFieldProps = {
  isDark: boolean
  isMobile: boolean
  scrollY: () => number
}

function DistantPinpricks({ count, isDark }: { count: number; isDark: boolean }) {
  const ref = useRef<Points>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const tint = new THREE.Color(isDark ? '#d4d4f0' : '#4755c7')
    const dim = new THREE.Color(isDark ? '#8884b8' : '#64748b')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 80 + Math.random() * 120
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = (Math.random() - 0.5) * 140
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 40

      const c = Math.random() > 0.82 ? tint : dim
      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [count, isDark])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.0015
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={isDark ? 0.08 : 0.1}
        sizeAttenuation
        vertexColors
        transparent
        opacity={isDark ? 0.55 : 0.42}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function DeepStarField({ isDark, isMobile, scrollY }: DeepStarFieldProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.002 + scrollY() * 0.25
    groupRef.current.position.y = scrollY() * 6 - 3
  })

  const farCount = isMobile ? 1400 : 3200
  const midCount = isMobile ? 500 : 1000
  const pinCount = isMobile ? 600 : 1400

  return (
    <group ref={groupRef}>
      <Stars
        radius={260}
        depth={200}
        count={farCount}
        factor={isDark ? 1.1 : 1.45}
        fade
        speed={0.015}
      />
      <Stars
        radius={140}
        depth={90}
        count={midCount}
        factor={isDark ? 1.25 : 1.65}
        fade
        speed={0.035}
      />
      <DistantPinpricks count={pinCount} isDark={isDark} />
    </group>
  )
}
