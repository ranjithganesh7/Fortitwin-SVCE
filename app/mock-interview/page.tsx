"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, Video, Mic, MicOff, VideoOff, Monitor, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { CodeEditor } from "@/components/code-editor"

export default function MockInterviewPage() {
  const [code, setCode] = useState(`function findMissingNumber(nums) {
  // Your implementation here
}`)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [designSolution, setDesignSolution] = useState("")
  const [activeTab, setActiveTab] = useState("coding")

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/assessment-list">
              <Button variant="ghost" className="mr-4 text-gray-400 hover:text-white" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Assessments
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-white">Mock Technical Interview</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={isVideoOn ? "bg-gray-800" : "bg-red-900"} 
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={isAudioOn ? "bg-gray-800" : "bg-red-900"} 
              onClick={() => setIsAudioOn(!isAudioOn)}
            >
              {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Interview video feed */}
        <div className="w-full md:w-[30%] bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
          <div className="bg-gray-800 rounded-lg aspect-video mb-4 flex items-center justify-center">
            {isVideoOn ? (
              <img 
                src="https://via.placeholder.com/400x300/2d3748/e2e8f0?text=Interviewer" 
                alt="Interviewer" 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <VideoOff className="h-10 w-10 mb-2" />
                <p>Video off</p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 rounded-lg aspect-video mb-4 flex items-center justify-center">
            {isVideoOn ? (
              <img 
                src="https://via.placeholder.com/400x300/2d3748/e2e8f0?text=You" 
                alt="You" 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <VideoOff className="h-10 w-10 mb-2" />
                <p>Video off</p>
              </div>
            )}
          </div>
          
          <div className="mt-auto">
            <h3 className="font-semibold mb-2 text-white">Current Task</h3>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-gray-300">
                <p className="text-sm mb-2">
                  <strong>Time remaining:</strong> 45:00
                </p>
                <p className="text-sm">
                  Complete both the coding challenge and system design exercise. You can switch between tasks using the tabs. Remember to explain your thought process out loud.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Challenge Area */}
        <div className="w-full md:w-[70%] flex flex-col">
          <Tabs defaultValue="coding" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="bg-[#252526] border-b border-[#3c3c3c] px-4">
              <TabsList className="bg-[#2d2d2d] mt-2">
                <TabsTrigger value="coding" className="data-[state=active]:bg-[#1e1e1e]">Coding Challenge</TabsTrigger>
                <TabsTrigger value="design" className="data-[state=active]:bg-[#1e1e1e]">System Design</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="coding" className="flex-1 flex flex-col mt-0 data-[state=inactive]:hidden">
              <div className="p-4 bg-[#1e1e1e] border-b border-[#3c3c3c]">
                <h2 className="text-white font-medium mb-2">Find the Missing Number</h2>
                <p className="text-sm text-gray-400">
                  Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, 
                  find the one that is missing from the array. Implement the function findMissingNumber.
                </p>
                <div className="mt-2 p-2 bg-[#2d2d2d] rounded text-xs text-gray-300 font-mono">
                  Example: Input: [3,0,1] Output: 2
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <CodeEditor value={code} onChange={setCode} language="javascript" />
              </div>
              <div className="p-4 flex justify-between bg-[#252526] border-t border-[#3c3c3c]">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Monitor className="mr-2 h-4 w-4" />
                  Share Screen
                </Button>
                <Button className="bg-white text-black hover:bg-gray-200">Run Code</Button>
              </div>
            </TabsContent>

            <TabsContent value="design" className="flex-1 flex flex-col mt-0 data-[state=inactive]:hidden">
              <div className="p-4 bg-[#1e1e1e] border-b border-[#3c3c3c]">
                <h2 className="text-white font-medium mb-2">Design a URL Shortening Service</h2>
                <p className="text-sm text-gray-400">
                  Design a URL shortening service like TinyURL. Explain the system architecture, 
                  database design, and how you would handle high traffic and scalability challenges.
                </p>
                <div className="mt-2 p-2 bg-[#2d2d2d] rounded text-xs text-gray-300">
                  Consider discussing: API design, encoding strategy, database schema, caching, analytics, and scalability.
                </div>
              </div>
              <div className="flex-1 p-4 bg-[#1e1e1e]">
                <Textarea 
                  placeholder="Type your solution here..."
                  className="w-full h-full bg-[#2d2d2d] text-gray-300 border-gray-700 resize-none"
                  value={designSolution}
                  onChange={(e) => setDesignSolution(e.target.value)}
                />
              </div>
              <div className="p-4 flex justify-between bg-[#252526] border-t border-[#3c3c3c]">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Monitor className="mr-2 h-4 w-4" />
                  Share Screen
                </Button>
                <Button className="bg-white text-black hover:bg-gray-200">
                  <Send className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
} 