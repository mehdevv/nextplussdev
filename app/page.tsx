"use client"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import Packs from "@/components/packs"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import VisitCard from "@/components/visit-card"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
            <Portfolio/>
            <Packs />
            <Contact />
          </main>
          <Footer />
          <VisitCard />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
