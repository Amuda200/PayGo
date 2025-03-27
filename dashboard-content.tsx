"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Bell } from "lucide-react"
import { WelcomePopup } from "@/components/welcome-popup"
import { getBalance } from "@/lib/balance"

export function DashboardContent() {
  const [username, setUsername] = useState("")
  const [balance, setBalance] = useState("180000")
  const [showWelcomePopup, setShowWelcomePopup] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
      if (currentUser.name) {
        setUsername(currentUser.name)

        const shouldShowPopup = localStorage.getItem("showWelcomePopup") === "true"
        if (shouldShowPopup) {
          setShowWelcomePopup(true)
          setShowWarning(true)
          localStorage.removeItem("showWelcomePopup")

          // Hide warning after 8 seconds
          const timer = setTimeout(() => {
            setShowWarning(false)
          }, 8000)

          return () => clearTimeout(timer)
        }
      } else {
        router.push("/")
      }
    }
    setBalance(getBalance())

    // Get unread notifications count
    const unreadCount = Number.parseInt(localStorage.getItem("unreadNotificationsCount") || "0")
    setUnreadNotifications(unreadCount)
  }, [router])

  const handleClosePopup = () => {
    setShowWelcomePopup(false)
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear()
    }
    router.push("/")
  }

  const formattedBalance = Number(balance).toLocaleString()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-sm">
      {showWelcomePopup && <WelcomePopup username={username} onClose={handleClosePopup} />}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-orange-200" />
          <div>
            <h1 className="text-base font-bold">PayGo</h1>
            <p className="text-xs">Hi, {username}</p>
          </div>
        </div>
        <button onClick={() => router.push("/notifications")} className="relative">
          <Bell className="h-6 w-6" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadNotifications}
            </span>
          )}
        </button>
      </div>

      {showWarning && (
        <div className="bg-red-100 p-2 text-xs text-red-600 text-center">
          WARNING: Do not buy PAY ID code from any vendor. Only purchase through our official app.
        </div>
      )}

      <div className="m-4 rounded-xl bg-purple-600 p-4 text-white shadow">
        <h2 className="text-sm">Today Balance</h2>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-bold">₦{formattedBalance}.00</p>
          <button
            onClick={() => router.push("/withdraw")}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-purple-600 hover:bg-white/90"
          >
            Withdraw
          </button>
        </div>
        <p className="mt-2 text-xs">Weekly Rewards: ₦ 180,000</p>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4">
        <ActionButton icon="📜" label="History" onClick={() => router.push("/history")} />
        <ActionButton icon="💳" label="Buy PAY ID" onClick={() => router.push("/buy-payid")} />
        <ActionButton icon="📊" label="Watch" onClick={() => router.push("/watch")} />
        <ActionButton icon="📱" label="Airtime" onClick={() => router.push("/airtime")} />
        <ActionButton icon="📡" label="Data" onClick={() => router.push("/data")} />
        <ActionButton icon="💬" label="Support" onClick={() => router.push("/support")} />
        <ActionButton
          icon="🌐"
          label="Group"
          onClick={() => window.open("https://whatsapp.com/channel/0029VakAHcnEKyZFc7Mc9V06", "_blank")}
        />
        <ActionButton icon="ℹ️" label="About" onClick={() => router.push("/about")} />
        <ActionButton icon="🚪" label="Log out" onClick={handleLogout} />
      </div>
    </div>
  )
}

function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white rounded-lg p-3 h-20 shadow-sm"
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-xs font-medium text-center">{label}</span>
    </button>
  )
}

