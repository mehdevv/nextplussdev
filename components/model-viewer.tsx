"use client"

import { Suspense, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)
  const centerRef = useRef<THREE.Vector3 | null>(null)

  // Preload the model
  useGLTF.preload(url)

  // Center the model's pivot point on the plus sign
  useEffect(() => {
    if (scene) {
      // Calculate bounding box to find the geometric center
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      centerRef.current = center
      
      // Offset the scene to center it at origin
      scene.position.x -= center.x
      scene.position.y -= center.y
      scene.position.z -= center.z
      
      // Scale the model
      scene.scale.set(1.5, 1.5, 1.5)
    }
  }, [scene])

  // Add smooth rotation and floating animations
  useFrame((state) => {
    if (modelRef.current) {
      const time = state.clock.elapsedTime
      // Continuous rotation around Y axis
      modelRef.current.rotation.y = time * 0.5
      // Floating up and down animation
      modelRef.current.position.y = Math.sin(time * 1.5) * 0.3
      // Subtle rotation on X axis for more dynamic movement
      modelRef.current.rotation.x = Math.sin(time * 0.8) * 0.1
    }
  })

  return (
    <group ref={modelRef} position={[0, 0, 0]}>
      <primitive 
        object={scene} 
      />
    </group>
  )
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="text-gray-400 text-sm">Loading 3D model...</div>
    </div>
  )
}

export default function ModelViewer({ modelPath }: { modelPath: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Force canvas resize on mount
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Canvas will auto-resize via react-three/fiber
      }
    })
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full" style={{ width: '100%', height: '100%', display: 'block' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="w-full h-full"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <Model url={modelPath} />
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
        </Suspense>
      </Canvas>
    </div>
  )
}

