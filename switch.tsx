"use client"

import * as React from "react"

type SwitchProps = React.ComponentPropsWithoutRef<"button">

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(({ className, ...props }, ref) => {
  return (
    <button
      className="peer h-6 w-11 rounded-full bg-gray-200 ring-offset-background transition-colors data-[state=checked]:bg-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:peer-focus-visible:ring-ring data-[state=checked]:peer-focus-visible:ring-offset-2 [&[data-state=checked]]:bg-purple-600"
      role="switch"
      aria-checked={props["aria-checked"]}
      {...props}
      ref={ref}
    >
      <span className="sr-only">Toggle</span>
      <span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md transition-transform translate-x-0 data-[state=checked]:translate-x-5"></span>
    </button>
  )
})
Switch.displayName = "Switch"

