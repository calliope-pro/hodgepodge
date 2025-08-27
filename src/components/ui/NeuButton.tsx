import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface NeuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

const buttonVariants = {
  primary: "neu-convex gradient-dusty text-accent-foreground hover:neu-pressed",
  secondary:
    "neu-convex bg-gradient-to-r from-card to-secondary/50 text-card-foreground hover:neu-pressed hover:text-accent",
  ghost: "neu-subtle bg-card text-card-foreground hover:neu-pressed hover:text-accent",
  destructive: "neu-convex bg-destructive text-accent-foreground hover:neu-pressed",
}

const buttonSizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-sm rounded-2xl",
  lg: "px-8 py-4 text-base rounded-2xl",
}

export const NeuButton = forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "font-semibold transition-premium hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
          buttonVariants[variant],
          buttonSizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

NeuButton.displayName = "NeuButton"
