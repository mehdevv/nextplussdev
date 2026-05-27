"use client"

import { Tab, Tabs } from "@heroui/react"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage, mounted } = useLanguage()

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-50" aria-label="Language">
      <Tabs
        aria-label="Language"
        selectedKey={language}
        onSelectionChange={(key) => setLanguage(key as "en" | "fr")}
        size="sm"
        variant="bordered"
        radius="none"
        classNames={{
          base: "bg-white/75 dark:bg-gray-900/75 backdrop-blur-md shadow-sm",
          tabList: "border border-gray-200/80 dark:border-gray-700/80 p-0 gap-0",
          tab: "min-w-0 px-2.5 py-1.5 text-xs font-medium h-auto data-[selected=true]:bg-black data-[selected=true]:text-white dark:data-[selected=true]:bg-white dark:data-[selected=true]:text-black",
          cursor: "rounded-none bg-black dark:bg-white",
          tabContent: "group-data-[selected=true]:text-white dark:group-data-[selected=true]:text-black text-gray-500 dark:text-gray-400",
        }}
      >
        <Tab key="en" title="EN" />
        <Tab key="fr" title="FR" />
      </Tabs>
    </div>
  )
}
