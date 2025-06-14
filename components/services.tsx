"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ShoppingBag, Globe, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HorizontalScroll } from "@/components/horizontal-scroll"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const { t } = useLanguage()

  const services = [
    {
      icon: ShoppingBag,
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shops-QNqVqghHdpWIGTRCucFWAZ6GLR6U53.png",
    },
    {
      icon: Globe,
      title: t("services.web.title"),
      description: t("services.web.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LP-Ip2Y3kQFkykhMppv2NvRXDJZns2dd5.png",
    },
    {
      icon: CreditCard,
      title: t("services.cards.title"),
      description: t("services.cards.description"),
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/QRS-CmvA1FcC3NtdI5qDXjcrD6aodUzWL7.png",
    },
  ]

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="services" className="py-24 md:py-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-6 tracking-tight transition-colors duration-300">
            {t("services.title")}
          </h2>
        </motion.div>

        <HorizontalScroll>
          {services.map((service, index) => (
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
                  <div className="relative h-48 md:h-56 overflow-hidden flex-shrink-0">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center mb-6 flex-shrink-0">
                      <div className="w-8 h-8 flex items-center justify-center mr-4">
                        <service.icon className="w-6 h-6 text-black dark:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg md:text-xl font-medium text-black dark:text-white leading-tight transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description - Scrollable if needed */}
                    <div className="flex-grow mb-8">
                      <div className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm transition-colors duration-300">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Button - Fixed at bottom */}
                    <div className="flex-shrink-0">
                      <Button
                        onClick={scrollToContact}
                        variant="outline"
                        className="w-full border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-none py-6 text-sm font-medium transition-all duration-200"
                      >
                        {t("services.learnMore")}
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
