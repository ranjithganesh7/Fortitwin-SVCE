"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, Lock, Mail, Github, Linkedin, Twitter } from "lucide-react"
import useAuth from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"
import { ModeToggle } from "@/components/mode-toggle"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const router = useRouter()
  const { login, isLoading, error } = useAuth()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email"
      }
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const result = await login({ email, password, role })
    
    if (result.success) {
      toast({
        title: "Login successful!",
        description: "Welcome back to Fortiview.",
      })
      // Redirect to appropriate dashboard
      router.push(role === "hr" ? "/hr-dashboard" : "/dashboard")
    } else {
      toast({
        title: "Login failed",
        description: result.error || "There was an error logging in.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="font-bold text-2xl">
                <span className="text-foreground">Forti</span>
                <span className="text-[#6b21a8]">view</span>
            </div>
          </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2 text-foreground">Welcome back</h1>
            <p className="text-lg text-muted-foreground">Sign in to continue your interview journey</p>
          </div>

          <div className="bg-card rounded-2xl shadow-xl p-8 relative overflow-hidden border border-border">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6b21a8]/10 to-[#9333ea]/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#6b21a8]/10 to-[#9333ea]/10 rounded-tr-full"></div>

            {/* Neural Network Lines */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,100" stroke="#6b21a8" strokeWidth="0.5" />
                <path d="M100,0 L0,100" stroke="#6b21a8" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="2" fill="#6b21a8" />
                <circle cx="25" cy="25" r="1" fill="#6b21a8" />
                <circle cx="75" cy="75" r="1" fill="#6b21a8" />
                <circle cx="75" cy="25" r="1" fill="#6b21a8" />
                <circle cx="25" cy="75" r="1" fill="#6b21a8" />
              </svg>
            </div>

            <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`pl-10 border-gray-200 focus:border-[#6b21a8] focus:ring-[#6b21a8]/20 ${errors.email ? "border-red-500" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm text-[#6b21a8] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={`pl-10 border-gray-200 focus:border-[#6b21a8] focus:ring-[#6b21a8]/20 ${errors.password ? "border-red-500" : ""}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label>Sign in as</Label>
                <RadioGroup defaultValue="student" value={role} onValueChange={setRole} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="font-normal">
                      Student
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hr" id="hr" />
                    <Label htmlFor="hr" className="font-normal">
                      HR Professional
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6b21a8] to-[#9333ea] hover:shadow-lg hover:shadow-purple-300 transition-all duration-300 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-200 absolute w-full"></div>
                <span className="bg-white px-4 text-sm text-gray-500 relative">or continue with</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="border-gray-200 hover:bg-gray-50" type="button">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-200 hover:bg-gray-50" type="button">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-200 hover:bg-gray-50" type="button">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#6b21a8] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2025 Fortiview. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-[#6b21a8] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-[#6b21a8] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function LoginIllustration() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <Image
        src="/assets/image 1(2).png"
        alt="Login Illustration"
        width={500}
        height={400}
        className="mx-auto"
      />
    </div>
  )
}