import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface EditContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "narrow" | "wide"
  children: React.ReactNode
}

const containerVariants = {
  default: "edit-container",
  narrow: "edit-container-narrow",
  wide: "edit-container-wide",
}

export const EditContainer = forwardRef<HTMLDivElement, EditContainerProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(containerVariants[variant], className)} {...props}>
        {children}
      </div>
    )
  },
)

EditContainer.displayName = "EditContainer"
