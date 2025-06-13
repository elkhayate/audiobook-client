'use client'

import { useAuth } from "@/lib/auth/AuthProvider"
import { useRouter } from "next/navigation"
import { Button, Card, CardBody } from "@nextui-org/react"

export default function TestAuthPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/login")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <Card className="w-full max-w-md">
        <CardBody className="p-6">
          <h1 className="text-2xl font-bold text-white mb-4">Auth Test Page</h1>
          
          <div className="space-y-4">
            <div className="text-white">
              <p><strong>Loading:</strong> {loading ? "Yes" : "No"}</p>
              <p><strong>User:</strong> {user ? "Authenticated" : "Not authenticated"}</p>
              {user && (
                <>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>User ID:</strong> {user.id}</p>
                </>
              )}
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={handleGoToDashboard}
                color="primary"
                className="w-full"
              >
                Go to Dashboard
              </Button>
              
              {user && (
                <Button 
                  onClick={handleSignOut}
                  color="danger"
                  variant="bordered"
                  className="w-full"
                >
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
} 