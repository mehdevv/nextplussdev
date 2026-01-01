"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Code, Palette, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { HorizontalScroll } from "@/components/horizontal-scroll"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useLanguage()
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Don't apply GSAP animations on mobile
    if (isMobile) return

    cardRefs.current.forEach((card, index) => {
      if (card) {
        // Left card from left, middle from bottom, right card from right
        const fromX = index === 0 ? -200 : index === 2 ? 200 : 0
        const fromY = index === 1 ? 200 : 0

        gsap.fromTo(
          card,
          { x: fromX, y: fromY, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isMobile])

  const services = [
    {
      icon: Code,
      title: t("services.webdev.title"),
      description: t("services.webdev.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LP-Ip2Y3kQFkykhMppv2NvRXDJZns2dd5.png",
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
      techs: [
        { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
        { name: "Google Stitch", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" },
      ],
    },
    {
      icon: Zap,
      title: t("services.aiautomation.title"),
      description: t("services.aiautomation.description"),
      image: "/assets/aiautomation.png",
      techs: [
        { name: "N8N", logo: "https://raw.githubusercontent.com/n8n-io/n8n/master/packages/design-system/src/assets/images/n8n-logo-red.svg" },
        { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
        { name: "Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Gemini_logo.svg" },
      ],
    },
  ]

  // Mobile layout - vertical stacking
  if (isMobile) {
    return (
      <section 
        id="services" 
        className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-light text-black dark:text-white mb-4 tracking-tight transition-colors duration-300">
              {t("services.title")}
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="w-full"
              >
                <div className="flex flex-col group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none overflow-hidden">
                  <div className="p-0 flex flex-col">
                    {/* Image */}
                    <div className="relative h-32 overflow-hidden flex-shrink-0">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col">
                      <div className="flex items-center mb-3 flex-shrink-0">
                        <div className="w-6 h-6 flex items-center justify-center mr-3">
                          <service.icon className="w-5 h-5 text-black dark:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-sm font-medium text-black dark:text-white leading-tight transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <div className="mb-3">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      {/* Tech Logos */}
                      {service.techs && service.techs.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                          {service.techs.map((tech, techIndex) => (
                            <div
                              key={techIndex}
                              className="flex items-center justify-center"
                              title={tech.name}
                            >
                              <img
                                src={tech.logo}
                                alt={tech.name}
                                width={20}
                                height={20}
                                className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none'
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Desktop layout
  return (
    <section id="services" className="py-24 md:py-32 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-6 tracking-tight transition-colors duration-300">
            {t("services.title")}
          </h2>
        </motion.div>

        <HorizontalScroll>
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el }}
              className="flex-shrink-0 w-80 md:w-96"
              style={{ scrollSnapAlign: "center" }}
            >
              <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none overflow-hidden">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-40 md:h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col">
                    <div className="flex items-center mb-3 flex-shrink-0">
                      <div className="w-7 h-7 flex items-center justify-center mr-3">
                        <service.icon className="w-5 h-5 text-black dark:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-base md:text-lg font-medium text-black dark:text-white leading-tight transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <div className="max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs md:text-sm transition-colors duration-300">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Tech Logos */}
                    {service.techs && service.techs.length > 0 && (
                      <div className="flex flex-wrap gap-3 items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                        {service.techs.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex items-center justify-center"
                            title={tech.name}
                          >
                            <img
                              src={tech.logo}
                              alt={tech.name}
                              width={28}
                              height={28}
                              className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  )
}
