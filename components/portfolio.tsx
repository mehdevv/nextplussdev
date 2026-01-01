"use client"

import { useEffect, useState, useRef } from "react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  const { t, language } = useLanguage()
  const [projects, setProjects] = useState<any[] | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
    // Check if Firebase is available
    if (!db) {
      setProjects([])
      return
    }

    try {
      const q = query(collection(db, "portfolio"), orderBy("sortOrder"))
      const unsub = onSnapshot(q, (snap) => {
        setProjects(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      }, (error) => {
        console.error("Firebase error:", error)
        setProjects([])
      })
      return () => unsub()
    } catch (error) {
      console.error("Error fetching portfolio:", error)
      setProjects([])
    }
  }, [])

  useEffect(() => {
    // Don't apply GSAP on mobile
    if (isMobile) return
    if (!projects || projects.length === 0) return
    if (!sectionRef.current || !containerRef.current || !scrollContainerRef.current) return

    const section = sectionRef.current
    const scrollContainer = scrollContainerRef.current

    // Calculate scroll distance based on number of projects (400px per project + buffer)
    const scrollPerProject = 400
    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth
    const totalScrollDistance = (projects.length * scrollPerProject) + 300

    // Get all project cards
    const cards = scrollContainer.querySelectorAll('[data-portfolio-card]')

    // Initial card animation - fade in with stagger when section comes into view
    let cardAnimation: gsap.core.Tween | null = null
    if (cards.length > 0) {
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 })
      
      cardAnimation = gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: {
          amount: 1.2,
          from: "start",
        },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        }
      })
    }

    // Horizontal scroll animation
    const tween = gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScrollDistance}`,
        scrub: 2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.kill()
      if (cardAnimation) cardAnimation.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [projects, isMobile])

  if (!projects) {
    return <div className="py-24 text-center text-gray-400">Loading portfolio...</div>
  }

  if (projects.length === 0) {
    return (
      <section id="portfolio" className="py-24 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-6 tracking-tight transition-colors duration-300">
              {t("portfolio.title")}
            </h2>
          </motion.div>
          <div className="py-24 text-center text-gray-400">No projects found.</div>
        </div>
      </section>
    )
  }

  // Mobile layout - regular horizontal scroll
  if (isMobile) {
    return (
      <section 
        id="portfolio" 
        className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-light text-black dark:text-white mb-4 tracking-tight transition-colors duration-300">
              {t("portfolio.title")}
            </h2>
          </motion.div>
        </div>

        <div 
          className="flex gap-4 px-4 pb-8 overflow-x-auto scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id || index}
              className="flex-shrink-0 w-72"
              style={{ scrollSnapAlign: "center", minHeight: "420px" }}
            >
              <div className="h-full flex flex-col group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none overflow-hidden">
                <div className="p-0 flex flex-col h-full">
                  <div className="relative aspect-video overflow-hidden flex-shrink-0">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-2 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {language === "fr" && project.categoryFr ? project.categoryFr : project.category}
                      </span>
                    </div>
                    <h3 className="text-base font-medium text-black dark:text-white mb-3 leading-tight">
                      {language === "fr" && project.titleFr ? project.titleFr : project.title}
                    </h3>
                    <div className="flex-grow mb-4">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs line-clamp-3">
                        {language === "fr" && project.descriptionFr ? project.descriptionFr : project.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <a
                        href={project.demoUrl && !/^https?:\/\//.test(project.demoUrl) ? `https://${project.demoUrl}` : project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button
                          variant="outline"
                          className="w-full border border-black dark:border-white text-black dark:text-white rounded-none py-4 text-xs font-medium flex items-center justify-center space-x-2"
                          asChild={false}
                        >
                          <>
                            <span>{t("portfolio.viewProject")}</span>
                            <ExternalLink className="w-3 h-3" />
                          </>
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // Desktop layout - GSAP pinned horizontal scroll
  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden"
    >
      <div ref={containerRef} className="min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-6 tracking-tight transition-colors duration-300">
              {t("portfolio.title")}
            </h2>
          </motion.div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-8 px-12 pb-12"
          style={{ width: "fit-content" }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id || index}
              data-portfolio-card
              className="flex-shrink-0 w-80 md:w-96"
              style={{ minHeight: "500px" }}
            >
              <div className="h-full flex flex-col group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none overflow-hidden">
                <div className="p-0 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden flex-shrink-0">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-4 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-colors duration-300">
                        {language === "fr" && project.categoryFr ? project.categoryFr : project.category}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-medium text-black dark:text-white mb-4 leading-tight transition-colors duration-300 flex-shrink-0">
                      {language === "fr" && project.titleFr ? project.titleFr : project.title}
                    </h3>

                    {/* Description - Scrollable if needed */}
                    <div className="flex-grow mb-8">
                      <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm transition-colors duration-300">
                          {language === "fr" && project.descriptionFr ? project.descriptionFr : project.description}
                        </p>
                      </div>
                    </div>

                    {/* Button - Fixed at bottom */}
                    <div className="flex-shrink-0">
                      <a
                        href={project.demoUrl && !/^https?:\/\//.test(project.demoUrl) ? `https://${project.demoUrl}` : project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button
                          variant="outline"
                          className="w-full border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-none py-6 text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105"
                          asChild={false}
                        >
                          <>
                            <span>{t("portfolio.viewProject")}</span>
                            <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        </Button>
                      </a>
                    </div>
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
