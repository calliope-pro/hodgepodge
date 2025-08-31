import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export interface NeuTagProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "active" | "sage" | "lavender"
  size?: "sm" | "md"
  href?: string
  active?: boolean
  children: React.ReactNode
}

const tagVariants = {
  default:
    "neu-convex bg-sage-light text-sage-foreground hover:bg-accent hover:text-accent-foreground",
  active: "neu-pressed bg-accent text-accent-foreground",
  sage: "neu-convex bg-sage-light text-sage-foreground hover:bg-accent hover:text-accent-foreground",
  lavender:
    "neu-convex bg-lavender-light text-lavender-foreground hover:bg-accent hover:text-accent-foreground",
}

const tagSizes = {
  sm: "px-3 py-1 text-xs rounded-xl",
  md: "px-4 py-2 text-sm rounded-2xl",
}

export const NeuTag = forwardRef<HTMLElement, NeuTagProps>(
  ({ className, variant = "default", size = "md", href, active, children, ...props }, ref) => {
    const finalVariant = active ? "active" : variant
    const classes = cn(
      "inline-flex items-center gap-2 font-medium transition-colors",
      href ? "cursor-pointer" : "",
      tagVariants[finalVariant],
      tagSizes[size],
      className,
    )

    if (href) {
      return (
        <Link href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </Link>
      )
    }

    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} className={classes} {...props}>
        {children}
      </span>
    )
  },
)

NeuTag.displayName = "NeuTag"
