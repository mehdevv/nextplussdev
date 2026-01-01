"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Eye, Grid3X3, Rocket, Check, ShoppingCart, ArrowLeft, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function PacksPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useLanguage()
  const [selectedPack, setSelectedPack] = useState<number | null>(null)

  // Auto scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const packs = [
    {
      id: 1,
      icon: Eye,
      title: t("packs.visibility.title"),
      subtitle: t("packs.visibility.subtitle"),
      price: "Custom",
      originalPrice: "",
      maintenance: "Custom",
      popular: false,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pack1.png-tWONPCNZXEXDP6eg1YBUdvaPRAl8gd.jpeg",
      features: [
        t("packs.visibility.feature1"),
        t("packs.visibility.feature2"),
        t("packs.visibility.feature3"),
        t("packs.visibility.feature4"),
        t("packs.visibility.feature5"),
        t("packs.visibility.feature6"),
        t("packs.visibility.feature7"),
        t("packs.visibility.feature8"),
      ],
      deliveryTime: t("packs.delivery.basic"),
      revisions: "3",
      support: t("packs.support.email"),
    },
    {
      id: 2,
      icon: Grid3X3,
      title: t("packs.management.title"),
      subtitle: t("packs.management.subtitle"),
      price: "Custom",
      originalPrice: "",
      maintenance: "Custom",
      popular: true,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pack2.png-yyu78dLqN8WkvJGoy1HWbCydWlsUjr.jpeg",
      features: [
        t("packs.management.feature1"),
        t("packs.management.feature2"),
        t("packs.management.feature3"),
        t("packs.management.feature4"),
        t("packs.management.feature5"),
        t("packs.management.feature6"),
        t("packs.management.feature7"),
        t("packs.management.feature8"),
      ],
      deliveryTime: t("packs.delivery.standard"),
      revisions: "5",
      support: t("packs.support.priority"),
    },
    {
      id: 3,
      icon: Rocket,
      title: t("packs.innovative.title"),
      subtitle: t("packs.innovative.subtitle"),
      price: "Custom Price",
      originalPrice: "",
      maintenance: "Custom",
      popular: false,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pack3.png-oK2qgdbchic6jWetkbJi0D4oJe9q9L.jpeg",
      features: [
        t("packs.innovative.feature1"),
        t("packs.innovative.feature2"),
        t("packs.innovative.feature3"),
        t("packs.innovative.feature4"),
        t("packs.innovative.feature5"),
        t("packs.innovative.feature6"),
        t("packs.innovative.feature7"),
        t("packs.innovative.feature8"),
      ],
      deliveryTime: "1-1.5 months",
      revisions: t("packs.revisions.unlimited"),
      support: t("packs.support.dedicated"),
    },
  ]

  const scrollToContact = (packName: string) => {
    // Store selected pack in localStorage for contact form
    localStorage.setItem("selectedPack", packName)
    // Navigate to home page contact section
    window.location.href = "/#contact"
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("packs.backHome")}</span>
            </Link>
          </div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-black dark:text-white mb-4 tracking-tight transition-colors duration-300">
              {t("packs.pageTitle")}
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-300">
              {t("packs.pageDescription")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Packs Grid */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {packs.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative h-full"
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-blue-500 text-white px-3 py-1 text-xs font-medium">
                      <Star className="w-3 h-3 mr-1" />
                      {t("packs.popular")}
                    </Badge>
                  </div>
                )}

                <Card
                  className={`h-full flex flex-col group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white dark:bg-gray-900 overflow-hidden cursor-pointer ${
                    selectedPack === pack.id
                      ? "border-blue-500 shadow-lg ring-1 ring-blue-500 ring-opacity-20"
                      : "border border-gray-200 dark:border-gray-800 hover:border-blue-500"
                  } ${pack.popular ? "border-blue-500 shadow-md" : ""}`}
                  onClick={() => setSelectedPack(selectedPack === pack.id ? null : pack.id)}
                  style={{ minHeight: "700px" }}
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden flex-shrink-0">
                      <Image
                        src={pack.image || "/placeholder.svg"}
                        alt={pack.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content - Flexible */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4 flex-shrink-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 flex items-center justify-center">
                            <pack.icon className="w-5 h-5 text-blue-500" />
                          </div>
                          <h3 className="text-lg font-medium text-black dark:text-white leading-tight transition-colors duration-300">
                            {pack.title}
                          </h3>
                        </div>
                      </div>

                      {/* Pricing - Hidden */}
                      <div className="mb-4 flex-shrink-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 line-clamp-2">
                          {pack.subtitle}
                        </p>
                      </div>

                      {/* Package Details */}
                      <div className="space-y-3 mb-4 flex-shrink-0">
                        <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-800">
                          <span className="text-xs text-gray-600 dark:text-gray-400">{t("packs.deliveryTime")}</span>
                          <span className="text-xs font-medium text-black dark:text-white">{pack.deliveryTime}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-800">
                          <span className="text-xs text-gray-600 dark:text-gray-400">{t("packs.revisions")}</span>
                          <span className="text-xs font-medium text-black dark:text-white">{pack.revisions}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-800">
                          <span className="text-xs text-gray-600 dark:text-gray-400">{t("packs.support")}</span>
                          <span className="text-xs font-medium text-black dark:text-white">{pack.support}</span>
                        </div>
                      </div>

                      {/* Features - Scrollable */}
                      <div className="flex-grow mb-6">
                        <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
                          <div className="space-y-2">
                            {pack.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                className="flex items-start space-x-2"
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ duration: 0.2, delay: index * 0.05 + featureIndex * 0.02 }}
                              >
                                <div className="w-3 h-3 flex items-center justify-center flex-shrink-0 mt-1">
                                  <Check className="w-2.5 h-2.5 text-blue-500" />
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA Button - Fixed at bottom */}
                      <div className="flex-shrink-0">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            scrollToContact(pack.title)
                          }}
                          className={`w-full py-3 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                            pack.popular
                              ? "bg-blue-500 hover:bg-blue-600 text-white"
                              : "bg-black dark:bg-white text-white dark:text-black hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white"
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {t("packs.selectPack")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 max-w-4xl mx-auto">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-3">{t("packs.customTitle")}</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-4 text-sm">{t("packs.customDescription")}</p>
              <Button
                onClick={() => scrollToContact("Custom Package")}
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                {t("packs.contactCustom")}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
