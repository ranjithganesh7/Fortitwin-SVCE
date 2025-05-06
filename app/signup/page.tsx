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
import { ArrowRight, Lock, Mail, User, Github, Linkedin, Twitter } from "lucide-react"
import useAuth from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"
import { ModeToggle } from "@/components/mode-toggle"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const router = useRouter()
  const { register, isLoading, error } = useAuth()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

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
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const result = await register({ name, email, password, role })
    
    if (result.success) {
      toast({
        title: "Account created!",
        description: "You have successfully created an account.",
      })
      // Redirect to appropriate dashboard
      router.push(role === "hr" ? "/hr-dashboard" : "/dashboard")
    } else {
      toast({
        title: "Registration failed",
        description: result.error || "There was an error creating your account.",
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
            <h1 className="text-4xl font-bold mb-2 text-foreground">Create your account</h1>
            <p className="text-lg text-muted-foreground">Start your interview preparation journey</p>
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
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={18} />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className={`pl-10 border-gray-200 focus:border-[#6b21a8] focus:ring-[#6b21a8]/20 ${errors.name ? "border-red-500" : ""}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

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
                <Label htmlFor="password">Password</Label>
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
                <Label>I am a</Label>
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
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className={`text-sm font-normal ${errors.terms ? "text-red-500" : ""}`}>
                  I agree to the{" "}
                  <Link href="#" className="text-[#6b21a8] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-[#6b21a8] hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#6b21a8] to-[#9333ea] hover:shadow-lg hover:shadow-purple-300 transition-all duration-300 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="relative flex items-center justify-center">
                <div className="border-t border-gray-200 absolute w-full"></div>
                <span className="bg-white px-4 text-sm text-gray-500 relative">or sign up with</span>
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
              Already have an account?{" "}
              <Link href="/login" className="text-[#6b21a8] hover:underline font-medium">
                Sign in
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

function SignupIllustration() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <Image
        src="/assets/image 1(2).png"
        alt="Signup Illustration"
        width={500}
        height={400}
        className="mx-auto"
      />
    </div>
  )
}