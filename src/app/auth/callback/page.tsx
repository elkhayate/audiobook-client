"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardBody, Spinner } from "@nextui-org/react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Auth callback error:", error);
          router.push("/login?error=auth_callback_failed");
          return;
        }

        if (data.session) {
          console.log("Auth callback successful:", data.session.user.email);
          router.push("/dashboard");
        } else {
          console.log("No session found, redirecting to login");
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        router.push("/login?error=auth_callback_failed");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Card className="w-full max-w-md">
        <CardBody className="text-center py-12">
          <Spinner size="lg" color="primary" className="mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Completing Sign In...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we complete your authentication.
          </p>
        </CardBody>
      </Card>
    </div>
  );
} 