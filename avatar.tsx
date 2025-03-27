import * as React from "react"

type AvatarProps = React.ComponentPropsWithoutRef<"div">
type AvatarFallbackProps = React.ComponentPropsWithoutRef<"span">

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-500 ${className}`}
      {...props}
      ref={ref}
    />
  )
})
Avatar.displayName = "Avatar"

export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(({ className, ...props }, ref) => {
  return (
    <span
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-gray-900 ${className}`}
      {...props}
      ref={ref}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

