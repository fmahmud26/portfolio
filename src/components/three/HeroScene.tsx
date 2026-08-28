import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import type { Mesh, Points } from 'three'
import { useTheme } from '../../context/ThemeContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const DARK_BG = '#2e2e36'
const LIGHT_BG = '#f3f4f8'

function buildMinimalDisc(isDark: boolean) {
  const rings = 3
  const perRing = 120
  const total = rings * perRing
  const positions = new Float32Array(total * 3)
  const colors = new Float32Array(total * 3)
  const sizes = new Float32Array(total)

  const inner = new THREE.Color(isDark ? '#e9d5ff' : '#c7d2fe')
  const mid = new THREE.Color(isDark ? '#a5b4fc' : '#818cf8')
  const outer = new THREE.Color(isDark ? '#6366f1' : '#6366f1')
  const accent = new THREE.Color(isDark ? '#67e8f9' : '#0891b2')

  let index = 0
  for (let ring = 0; ring < rings; ring++) {
    const radius = 1.8 + ring * 1.1
    const ySpread = 0.05 + ring * 0.015

    for (let i = 0; i < perRing; i++) {
      const i3 = index * 3
      const angle = (i / perRing) * Math.PI * 2
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = (Math.random() - 0.5) * ySpread
      positions[i3 + 2] = Math.sin(angle) * radius * 0.52

      const isAccent = ring === 2 && i % 15 === 0
      const mix = ring / (rings - 1)
      const c = isAccent
        ? accent
        : inner.clone().lerp(ring < 2 ? mid : outer, mix)

      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
      sizes[index] = isAccent ? 0.11 : 0.045 + ring * 0.012
      index++
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  return geometry
}

function MinimalCosmos({ isDark }: { isDark: boolean }) {
  const pointsRef = useRef<Points>(null)
  const groupRef = useRef<THREE.Group>(null)
  const ringOuterRef = useRef<Mesh>(null)
  const ringInnerRef = useRef<Mesh>(null)
  const coreRef = useRef<Mesh>(null)
  const haloRef = useRef<Mesh>(null)
  const geometry = useMemo(() => buildMinimalDisc(isDark), [isDark])

  const accent = isDark ? '#c4b5fd' : '#818cf8'
  const cyan = isDark ? '#67e8f9' : '#0891b2'

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (pointsRef.current) pointsRef.current.rotation.y = t * 0.035
    if (ringOuterRef.current) ringOuterRef.current.rotation.z = -t * 0.025
    if (ringInnerRef.current) ringInnerRef.current.rotation.z = t * 0.04
    if (groupRef.current) {
      groupRef.current.rotation.x = 0.82 + Math.sin(t * 0.12) * 0.025
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 1.8) * 0.06
      coreRef.current.scale.setScalar(pulse)
    }
    if (haloRef.current) {
      const haloPulse = 1 + Math.sin(t * 1.2 + 1) * 0.08
      haloRef.current.scale.setScalar(haloPulse)
      const mat = haloRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.1 + Math.sin(t * 1.2) * 0.04
    }
  })

  return (
    <group ref={groupRef} rotation={[0.82, 0.25, 0.12]}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.06}
          sizeAttenuation
          vertexColors
          transparent
          opacity={isDark ? 0.88 : 0.78}
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>

      <mesh ref={ringInnerRef} rotation={[Math.PI / 2, 0, 0.4]}>
        <torusGeometry args={[2.5, 0.014, 8, 160]} />
        <meshBasicMaterial color={accent} transparent opacity={0.35} />
      </mesh>

      <mesh ref={ringOuterRef} rotation={[Math.PI / 2.15, 0.3, 0.9]}>
        <torusGeometry args={[3.9, 0.01, 8, 160]} />
        <meshBasicMaterial color={cyan} transparent opacity={0.28} />
      </mesh>

      <mesh rotation={[Math.PI / 2.05, 0, 1.2]}>
        <torusGeometry args={[5.1, 0.006, 6, 160]} />
        <meshBasicMaterial color={accent} transparent opacity={0.1} />
      </mesh>

      <mesh ref={haloRef}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshBasicMaterial color={accent} transparent opacity={0.12} />
      </mesh>

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={isDark ? '#c4b5fd' : '#818cf8'}
          emissiveIntensity={isDark ? 1.2 : 0.8}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 4.2, Math.sin(angle * 2) * 0.08, Math.sin(angle) * 2.2]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={cyan} transparent opacity={0.7} />
          </mesh>
        )
      })}
    </group>
  )
}

function Scene({ isDark, starCount }: { isDark: boolean; starCount: number }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.45 : 0.65} />
      <pointLight position={[4, 3, 5]} intensity={1.2} color="#e9d5ff" />
      <pointLight position={[-2, -1, 3]} intensity={0.5} color="#67e8f9" />

      {starCount > 0 && (
        <Stars radius={75} depth={45} count={starCount} factor={2.2} fade speed={0.08} />
      )}

      <Float speed={0.9} rotationIntensity={0.06} floatIntensity={0.18}>
        <MinimalCosmos isDark={isDark} />
      </Float>
    </>
  )
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return mobile
}

export function HeroScene() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  const galaxyX = isMobile ? 0.8 : 3.8
  const galaxyScale = isMobile ? 0.72 : 1
  const cameraPos = isMobile ? ([0.5, 0.8, 10] as const) : ([1.5, 1.2, 9] as const)
  const starCount = reducedMotion ? 0 : isDark ? (isMobile ? 350 : 650) : isMobile ? 200 : 380

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Ambient nebula orbs */}
      <div
        className="cosmos-drift absolute h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          top: '18%',
          right: isMobile ? '-10%' : '8%',
          background: isDark
            ? 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(129,140,248,0.28) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="cosmos-drift-reverse absolute h-[280px] w-[280px] rounded-full opacity-50 blur-3xl"
        style={{
          top: '42%',
          right: isMobile ? '5%' : '18%',
          background: isDark
            ? 'radial-gradient(circle, rgba(103,232,249,0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative frame ring */}
      <div
        className="absolute hidden rounded-full border border-accent/15 lg:block"
        style={{
          top: '50%',
          right: '12%',
          width: 'min(38vw, 440px)',
          height: 'min(38vw, 440px)',
          transform: 'translate(30%, -50%)',
          boxShadow: isDark
            ? 'inset 0 0 60px rgba(129,140,248,0.06), 0 0 80px rgba(99,102,241,0.08)'
            : 'inset 0 0 60px rgba(99,102,241,0.05), 0 0 80px rgba(129,140,248,0.06)',
        }}
        aria-hidden="true"
      />

      <Canvas
        camera={{ position: cameraPos, fov: 50 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={[isDark ? DARK_BG : LIGHT_BG]} />
        {!reducedMotion && (
          <group position={[galaxyX, 0, 0]} scale={galaxyScale}>
            <Scene isDark={isDark} starCount={starCount} />
          </group>
        )}
      </Canvas>

      <div className="scene-fade pointer-events-none absolute inset-0" />

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full sm:w-[75%] lg:w-[62%] xl:max-w-4xl"
        aria-hidden="true"
        style={{
          background: isDark
            ? 'linear-gradient(to right, rgba(46,46,54,0.94) 0%, rgba(46,46,54,0.48) 55%, transparent 100%)'
            : 'linear-gradient(to right, rgba(243,244,248,0.97) 0%, rgba(243,244,248,0.52) 55%, transparent 100%)',
        }}
      />
    </div>
  )
}
