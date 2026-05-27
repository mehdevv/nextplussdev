"use client"

import { Suspense, useRef, useEffect, useState, useMemo, useCallback, memo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, useProgress } from "@react-three/drei"
import * as THREE from "three"

function LoadingBar({ isLoaded }: { isLoaded: boolean }) {
  const { progress } = useProgress()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  if (!visible) return null

  return (
    <div
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${isLoaded ? "opacity-0" : "opacity-100"}`}
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

function normalizeScene(scene: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(scene)
  const center = box.getCenter(new THREE.Vector3())
  scene.position.sub(center)
  scene.scale.set(1.5, 1.5, 1.5)
}

function HighQualityModel({ url, onLoaded }: { url: string; onLoaded: () => void }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)
  const onLoadedRef = useRef(onLoaded)
  onLoadedRef.current = onLoaded

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    normalizeScene(clone)
    return clone
  }, [scene])

  useEffect(() => {
    onLoadedRef.current()
  }, [clonedScene])

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
      <primitive object={clonedScene} />
    </group>
  )
}

function SceneContent({ modelPath, onModelLoaded }: { modelPath: string; onModelLoaded: () => void }) {
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false)

  const handleHighQualityLoaded = useCallback(() => {
    setIsHighQualityLoaded(true)
    onModelLoaded()
  }, [onModelLoaded])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
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

function ModelViewerInner({ modelPath }: { modelPath: string }) {
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const handleModelLoaded = useCallback(() => setIsModelLoaded(true), [])

  useEffect(() => {
    useGLTF.preload(modelPath)
  }, [modelPath])

  return (
    <div className="w-full h-full relative block">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      >
        <SceneContent modelPath={modelPath} onModelLoaded={handleModelLoaded} />
      </Canvas>
      <LoadingBar isLoaded={isModelLoaded} />
    </div>
  )
}

const ModelViewer = memo(ModelViewerInner)
export default ModelViewer
