"use client"

import { useRouter } from "next/navigation"

export function BalanceCard() {
  const router = useRouter()

  return (
    <div className="mt-4 rounded-2xl bg-[#0000FF] p-4 text-white">
      <h2 className="text-base">Today Balance</h2>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-2xl font-bold">₦200000.00</p>
        <button
          onClick={() => router.push("/withdraw")}
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90"
        >
          Withdraw
        </button>
      </div>
      <p className="mt-4 text-sm">Daily spend target: ₦ 200,000</p>
    </div>
  )
}

