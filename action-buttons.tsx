"use client"

import { useRouter } from "next/navigation"

export function ActionButtons() {
  const router = useRouter()

  const actions = [
    { icon: "🔄", label: "Reset", onClick: () => {} },
    { icon: "💰", label: "Buy BPC", onClick: () => router.push("/buy-bpc") },
    { icon: "📈", label: "Watch", onClick: () => {} },
    { icon: "📞", label: "Contact", onClick: () => {} },
    { icon: "🌐", label: "Group", onClick: () => {} },
    { icon: "❓", label: "Faq", onClick: () => {} },
  ]

  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      {actions.map((action) => (
        <button key={action.label} onClick={action.onClick} className="flex flex-col items-center justify-center gap-1">
          <span className="text-2xl">{action.icon}</span>
          <span className="text-xs font-semibold">{action.label}</span>
        </button>
      ))}
    </div>
  )
}

