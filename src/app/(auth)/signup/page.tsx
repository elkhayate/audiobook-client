'use client'

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/AuthProvider"
import { Card, CardBody, CardHeader, Input, Button, Link } from "@nextui-org/react"
import NextLink from "next/link"
import { motion } from "framer-motion"

const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type FormData = z.infer<typeof schema>

export default function SignupPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false)
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible)

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
  
    try {
      await signUp(data.email, data.password, data.fullName);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Error creating account. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
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
              Create Account
            </h1>
            <p className="text-slate-400 text-center text-sm">
              Join AudioBook AI and start converting PDFs to audio
            </p>
          </CardHeader>
          
          <CardBody className="px-8 pb-8 pt-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    {...register("fullName")}
                    type="text"
                    placeholder="Enter your full name"
                    variant="flat"
                    isInvalid={!!errors.fullName}
                    classNames={{
                      input: "text-white placeholder:text-slate-500",
                      inputWrapper: `bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 focus-within:bg-slate-700/70 group-data-[focus=true]:border-blue-500 ${errors.fullName ? 'border-red-500' : ''}`,
                      base: "h-12"
                    }}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-400">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    variant="flat"
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
                
                <div className="space-y-2">
                  <Input
                    {...register("password")}
                    placeholder="Enter your password"
                    endContent={
                      <button 
                        type="button" 
                        onClick={toggleVisibility}
                        className="focus:outline-none"
                      >
                        {isVisible ? (
                          <EyeOff className="w-4 h-4 text-slate-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    variant="flat"
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
                
                <div className="space-y-2">
                  <Input
                    {...register("confirmPassword")}
                    placeholder="Confirm your password"
                    endContent={
                      <button 
                        type="button" 
                        onClick={toggleConfirmVisibility}
                        className="focus:outline-none"
                      >
                        {isConfirmVisible ? (
                          <EyeOff className="w-4 h-4 text-slate-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    }
                    type={isConfirmVisible ? "text" : "password"}
                    variant="flat"
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
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 text-base"
                size="lg"
                isLoading={loading}
                radius="lg"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
            
            <p className="text-center text-sm text-slate-400 mt-6">
              Already have an account?{" "}
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