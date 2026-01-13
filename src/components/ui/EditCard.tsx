import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface EditCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "accent" | "borderless"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

const cardVariants = {
  default: "edit-card",
  subtle: "edit-card-subtle",
  accent: "edit-card-accent",
  borderless: "bg-card",
}

const cardSizes = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
}

export const EditCard = forwardRef<HTMLDivElement, EditCardProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-sm",
          cardVariants[variant],
          cardSizes[size],
          variant === "default" && "edit-hover-lift",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

EditCard.displayName = "EditCard"
