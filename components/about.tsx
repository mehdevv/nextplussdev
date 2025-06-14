"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Github, Linkedin, Mail, Instagram, MapPin, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/mehdevv",
      label: "GitHub",
      username: "@mehdevv",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/kernou-mehdi-816653284/",
      label: "LinkedIn",
      username: "Kernou Mehdi",
    },
    {
      icon: Mail,
      href: "mailto:kernoumehdi17@gmail.com",
      label: "Email",
      username: "kernoumehdi17@gmail.com",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/pluss.dev",
      label: "Instagram",
      username: "@pluss.dev",
    },
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-6 tracking-tight transition-colors duration-500">
            {t("about.title")}
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Image and Stats */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-12"
            >
              {/* Profile Image */}
              <div className="relative">
                <div className="relative w-full aspect-[4/3] max-w-md mx-auto lg:mx-0">
                  <div className="relative w-full h-full overflow-hidden transition-transform duration-500 hover:scale-105">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screencapture-plussdev-netlify-app-2025-06-13-21_12_46-PP3d5ANrDN2EBCPK8WBhi2EaAvSPq8.png"
                      alt="Developer workspace"
                      fill
                      className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Bio */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{t("about.location")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{t("about.available")}</span>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    {t("about.intro")}{" "}
                    <strong className="text-black dark:text-white hover:text-blue-500 hover:glow-blue transition-all duration-300 cursor-default">
                      {t("about.name")}
                    </strong>
                    , {t("about.description1")}
                  </p>
                  <p>
                    {t("about.description2")}{" "}
                    <strong className="text-black dark:text-white hover:text-blue-500 hover:glow-blue transition-all duration-300 cursor-default">
                      {t("about.skills")}
                    </strong>{" "}
                    {t("about.description3")}
                  </p>
                  <p>
                    {t("about.approach")}{" "}
                    <strong className="text-black dark:text-white hover:text-blue-500 hover:glow-blue transition-all duration-300 cursor-default">
                      {t("about.values")}
                    </strong>{" "}
                    {t("about.commitment")}
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <motion.div
                className="flex justify-center lg:justify-start space-x-6 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
