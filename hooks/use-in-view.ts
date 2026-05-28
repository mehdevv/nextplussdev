import { useEffect, useState, type RefObject } from "react"

type UseInViewOptions = {
  rootMargin?: string
  threshold?: number
  once?: boolean
}

/** Lightweight visibility hook (avoids pulling IntersectionObserver polyfills from animation libs). */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { rootMargin = "0px", threshold = 0, once = false }: UseInViewOptions = {},
) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, rootMargin, threshold, once])

  return inView
}
