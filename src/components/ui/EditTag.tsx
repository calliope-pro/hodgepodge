import { forwardRef, type HTMLAttributes } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface EditTagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "pastel-pink" | "pastel-mint" | "pastel-lavender"
  size?: "sm" | "md"
  children: React.ReactNode
  href?: string
}

const tagVariants = {
  default: "edit-tag",
  "pastel-pink": "edit-tag edit-tag-pastel-pink",
  "pastel-mint": "edit-tag edit-tag-pastel-mint",
  "pastel-lavender": "edit-tag edit-tag-pastel-lavender",
}

const tagSizes = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
}

export const EditTag = forwardRef<HTMLSpanElement, EditTagProps>(
  ({ className, variant = "default", size = "sm", children, href, ...props }, ref) => {
    const tagClasses = cn(
      "inline-flex items-center rounded-sm font-medium",
      tagVariants[variant],
      tagSizes[size],
      className,
    )

    if (href) {
      return (
        <Link href={href} className={tagClasses}>
          {children}
        </Link>
      )
    }

    return (
      <span ref={ref} className={tagClasses} {...props}>
        {children}
      </span>
    )
  },
)

EditTag.displayName = "EditTag"
