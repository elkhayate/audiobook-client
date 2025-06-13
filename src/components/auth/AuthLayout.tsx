'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthProvider"
import { Spinner } from "@nextui-org/react"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log("🔧 AuthLayout: Auth state", { loading, hasUser: !!user, userId: user?.id });
    
    if (!loading && user) {
      console.log("🔧 AuthLayout: User authenticated, redirecting to dashboard");
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {children}
    </div>
  )
} 