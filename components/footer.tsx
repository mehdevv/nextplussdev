"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-white dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            © 2025{" "}
            <a
              href="https://www.instagram.com/pluss.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white hover:opacity-80 font-bold transition-opacity"
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
