import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface NeuCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "convex" | "floating" | "pressed"
  size?: "sm" | "md" | "lg" | "xl"
  gradient?: "none" | "earth" | "sage" | "lavender" | "dusty"
  children: React.ReactNode
}

const cardVariants = {
  subtle: "neu-subtle",
  convex: "neu-convex",
  floating: "neu-floating",
  pressed: "neu-pressed",
}

const cardSizes = {
  sm: "p-4 rounded-2xl",
  md: "p-6 rounded-2xl",
  lg: "p-8 rounded-3xl",
  xl: "p-12 rounded-3xl",
}

const cardGradients = {
  none: "bg-card",
  earth: "bg-gradient-to-br from-card to-secondary/30",
  sage: "bg-gradient-to-br from-card to-sage-light/20",
  lavender: "bg-gradient-to-br from-card to-lavender-light/20",
  dusty: "bg-gradient-to-br from-card to-accent-light/20",
}

export const NeuCard = forwardRef<HTMLDivElement, NeuCardProps>(
  ({ className, variant = "subtle", size = "md", gradient = "earth", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          cardVariants[variant],
          cardSizes[size],
          cardGradients[gradient],
          "hover:neu-convex hover:-translate-y-1",
          className,
        )}
        {...props}
      >
        {gradient !== "none" && (
          <>
            <div className="absolute inset-0 gradient-earth opacity-0 transition-all duration-500 group-hover:opacity-10 rounded-inherit" />
            <div className="absolute top-4 right-4 w-16 h-16 gradient-sage rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-all duration-500" />
          </>
        )}
        <div className="relative z-10">{children}</div>
      </div>
    )
  },
)

NeuCard.displayName = "NeuCard"
