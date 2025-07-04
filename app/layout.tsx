import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "🚀 pluss.dev - Web Solutions Agency | Modern Websites & Apps",
  description:
    "Full-stack web development agency in Algeria. We create gorgeous, fast, and functional websites & apps for your business. SEO, branding, e-commerce, and more!",
  generator: 'kernou mehdi',
  keywords: [
    "web development", "Algeria", "agency", "SEO", "branding", "e-commerce", "React", "Next.js", "portfolio", "website design", "modern web", "digital solutions", "pluss.dev"
  ],
  authors: [{ name: "Mehdi Kernou", url: "https://pluss.dev" }],
  openGraph: {
    title: "🚀 pluss.dev - Web Solutions Agency | Modern Websites & Apps",
    description: "Full-stack web development agency in Algeria. We create gorgeous, fast, and functional websites & apps for your business. SEO, branding, e-commerce, and more!",
    url: "https://pluss.dev",
    siteName: "pluss.dev",
    images: [
      {
        url: "https://plussdev.vercel.app/logo.png", // Absolute URL for social preview image
        width: 1200,
        height: 630,
        alt: "pluss.dev logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "🚀 pluss.dev - Web Solutions Agency | Modern Websites & Apps",
    description: "Full-stack web development agency in Algeria. We create gorgeous, fast, and functional websites & apps for your business. SEO, branding, e-commerce, and more!",
    images: ["https://plussdev.vercel.app/logo.png"], // Absolute URL for social preview image
    creator: "@kernoumehdi"
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/logo.png" />
        {/* Open Graph & Twitter Card fallback for non-Next crawlers */}
        <meta property="og:title" content="🚀 pluss.dev - Web Solutions Agency | Modern Websites & Apps" />
        <meta property="og:description" content="Full-stack web development agency in Algeria. We create gorgeous, fast, and functional websites & apps for your business. SEO, branding, e-commerce, and more!" />
        <meta property="og:image" content="https://plussdev.vercel.app/logo.png" /> {/* Absolute URL for social preview image */}
        <meta property="og:url" content="https://pluss.dev" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="🚀 pluss.dev - Web Solutions Agency | Modern Websites & Apps" />
        <meta name="twitter:description" content="Full-stack web development agency in Algeria. We create gorgeous, fast, and functional websites & apps for your business. SEO, branding, e-commerce, and more!" />
        <meta name="twitter:image" content="https://plussdev.vercel.app/logo.png" /> {/* Absolute URL for social preview image */}
        <meta name="author" content="Mehdi Kernou" />
        <meta name="keywords" content="web development, Algeria, agency, SEO, branding, e-commerce, React, Next.js, portfolio, website design, modern web, digital solutions, pluss.dev" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        {/* Hidden SEO text for crawlers */}
        <div style={{position:'absolute',left:'-9999px',height:'1px',width:'1px',overflow:'hidden'}} aria-hidden="true">
          <h1>pluss.dev - Web Solutions Agency in Algeria</h1>
          <p>We build modern, fast, and beautiful websites and web apps for businesses, startups, and entrepreneurs. Our services include SEO, branding, e-commerce, portfolio sites, and digital transformation. 🚀✨</p>
          <p>Contact us for a free consultation and let your business grow online!</p>
        </div>
      </body>
    </html>
  )
}
