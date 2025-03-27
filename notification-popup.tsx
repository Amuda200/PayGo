"use client"

import { useState, useEffect } from "react"

interface NotificationPopupProps {
  onClose: () => void
}

export function NotificationPopup({ onClose }: NotificationPopupProps) {
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
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
      ></div>
      <div className="relative w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Notifications</h2>
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold">Welcome to PayGo!</h3>
          <p className="mb-2">
            We are excited to have you on board. As a new member of our platform, you'll receive an exclusive welcome
            bonus of <strong>200,000 Naira</strong> just for signing up!
          </p>
          <p className="mb-2">
            This bonus is yours to keep and can be withdrawn at any time, giving you the flexibility to use it however
            you choose.
          </p>
          <p className="text-sm text-gray-600">
            Don't wait—get started today and take full advantage of your welcome bonus!
          </p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  )
}

