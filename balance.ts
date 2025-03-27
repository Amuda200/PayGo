"use client"

export function getBalance(): string {
  if (typeof window === "undefined") return "200000"
  return localStorage.getItem("balance") || "200000"
}

export function setBalance(amount: string) {
  if (typeof window === "undefined") return
  localStorage.setItem("balance", amount)
}

export function updateBalance(amount: number) {
  if (typeof window === "undefined") return
  const currentBalance = Number(getBalance())
  const newBalance = currentBalance - amount
  setBalance(newBalance.toString())
  return newBalance
}

