"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center gap-2 border-b p-4">
        <button onClick={() => router.push("/dashboard")} className="text-black">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold">About PAYGO</h1>
      </header>

      <main className="flex-grow p-4">
        <div className="space-y-4 text-gray-800">
          <h2 className="text-2xl font-bold text-purple-600">WELCOME TO PAYGO!</h2>

          <p>
            We're thrilled to introduce you to PAYGO, the ultimate platform for earning opportunities! Our mission is to
            empower individuals with financial freedom, and we're excited to have you on board.
          </p>

          <h3 className="text-xl font-semibold text-purple-600">Get Started with a Welcome Bonus!</h3>
          <p>
            As a new user, you'll receive a generous welcome bonus of <strong>180,000 Naira</strong>, which can be
            withdrawn at any time. Yes, you read that right - it's yours to keep!
          </p>

          <h3 className="text-xl font-semibold text-purple-600">Activate Your PAY ID</h3>
          <p>To unlock the full potential of PAYGO, follow these simple steps:</p>
          <ol className="list-decimal pl-6">
            <li>
              <strong>Sign up</strong>: Register on our platform with a valid email address.
            </li>
            <li>
              <strong>Buy PAY ID</strong>: Purchase your unique PAY ID for <strong>₦7,200</strong> on our website.
            </li>
            <li>
              <strong>Verify Email</strong>: Ensure your email address is correct, as your PAY ID code will be sent to
              this address.
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-purple-600">What's Next?</h3>
          <p>
            Once you've activated your PAY ID, explore our platform to discover new earning opportunities. Our
            user-friendly interface and secure payment system ensure a seamless experience.
          </p>

          <h3 className="text-xl font-semibold text-purple-600">Join the PAYGO Community Today!</h3>
          <p>Don't miss out on this incredible chance to kickstart your financial journey.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

