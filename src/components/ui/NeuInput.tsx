import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface NeuInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "search"
  size?: "md" | "lg"
}

const inputVariants = {
  default: "neu-concave bg-gradient-to-r from-card to-secondary/30 focus:neu-pressed",
  search: "neu-concave bg-gradient-to-r from-card to-secondary/30 focus:neu-pressed",
}

const inputSizes = {
  md: "px-4 py-3 text-base rounded-xl",
  lg: "px-6 py-4 text-lg rounded-2xl",
}

export const NeuInput = forwardRef<HTMLInputElement, NeuInputProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full text-card-foreground placeholder:text-muted-foreground focus:outline-none transition-premium",
          inputVariants[variant],
          inputSizes[size],
          className,
        )}
        {...props}
      />
    )
  },
)

NeuInput.displayName = "NeuInput"
