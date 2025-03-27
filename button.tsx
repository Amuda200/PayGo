import * as React from "react"

type ButtonProps = React.ComponentPropsWithoutRef<"button">

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          variant === "default"
            ? "bg-black text-white hover:bg-black/90"
            : variant === "ghost"
              ? "bg-transparent hover:bg-gray-100"
              : ""
        } ${size === "sm" ? "px-3 py-1.5 text-xs" : ""} ${className}`}
        {...props}
        ref={ref}
      />
    )
  },
)
Button.displayName = "Button"

