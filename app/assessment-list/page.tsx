"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define types for our assessment objects
interface Assessment {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  timeEstimate: string;
  questions: number;
  type: string;
  link: string;
}

export default function AssessmentListPage() {
  const assessments: Assessment[] = [
    {
      id: 1,
      title: "Technical Assessment",
      description: "Evaluate your technical skills through coding challenges and system design questions.",
      difficulty: "Hard",
      timeEstimate: "45 min",
      questions: 10,
      type: "Technical",
      link: "/assessment-list/assessment-tech"
    },
    {
      id: 2,
      title: "Problem Solving",
      description: "Test your ability to solve complex problems with efficient solutions and clear reasoning.",
      difficulty: "Medium",
      timeEstimate: "40 min",
      questions: 6,
      type: "Technical",
      link: "/assessment-list/assessment-problem"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Fortiview Assessments</h1>
        </div>
      </header>

      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="overflow-hidden bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-white">{assessment.title}</CardTitle>
                    <Badge variant="outline" className="border-gray-700 text-gray-300">
                      {assessment.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">{assessment.description}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{assessment.timeEstimate} • {assessment.questions} questions</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-800 border-t border-gray-700">
                  <Link href={assessment.link} className="w-full">
                    <Button variant="ghost" className="w-full justify-between text-white hover:text-white hover:bg-gray-700">
                      Start Assessment
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 