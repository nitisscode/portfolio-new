import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

function NetworkNodes({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null)
  const lineRef = useRef<THREE.LineSegments>(null)

  const { positions, linePositions } = useMemo(() => {
    const count = 18
    const positions: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.4 + Math.random() * 1.8
      positions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.7,
          r * Math.cos(phi),
        ),
      )
    }

    const linePositions: number[] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (positions[i].distanceTo(positions[j]) < 2.1) {
          linePositions.push(
            positions[i].x,
            positions[i].y,
            positions[i].z,
            positions[j].x,
            positions[j].y,
            positions[j].z,
          )
        }
      }
    }

    return { positions, linePositions }
  }, [])

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12
      group.current.rotation.x += delta * 0.04
    }
  })

  const accentColor = new THREE.Color(accent)

  return (
    <group ref={group}>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(linePositions), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={accentColor}
          transparent
          opacity={0.4}
        />
      </lineSegments>

      {positions.map((pos, i) => (
        <Float
          key={i}
          speed={1.2 + (i % 3) * 0.3}
          rotationIntensity={0.2}
          floatIntensity={0.4}
        >
          <mesh position={pos}>
            <sphereGeometry args={[i % 4 === 0 ? 0.09 : 0.055, 16, 16]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={i % 4 === 0 ? 0.55 : 0.25}
              roughness={0.35}
              metalness={0.4}
            />
          </mesh>
        </Float>
      ))}

      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  const { theme } = useTheme()
  const accent = theme === 'dark' ? '#2dd4bf' : '#0f766e'
  const fogColor = theme === 'dark' ? '#0c0f12' : '#f0f3f6'

  return (
    <Canvas
      camera={{ position: [0.6, 0.1, 4.6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <fog attach="fog" args={[fogColor, 5, 10]} />
      <ambientLight intensity={theme === 'dark' ? 0.4 : 0.6} />
      <directionalLight position={[4, 3, 5]} intensity={1.2} />
      <pointLight position={[-3, -2, 2]} intensity={0.75} color={accent} />
      <group position={[1.1, 0.05, 0]}>
        <NetworkNodes accent={accent} />
      </group>
    </Canvas>
  )
}
