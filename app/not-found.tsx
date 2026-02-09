'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Optional: Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-[#4492AC] mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. 
          You'll be redirected to the home page in 5 seconds.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => router.push('/')}
            className="bg-[#4492AC] hover:bg-[#3A7B94]"
          >
            Go Home
          </Button>
          <Button 
            onClick={() => router.back()}
            variant="outline"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}




