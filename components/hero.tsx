"use client"

import { useState, useEffect, useRef, memo, lazy, Suspense } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

const HERO_MODEL_PATH = "/models/blue-curly-braces.glb"

const ModelViewer = lazy(() => import("@/components/model-viewer"))

function ModelPlaceholder() {
  return (
    <div
      className="w-full min-h-[192px] md:min-h-[240px] rounded-sm bg-gray-100 dark:bg-gray-800"
      aria-hidden
    />
  )
}

const HeroModel = memo(function HeroModel() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const shouldLoad = useInView(wrapRef, { rootMargin: "160px", once: true })

  return (
    <div ref={wrapRef} className="flex justify-center mb-2 mt-10 translate-y-3 md:mt-12 md:translate-y-4">
      <div className="model-container" data-lenis-prevent>
        {shouldLoad ? (
          <Suspense fallback={<ModelPlaceholder />}>
            <ModelViewer modelPath={HERO_MODEL_PATH} />
          </Suspense>
        ) : (
          <ModelPlaceholder />
        )}
      </div>
    </div>
  )
})

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const [arrowOpacity, setArrowOpacity] = useState(1)
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const fullText = t("hero.typing")

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return

    let raf = 0
    const update = () => {
      setArrowOpacity(Math.max(0, 1 - window.scrollY / 300))
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        update()
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 80)

    return () => clearInterval(timer)
  }, [fullText])

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto text-center relative z-10 max-w-4xl px-6" style={{ marginTop: '-80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
          <HeroModel />

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[0.9] tracking-tight text-black dark:text-white transition-colors duration-300"
            >
              {typedText}
              <br />
              <span className="font-bold">pluss.dev</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300"
            >
              {t("hero.subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              className="w-fit min-w-0 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-5 text-sm font-medium rounded-none border-0 transition-all duration-200 hover:scale-105"
              asChild
            >
              <a
                href="#portfolio"
                target="_self"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <span>{t("hero.cta")}</span>
                <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <div
        style={{ opacity: arrowOpacity }}
        className="hero-scroll-arrow pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <div className="hero-scroll-arrow__inner relative h-full w-full">
          <Image
            src="/assets/arrow.png"
            alt=""
            fill
            className="object-contain object-bottom object-right"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
