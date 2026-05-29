"use client"

import { ArrowRight, Building2, GraduationCap, Lock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const DIRECTIONS = [
  {
    id: "dev",
    href: "#services",
    icon: Building2,
    titleKey: "directions.dev.title",
    descriptionKey: "directions.dev.description",
    ctaKey: "directions.dev.cta",
    badgeKey: "directions.dev.badge",
    accent: "#2563eb",
    locked: false,
  },
  {
    id: "academy",
    href: undefined,
    icon: GraduationCap,
    titleKey: "directions.academy.title",
    descriptionKey: "directions.academy.description",
    ctaKey: undefined,
    badgeKey: undefined,
    accent: "#7c3aed",
    locked: true,
  },
] as const

function DirectionCard({
  direction,
}: {
  direction: (typeof DIRECTIONS)[number]
}) {
  const { t } = useLanguage()
  const Icon = direction.icon
  const title = t(direction.titleKey)
  const description = t(direction.descriptionKey)

  const content = (
    <>
      {!direction.locked && direction.badgeKey && (
        <span className="absolute top-6 right-6 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 px-2.5 py-1">
          {t(direction.badgeKey)}
        </span>
      )}

      <div
        className="flex h-14 w-14 items-center justify-center border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
        aria-hidden
      >
        <Icon className="h-7 w-7 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />
      </div>

      <div className="space-y-3 flex-1">
        <h3 className="text-2xl md:text-3xl font-light text-black dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        {!direction.locked && direction.ctaKey && (
          <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all duration-300">
            {t(direction.ctaKey)}
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: direction.accent }}
        aria-hidden
      />
    </>
  )

  if (direction.locked) {
    return (
      <article
        className="relative group flex flex-col gap-6 p-8 md:p-10 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
        aria-disabled="true"
      >
        {content}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/75 dark:bg-gray-900/80 backdrop-blur-[2px]"
          aria-hidden
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900">
            <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-gray-700 dark:text-gray-300">
            {t("directions.soon")}
          </span>
        </div>
      </article>
    )
  }

  return (
    <a
      href={direction.href}
      className="relative group flex flex-col gap-6 p-8 md:p-10 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300 hover:border-gray-400 dark:hover:border-gray-600"
    >
      {content}
    </a>
  )
}

export default function Directions() {
  const { t } = useLanguage()

  return (
    <section
      id="directions"
      className="py-20 md:py-28 bg-gray-50 dark:bg-gray-950 transition-colors duration-500"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-black dark:text-white mb-4 tracking-tight">
            {t("directions.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{t("directions.subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          {DIRECTIONS.map((direction) => (
            <DirectionCard key={direction.id} direction={direction} />
          ))}
        </div>
      </div>
    </section>
  )
}
