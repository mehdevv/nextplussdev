"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Eye, Grid3X3, Rocket, Check, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HorizontalScroll } from "@/components/horizontal-scroll"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import Link from "next/link"

export default function Packs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useLanguage()

  const packs = [
    {
      icon: Eye,
      title: t("packs.visibility.title"),
      subtitle: t("packs.visibility.subtitle"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pack1.png-tWONPCNZXEXDP6eg1YBUdvaPRAl8gd.jpeg",
      features: [
        t("packs.visibility.feature1"),
        t("packs.visibility.feature2"),
        t("packs.visibility.feature3"),
        t("packs.visibility.feature4"),
        t("packs.visibility.feature5"),
        t("packs.visibility.feature6"),
      ],
    },
    {
      icon: Grid3X3,
      title: t("packs.management.title"),
      subtitle: t("packs.management.subtitle"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pack2.png-yyu78dLqN8WkvJGoy1HWbCydWlsUjr.jpeg",
      features: [
        t("packs.management.feature1"),
        t("packs.management.feature2"),
        t("packs.management.feature3"),
        t("packs.management.feature4"),
        t("packs.management.feature5"),
        t("packs.management.feature6"),
      ],
    },
    {
      icon: Rocket,
      title: t("packs.innovative.title"),
      subtitle: t("packs.innovative.subtitle"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pack3.png-oK2qgdbchic6jWetkbJi0D4oJe9q9L.jpeg",
      features: [
        t("packs.innovative.feature1"),
        t("packs.innovative.feature2"),
        t("packs.innovative.feature3"),
        t("packs.innovative.feature4"),
        t("packs.innovative.feature5"),
        t("packs.innovative.feature6"),
      ],
    },
  ]

  return (
    <section id="packs" className="py-24 md:py-32 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-6 tracking-tight transition-colors duration-300">
            {t("packs.title")}
          </h2>
        </motion.div>

        <HorizontalScroll>
          {packs.map((pack, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-shrink-0 w-80 md:w-96"
              style={{ scrollSnapAlign: "center", minHeight: "600px" }}
            >
              <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-none overflow-hidden">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden flex-shrink-0">
                    <Image
                      src={pack.image || "/placeholder.svg"}
                      alt={pack.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center mb-6 flex-shrink-0">
                      <div className="w-8 h-8 flex items-center justify-center mr-4">
                        <pack.icon className="w-6 h-6 text-black dark:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg md:text-xl font-medium text-black dark:text-white leading-tight transition-colors duration-300">
                        {pack.title}
                      </h3>
                    </div>

                    {/* Subtitle - Scrollable if needed */}
                    <div className="mb-8 flex-shrink-0">
                      <div className="max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm transition-colors duration-300">
                          {pack.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Features - Scrollable */}
                    <div className="flex-grow mb-8">
                      <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
                        <div className="space-y-3">
                          {pack.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              className="flex items-start space-x-3"
                              initial={{ opacity: 0, x: -10 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ duration: 0.2, delay: index * 0.05 + featureIndex * 0.02 }}
                            >
                              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-black dark:text-white transition-colors duration-300" />
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Button - Fixed at bottom */}
                    <div className="flex-shrink-0">
                      <Button
                        className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white rounded-none py-6 text-sm font-medium transition-all duration-200"
                        asChild
                      >
                        <Link href="/packs" className="flex items-center justify-center space-x-2">
                          <ShoppingCart className="w-4 h-4" />
                          <span>{t("packs.viewPacks")}</span>
                        </Link>
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
