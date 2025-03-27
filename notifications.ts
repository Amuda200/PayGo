"use client"

export type Notification = {
  id: string
  title: string
  message: string
  type: "success" | "error"
  date: string
  read: boolean
}

export function addNotification(notification: Omit<Notification, "id" | "date" | "read">) {
  if (typeof window === "undefined") return

  const notifications = getNotifications()
  const newNotification = {
    ...notification,
    id: Math.random().toString(36).substring(7),
    date: new Date().toISOString(),
    read: false,
  }

  notifications.unshift(newNotification)
  localStorage.setItem("notifications", JSON.stringify(notifications))
  updateUnreadCount(notifications)
}

export function getNotifications(): Notification[] {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("notifications") || "[]")
}

export function markAllAsRead() {
  if (typeof window === "undefined") return

  const notifications = getNotifications()
  const updatedNotifications = notifications.map((notification) => ({
    ...notification,
    read: true,
  }))

  localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
  updateUnreadCount(updatedNotifications)
}

export function updateUnreadCount(notifications?: Notification[]) {
  if (typeof window === "undefined") return

  const notifs = notifications || getNotifications()
  const unreadCount = notifs.filter((n) => !n.read).length
  localStorage.setItem("unreadNotificationsCount", unreadCount.toString())
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined") return false

  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.")
    return false
  }

  if (Notification.permission === "granted") {
    return true
  } else if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission()
    return permission === "granted"
  }

  return false
}

