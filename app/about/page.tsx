"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowLeft, Linkedin, Mail, Instagram, MapPin, Calendar, Code, Palette, Database, Zap, Trophy, Users, Briefcase, Award, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"

function AchievementItem({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: any
  title: string
  description: string
  index: number 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 group cursor-default"
    >
      <div className="flex items-start space-x-4">
        <motion.div 
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
        >
          <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
        </motion.div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function AchievementsSection() {
  const achievements = [
    {
      category: "🏆 Leadership & Community",
      icon: Trophy,
      items: [
        {
          title: "Vice-President of Digital Valley Club (ESGEN)",
          description: "Leading technical initiatives and digital projects."
        },
        {
          title: "Active member of GDG ENSIA",
          description: "Contributing to Google-related tech events and development activities."
        }
      ]
    },
    {
      category: "💻 Web Development & Technical Work",
      icon: Briefcase,
      items: [
        {
          title: "Freelance Web Developer",
          description: "Built multiple modern websites and full-stack applications."
        },
        {
          title: "Development Workshops",
          description: "Delivered complete development workshops covering frontend, backend, and deployment."
        },
        {
          title: "UI/UX Design & Optimization",
          description: "Designed and optimized UI/UX experiences across various projects."
        },
        {
          title: "Automation & Integration",
          description: "Implemented automations and integrations using n8n and modern toolchains."
        }
      ]
    },
    {
      category: "🎨 Tech & Creative Tools",
      icon: Sparkles,
      items: [
        {
          title: "3D Visuals with Blender",
          description: "Produced advanced visuals and assets using Blender."
        },
        {
          title: "Interface Design with Figma",
          description: "Designed professional interfaces and prototypes in Figma."
        },
        {
          title: "Digital Media Creation",
          description: "Created and edited digital media using tools like Canva, CapCut, and more."
        }
      ]
    },
    {
      category: "📢 Events & Activities",
      icon: Users,
      items: [
        {
          title: "ECSEL Expo Africa (2025)",
          description: "Organized and coordinated at ECSEL Expo Africa (2025)."
        },
        {
          title: "Workshops & Tech Events",
          description: "Led and contributed to multiple workshops, panels, and tech events."
        }
      ]
    },
    {
      category: "🥇 Hackathons & Competitions",
      icon: Award,
      items: [
        {
          title: "Business Road Hackathon",
          description: "Winner of the Business Road Hackathon."
        },
        {
          title: "Hanns Seidel Hackathon",
          description: "Participant in the international Hanns Seidel Hackathon (Tunis)."
        }
      ]
    }
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-4 tracking-tight">
          Achievements & Experience
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
      </motion.div>
      <div className="space-y-16">
        {achievements.map((category, categoryIndex) => (
          <motion.div 
            key={category.category}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {categoryIndex > 0 && (
              <motion.div 
                className="mb-12 pt-12 border-t border-gray-200 dark:border-gray-700"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ originX: 0 }}
              ></motion.div>
            )}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="flex items-center justify-center mb-6"
              >
                <h3 className="text-2xl md:text-3xl font-medium text-black dark:text-white text-center">
                  {category.category}
                </h3>
              </motion.div>
              <motion.div 
                className="grid md:grid-cols-2 gap-5"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {category.items.map((item, itemIndex) => (
                  <AchievementItem
                    key={item.title}
                    icon={category.icon}
                    title={item.title}
                    description={item.description}
                    index={categoryIndex * 10 + itemIndex}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function SkillsSection({ skills }: { skills: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black dark:text-white mb-4 tracking-tight">
          Skills & Technologies
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.category}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              y: -6,
              transition: { duration: 0.2 }
            }}
            className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center space-x-4 mb-6">
              <motion.div
                className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <skill.icon className="w-7 h-7 text-blue-500 dark:text-blue-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {skill.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skill.items.map((item: string, itemIndex: number) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.1 
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 cursor-default shadow-sm hover:shadow-md"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function CTASection({ t }: { t: (key: string) => string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-32 text-center"
    >
      <motion.div
        className="relative p-12 md:p-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"
          />
        </div>
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-black dark:text-white mb-4"
          >
            {t("about.connect")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto text-lg"
          >
            Have a project in mind? Let's work together to bring your ideas to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="/#contact">
              <Button
                size="lg"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-10 py-7 text-base font-medium rounded-none shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AboutPage() {
  const { t } = useLanguage()

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/kernou-mehdi-816653284/",
      label: "LinkedIn",
      username: "Kernou Mehdi",
    },
    {
      icon: Mail,
      href: "mailto:kernoumehdi17@gmail.com",
      label: "Email",
      username: "kernoumehdi17@gmail.com",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/pluss.dev",
      label: "Instagram",
      username: "@pluss.dev",
    },
  ]

  const skills = [
    {
      category: "Frontend",
      icon: Palette,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Backend",
      icon: Database,
      items: ["Node.js", "Firebase", "MongoDB", "REST APIs", "Authentication"]
    },
    {
      category: "Design & Tools",
      icon: Code,
      items: ["Figma", "Blender", "n8n", "Git", "Webpack"]
    },
    {
      category: "Performance",
      icon: Zap,
      items: ["SEO Optimization", "Performance Tuning", "Scalable Architecture", "Security"]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <main className="pt-8">
        {/* Main Content */}
        <section className="pt-8 pb-16 md:pt-12 md:pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* Back to Home Button */}
              <div className="mb-8">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white group"
                  >
                    <motion.div
                      whileHover={{ x: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 inline" />
                    </motion.div>
                    Back to Home
                  </Button>
                </Link>
              </div>
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Left Column - Image and Stats */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="space-y-12"
                >
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="relative w-full aspect-[4/3] max-w-md mx-auto lg:mx-0">
                      <div className="relative w-full h-full overflow-hidden transition-transform duration-500 hover:scale-105">
                        <Image
                          src="https://i.ibb.co/1tGXykKL/generation-7721c8ed-6d53-40cf-bae0-66a399917c90.png"
                          alt="Developer workspace"
                          fill
                          priority
                          loading="eager"
                          fetchPriority="high"
                          quality={90}
                          className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Content */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="space-y-8"
                >
                  {/* Bio */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{t("about.location")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{t("about.available")}</span>
                      </div>
                    </div>

                    <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                      <p className="text-lg">
                        {t("about.intro")}{" "}
                        <strong className="text-black dark:text-white hover:text-blue-500 hover:glow-blue transition-all duration-300 cursor-default">
                          {t("about.name")}
                        </strong>
                        , {t("about.description1")}
                      </p>
                      <p>
                        {t("about.description2")}{" "}
                        <strong className="text-black dark:text-white hover:text-blue-500 hover:glow-blue transition-all duration-300 cursor-default">
                          {t("about.skills")}
                        </strong>{" "}
                        {t("about.description3")}
                      </p>
                      <p>
                        {t("about.approach")}
                        {t("about.values") && (
                          <>
                            {" "}
                            <strong className="text-black dark:text-white hover:text-blue-500 hover:glow-blue transition-all duration-300 cursor-default">
                              {t("about.values")}
                            </strong>
                          </>
                        )}
                        {" "}{t("about.commitment")}
                      </p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <motion.div
                    className="flex justify-center lg:justify-start space-x-6 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300 group"
                        aria-label={social.label}
                      >
                        <social.icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              {/* Skills Section */}
              <SkillsSection skills={skills} />

              {/* Achievements Section */}
              <AchievementsSection />

              {/* CTA Section */}
              <CTASection t={t} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

