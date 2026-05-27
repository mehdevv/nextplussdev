"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState, type LucideIcon } from "react"
import { Code, Palette, Zap } from "lucide-react"
import { HorizontalScroll } from "@/components/horizontal-scroll"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type ServiceTech = { name: string; logo: string }

type ServiceItem = {
  icon: LucideIcon
  title: string
  description: string
  image: string
  techs: ServiceTech[]
  accent: string
}

function ServiceCard({
  service,
  index,
  compact = false,
}: {
  service: ServiceItem
  index: number
  compact?: boolean
}) {
  const Icon = service.icon

  return (
    <article
      className={`group flex flex-col h-full overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-500 hover:border-gray-400 dark:hover:border-gray-600 ${
        compact ? "" : "hover:-translate-y-1"
      }`}
      style={{
        boxShadow: "0 4px 24px -4px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div
        className={`relative overflow-hidden flex-shrink-0 ${compact ? "h-36" : "h-44 md:h-48"}`}
      >
        <Image
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-cover grayscale contrast-[1.02] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
          sizes={compact ? "100vw" : "(max-width: 768px) 85vw, 380px"}
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm"
          aria-hidden
        >
          <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
        </div>
        <div
          className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: service.accent }}
          aria-hidden
        />
      </div>

      <div className={`flex flex-col flex-1 ${compact ? "p-5" : "p-6 md:p-7"}`}>
        <div className="mb-1 flex items-center gap-2">
          <span
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" aria-hidden />
        </div>

        <h3
          className={`font-light text-black dark:text-white tracking-tight leading-tight mb-3 transition-colors duration-300 ${
            compact ? "text-lg" : "text-xl md:text-2xl"
          }`}
        >
          {service.title}
        </h3>

        <p
          className={`text-gray-600 dark:text-gray-400 leading-relaxed flex-1 ${
            compact ? "text-sm line-clamp-3 mb-5" : "text-sm md:text-[15px] mb-6"
          }`}
        >
          {service.description}
        </p>

        {service.techs.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
            {service.techs.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 px-2.5 py-1.5 text-[10px] uppercase tracking-wide text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:border-gray-300 dark:group-hover:border-gray-600"
                title={tech.name}
              >
                <img
                  src={tech.logo}
                  alt=""
                  width={14}
                  height={14}
                  className="object-contain opacity-80"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
                {tech.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useLanguage()
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const triggers: ScrollTrigger[] = []

    cardRefs.current.forEach((card, index) => {
      if (!card) return

      const fromX = index === 0 ? -120 : index === 2 ? 120 : 0
      const fromY = index === 1 ? 80 : 0

      const tween = gsap.fromTo(
        card,
        { x: fromX, y: fromY, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      )

      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    })

    return () => triggers.forEach((trigger) => trigger.kill())
  }, [isMobile])

  const services: ServiceItem[] = [
    {
      icon: Code,
      title: t("services.webdev.title"),
      description: t("services.webdev.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LP-Ip2Y3kQFkykhMppv2NvRXDJZns2dd5.png",
      accent: "#3b82f6",
      techs: [
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
        { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
      ],
    },
    {
      icon: Palette,
      title: t("services.webdesign.title"),
      description: t("services.webdesign.description"),
      image: "/assets/webdesign.jpeg",
      accent: "#8b5cf6",
      techs: [
        { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
        { name: "Stitch", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" },
      ],
    },
    {
      icon: Zap,
      title: t("services.aiautomation.title"),
      description: t("services.aiautomation.description"),
      image: "/assets/aiautomation.png",
      accent: "#f59e0b",
      techs: [
        { name: "N8N", logo: "/tech-icons/n8n-icon.svg" },
        { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
        { name: "Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Gemini_logo.svg" },
      ],
    },
  ]

  const sectionHeader = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="text-center mb-10 md:mb-16"
    >
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-black dark:text-white tracking-tight transition-colors duration-300">
        {t("services.title")}
      </h2>
    </motion.div>
  )

  if (isMobile) {
    return (
      <section
        id="services"
        className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          {sectionHeader}
          <div className="flex flex-col gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} compact />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        {sectionHeader}

        <HorizontalScroll className="gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className="flex-shrink-0 w-[min(88vw,340px)] md:w-[380px]"
              style={{ scrollSnapAlign: "center" }}
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  )
}
