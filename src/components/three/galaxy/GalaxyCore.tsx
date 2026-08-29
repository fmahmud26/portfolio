import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh, Points } from 'three'
import { COMFORT } from './constants'
import { applyDifferentialRotation, buildDustHalo, buildGalaxyDisc } from './buildGalaxy'

type GalaxyCoreProps = {
  isDark: boolean
  isMobile: boolean
  opacityScale?: number
  phase?: number
  initialTilt?: [number, number, number]
  spinScale?: number
  /** Distant galaxies use lighter geometry but still spin. */
  lite?: boolean
}

export function GalaxyCore({
  isDark,
  isMobile,
  opacityScale = 1,
  phase = 0,
  initialTilt = [0.82, 0.26, 0.1],
  spinScale = 1,
  lite = false,
}: GalaxyCoreProps) {
  const discRef = useRef<Points>(null)
  const dustRef = useRef<Points>(null)
  const groupRef = useRef<THREE.Group>(null)
  const ringInnerRef = useRef<Mesh>(null)
  const ringOuterRef = useRef<Mesh>(null)
  const coreRef = useRef<Mesh>(null)
  const haloRef = useRef<Mesh>(null)

  const dustCount = lite ? (isMobile ? 36 : 52) : isMobile ? 56 : 84
  const discData = useMemo(() => buildGalaxyDisc(isDark, phase), [isDark, phase])
  const dustData = useMemo(() => buildDustHalo(isDark, dustCount, phase), [isDark, dustCount, phase])

  const mode = isDark ? 'dark' : 'light'
  const accent = isDark ? '#b4aae6' : '#4338ca'
  const rim = isDark ? '#a8bdd0' : '#4755c7'
  const ringOpacityScale = lite ? 0.72 : 1
  const particleSize = COMFORT.particleSize[mode]

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase
    const { spin, drift } = COMFORT
    const discSpin = spin.disc * spinScale
    const dustSpin = spin.dust * spinScale

    if (discRef.current) {
      applyDifferentialRotation(
        discRef.current.geometry,
        discData.radii,
        discData.baseAngles,
        discData.yOffsets,
        discData.flatten,
        t,
        discSpin,
      )
    }

    if (dustRef.current) {
      applyDifferentialRotation(
        dustRef.current.geometry,
        dustData.radii,
        dustData.baseAngles,
        dustData.yOffsets,
        dustData.flatten,
        t,
        dustSpin,
      )
    }

    if (ringInnerRef.current) {
      ringInnerRef.current.rotation.z = t * spin.ringInner * spinScale
    }
    if (ringOuterRef.current) {
      ringOuterRef.current.rotation.z = t * spin.ringOuter * spinScale
    }

    if (groupRef.current) {
      groupRef.current.rotation.x = initialTilt[0] + Math.sin(t * 0.14) * spin.wobble
      groupRef.current.rotation.y = initialTilt[1] + t * drift.yaw * spinScale * 0.12
      groupRef.current.rotation.z = initialTilt[2] + Math.sin(t * 0.11 + phase) * drift.roll * 1.4
    }

    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 1.05) * 0.035)
    }
    if (haloRef.current) {
      const mat = haloRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = COMFORT.haloOpacity[mode] * opacityScale + Math.sin(t * 0.78) * 0.022
    }
  })

  return (
    <group ref={groupRef} rotation={initialTilt}>
      <points ref={dustRef} geometry={dustData.geometry}>
        <pointsMaterial
          size={particleSize.dust}
          sizeAttenuation
          vertexColors
          transparent
          opacity={COMFORT.dustOpacity[mode] * opacityScale}
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>

      <points ref={discRef} geometry={discData.geometry}>
        <pointsMaterial
          size={particleSize.disc}
          sizeAttenuation
          vertexColors
          transparent
          opacity={COMFORT.discOpacity[mode] * opacityScale}
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>

      <mesh ref={ringInnerRef} rotation={[Math.PI / 2, 0, 0.32]}>
        <torusGeometry args={[2.42, 0.011, 8, 128]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={COMFORT.ringOpacity[mode].inner * opacityScale * ringOpacityScale}
        />
      </mesh>

      <mesh ref={ringOuterRef} rotation={[Math.PI / 2.12, 0.24, 0.78]}>
        <torusGeometry args={[3.85, 0.008, 8, 128]} />
        <meshBasicMaterial
          color={rim}
          transparent
          opacity={COMFORT.ringOpacity[mode].outer * opacityScale * ringOpacityScale}
        />
      </mesh>

      {!lite && (
        <>
          <mesh ref={haloRef}>
            <sphereGeometry args={[0.76, 24, 24]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={COMFORT.haloOpacity[mode] * opacityScale}
            />
          </mesh>

          <mesh ref={coreRef}>
            <sphereGeometry args={[0.17, 24, 24]} />
            <meshStandardMaterial
              color={isDark ? '#ebe6fa' : '#f8f7ff'}
              emissive={isDark ? '#b0a6e4' : '#6366f1'}
              emissiveIntensity={COMFORT.coreEmissive[mode] * opacityScale}
              roughness={0.28}
              metalness={0.06}
            />
          </mesh>
        </>
      )}
    </group>
  )
}
