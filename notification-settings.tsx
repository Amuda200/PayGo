"use client"

import { useEffect, useState } from "react"
import { Bell, BellOff } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { requestNotificationPermission } from "@/lib/notifications"

export function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkNotificationStatus()
  }, [])

  async function checkNotificationStatus() {
    const enabled = await requestNotificationPermission()
    setNotificationsEnabled(enabled)
    setLoading(false)
  }

  async function handleToggleNotifications() {
    if (notificationsEnabled) {
      // We can't revoke permission programmatically, so we just update the UI
      setNotificationsEnabled(false)
      localStorage.setItem("notificationsEnabled", "false")
    } else {
      const granted = await requestNotificationPermission()
      setNotificationsEnabled(granted)
      localStorage.setItem("notificationsEnabled", granted.toString())

      if (granted) {
        new Notification("Notifications Enabled", {
          body: "You will now receive notifications for your transactions.",
          icon: "/notification-icon.png",
        })
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {notificationsEnabled ? (
            <Bell className="h-5 w-5 text-purple-600" />
          ) : (
            <BellOff className="h-5 w-5 text-gray-400" />
          )}
          <div>
            <h3 className="font-medium">Notifications</h3>
            <p className="text-sm text-gray-500">
              {notificationsEnabled
                ? "You will receive notifications for your transactions"
                : "Enable notifications to stay updated"}
            </p>
          </div>
        </div>
        <Switch checked={notificationsEnabled} onCheckedChange={handleToggleNotifications} />
      </div>
    </div>
  )
}

