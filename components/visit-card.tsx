"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, X, Phone, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export default function VisitCard() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Mehdi Kernou
ORG:pluss.dev
TITLE:Full-stack web developer
TEL;TYPE=CELL:+213 542 452 129
EMAIL:kernoumehdi17@gmail.com
URL:https://pluss.dev
END:VCARD`

    const blob = new Blob([vcard], { type: "text/vcard" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pluss_dev.vcf"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <CreditCard className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 text-center relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="absolute top-2 right-2 text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>

                    <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Mehdi Kernou"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-xl font-bold">Mehdi Kernou</h3>
                    <p className="text-white/90">{t("visitCard.title")}</p>

                    <div className="flex mt-4 border-t border-white/20 pt-4">
                      <a
                        href="tel:+213542452129"
                        className="flex-1 flex flex-col items-center py-2 hover:bg-white/10 rounded transition-colors"
                      >
                        <Phone className="w-5 h-5 mb-1" />
                        <span className="text-xs">{t("visitCard.call")}</span>
                      </a>
                      <a
                        href="mailto:kernoumehdi17@gmail.com"
                        className="flex-1 flex flex-col items-center py-2 hover:bg-white/10 rounded transition-colors"
                      >
                        <Mail className="w-5 h-5 mb-1" />
                        <span className="text-xs">{t("visitCard.email")}</span>
                      </a>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium">+213 542 452 129</p>
                          <p className="text-sm text-muted-foreground">{t("visitCard.mobile")}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium">kernoumehdi17@gmail.com</p>
                          <p className="text-sm text-muted-foreground">{t("visitCard.email")}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium">pluss.dev</p>
                          <p className="text-sm text-muted-foreground">{t("visitCard.website")}</p>
                        </div>
                      </div>
                    </div>

                    <Button onClick={downloadVCard} className="w-full bg-primary hover:bg-primary/90 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      {t("visitCard.download")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
