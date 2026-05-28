"use client"

import { Suspense, useRef, useEffect, useState, useMemo, useCallback, memo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, useProgress } from "@react-three/drei"
import * as THREE from "three"
import { useInView } from "@/hooks/use-in-view"

function ModelFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"
      aria-hidden
    >
      <span className="text-6xl font-light text-blue-500/80 select-none">{"{ }"}</span>
    </div>
  )
}

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

function HighQualityModel({
  url,
  onLoaded,
  active,
}: {
  url: string
  onLoaded: () => void
  active: boolean
}) {
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
    if (!active || !modelRef.current) return
    const time = state.clock.elapsedTime
    modelRef.current.rotation.y = time * 0.5
    modelRef.current.position.y = Math.sin(time * 1.5) * 0.3
    modelRef.current.rotation.x = Math.sin(time * 0.8) * 0.1
  })

  return (
    <group ref={modelRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

function SceneContent({
  modelPath,
  onModelLoaded,
  active,
}: {
  modelPath: string
  onModelLoaded: () => void
  active: boolean
}) {
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false)
  const { invalidate } = useThree()

  const handleHighQualityLoaded = useCallback(() => {
    setIsHighQualityLoaded(true)
    onModelLoaded()
  }, [onModelLoaded])

  useEffect(() => {
    if (active) invalidate()
  }, [active, invalidate])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <group visible={isHighQualityLoaded}>
        <Suspense fallback={null}>
          <HighQualityModel url={modelPath} onLoaded={handleHighQualityLoaded} active={active} />
        </Suspense>
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate
        minDistance={4}
        maxDistance={4}
        rotateSpeed={0.5}
      />
    </>
  )
}

function useModelTouchScrollLock(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onTouchMove = (event: TouchEvent) => {
      if (event.cancelable) event.preventDefault()
    }

    container.addEventListener("touchmove", onTouchMove, { passive: false })
    return () => container.removeEventListener("touchmove", onTouchMove)
  }, [containerRef])
}

function useReducedGpu() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const dpr = useMemo(() => {
    if (typeof window === "undefined") return 1
    const cap = reduced ? 1.25 : 2
    return Math.min(window.devicePixelRatio || 1, cap)
  }, [reduced])

  return { reduced, dpr }
}

function ModelViewerInner({ modelPath }: { modelPath: string }) {
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null)
  const [pageVisible, setPageVisible] = useState(() =>
    typeof document !== "undefined" ? document.visibilityState === "visible" : true,
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { rootMargin: "80px", threshold: 0.05 })
  const handleModelLoaded = useCallback(() => setIsModelLoaded(true), [])
  const modelUrl = encodeURI(modelPath)
  const { reduced, dpr } = useReducedGpu()
  const canvasActive = inView && pageVisible

  useModelTouchScrollLock(containerRef)

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible")
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  useEffect(() => {
    let cancelled = false
    fetch(modelUrl, { method: "HEAD" })
      .then((response) => {
        if (!cancelled) setModelAvailable(response.ok)
      })
      .catch(() => {
        if (!cancelled) setModelAvailable(false)
      })
    return () => {
      cancelled = true
    }
  }, [modelUrl])

  useEffect(() => {
    if (modelAvailable && inView) useGLTF.preload(modelUrl)
  }, [modelAvailable, modelUrl, inView])

  const containerClassName =
    "model-viewer-touch w-full h-full relative block min-h-[192px] touch-none select-none"

  if (modelAvailable === false) {
    return (
      <div ref={containerRef} className={containerClassName} data-lenis-prevent>
        <ModelFallback />
      </div>
    )
  }

  if (modelAvailable === null) {
    return (
      <div
        ref={containerRef}
        className="w-full min-h-[192px] animate-pulse rounded-sm bg-gray-100 dark:bg-gray-800 touch-none"
        data-lenis-prevent
      />
    )
  }

  return (
    <div ref={containerRef} className={containerClassName} data-lenis-prevent>
      <Canvas
        camera={{ position: [0, -0.35, 6], fov: 50 }}
        gl={{
          antialias: !reduced,
          alpha: true,
          powerPreference: reduced ? "default" : "high-performance",
        }}
        dpr={dpr}
        frameloop={canvasActive ? "always" : "never"}
        className="w-full h-full block touch-none"
        style={{ width: "100%", height: "100%", touchAction: "none" }}
      >
        <SceneContent modelPath={modelUrl} onModelLoaded={handleModelLoaded} active={canvasActive} />
      </Canvas>
      <LoadingBar isLoaded={isModelLoaded} />
    </div>
  )
}

const ModelViewer = memo(ModelViewerInner)
export default ModelViewer
