"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { FEATURED_PROJECTS, type FeaturedProject } from "@/data/projects"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const STICKY_BASE_TOP = 72
const STICKY_STAGGER = 10
/** Scroll room per project — user reads one card before the next stacks */
const SLOT_HEIGHT_VH = 88
const LAST_SLOT_HEIGHT_VH = 68
const CARD_SCALE_MIN = 0.9
const CARD_SCALE_MAX = 1
/** Slightly stronger scale on small screens so the effect reads clearly */
const CARD_SCALE_MIN_MOBILE = 0.86
const MOBILE_SLOT_HEIGHT_VH = 92
const MOBILE_LAST_SLOT_HEIGHT_VH = 72

function ProjectCard({
  project,
  index,
  total,
}: {
  project: FeaturedProject
  index: number
  total: number
}) {
  const { t, language } = useLanguage()
  const title = language === "fr" && project.titleFr ? project.titleFr : project.title
  const description =
    language === "fr" && project.descriptionFr ? project.descriptionFr : project.description
  const category = language === "fr" && project.categoryFr ? project.categoryFr : project.category
  const demoUrl =
    project.demoUrl && !/^https?:\/\//.test(project.demoUrl)
      ? `https://${project.demoUrl}`
      : project.demoUrl

  return (
    <div
      className="group border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden min-h-[min(68vh,640px)] flex flex-col md:flex-row"
      style={{
        boxShadow:
          index === total - 1
            ? "0 28px 60px -12px rgba(0, 0, 0, 0.28)"
            : `0 ${12 + index * 4}px ${32 + index * 8}px -8px rgba(0, 0, 0, ${0.12 + index * 0.04})`,
      }}
    >
      <div className="relative w-full md:w-[58%] min-h-[240px] md:min-h-full flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {project.image && (
          <Image
            src={project.image}
            alt={title}
            fill
            className="object-cover object-top grayscale contrast-[1.05] transition-[filter,transform] duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 58vw"
            priority={index === 0}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-medium px-3 py-1.5 tracking-wider">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-col justify-center flex-1 p-8 md:p-10 lg:p-12">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          {category}
        </span>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-black dark:text-white mb-4 leading-tight tracking-tight">
          {title}
        </h3>

        {project.techs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="text-[10px] uppercase tracking-wide px-2.5 py-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg mb-8 max-w-xl">
          {description}
        </p>

        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
          <Button
            variant="outline"
            className="w-full md:w-auto border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-none px-8 py-6 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
            asChild={false}
          >
            <>
              <span>{t("portfolio.viewProject")}</span>
              <ExternalLink className="w-4 h-4" />
            </>
          </Button>
        </a>
      </div>
    </div>
  )
}

function scaleFromScrollProgress(progress: number, scaleMin = CARD_SCALE_MIN) {
  if (progress <= 0.5) {
    return gsap.utils.mapRange(0, 0.5, scaleMin, CARD_SCALE_MAX, progress)
  }
  return gsap.utils.mapRange(0.5, 1, CARD_SCALE_MAX, scaleMin, progress)
}

/** Scale + lift + fade tuned for vertical mobile scrolling */
function mobileMotionFromProgress(progress: number) {
  const scale = scaleFromScrollProgress(progress, CARD_SCALE_MIN_MOBILE)

  if (progress <= 0.5) {
    return {
      scale,
      y: gsap.utils.mapRange(0, 0.5, 40, 0, progress),
      opacity: gsap.utils.mapRange(0, 0.5, 0.7, 1, progress),
    }
  }

  return {
    scale,
    y: gsap.utils.mapRange(0.5, 1, 0, 32, progress),
    opacity: gsap.utils.mapRange(0.5, 1, 1, 0.78, progress),
  }
}

function usePortfolioCardScale(stackRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", stack)
      const triggers: ScrollTrigger[] = []

      cards.forEach((card) => {
        const slot = card.closest<HTMLElement>("[data-stack-slot]")
        if (!slot) return

        gsap.set(card, { scale: CARD_SCALE_MIN, transformOrigin: "center top" })

        triggers.push(
          ScrollTrigger.create({
            trigger: slot,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate(self) {
              gsap.set(card, { scale: scaleFromScrollProgress(self.progress) })
            },
          }),
        )
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        triggers.forEach((trigger) => trigger.kill())
        gsap.set(cards, { clearProps: "scale,transform" })
        ScrollTrigger.refresh()
      }
    })

    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", stack)
      const triggers: ScrollTrigger[] = []

      cards.forEach((card) => {
        const slot = card.closest<HTMLElement>("[data-stack-slot]")
        if (!slot) return

        gsap.set(card, {
          scale: CARD_SCALE_MIN_MOBILE,
          y: 40,
          opacity: 0.7,
          transformOrigin: "center top",
        })

        triggers.push(
          ScrollTrigger.create({
            trigger: slot,
            start: "top 92%",
            end: "bottom 8%",
            scrub: 0.45,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const { scale, y, opacity } = mobileMotionFromProgress(self.progress)
              gsap.set(card, { scale, y, opacity })
            },
          }),
        )
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        triggers.forEach((trigger) => trigger.kill())
        gsap.set(cards, { clearProps: "scale,y,opacity,transform" })
        ScrollTrigger.refresh()
      }
    })

    return () => mm.revert()
  }, [stackRef])
}

export default function Portfolio() {
  const { t } = useLanguage()
  const projects = FEATURED_PROJECTS
  const stackRef = useRef<HTMLDivElement>(null)

  usePortfolioCardScale(stackRef)

  return (
    <section
      id="portfolio"
      className="relative bg-white dark:bg-gray-900 transition-colors duration-300 overflow-visible"
    >
      <div className="container mx-auto px-6 pt-24 md:pt-32 pb-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white tracking-tight">
            {t("portfolio.title")}
          </h2>
        </div>
      </div>

      <div ref={stackRef} className="relative max-w-6xl mx-auto px-6 pb-8 md:pb-24">
        {projects.map((project, index) => {
          const isLast = index === projects.length - 1
          const slotHeightVh = isLast ? LAST_SLOT_HEIGHT_VH : SLOT_HEIGHT_VH
          const mobileSlotHeightVh = isLast ? MOBILE_LAST_SLOT_HEIGHT_VH : MOBILE_SLOT_HEIGHT_VH

          return (
            <div
              key={project.id}
              data-stack-slot
              className="relative mb-8 min-h-[var(--mobile-slot-height)] md:mb-0 md:min-h-0 md:h-[var(--slot-height)]"
              style={{
                zIndex: index + 1,
                ["--slot-height" as string]: `${slotHeightVh}svh`,
                ["--mobile-slot-height" as string]: `${mobileSlotHeightVh}svh`,
              }}
            >
              <div
                data-stack-card
                className="w-full will-change-transform md:sticky"
                style={{
                  top: STICKY_BASE_TOP + index * STICKY_STAGGER,
                }}
              >
                <ProjectCard project={project} index={index} total={projects.length} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
