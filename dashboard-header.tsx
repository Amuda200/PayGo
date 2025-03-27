"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function DashboardHeader() {
  const { username } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const count = Number.parseInt(localStorage.getItem("unreadNotificationsCount") || "0")
    setUnreadCount(count)

    // Update count when storage changes
    const handleStorageChange = () => {
      const newCount = Number.parseInt(localStorage.getItem("unreadNotificationsCount") || "0")
      setUnreadCount(newCount)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-sm">U</AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-bold">Hi, {username}</h1>
      </div>
      <div className="relative">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => router.push("/notifications")}>
          <Bell className="h-5 w-5" />
        </Button>
        {unreadCount > 0 && (
          <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {unreadCount}
          </div>
        )}
      </div>
    </header>
  )
}

