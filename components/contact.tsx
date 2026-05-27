"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import { Card, CardBody } from "@heroui/react"
import { useLanguage } from "@/contexts/language-context"

const EMAIL = "kernoumehdi17@gmail.com"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Project inquiry — pluss.dev")}`

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.email"),
      value: EMAIL,
      href: mailtoHref,
    },
    {
      icon: Phone,
      title: t("contact.phone"),
      value: "+213 542 452 129",
      href: "tel:+213542452129",
    },
    {
      icon: MapPin,
      title: t("contact.location"),
      value: t("contact.locationValue"),
      href: null,
    },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-6 tracking-tight">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{t("contact.description")}</p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t("contact.intro")}</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid sm:grid-cols-3 gap-4 text-left"
          >
            {contactInfo.map((info, index) => {
              const content = (
                <CardBody className="p-5">
                  <info.icon className="w-5 h-5 text-gray-500 dark:text-gray-400 mb-3" />
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    {info.title}
                  </p>
                  <p className="text-sm font-medium text-black dark:text-white">{info.value}</p>
                </CardBody>
              )

              return info.href ? (
                <Card
                  key={index}
                  as="a"
                  href={info.href}
                  isPressable
                  shadow="none"
                  radius="none"
                  className="border border-gray-200 dark:border-gray-700 bg-transparent hover:border-primary hover:bg-primary/5 transition-colors duration-300"
                >
                  {content}
                </Card>
              ) : (
                <Card
                  key={index}
                  shadow="none"
                  radius="none"
                  className="border border-gray-200 dark:border-gray-700 bg-transparent"
                >
                  {content}
                </Card>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
