"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HorizontalScroll } from "@/components/horizontal-scroll"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useLanguage()

  const projects = [
    {
      title: t("portfolio.project1.title"),
      description: t("portfolio.project1.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AC-peBnItZi6CDJtD0H9WQXhSTqe4Uw4Q.png",
      demoUrl: "#",
      category: t("portfolio.project1.category"),
    },
    {
      title: t("portfolio.project2.title"),
      description: t("portfolio.project2.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ABD-caPk9Y2ts7C8DP41DP55FW4BoPVqxt.png",
      demoUrl: "#",
      category: t("portfolio.project2.category"),
    },
    {
      title: t("portfolio.project3.title"),
      description: t("portfolio.project3.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QR-MJW4QPpcewmyGNnydT57btRCF7WDHc.png",
      demoUrl: "#",
      category: t("portfolio.project3.category"),
    },
  ]

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-6 tracking-tight transition-colors duration-300">
            {t("portfolio.title")}
          </h2>
        </motion.div>

        <HorizontalScroll>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-shrink-0 w-80 md:w-96"
              style={{ scrollSnapAlign: "center", minHeight: "500px" }}
            >
              <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none overflow-hidden">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden flex-shrink-0">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-4 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-colors duration-300">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-medium text-black dark:text-white mb-4 leading-tight transition-colors duration-300 flex-shrink-0">
                      {project.title}
                    </h3>

                    {/* Description - Scrollable if needed */}
                    <div className="flex-grow mb-8">
                      <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm transition-colors duration-300">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Button - Fixed at bottom */}
                    <div className="flex-shrink-0">
                      <Button
                        variant="outline"
                        className="w-full border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-none py-6 text-sm font-medium transition-all duration-200"
                        asChild
                      >
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2"
                        >
                          <span>{t("portfolio.viewProject")}</span>
                          <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  )
}
