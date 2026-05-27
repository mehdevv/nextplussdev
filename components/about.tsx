"use client"

import { useRef } from "react"
import { Linkedin, Mail, Instagram, MapPin, Calendar, Download } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import AboutGallery from "@/components/about-gallery"
import { Button } from "@/components/ui/button"

const CV_PATH = "/Kernou_Mehdi_CV.pdf"

const HEADLINE_KEYS = [
  "about.headline.role",
  "about.headline.experience",
  "about.headline.founder",
  "about.headline.training",
  "about.headline.community",
  "about.headline.hackathons",
  "about.headline.tools",
] as const

export default function About() {
  const ref = useRef(null)
  const { t } = useLanguage()

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/kernou-mehdi-816653284/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:kernoumehdi17@gmail.com",
      label: "Email",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/pluss.dev",
      label: "Instagram",
    },
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div ref={ref} className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-4 tracking-tight">
            {t("about.title")}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              {t("about.location")}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              {t("about.available")}
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AboutGallery priority className="w-full max-w-lg mx-auto lg:max-w-none lg:mx-0" />

          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              {t("about.name")}
            </p>

            <ul className="space-y-5 md:space-y-6">
              {HEADLINE_KEYS.map((key) => (
                <li
                  key={key}
                  className="text-xl sm:text-2xl md:text-3xl font-light leading-snug text-black dark:text-white border-l-2 border-blue-500 pl-4 md:pl-5"
                >
                  {t(key)}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </a>
              ))}
              <a href={CV_PATH} download="Kernou_Mehdi_CV.pdf">
                <Button
                  variant="outline"
                  className="h-12 px-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-all duration-300 group"
                >
                  {t("about.downloadCv")}
                  <Download className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform duration-300" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
