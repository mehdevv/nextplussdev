"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Phone, Mail, MapPin, Send, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const contactInfo = [
    {
      icon: Phone,
      title: t("contact.phone"),
      value: "+213 542 452 129",
      href: "tel:+213542452129",
      description: t("contact.phoneDesc"),
    },
    {
      icon: Mail,
      title: t("contact.email"),
      value: "kernoumehdi17@gmail.com",
      href: "mailto:kernoumehdi17@gmail.com",
      description: t("contact.emailDesc"),
    },
    {
      icon: MapPin,
      title: t("contact.location"),
      value: t("contact.locationValue"),
      href: "#",
      description: t("contact.locationDesc"),
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-6 tracking-tight transition-colors duration-500">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-500">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-2xl font-light text-black dark:text-white mb-8 transition-colors duration-500">
                  {t("contact.subtitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 transition-colors duration-500">
                  {t("contact.intro")}
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="group"
                  >
                    {info.href !== "#" ? (
                      <a
                        href={info.href}
                        className="flex items-start space-x-4 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300"
                      >
                        <div className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300 mt-1">
                          <info.icon className="w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-black dark:text-white group-hover:text-blue-500 transition-colors duration-300 mb-1">
                            {info.title}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-500">
                            {info.value}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                            {info.description}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start space-x-4 p-6 border border-gray-200 dark:border-gray-700">
                        <div className="w-6 h-6 text-gray-600 dark:text-gray-400 mt-1">
                          <info.icon className="w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-black dark:text-white mb-1 transition-colors duration-500">
                            {info.title}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-500">
                            {info.value}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
              >
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">{t("contact.responseTime")}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">{t("contact.responseDesc")}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-colors duration-500">
                <CardContent className="p-8">
                  {!isSubmitted ? (
                    <div>
                      <div className="mb-8">
                        <h3 className="text-xl font-medium text-black dark:text-white mb-2 transition-colors duration-500">
                          {t("contact.formTitle")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
                          {t("contact.formDescription")}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.4, delay: 0.6 }}
                        >
                          <Label
                            htmlFor="name"
                            className="text-black dark:text-white font-medium transition-colors duration-500"
                          >
                            {t("contact.name")}
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.4, delay: 0.7 }}
                        >
                          <Label
                            htmlFor="email"
                            className="text-black dark:text-white font-medium transition-colors duration-500"
                          >
                            {t("contact.email")}
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.4, delay: 0.8 }}
                        >
                          <Label
                            htmlFor="subject"
                            className="text-black dark:text-white font-medium transition-colors duration-500"
                          >
                            {t("contact.subject")}
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="mt-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.4, delay: 0.9 }}
                        >
                          <Label
                            htmlFor="message"
                            className="text-black dark:text-white font-medium transition-colors duration-500"
                          >
                            {t("contact.message")}
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={5}
                            className="mt-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:border-blue-500 focus:ring-blue-500 resize-none transition-all duration-300"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.4, delay: 1.0 }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white py-6 text-base font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                            ) : (
                              <>
                                <Send className="w-5 h-5 mr-2" />
                                {t("contact.send")}
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle className="w-8 h-8 text-blue-500" />
                      </motion.div>
                      <h3 className="text-xl font-medium text-black dark:text-white mb-2 transition-colors duration-500">
                        {t("contact.successTitle")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
                        {t("contact.successMessage")}
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
