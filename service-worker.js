self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "/notification-icon.png",
    badge: "/notification-badge.png",
    vibrate: [200, 100, 200],
  }

  event.waitUntil(self.registration.showNotification("PAYGO", options))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(clients.openWindow("https://your-app-url.com/dashboard"))
})

