import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-2xl border border-gray-800 bg-gray-900/50 px-6 py-4 text-lg font-light text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none focus:ring-0 transition-all duration-300 backdrop-blur-sm",
          "caret-red-500",
          className,
        )}
        ref={ref}
        autoComplete="off"
        spellCheck="false"
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
