"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect } from "react"
import { Linkedin, Mail, Instagram, MapPin, Calendar, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const ref = useRef(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      )
    }

    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  const { t } = useLanguage()

  const socialLinks = [
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
            <div
              ref={imageRef}
              className="space-y-12"
            >
              {/* Profile Image */}
              <div className="relative">
                <div className="relative w-full aspect-[4/3] max-w-md mx-auto lg:mx-0">
                  <div className="relative w-full h-full overflow-hidden transition-transform duration-500 hover:scale-105">
                    <Image
                      src="https://i.ibb.co/1tGXykKL/generation-7721c8ed-6d53-40cf-bae0-66a399917c90.png"
                      alt="Developer workspace"
                      fill
                      className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div
              ref={textRef}
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
                    {t("about.approach")}
                    {t("about.values") && (
                      <>
                        {" "}
                        <strong className="text-black dark:text-white hover:text-blue-500 hover:glow-blue transition-all duration-300 cursor-default">
                          {t("about.values")}
                        </strong>
                      </>
                    )}
                    {" "}{t("about.commitment")}
                  </p>
                </div>
              </div>

              {/* Social Links & About Button */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start items-center gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.45 }}
                >
                  <Link href="/about">
                    <Button
                      variant="outline"
                      className="h-12 px-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-all duration-300 group"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
