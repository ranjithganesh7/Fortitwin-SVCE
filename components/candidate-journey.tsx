"use client"

import { UserCircle, Calendar, MessageSquare, Video, FileText, CheckCircle, ChevronRight } from "lucide-react"

interface CandidateJourneyProps {
  activeStep: number
  setActiveStep: (step: number) => void
}

export function CandidateJourney({ activeStep, setActiveStep }: CandidateJourneyProps) {
  const steps = [
    {
      id: 1,
      name: "Candidate Setup",
      icon: UserCircle,
      description: "Complete your profile",
    },
    {
      id: 2,
      name: "Scheduling",
      icon: Calendar,
      description: "Choose your time slot",
    },
    {
      id: 3,
      name: "Text Interview",
      icon: MessageSquare,
      description: "Written responses",
    },
    {
      id: 4,
      name: "Video Component",
      icon: Video,
      description: "Face-to-face interaction",
    },
    {
      id: 5,
      name: "Skills Assessment",
      icon: FileText,
      description: "Technical evaluation",
    },
    {
      id: 6,
      name: "Results & Feedback",
      icon: CheckCircle,
      description: "Review your performance",
    },
  ]

  return (
    <div className="space-y-1">
      {steps.map((step) => {
        const isActive = step.id === activeStep
        const isCompleted = step.id < activeStep

        return (
          <button
            key={step.id}
            className={`w-full flex items-center p-2 rounded-md text-left transition-colors ${
              isActive
                ? "bg-black text-white"
                : isCompleted
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => setActiveStep(step.id)}
          >
            <div className={`mr-3 ${isActive ? "text-white" : isCompleted ? "text-black" : "text-gray-400"}`}>
              <step.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{step.name}</div>
              <div className={`text-xs ${isActive ? "text-gray-200" : "text-gray-500"}`}>{step.description}</div>
            </div>
            {isCompleted && (
              <div className="text-green-500">
                <CheckCircle className="h-4 w-4" />
              </div>
            )}
            {isActive && (
              <div className="text-white">
                <ChevronRight className="h-4 w-4" />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
