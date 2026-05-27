import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Home from "@/app/page"
import AboutPage from "@/app/about/page"
import PacksPage from "@/app/packs/page"
import AdminPage from "@/app/admin/page"
import LanguageSwitcher from "@/components/language-switcher"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "./components/smooth-scroll"
import { HeroUIProviderWrapper } from "./providers/heroui-provider"

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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/packs" element={<PacksPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </HeroUIProviderWrapper>
          </BrowserRouter>
        </SmoothScroll>
      </LanguageProvider>
    </ThemeProvider>
  )
}
