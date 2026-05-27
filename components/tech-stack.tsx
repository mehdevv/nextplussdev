"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { TECH_STACK } from "@/data/tech-stack"

export default function TechStack() {
  const { t } = useLanguage()

  return (
    <section id="tech-stack" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black dark:text-white tracking-tight">
            {t("techStack.title")}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("techStack.subtitle")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-none border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-10">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center justify-center gap-3 group"
                title={tech.name}
              >
                <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                    unoptimized={tech.logo.startsWith("http")}
                  />
                </div>
                <span className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
