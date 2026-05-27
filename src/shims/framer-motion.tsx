import * as React from "react"

const MOTION_PROP_KEYS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "variants",
  "whileHover",
  "whileTap",
  "whileInView",
  "whileFocus",
  "whileDrag",
  "viewport",
  "layout",
  "layoutId",
  "layoutRoot",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDrag",
  "onDragEnd",
  "onDragStart",
])

type MotionValueLike = { get: () => number }

type MotionTarget = {
  opacity?: number
  x?: number
  y?: number
  scale?: number
  rotate?: number
}

type TransitionConfig = {
  duration?: number
  delay?: number
  ease?: string | number[]
  repeat?: number
  type?: string
  stiffness?: number
}

type UseInViewOptions = {
  root?: Element | null
  margin?: string
  amount?: number | "some" | "all"
  once?: boolean
  initial?: boolean
}

function resolveStyle(style?: React.CSSProperties & Record<string, unknown>) {
  if (!style) return undefined

  const resolved: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(style)) {
    if (value && typeof value === "object" && "get" in value && typeof (value as MotionValueLike).get === "function") {
      resolved[key] = (value as MotionValueLike).get()
    } else {
      resolved[key] = value
    }
  }
  return resolved as React.CSSProperties
}

function isMotionTarget(value: unknown): value is MotionTarget {
  return value != null && typeof value === "object" && !Array.isArray(value)
}

function toTransform(target: MotionTarget): string | undefined {
  const parts: string[] = []
  if (target.x != null) parts.push(`translateX(${target.x}px)`)
  if (target.y != null) parts.push(`translateY(${target.y}px)`)
  if (target.scale != null) parts.push(`scale(${target.scale})`)
  if (target.rotate != null) parts.push(`rotate(${target.rotate}deg)`)
  return parts.length ? parts.join(" ") : undefined
}

function targetToStyle(target: MotionTarget): React.CSSProperties {
  const style: React.CSSProperties = {}
  if (target.opacity != null) style.opacity = target.opacity
  const transform = toTransform(target)
  if (transform) style.transform = transform
  return style
}

function easeToCss(ease?: string | number[]): string {
  if (!ease) return "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  if (Array.isArray(ease)) return `cubic-bezier(${ease.join(",")})`
  if (ease === "linear") return "linear"
  return "ease-out"
}

function buildTransition(transition?: TransitionConfig): string {
  const duration = transition?.duration ?? 0.4
  const delay = transition?.delay ?? 0
  const easing = easeToCss(transition?.ease)
  return `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`
}

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node
    })
  }
}

export function useInView(
  ref: React.RefObject<Element | null>,
  options?: UseInViewOptions,
): boolean {
  const [isInView, setIsInView] = React.useState(options?.initial ?? false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (options?.once !== false) {
            observer.disconnect()
          }
        } else if (options?.once === false) {
          setIsInView(false)
        }
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.margin ?? "0px",
        threshold: typeof options?.amount === "number" ? options.amount : 0,
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, options?.margin, options?.once, options?.root, options?.amount, options?.initial])

  return isInView
}

function createMotionComponent<Tag extends keyof React.JSX.IntrinsicElements>(tag: Tag) {
  const Component = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<Tag> & Record<string, unknown>>(
    function MotionComponent(
      { children, style, initial, animate, transition, whileInView, viewport, ...props },
      ref,
    ) {
      const localRef = React.useRef<HTMLElement | null>(null)
      const mergedRef = mergeRefs(ref as React.Ref<HTMLElement>, localRef)

      const whileInViewVisible = useInView(localRef as React.RefObject<Element | null>, {
        once: (viewport as { once?: boolean } | undefined)?.once ?? true,
        margin: typeof (viewport as { margin?: string } | undefined)?.margin === "string"
          ? (viewport as { margin: string }).margin
          : undefined,
        amount: (viewport as { amount?: number } | undefined)?.amount,
      })

      const hasWhileInView = whileInView != null
      const initialTarget = (initial as MotionTarget) ?? {}
      const transitionConfig = transition as TransitionConfig | undefined

      const isRepeatingRotate =
        isMotionTarget(animate) &&
        animate.rotate != null &&
        transitionConfig?.repeat != null &&
        (transitionConfig.repeat === Number.POSITIVE_INFINITY || transitionConfig.repeat > 0)

      const resolvedTarget = React.useMemo(() => {
        if (hasWhileInView) {
          return whileInViewVisible ? ((whileInView as MotionTarget) ?? {}) : initialTarget
        }
        if (isMotionTarget(animate)) return animate
        return initialTarget
      }, [hasWhileInView, whileInViewVisible, whileInView, animate, initialTarget])

      const [transitionsEnabled, setTransitionsEnabled] = React.useState(false)

      React.useEffect(() => {
        const frame = requestAnimationFrame(() => {
          setTransitionsEnabled(true)
        })
        return () => cancelAnimationFrame(frame)
      }, [])

      React.useEffect(() => {
        if (!isRepeatingRotate || !localRef.current) return
        const el = localRef.current
        const duration = (transitionConfig?.duration ?? 1) * 1000
        el.style.animation = `motion-spin ${duration}ms linear infinite`
        return () => {
          el.style.animation = ""
        }
      }, [isRepeatingRotate, transitionConfig?.duration])

      const motionStyle = targetToStyle(isRepeatingRotate ? { ...resolvedTarget, rotate: undefined } : resolvedTarget)
      const transitionStyle = isRepeatingRotate
        ? {}
        : { transition: transitionsEnabled ? buildTransition(transitionConfig) : "none" }

      const domProps: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(props)) {
        if (!MOTION_PROP_KEYS.has(key)) {
          domProps[key] = value
        }
      }

      return React.createElement(
        tag,
        {
          ref: mergedRef,
          style: {
            ...resolveStyle(style as React.CSSProperties & Record<string, unknown>),
            ...motionStyle,
            ...transitionStyle,
          },
          ...domProps,
        },
        children,
      )
    },
  )

  Component.displayName = `motion.${String(tag)}`
  return Component
}

const motionComponentCache = new Map<string, ReturnType<typeof createMotionComponent>>()

export const motion = new Proxy({} as Record<string, ReturnType<typeof createMotionComponent>>, {
  get(_target, tag: string) {
    if (!motionComponentCache.has(tag)) {
      motionComponentCache.set(tag, createMotionComponent(tag as keyof React.JSX.IntrinsicElements))
    }
    return motionComponentCache.get(tag)!
  },
})

export function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function interpolate(value: number, input: number[], output: number[]) {
  if (value <= input[0]) return output[0]
  if (value >= input[input.length - 1]) return output[output.length - 1]

  for (let i = 0; i < input.length - 1; i++) {
    if (value >= input[i] && value <= input[i + 1]) {
      const t = (value - input[i]) / (input[i + 1] - input[i])
      return output[i] + t * (output[i + 1] - output[i])
    }
  }

  return output[output.length - 1]
}

export function useScroll() {
  const scrollRef = React.useRef(0)

  React.useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return {
    scrollY: {
      get: () => scrollRef.current,
    },
  }
}

export function useTransform(
  value: MotionValueLike,
  inputRange: number[],
  outputRange: number[],
): MotionValueLike {
  return {
    get: () => interpolate(value.get(), inputRange, outputRange),
  }
}
