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
  const {
    fill,
    priority: _priority,
    quality: _quality,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    loader: _loader,
    unoptimized: _unoptimized,
    sizes: _sizes,
    style,
    className,
    alt,
    src,
    ...rest
  } = props

  const imgStyle = fill
    ? {
        position: "absolute" as const,
        height: "100%",
        width: "100%",
        inset: 0,
        objectFit: (style as React.CSSProperties | undefined)?.objectFit ?? "cover",
        ...style,
      }
    : style

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={imgStyle}
      loading={_priority ? "eager" : rest.loading}
      decoding="async"
      {...rest}
    />
  )
})

export default Image

