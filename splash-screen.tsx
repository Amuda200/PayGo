"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 3000) // 3 seconds

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8ecec] p-4 splash-screen">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative mx-auto h-32 w-64 animate-float">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20(1)-k6NpTzoaCnoLJb0FozGSqIo4xMh2gM.jpeg"
            alt="PAYGO Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-[#2D1357]">Welcome to PayGo!</h1>
        <p className="text-xl text-gray-600">
          As a new user, you'll receive a generous welcome bonus of ₦180,000, which can be withdrawn at any time. Yes,
          you read that right - it's yours to keep!
        </p>
      </div>
    </div>
  )
}

