"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { motion } from "framer-motion"
import { HorizontalScroll } from "@/components/horizontal-scroll"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function Portfolio() {
  const { t, language } = useLanguage()
  const [projects, setProjects] = useState<any[] | null>(null)

  useEffect(() => {
    const q = query(collection(db, "portfolio"), orderBy("sortOrder"))
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [])

  if (!projects) {
    return <div className="py-24 text-center text-gray-400">Loading portfolio...</div>
  }

  if (projects.length === 0) {
    return <div className="py-24 text-center text-gray-400">No projects found.</div>
  }

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

        <HorizontalScroll>
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-shrink-0 w-80 md:w-96"
              style={{ scrollSnapAlign: "center", minHeight: "500px" }}
            >
              <div className="h-full flex flex-col group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none overflow-hidden">
                <div className="p-0 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden flex-shrink-0">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                          className="w-full border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-none py-6 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
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
            </motion.div>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  )
}
