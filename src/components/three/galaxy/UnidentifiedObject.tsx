import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group, Mesh } from 'three'
import type { UnidentifiedObjectPlacement } from './types'
import { cosmicVisibility } from './cosmicMotion'

type UnidentifiedObjectProps = {
  placement: UnidentifiedObjectPlacement
  isDark: boolean
  index: number
}

function pulseOpacity(
  base: number,
  t: number,
  speed: number,
  amplitude: number,
) {
  return base + Math.sin(t * speed) * amplitude
}

export function UnidentifiedObject({ placement, isDark, index }: UnidentifiedObjectProps) {
  const groupRef = useRef<Group>(null)
  const glowRef = useRef<Mesh>(null)
  const blinkRef = useRef<Mesh>(null)
  const opacity = Math.min(cosmicVisibility(isDark, placement.opacity), 1)
  const hullColor = isDark ? '#94a3b8' : '#64748b'
  const alienLight = isDark ? '#a78bfa' : '#6366f1'
  const satelliteLight = isDark ? '#4ade80' : '#117a8a'

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + placement.phase
    if (!groupRef.current) return

    const drift = placement.drift * 1.5
    const cross = placement.traverse * (index % 2 === 0 ? 1 : -1)
    groupRef.current.position.x =
      placement.position[0] +
      Math.sin(t * drift + index) * 0.42 +
      t * cross * 0.35
    groupRef.current.position.y =
      placement.position[1] +
      Math.cos(t * 0.12 + placement.phase) * 0.18 +
      Math.sin(t * 0.05 + index) * 0.08
    groupRef.current.position.z =
      placement.position[2] +
      Math.cos(t * drift * 0.8 + index) * 0.24 +
      t * cross * 0.12
    groupRef.current.rotation.y = Math.sin(t * 0.09 + placement.phase) * 0.28 + t * 0.05
    groupRef.current.rotation.z = Math.sin(t * 0.07 + index) * 0.1

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = pulseOpacity(
        (isDark ? 0.48 : 0.32) * opacity,
        t,
        placement.pulseSpeed,
        0.14,
      )
    }

    if (blinkRef.current) {
      const mat = blinkRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = pulseOpacity(
        (isDark ? 0.72 : 0.48) * opacity,
        t,
        placement.pulseSpeed * 1.6,
        0.22,
      )
    }
  })

  if (placement.variant === 'satellite') {
    return (
      <group ref={groupRef} position={placement.position} scale={placement.scale}>
        <mesh>
          <boxGeometry args={[0.32, 0.22, 0.22]} />
          <meshStandardMaterial
            color={hullColor}
            emissive={hullColor}
            emissiveIntensity={isDark ? 0.2 : 0.12}
            roughness={0.62}
            metalness={0.4}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.04, 0.72, 0.38]} />
          <meshStandardMaterial
            color={isDark ? '#64748b' : '#475569'}
            emissive={isDark ? '#475569' : '#334155'}
            emissiveIntensity={isDark ? 0.15 : 0.1}
            roughness={0.55}
            metalness={0.25}
            transparent
            opacity={opacity * 0.92}
          />
        </mesh>
        <mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.04, 0.72, 0.38]} />
          <meshStandardMaterial
            color={isDark ? '#64748b' : '#475569'}
            emissive={isDark ? '#475569' : '#334155'}
            emissiveIntensity={isDark ? 0.15 : 0.1}
            roughness={0.55}
            metalness={0.25}
            transparent
            opacity={opacity * 0.92}
          />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.28, 6]} />
          <meshStandardMaterial color={hullColor} metalness={0.5} roughness={0.4} transparent opacity={opacity} />
        </mesh>
        <mesh ref={blinkRef} position={[0.18, 0.12, 0.12]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial
            color={satelliteLight}
            transparent
            opacity={(isDark ? 0.7 : 0.45) * opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    )
  }

  if (placement.variant === 'probe') {
    return (
      <group ref={groupRef} position={placement.position} scale={placement.scale}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.14, 0.55, 4, 10]} />
          <meshStandardMaterial
            color={hullColor}
            emissive={hullColor}
            emissiveIntensity={isDark ? 0.2 : 0.12}
            roughness={0.55}
            metalness={0.35}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh ref={glowRef} position={[0.38, 0, 0]}>
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshBasicMaterial
            color={alienLight}
            transparent
            opacity={(isDark ? 0.55 : 0.36) * opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    )
  }

  if (placement.variant === 'mothership') {
    return (
      <group ref={groupRef} position={placement.position} scale={placement.scale * 1.15}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.58, 0.66, 0.12, 24]} />
          <meshStandardMaterial
            color={isDark ? '#64748b' : '#475569'}
            emissive={isDark ? '#64748b' : '#475569'}
            emissiveIntensity={isDark ? 0.18 : 0.12}
            roughness={0.42}
            metalness={0.48}
            transparent
            opacity={opacity}
          />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <sphereGeometry args={[0.28, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={isDark ? '#c4b5fd' : '#818cf8'}
            emissive={isDark ? '#a78bfa' : '#6366f1'}
            emissiveIntensity={isDark ? 0.22 : 0.14}
            roughness={0.35}
            metalness={0.45}
            transparent
            opacity={opacity * 0.94}
          />
        </mesh>
        <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.022, 6, 40]} />
          <meshBasicMaterial
            color={alienLight}
            transparent
            opacity={(isDark ? 0.55 : 0.34) * opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {[-0.22, 0, 0.22].map((x) => (
          <mesh key={x} ref={x === 0 ? blinkRef : undefined} position={[x, -0.08, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color={isDark ? '#67e8f9' : '#117a8a'}
              transparent
              opacity={(isDark ? 0.65 : 0.42) * opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    )
  }

  return (
    <group ref={groupRef} position={placement.position} scale={placement.scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.1, 20]} />
        <meshStandardMaterial
          color={hullColor}
          emissive={hullColor}
          emissiveIntensity={isDark ? 0.18 : 0.11}
          roughness={0.48}
          metalness={0.42}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.22, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={isDark ? '#ddd6fe' : '#a5b4fc'}
          emissive={isDark ? '#a78bfa' : '#6366f1'}
          emissiveIntensity={isDark ? 0.2 : 0.13}
          roughness={0.38}
          metalness={0.5}
          transparent
          opacity={opacity * 0.92}
        />
      </mesh>
      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.52, 0.018, 6, 32]} />
        <meshBasicMaterial
          color={alienLight}
          transparent
          opacity={(isDark ? 0.52 : 0.34) * opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={blinkRef} position={[0, -0.06, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial
          color={isDark ? '#f0abfc' : '#c084fc'}
          transparent
          opacity={(isDark ? 0.6 : 0.38) * opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
