"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const { t } = useLanguage()

  const fullText = t("hero.typing")

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 80)

    return () => clearInterval(timer)
  }, [fullText])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto text-center relative z-10 max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-12"
        >
          {/* Logo - Moved closer to text */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "backOut" }}
            className="flex justify-center"
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 transition-transform duration-300 hover:scale-105">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pluss-ee3a94sgm7Whruyss4K6dP0pYH9qL7.png"
                alt="pluss.dev logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[0.9] tracking-tight text-black dark:text-white transition-colors duration-300"
            >
              {typedText}
              <br />
              <span className="font-bold">pluss.dev</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors duration-300"
            >
              {t("hero.subtitle")}
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-base font-medium rounded-none border-0 transition-all duration-200 hover:scale-105"
              asChild
            >
              <a
                href="https://linktr.ee/pluss.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3"
              >
                <span>{t("hero.cta")}</span>
                <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
