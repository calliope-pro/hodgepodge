import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface EditInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const EditInput = forwardRef<HTMLInputElement, EditInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 text-sm",
          "bg-background border border-border",
          "focus:outline-none focus:border-foreground",
          "transition-colors duration-200",
          "font-mono",
          className,
        )}
        {...props}
      />
    )
  },
)

EditInput.displayName = "EditInput"
