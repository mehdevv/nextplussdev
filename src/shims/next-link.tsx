import * as React from "react"
import { Link as RouterLink } from "react-router-dom"

type NextLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  locale?: string | false
}

const isExternalHref = (href: string) => /^([a-z]+:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")

const Link = React.forwardRef<HTMLAnchorElement, NextLinkProps>(function Link(
  { href, children, replace, ...anchorProps },
  ref,
) {
  if (isExternalHref(href)) {
    return (
      <a ref={ref} href={href} {...anchorProps}>
        {children}
      </a>
    )
  }

  return (
    <RouterLink ref={ref} to={href} replace={replace} {...anchorProps}>
      {children}
    </RouterLink>
  )
})

export default Link

