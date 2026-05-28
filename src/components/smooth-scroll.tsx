import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_MQ = "(min-width: 768px)"

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const mm = gsap.matchMedia()

    mm.add(DESKTOP_MQ, () => {
      const lenis = new Lenis({
        lerp: 0.08,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        // Native touch scroll on phones — Lenis syncTouch is a common jank source
        syncTouch: false,
      })

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true })
          }
          return lenis.scroll
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        },
      })

      lenis.on("scroll", ScrollTrigger.update)

      let scrollRaf = 0
      const onLenisScroll = () => {
        if (scrollRaf) return
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0
          window.dispatchEvent(new Event("scroll"))
        })
      }
      lenis.on("scroll", onLenisScroll)

      const onTick = (time: number) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(onTick)
      gsap.ticker.lagSmoothing(0)

      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        if (scrollRaf) cancelAnimationFrame(scrollRaf)
        gsap.ticker.remove(onTick)
        lenis.off("scroll", onLenisScroll)
        lenis.off("scroll", ScrollTrigger.update)
        ScrollTrigger.scrollerProxy(document.documentElement, {})
        lenis.destroy()
        ScrollTrigger.refresh()
      }
    })

    return () => mm.revert()
  }, [])

  return children
}
