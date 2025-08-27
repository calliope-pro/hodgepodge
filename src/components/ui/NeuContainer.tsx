import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface NeuContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "hero" | "section" | "card" | "floating" | "subtle"
  size?: "sm" | "md" | "lg" | "xl"
  gradient?: "earth" | "sage" | "lavender" | "terracotta" | "stone"
  children: React.ReactNode
}

const containerVariants = {
  hero: "neu-floating bg-gradient-to-br from-card to-secondary/50 relative overflow-hidden",
  section: "neu-subtle bg-gradient-to-br from-muted to-secondary/50 relative overflow-hidden",
  card: "neu-floating bg-gradient-to-br from-card to-secondary/50",
  floating: "neu-floating bg-gradient-to-br from-card to-secondary/50 relative overflow-hidden",
  subtle: "neu-subtle bg-gradient-to-br from-muted to-secondary/50 relative overflow-hidden",
}

const containerSizes = {
  sm: "p-6 rounded-2xl",
  md: "p-8 rounded-2xl",
  lg: "p-12 rounded-3xl",
  xl: "p-16 rounded-3xl",
}

const gradientVariants = {
  earth: "gradient-earth",
  sage: "gradient-sage",
  lavender: "gradient-lavender",
  terracotta: "gradient-terracotta",
  stone: "gradient-stone",
}

export const NeuContainer = forwardRef<HTMLDivElement, NeuContainerProps>(
  ({ className, variant = "section", size = "lg", gradient, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          containerVariants[variant],
          containerSizes[size],
          gradient && gradientVariants[gradient],
          className,
        )}
        {...props}
      >
        {variant === "hero" && (
          <>
            <div className="absolute inset-0 gradient-earth opacity-5" />
            <div className="absolute top-0 right-0 w-64 h-64 gradient-sage rounded-full blur-3xl opacity-20 animate-float" />
            <div
              className="absolute bottom-0 left-0 w-48 h-48 gradient-lavender rounded-full blur-3xl opacity-15 animate-float"
              style={{ animationDelay: "1s" }}
            />
          </>
        )}
        {variant === "section" && <div className="absolute inset-0 gradient-lavender opacity-5" />}
        <div className="relative z-10">{children}</div>
      </div>
    )
  },
)

NeuContainer.displayName = "NeuContainer"
