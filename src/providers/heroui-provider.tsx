import type { ReactNode } from "react"
import { HeroUIProvider } from "@heroui/react"
import { useNavigate } from "react-router-dom"

type HeroHref = string | URL | { pathname?: string; search?: string; hash?: string }

function hrefToPath(href: HeroHref): string {
  if (typeof href === "string") return href
  if (href && typeof href === "object" && "pathname" in href) {
    const obj = href as { pathname?: string; search?: string; hash?: string }
    return `${obj.pathname ?? ""}${obj.search ?? ""}${obj.hash ?? ""}`
  }
  return String(href)
}

export function HeroUIProviderWrapper({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  return (
    <HeroUIProvider
      navigate={(href) => {
        navigate(hrefToPath(href as HeroHref))
      }}
    >
      {children}
    </HeroUIProvider>
  )
}
