import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Home from "@/app/page"
import LanguageSwitcher from "@/components/language-switcher"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "./components/smooth-scroll"
import { HeroUIProviderWrapper } from "./providers/heroui-provider"

const AboutPage = lazy(() => import("@/app/about/page"))
const PacksPage = lazy(() => import("@/app/packs/page"))
const AdminPage = lazy(() => import("@/app/admin/page"))

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-white dark:bg-gray-900">
      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <LanguageProvider>
        <SmoothScroll>
          <LanguageSwitcher />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <HeroUIProviderWrapper>
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/packs" element={<PacksPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </HeroUIProviderWrapper>
          </BrowserRouter>
        </SmoothScroll>
      </LanguageProvider>
    </ThemeProvider>
  )
}
