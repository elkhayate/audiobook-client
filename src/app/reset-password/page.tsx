"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardBody, CardHeader, Button, Input, Link } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { supabase } from "@/lib/supabase/client";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      router.push("/login");
    }

    // Check if we have a temporary session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.app_metadata?.provider === 'email') {
        // If it's a regular email session (not from password reset), redirect to dashboard
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password
      });

      if (updateError) {
        setError(updateError.message);
        toast.error(updateError.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      // Sign out the temporary session
      await supabase.auth.signOut();

      setSuccess(true);
      toast.success('Password has been reset successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      const errorMessage = "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 shadow-2xl">
          <CardHeader className="flex flex-col items-center space-y-1 pb-4 pt-8 px-8">
            <h1 className="text-2xl font-bold text-white">
              Reset Password
            </h1>
            <p className="text-slate-400 text-center text-sm">
              Enter your new password
            </p>
          </CardHeader>
          
          <CardBody className="px-8 pb-8 pt-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register("password")}
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter new password"
                    variant="flat"
                    endContent={
                      <button
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        className="focus:outline-none"
                      >
                        {isVisible ? (
                          <EyeOff className="w-4 h-4 text-slate-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    }
                    isInvalid={!!errors.password}
                    classNames={{
                      input: "text-white placeholder:text-slate-500",
                      inputWrapper: `bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 focus-within:bg-slate-700/70 group-data-[focus=true]:border-blue-500 ${errors.password ? 'border-red-500' : ''}`,
                      base: "h-12"
                    }}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-400">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register("confirmPassword")}
                    type={isConfirmVisible ? "text" : "password"}
                    placeholder="Confirm new password"
                    variant="flat"
                    endContent={
                      <button
                        type="button"
                        onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                        className="focus:outline-none"
                      >
                        {isConfirmVisible ? (
                          <EyeOff className="w-4 h-4 text-slate-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    }
                    isInvalid={!!errors.confirmPassword}
                    classNames={{
                      input: "text-white placeholder:text-slate-500",
                      inputWrapper: `bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 focus-within:bg-slate-700/70 group-data-[focus=true]:border-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`,
                      base: "h-12"
                    }}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}
              {success && (
                <p className="text-sm text-green-500">
                  Password has been reset successfully. Redirecting to login...
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 text-base"
                size="lg"
                isLoading={isLoading}
                radius="lg"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-6">
              Remember your password?{" "}
              <Link 
                as={NextLink} 
                href="/login" 
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
} 