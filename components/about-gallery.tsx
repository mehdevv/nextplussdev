"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useLanguage } from "@/contexts/language-context"

const FEATURED_INDEX = 1
const AUTOPLAY_INTERVAL_MS = 3000

const PROFILE_IMAGES = [
  { src: "/1.png", alt: "Mehdi Kernou — training session" },
  { src: "/2.png", alt: "Mehdi Kernou — workshop" },
  { src: "/3.jpg", alt: "Mehdi Kernou — media interview" },
  { src: "/4.png", alt: "Mehdi Kernou — professional portrait" },
  { src: "/5.png", alt: "Mehdi Kernou — speaking engagement" },
]

type AboutGalleryProps = {
  priority?: boolean
  className?: string
}

export default function AboutGallery({ priority = false, className = "" }: AboutGalleryProps) {
  const { t } = useLanguage()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: FEATURED_INDEX,
    align: "center",
    dragFree: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(FEATURED_INDEX)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return

    let intervalId: ReturnType<typeof setInterval>

    const startAutoplay = () => {
      stopAutoplay()
      intervalId = setInterval(() => {
        emblaApi.scrollNext()
      }, AUTOPLAY_INTERVAL_MS)
    }

    const stopAutoplay = () => {
      if (intervalId) clearInterval(intervalId)
    }

    startAutoplay()
    emblaApi.on("pointerDown", stopAutoplay)
    emblaApi.on("pointerUp", startAutoplay)

    return () => {
      stopAutoplay()
      emblaApi.off("pointerDown", stopAutoplay)
      emblaApi.off("pointerUp", startAutoplay)
    }
  }, [emblaApi])

  return (
    <div className={className}>
      <div
        ref={emblaRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none rounded-sm border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800/50 shadow-minimal"
        aria-roledescription="carousel"
        aria-label="Profile photos"
      >
        <div className="flex">
          {PROFILE_IMAGES.map((img, i) => (
            <div key={img.src} className="min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={priority && i === FEATURED_INDEX}
                  draggable={false}
                  className={`pointer-events-none object-cover object-center transition-[filter,opacity] duration-500 ${
                    i === selectedIndex
                      ? "grayscale-0 opacity-100"
                      : "grayscale opacity-90"
                  }`}
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {PROFILE_IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Photo ${i + 1}`}
            aria-current={i === selectedIndex ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "w-7 bg-black dark:bg-white"
                : "w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400 tracking-wide">
        {t("about.gallery.drag")}
      </p>
    </div>
  )
}
