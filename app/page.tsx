"use client"
import Hero from "@/components/hero"
import About from "@/components/about"
import TechStack from "@/components/tech-stack"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import VisitCard from "@/components/visit-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <About />
        <TechStack />
        <Portfolio />
        <Services />
        <Contact />
      </main>
      <Footer />
      <VisitCard />
    </div>
  )
}
