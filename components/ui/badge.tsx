import type * as React from "react"
import { Chip } from "@heroui/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const chipVariantMap = {
  default: { color: "primary" as const, variant: "flat" as const },
  secondary: { color: "default" as const, variant: "flat" as const },
  destructive: { color: "danger" as const, variant: "flat" as const },
  outline: { color: "default" as const, variant: "bordered" as const },
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode
  className?: string
}

function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const mapped = chipVariantMap[variant ?? "default"]

  return (
    <Chip
      color={mapped.color}
      variant={mapped.variant}
      radius="full"
      size="sm"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Chip>
  )
}

export { Badge, badgeVariants }
