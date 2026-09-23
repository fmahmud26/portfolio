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
    const tint = new THREE.Color(isDark ? '#a5b4fc' : '#4755c7')
    const dim = new THREE.Color(isDark ? '#94a3b8' : '#64748b')
    const teal = new THREE.Color(isDark ? '#5ec8d6' : '#117a8a')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 90 + Math.random() * 110
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = (Math.random() - 0.5) * 130
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 45

      const roll = Math.random()
      const c = roll > 0.92 ? teal : roll > 0.72 ? tint : dim
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
    ref.current.rotation.y = clock.elapsedTime * 0.0028
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.04) * 0.016
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={isDark ? 0.1 : 0.095}
        sizeAttenuation
        vertexColors
        transparent
        opacity={isDark ? 0.72 : 0.48}
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
    const t = clock.elapsedTime
    // ScrollParallax owns depth motion — stars only breathe gently in place
    groupRef.current.rotation.y = t * 0.0028 + scrollY() * 0.06
    groupRef.current.rotation.z = Math.sin(t * 0.024) * 0.008
  })

  const farCount = isMobile ? 900 : 1800
  const midCount = isMobile ? 320 : 640
  const pinCount = isMobile ? 400 : 800

  return (
    <group ref={groupRef}>
      <Stars
        radius={280}
        depth={180}
        count={farCount}
        factor={isDark ? 1.55 : 1.42}
        fade
        speed={0.032}
      />
      <Stars
        radius={150}
        depth={80}
        count={midCount}
        factor={isDark ? 1.7 : 1.55}
        fade
        speed={0.048}
      />
      <DistantPinpricks count={pinCount} isDark={isDark} />
    </group>
  )
}
