"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { CodeEditor } from "@/components/code-editor"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define types for questions
type DifficultyLevel = 'easy' | 'medium' | 'hard';

interface Question {
  title: string;
  description: string;
  code: string;
  constraints: string[];
  example: string;
}

interface Questions {
  easy: Question;
  medium: Question;
  hard: Question;
}

export default function TechnicalAssessmentPage() {
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>("medium")
  
  // Questions for different difficulty levels
  const questions: Questions = {
    easy: {
      title: "Find Maximum Element",
      description: "Write a function that finds the maximum element in an array of integers.",
      code: `function findMax(arr) {
  // Your implementation here
}`,
      constraints: [
        "1 ≤ arr.length ≤ 10^5",
        "-10^9 ≤ arr[i] ≤ 10^9"
      ],
      example: `Input: [3, 7, 2, 9, 1, 5]
Output: 9

Input: [-3, -7, -2, -9, -1, -5]
Output: -1`
    },
    medium: {
      title: "Maximum Depth of Binary Tree",
      description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
      code: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function maxDepth(root) {
  // Your implementation here
}`,
      constraints: [
        "The number of nodes in the tree is in the range [0, 10^4]",
        "-100 ≤ Node.val ≤ 100"
      ],
      example: `Input: root = [3,9,20,null,null,15,7]
Output: 3
Explanation:
    3
   / \\
  9  20
    /  \\
   15   7

Input: root = [1,null,2]
Output: 2`
    },
    hard: {
      title: "Trapping Rain Water",
      description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      code: `function trap(height) {
  // Your implementation here
}`,
      constraints: [
        "n == height.length",
        "1 ≤ n ≤ 2 * 10^4",
        "0 ≤ height[i] ≤ 10^5"
      ],
      example: `Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.

Input: height = [4,2,0,3,2,5]
Output: 9`
    }
  }

  const [code, setCode] = useState(questions[difficultyLevel].code)

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
            <h1 className="text-xl font-semibold text-white">Technical Assessment</h1>
          </div>
          <div className="text-sm text-gray-400">Question 1/10</div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="bg-gray-900 border-b border-gray-800 p-3">
          <Tabs value={difficultyLevel} onValueChange={(value: string) => {
            const level = value as DifficultyLevel;
            setDifficultyLevel(level);
            setCode(questions[level].code);
          }} className="w-full max-w-md mx-auto">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="easy" className="data-[state=active]:bg-white data-[state=active]:text-black">
                Easy
              </TabsTrigger>
              <TabsTrigger value="medium" className="data-[state=active]:bg-white data-[state=active]:text-black">
                Medium
              </TabsTrigger>
              <TabsTrigger value="hard" className="data-[state=active]:bg-white data-[state=active]:text-black">
                Hard
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Panel - Question */}
          <div className="w-full md:w-[30%] bg-gray-900 border-r border-gray-800 p-6 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2 text-gray-300">Algorithm Challenge</h2>
            <h3 className="text-xl font-bold mb-4 text-white">{questions[difficultyLevel].title}</h3>

            <div className="max-w-none mb-6 text-gray-300">
              <p className="mb-4">{questions[difficultyLevel].description}</p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-white">Constraints</h4>
              <ul className="list-disc list-inside text-sm text-gray-400">
                {questions[difficultyLevel].constraints.map((constraint: string, index: number) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-white">Example</h4>
              <Card className="bg-gray-800 p-4 border-gray-700">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  {questions[difficultyLevel].example}
                </pre>
              </Card>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="w-full md:w-[70%] flex flex-col bg-[#1e1e1e]">
            <div className="p-4 bg-[#252526] border-b border-[#3c3c3c]">
              <h2 className="text-white font-medium">Your Solution</h2>
            </div>

            <div className="flex-1 overflow-hidden">
              <CodeEditor value={code} onChange={setCode} language="javascript" />
            </div>

            <div className="p-4 flex justify-between bg-[#252526] border-t border-[#3c3c3c]">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">Run Tests</Button>
              <Button className="bg-white text-black hover:bg-gray-200">Submit</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 