import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PersonalityTraitsProps {
  currentQuestion: number
}

export function PersonalityTraits({ currentQuestion }: PersonalityTraitsProps) {
  // Simulate traits that update as the interview progresses
  const traits = [
    { name: "Empathy", value: Math.min(85, currentQuestion * 20) },
    { name: "Analytical Thinking", value: Math.min(78, currentQuestion * 18) },
    { name: "Communication", value: Math.min(92, currentQuestion * 22) },
    { name: "Adaptability", value: Math.min(70, currentQuestion * 16) },
    { name: "Leadership", value: Math.min(65, currentQuestion * 15) },
  ]

  return (
    <Card className="bg-white border border-gray-200">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">Personality Traits</h3>
        <div className="space-y-4">
          {traits.map((trait) => (
            <div key={trait.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{trait.name}</span>
                <span className="font-medium">{trait.value}%</span>
              </div>
              <Progress value={trait.value} className="h-2" />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">*Traits are analyzed in real-time based on your responses</p>
      </CardContent>
    </Card>
  )
}
