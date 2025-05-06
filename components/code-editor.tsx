"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
}

export function CodeEditor({ value, onChange, language = "javascript", height = "100%" }: CodeEditorProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // This ensures the component only renders on the client to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div 
        style={{ height }}
        className="bg-[#1e1e1e] text-gray-300 font-mono p-4 w-full"
      >
        Loading editor...
      </div>
    )
  }

  return (
    <div style={{ height }} className="w-full">
      <textarea
        className="h-full w-full bg-[#1e1e1e] text-gray-300 font-mono p-4 resize-none outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        data-language={language}
      />
    </div>
  )
}

// In a real implementation, you'd likely use a library like Monaco Editor, CodeMirror, 
// Prism.js or Ace Editor for a more full-featured code editing experience. 