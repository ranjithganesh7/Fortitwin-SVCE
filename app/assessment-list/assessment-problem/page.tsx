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

export default function ProblemSolvingPage() {
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>("medium")
  
  // Questions for different difficulty levels
  const questions: Questions = {
    easy: {
      title: "Valid Anagram",
      description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
      code: `function isAnagram(s, t) {
  // Your implementation here
}`,
      constraints: [
        "1 ≤ s.length, t.length ≤ 5 * 10^4",
        "s and t consist of lowercase English letters."
      ],
      example: `Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false`
    },
    medium: {
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      code: `function twoSum(nums, target) {
  // Your implementation here
}`,
      constraints: [
        "2 ≤ nums.length ≤ 10^4",
        "-10^9 ≤ nums[i] ≤ 10^9",
        "-10^9 ≤ target ≤ 10^9",
        "Only one valid answer exists."
      ],
      example: `Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Input: nums = [3,2,4], target = 6
Output: [1,2]

Input: nums = [3,3], target = 6
Output: [0,1]`
    },
    hard: {
      title: "Longest Substring Without Repeating Characters",
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      code: `function lengthOfLongestSubstring(s) {
  // Your implementation here
}`,
      constraints: [
        "0 ≤ s.length ≤ 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces."
      ],
      example: `Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.`
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
            <h1 className="text-xl font-semibold text-white">Problem Solving</h1>
          </div>
          <div className="text-sm text-gray-400">Question 1/6</div>
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