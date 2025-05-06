"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Code, Gauge, MessageSquare, Play, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"

export default function StudentDashboard() {
  const [progress, setProgress] = useState(42)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Gauge className="h-5 w-5 mr-2 text-primary" />
            <span className="font-bold text-lg">
              <span className="text-primary">Forti</span>Twin
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/take-interview" className="text-muted-foreground hover:text-primary transition-colors">
              Interview
            </Link>
            <Link href="/report" className="text-muted-foreground hover:text-primary transition-colors">
              Reports
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
          <ModeToggle />
            <Button variant="outline" size="icon" asChild>
              <Link href="/profile">
            <User className="h-4 w-4" />
                <span className="sr-only">Profile</span>
              </Link>
          </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Support
            </Button>
          </div>
        </div>

        {/* Take Interview Card - Prominent Feature */}
        <Card className="border-2 border-primary shadow-lg">
          <CardHeader className="bg-primary/5 pb-2">
            <CardTitle className="text-xl text-primary">Ready for your interview?</CardTitle>
            <CardDescription>Practice with our AI interviewer and get real-time feedback</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Play className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Behavioral Interview</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Code className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Technical Assessment</span>
                </div>
              </div>
              <Link href="/take-interview" className="w-full md:w-auto">
                <Button className="w-full gap-2">
                  Take Your Interview
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your interview preparation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Interview Readiness</span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border bg-card p-2">
                  <div className="text-sm font-medium">Completed</div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground">Interviews</div>
                </div>
                <div className="rounded-lg border bg-card p-2">
                  <div className="text-sm font-medium">Upcoming</div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-xs text-muted-foreground">Sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="upcoming" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Mock Technical Interview</CardTitle>
                <CardDescription>Scheduled for May 10, 2025 • 2:00 PM</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Focus: Data Structures & Algorithms</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reschedule</Button>
                <Button>Prepare Now</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Behavioral Interview Practice</CardTitle>
                <CardDescription>Completed on May 3, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span className="text-sm font-medium">85/100</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Strong communication skills demonstrated. Work on providing more specific examples.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Feedback
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="feedback" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview Feedback Summary</CardTitle>
                <CardDescription>Based on your recent practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Communication</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Technical Knowledge</span>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Problem Solving</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Improvement Plan
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}