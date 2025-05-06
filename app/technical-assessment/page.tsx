"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { CodeEditor } from "@/components/code-editor"

export default function TechnicalAssessmentPage() {
  const [code, setCode] = useState(`class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function maxDepth(root) {
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
            <h1 className="text-xl font-semibold text-white">Technical Assessment</h1>
          </div>
          <div className="text-sm text-gray-400">Question 1/10</div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel - Question */}
        <div className="w-full md:w-[30%] bg-gray-900 border-r border-gray-800 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2 text-gray-300">Algorithm Challenge</h2>
          <h3 className="text-xl font-bold mb-4 text-white">Maximum Depth of Binary Tree</h3>

          <div className="max-w-none mb-6 text-gray-300">
            <p className="mb-4">
              Given the root of a binary tree, return its maximum depth.
            </p>
            <p className="mb-4">
              A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2 text-white">Constraints</h4>
            <ul className="list-disc list-inside text-sm text-gray-400">
              <li>The number of nodes in the tree is in the range [0, 10^4].</li>
              <li>-100 ≤ Node.val ≤ 100</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-white">Example</h4>
            <Card className="bg-gray-800 p-4 border-gray-700">
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
{`Input: root = [3,9,20,null,null,15,7]
Output: 3
Explanation:
    3
   / \\
  9  20
    /  \\
   15   7

Input: root = [1,null,2]
Output: 2
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