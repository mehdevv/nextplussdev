"use client"

import { Suspense, useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, useProgress } from "@react-three/drei"
import * as THREE from "three"

function LoadingBar({ isLoaded }: { isLoaded: boolean }) {
  const { progress } = useProgress()
  const [visible, setVisible] = useState(true)
  
  useEffect(() => {
    if (isLoaded) {
      // Delay hiding to show completion
      const timer = setTimeout(() => setVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])
  
  if (!visible) return null
  
  return (
    <div 
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="w-24 h-1 bg-blue-200/40 rounded-full overflow-hidden backdrop-blur-sm">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-200 ease-out"
          style={{ width: `${isLoaded ? 100 : Math.max(progress, 10)}%` }}
        />
      </div>
    </div>
  )
}

function PlaceholderModel() {
  const groupRef = useRef<THREE.Group>(null)
  
  const material = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#3b82f6',
    roughness: 0.3,
    metalness: 0.6,
  }), [])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = time * 0.5
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.3
      groupRef.current.rotation.x = Math.sin(time * 0.8) * 0.1
    }
  })

  return (
    <group ref={groupRef} scale={1.5}>
      <group position={[-0.8, 0, 0]}>
        <mesh position={[0.15, 0.7, 0]} rotation={[0, 0, Math.PI * 0.3]} material={material}>
          <torusGeometry args={[0.3, 0.08, 8, 12, Math.PI * 0.5]} />
        </mesh>
        <mesh position={[-0.15, 0, 0]} rotation={[0, 0, -Math.PI * 0.2]} material={material}>
          <torusGeometry args={[0.2, 0.08, 8, 12, Math.PI * 0.4]} />
        </mesh>
        <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI * 0.2 + Math.PI]} material={material}>
          <torusGeometry args={[0.2, 0.08, 8, 12, Math.PI * 0.4]} />
        </mesh>
        <mesh position={[0.15, -0.7, 0]} rotation={[0, 0, -Math.PI * 0.3]} material={material}>
          <torusGeometry args={[0.3, 0.08, 8, 12, Math.PI * 0.5]} />
        </mesh>
        <mesh position={[0.05, 0.35, 0]} material={material}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        </mesh>
        <mesh position={[0.05, -0.35, 0]} material={material}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        </mesh>
      </group>
      <group position={[0.8, 0, 0]} scale={[-1, 1, 1]}>
        <mesh position={[0.15, 0.7, 0]} rotation={[0, 0, Math.PI * 0.3]} material={material}>
          <torusGeometry args={[0.3, 0.08, 8, 12, Math.PI * 0.5]} />
        </mesh>
        <mesh position={[-0.15, 0, 0]} rotation={[0, 0, -Math.PI * 0.2]} material={material}>
          <torusGeometry args={[0.2, 0.08, 8, 12, Math.PI * 0.4]} />
        </mesh>
        <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI * 0.2 + Math.PI]} material={material}>
          <torusGeometry args={[0.2, 0.08, 8, 12, Math.PI * 0.4]} />
        </mesh>
        <mesh position={[0.15, -0.7, 0]} rotation={[0, 0, -Math.PI * 0.3]} material={material}>
          <torusGeometry args={[0.3, 0.08, 8, 12, Math.PI * 0.5]} />
        </mesh>
        <mesh position={[0.05, 0.35, 0]} material={material}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        </mesh>
        <mesh position={[0.05, -0.35, 0]} material={material}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        </mesh>
      </group>
    </group>
  )
}

function HighQualityModel({ url, onLoaded }: { url: string; onLoaded: () => void }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      scene.position.x -= center.x
      scene.position.y -= center.y
      scene.position.z -= center.z
      scene.scale.set(1.5, 1.5, 1.5)
      onLoaded()
    }
  }, [scene, onLoaded])

  useFrame((state) => {
    if (modelRef.current) {
      const time = state.clock.elapsedTime
      modelRef.current.rotation.y = time * 0.5
      modelRef.current.position.y = Math.sin(time * 1.5) * 0.3
      modelRef.current.rotation.x = Math.sin(time * 0.8) * 0.1
    }
  })

  return (
    <group ref={modelRef} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  )
}

function SceneContent({ modelPath, onModelLoaded }: { modelPath: string; onModelLoaded: () => void }) {
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false)
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  const handleHighQualityLoaded = () => {
    setIsHighQualityLoaded(true)
    onModelLoaded()
    setTimeout(() => setShowPlaceholder(false), 100)
  }

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      {/* Placeholder removed */}
      <group visible={isHighQualityLoaded}>
        <Suspense fallback={null}>
          <HighQualityModel url={modelPath} onLoaded={handleHighQualityLoaded} />
        </Suspense>
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        minDistance={4}
        maxDistance={4}
        autoRotate
        autoRotateSpeed={1}
        rotateSpeed={0.5}
      />
    </>
  )
}

export default function ModelViewer({ modelPath }: { modelPath: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isModelLoaded, setIsModelLoaded] = useState(false)

  useEffect(() => {
    useGLTF.preload(modelPath)
  }, [modelPath])

  useEffect(() => {
    const currentRef = containerRef.current
    const resizeObserver = new ResizeObserver(() => {})
    if (currentRef) resizeObserver.observe(currentRef)
    return () => { if (currentRef) resizeObserver.unobserve(currentRef) }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative" style={{ width: '100%', height: '100%', display: 'block' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="w-full h-full"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <SceneContent modelPath={modelPath} onModelLoaded={() => setIsModelLoaded(true)} />
      </Canvas>
      <LoadingBar isLoaded={isModelLoaded} />
    </div>
  )
}