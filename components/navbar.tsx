"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t, mounted: languageMounted } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
      setShowNavbar(scrollPosition > 200) // Show navbar after scrolling 200px
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    // Wait for the menu to close and DOM to update (works best on real mobile browsers)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80; // Adjust for your navbar height if needed
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    });
  }

  const navItems = [
    { key: t("nav.about"), href: "about" },
    { key: t("nav.services"), href: "services" },
    { key: t("nav.portfolio"), href: "portfolio" },
    { key: t("nav.packs"), href: "packs" },
    { key: t("nav.contact"), href: "contact" },
  ]

  const handleThemeToggle = () => {
    if (mounted) {
      setTheme(theme === "dark" ? "light" : "dark")
    }
  }

  const handleLanguageChange = (lang: "en" | "fr") => {
    if (languageMounted) {
      setLanguage(lang)
      setShowLanguageDropdown(false)
    }
  }

  if (!mounted || !languageMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20"
              : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-colors duration-300">
                  <span className="text-white dark:text-black font-bold text-sm">{`{+}`}</span>
                </div>
                <span className="text-xl font-bold text-black dark:text-white transition-colors duration-300">
                  pluss.dev
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.key}
                  </motion.button>
                ))}
              </div>

              {/* Desktop Controls */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Language Selector */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{language.toUpperCase()}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <AnimatePresence>
                    {showLanguageDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-2 min-w-[120px]"
                      >
                        <button
                          onClick={() => handleLanguageChange("en")}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${
                            language === "en"
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          English
                        </button>
                        <button
                          onClick={() => handleLanguageChange("fr")}
                          className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${
                            language === "fr"
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          Français
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleThemeToggle}
                  className="w-9 h-9 p-0 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleThemeToggle}
                  className="w-9 h-9 p-0 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-9 h-9 p-0 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-800/20"
                >
                  <div className="py-4 space-y-4">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium"
                      >
                        {item.key}
                      </motion.button>
                    ))}
                    <div className="px-6 py-2 border-t border-gray-200/20 dark:border-gray-800/20">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLanguageChange("en")}
                          className={`px-3 py-1 rounded transition-colors duration-200 ${
                            language === "en"
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          EN
                        </button>
                        <button
                          onClick={() => handleLanguageChange("fr")}
                          className={`px-3 py-1 rounded transition-colors duration-200 ${
                            language === "fr"
                              ? "bg-black text-white dark:bg-white dark:text-black"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          FR
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
