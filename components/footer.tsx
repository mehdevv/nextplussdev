"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-muted/30 py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-muted-foreground">
            © 2025{" "}
            <a
              href="https://www.instagram.com/pluss.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-bold transition-colors"
            >
              @pluss.dev
            </a>
            . {t("footer.rights")}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
