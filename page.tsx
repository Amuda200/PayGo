"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function WatchPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center gap-2 border-b p-4">
        <button onClick={() => router.push("/dashboard")} className="text-black">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold">Watch Video</h1>
      </header>

      <main className="p-4">
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/lRj6-zpcxcY"
            title="How To Earn With PayGo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">How To Earn With PayGo</h2>
          <p className="mt-2 text-gray-600">
            Learn how you can earn up to ₦180,000 naira every week with PayGo. This video explains the process and
            opportunities available on our platform.
          </p>
        </div>
      </main>
    </div>
  )
}

