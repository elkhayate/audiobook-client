"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardBody, CardHeader, Button, Input, Link } from "@nextui-org/react";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { supabase } from "@/lib/supabase/client";
 

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
        toast.error(resetError.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      setSuccess(true);
      toast.success('Password reset email sent successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.push('/login');
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
              Forgot Password
            </h1>
            <p className="text-slate-400 text-center text-sm">
              Enter your email to reset your password
            </p>
          </CardHeader>
          
          <CardBody className="px-8 pb-8 pt-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  variant="flat"
                  startContent={<Mail className="w-4 h-4 text-slate-400" />}
                  isInvalid={!!errors.email}
                  classNames={{
                    input: "text-white placeholder:text-slate-500",
                    inputWrapper: `bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 focus-within:bg-slate-700/70 group-data-[focus=true]:border-blue-500 ${errors.email ? 'border-red-500' : ''}`,
                    base: "h-12"
                  }}
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}
              {success && (
                <p className="text-sm text-green-500">
                  Password reset link has been sent to your email.
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 text-base"
                size="lg"
                isLoading={isLoading}
                radius="lg"
              >
                {isLoading ? "Sending..." : "Reset Password"}
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