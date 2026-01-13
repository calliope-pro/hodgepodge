import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "pastel"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

const buttonVariants = {
  default: "edit-btn",
  primary: "edit-btn edit-btn-primary",
  pastel: "edit-btn edit-btn-pastel",
}

const buttonSizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
}

export const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants[variant],
          buttonSizes[size],
          "inline-flex",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

EditButton.displayName = "EditButton"
