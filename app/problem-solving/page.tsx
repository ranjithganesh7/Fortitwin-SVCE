"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { CodeEditor } from "@/components/code-editor"

export default function ProblemSolvingPage() {
  const [code, setCode] = useState(`function twoSum(nums, target) {
  // Your implementation here
}`)

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
            <h1 className="text-xl font-semibold text-white">Problem Solving</h1>
          </div>
          <div className="text-sm text-gray-400">Question 1/6</div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel - Question */}
        <div className="w-full md:w-[30%] bg-gray-900 border-r border-gray-800 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2 text-gray-300">Algorithm Challenge</h2>
          <h3 className="text-xl font-bold mb-4 text-white">Two Sum</h3>

          <div className="max-w-none mb-6 text-gray-300">
            <p className="mb-4">
              Given an array of integers <code className="bg-gray-800 px-1 py-0.5 rounded">nums</code> and an integer <code className="bg-gray-800 px-1 py-0.5 rounded">target</code>, return indices of the two numbers such that they add up to <code className="bg-gray-800 px-1 py-0.5 rounded">target</code>.
            </p>
            <p className="mb-4">
              You may assume that each input would have exactly one solution, and you may not use the same element twice.
            </p>
            <p className="mb-4">
              You can return the answer in any order.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2 text-white">Constraints</h4>
            <ul className="list-disc list-inside text-sm text-gray-400">
              <li>2 ≤ nums.length ≤ 10<sup>4</sup></li>
              <li>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></li>
              <li>-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup></li>
              <li>Only one valid answer exists.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-white">Examples</h4>
            <Card className="bg-gray-800 p-4 border-gray-700">
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
{`Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]
`}
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
      </main>
    </div>
  )
} 