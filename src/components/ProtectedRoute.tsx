'use client'

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useEffect } from "react";
import { Spinner } from "@nextui-org/react";

interface ProtectedRouteProps {
  children: ReactNode;
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  fallbackPath = "/login"
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("🛡️ ProtectedRoute: Auth check", { 
      loading, 
      hasUser: !!user,
      userId: user?.id,
      email: user?.email 
    });
    
    if (!loading && !user) {
      console.log("🛡️ ProtectedRoute: Redirecting to login - no user found");
      router.push(fallbackPath);
    }
  }, [user, loading, fallbackPath, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
} 