"use client"

import { useState, useEffect } from "react"

interface WelcomePopupProps {
  username: string
  onClose: () => void
}

export function WelcomePopup({ username, onClose }: WelcomePopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Welcome, {username}!</h2>
        <p className="mb-4">
          You have received 180,000 naira from PayGo as a welcome bonus. You can withdraw seamlessly.
        </p>
        <p className="mb-4 font-semibold text-purple-600">
          Join our WhatsApp group to stay updated with the latest opportunities!
        </p>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

