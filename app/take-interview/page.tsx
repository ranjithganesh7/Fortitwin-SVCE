"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Send,
  Mic,
  User,
  Bot,
  Clock,
  Download,
  Smile,
  Meh,
  Frown,
  ChevronRight,
  ArrowLeft,
  Gauge,
} from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function TakeInterviewPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [interviewProgress, setInterviewProgress] = useState(0)
  const [sentiment, setSentiment] = useState("neutral") // neutral, positive, negative
  const [timer, setTimer] = useState(0)
  const [activeTab, setActiveTab] = useState("chat")

  // Timer for interview duration
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    // Analyze sentiment (simplified)
    const lowercaseInput = input.toLowerCase()
    if (lowercaseInput.includes("great") || lowercaseInput.includes("good") || lowercaseInput.includes("yes")) {
      setSentiment("positive")
    } else if (
      lowercaseInput.includes("nervous") ||
      lowercaseInput.includes("worried") ||
      lowercaseInput.includes("difficult")
    ) {
      setSentiment("negative")
    } else {
      setSentiment("neutral")
    }

    // Simulate AI response after a short delay
    setTimeout(() => {
      let nextResponse = ""

      if (currentQuestion === 1) {
        nextResponse =
          "Great! Let's start by discussing a problem. How would you approach designing a system that needs to handle millions of requests per second?"
        setCurrentQuestion(2)
        setInterviewProgress(25)
      } else if (currentQuestion === 2) {
        nextResponse =
          "Good approach! Now let's discuss scalability. What strategies would you employ to ensure your solution can scale effectively?"
        setCurrentQuestion(3)
        setInterviewProgress(50)
      } else if (currentQuestion === 3) {
        nextResponse =
          "Excellent analysis. Now for a behavioral question: Tell me about a time when you had to debug a particularly challenging issue. What was your approach, and what did you learn from the experience?"
        setCurrentQuestion(4)
        setInterviewProgress(75)
      } else if (currentQuestion === 4) {
        nextResponse =
          "That's a thoughtful response. Finally, what would you say are your greatest strengths as a software engineer, and what areas are you working to improve?"
        setCurrentQuestion(5)
        setInterviewProgress(90)
      } else {
        nextResponse =
          "Thank you for completing this interview. I've gathered valuable insights about your technical skills and problem-solving approach. Would you like to see your preliminary assessment now?"
        setInterviewProgress(100)
      }

      setMessages((prev) => [...prev, { role: "assistant", content: nextResponse }])
    }, 1000)
  }

  const getSentimentIcon = () => {
    if (sentiment === "positive") return <Smile className="h-5 w-5 text-green-500" />
    if (sentiment === "negative") return <Frown className="h-5 w-5 text-red-500" />
    return <Meh className="h-5 w-5 text-gray-500" />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center mr-4">
              <ArrowLeft className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="/" className="flex items-center">
              <Gauge className="h-5 w-5 mr-2 text-primary" />
              <span className="font-bold text-lg">
                <span className="text-primary">Forti</span>Twin
              </span>
            </Link>
            <span className="ml-2 text-sm text-muted-foreground">Technical Interview</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/take-interview" className="text-primary transition-colors">
              Interview
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timer)}</span>
            </div>
            <ModeToggle />
            <Button variant="outline" className="text-foreground">
              End Interview
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Interview Progress</span>
            <span className="text-sm font-medium text-foreground">{interviewProgress}%</span>
          </div>
          <Progress value={interviewProgress} className="h-2" />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Main interview area */}
          <div className="flex-1">
            <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="chat">Chat Interview</TabsTrigger>
                <TabsTrigger value="hume">Voice Interview</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-6">
                <Card className="border-border">
                  <CardContent className="p-0">
                    <div className="h-[70vh] w-full">
                      <iframe 
                        src="https://cdn.botpress.cloud/webchat/v2.4/shareable.html?configUrl=https://files.bpcontent.cloud/2025/05/01/04/20250501042318-OF6QXBDK.json" 
                        className="w-full h-full border-0"
                        allow="microphone; clipboard-write"
                        title="Botpress Interview Chat"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {currentQuestion === 5 && interviewProgress >= 90 && (
                  <div className="text-center">
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => {
                        // Execute the file launch
                        window.open('file:///C:/Program%20Files/YourApp/YourApp.exe');
                        // You can also use this alternative approach:
                        // window.location.href = 'file:///C:/Program%20Files/YourApp/YourApp.exe';
                      }}
                    >
                      Complete Interview & Launch FLB
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="hume" className="space-y-6">
                <Card className="border-border">
                  <CardContent className="p-0">
                    <div className="h-[70vh] w-full">
                      <iframe 
                        src="https://platform.hume.ai/evi/playground?configId=1627a551-5793-4197-b6d0-ade41ef2e0f1" 
                        className="w-full h-full border-0"
                        allow="camera; microphone; clipboard-write"
                        title="Hume AI Interview"
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Powered by Hume AI's native interview interface
                  </p>
                  <Link href="/dashboard">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Complete Interview & Return to Dashboard
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right sidebar - Analysis */}
          <div className="w-full md:w-80">
            <Card className="border-border mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-foreground">Real-time Analysis</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3 text-foreground flex items-center">
                      Current Sentiment {getSentimentIcon()}
                    </h3>
                    <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">
                      {sentiment === "positive" && "You sound confident and enthusiastic."}
                      {sentiment === "negative" && "You seem a bit concerned or hesitant."}
                      {sentiment === "neutral" && "Your tone is balanced and professional."}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3 text-foreground">Technical Skills</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Problem Solving</span>
                          <span className="text-xs text-muted-foreground">85%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Algorithm Knowledge</span>
                          <span className="text-xs text-muted-foreground">78%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Code Quality</span>
                          <span className="text-xs text-muted-foreground">92%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3 text-foreground">
                      Current Question Focus
                    </h3>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs mr-2">
                          {currentQuestion}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {currentQuestion === 1 && "Introduction"}
                          {currentQuestion === 2 && "System Design"}
                          {currentQuestion === 3 && "Scalability"}
                          {currentQuestion === 4 && "Problem Solving"}
                          {currentQuestion === 5 && "Self Assessment"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {currentQuestion === 1 && "Getting to know your background and experience."}
                        {currentQuestion === 2 && "Assessing your system design approach."}
                        {currentQuestion === 3 && "Evaluating your understanding of scalability."}
                        {currentQuestion === 4 && "Testing your problem-solving skills."}
                        {currentQuestion === 5 && "Exploring your self-awareness and areas for growth."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3 text-foreground">Interview Tips</h3>
                    <div className="bg-muted p-3 rounded-lg text-sm text-muted-foreground">
                      {currentQuestion === 1 && "Speak clearly and confidently about your experience and skills."}
                      {currentQuestion === 2 && "Think about scalability, reliability, and performance in your design."}
                      {currentQuestion === 3 && "Consider both vertical and horizontal scaling approaches."}
                      {currentQuestion === 4 && "Use the STAR method (Situation, Task, Action, Result) for behavioral questions."}
                      {currentQuestion === 5 && "Be honest but strategic when discussing your weaknesses."}
                    </div>
                  </div>

                  <Link href="/report">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/10"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      View Report
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}