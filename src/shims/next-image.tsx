import * as React from "react"

type NextImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  fill?: boolean
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  loader?: unknown
  unoptimized?: boolean
  sizes?: string
}

const Image = React.forwardRef<HTMLImageElement, NextImageProps>(function Image(props, ref) {
  const { fill, priority, quality, placeholder, blurDataURL, loader, unoptimized, ...imgProps } = props

  const style = fill
    ? {
        position: "absolute" as const,
        height: "100%",
        width: "100%",
        inset: 0,
        objectFit: imgProps.style?.objectFit ?? "cover",
        ...imgProps.style,
      }
    : imgProps.style

  return <img ref={ref} {...imgProps} style={style} />
})

export default Image

