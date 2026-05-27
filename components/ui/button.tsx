import * as React from "react"
import { Button as HeroUIButton, type ButtonProps as HeroUIButtonProps } from "@heroui/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const variantMap = {
  default: { color: "primary", variant: "solid" },
  destructive: { color: "danger", variant: "solid" },
  outline: { color: "default", variant: "bordered" },
  secondary: { color: "secondary", variant: "flat" },
  ghost: { color: "default", variant: "light" },
  link: { color: "primary", variant: "light" },
} as const

const sizeMap = {
  default: "md",
  sm: "sm",
  lg: "lg",
  icon: "md",
} as const

type ShadcnVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>
type ShadcnSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>

export interface ButtonProps
  extends Omit<HeroUIButtonProps, "variant" | "size" | "color" | "children"> {
  variant?: ShadcnVariant
  size?: ShadcnSize
  asChild?: boolean
  children?: React.ReactNode
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const mapped = variantMap[variant ?? "default"]
    const heroSize = sizeMap[size ?? "default"]
    const isIcon = size === "icon"

    const heroClassName = cn(
      variant === "link" && "h-auto min-w-0 bg-transparent p-0 underline-offset-4 data-[hover=true]:underline",
      isIcon && "min-h-10 min-w-10",
      className,
    )

    if (asChild && React.isValidElement(children)) {
      const child = React.Children.only(children) as React.ReactElement<Record<string, unknown>>
      return (
        <HeroUIButton
          ref={ref}
          as={child.type as React.ElementType}
          {...child.props}
          {...props}
          color={mapped.color}
          variant={mapped.variant}
          size={heroSize}
          radius="none"
          isIconOnly={isIcon}
          className={cn(heroClassName, child.props.className as string | undefined)}
        >
          {child.props.children as React.ReactNode}
        </HeroUIButton>
      )
    }

    return (
      <HeroUIButton
        ref={ref}
        color={mapped.color}
        variant={mapped.variant}
        size={heroSize}
        radius="none"
        isIconOnly={isIcon}
        className={heroClassName}
        {...props}
      >
        {children}
      </HeroUIButton>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
