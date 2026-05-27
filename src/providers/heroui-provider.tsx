import type { ReactNode } from "react"
import { HeroUIProvider } from "@heroui/react"
import { useNavigate } from "react-router-dom"
import type { Href } from "@react-types/shared"

function hrefToPath(href: Href): string {
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
      navigate={(href: Href) => {
        navigate(hrefToPath(href))
      }}
    >
      {children}
    </HeroUIProvider>
  )
}
