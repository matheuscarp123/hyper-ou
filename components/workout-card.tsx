import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Flame } from "lucide-react"

export function WorkoutCard() {
  const workouts = [
    {
      id: 1,
      name: "Treino de Peito e Tríceps",
      duration: "45 min",
      calories: "320 kcal",
      difficulty: "Intermediário",
      completed: false,
    },
    {
      id: 2,
      name: "Treino de Costas e Bíceps",
      duration: "50 min",
      calories: "350 kcal",
      difficulty: "Avançado",
      completed: true,
    },
    {
      id: 3,
      name: "Treino de Pernas",
      duration: "60 min",
      calories: "420 kcal",
      difficulty: "Intermediário",
      completed: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seus Treinos</CardTitle>
        <CardDescription>Treinos programados para esta semana</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h3 className="font-semibold">{workout.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {workout.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="h-4 w-4" />
                  {workout.calories}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={workout.completed ? "default" : "secondary"}>{workout.difficulty}</Badge>
              <Button size="sm" variant={workout.completed ? "outline" : "default"}>
                {workout.completed ? "Refazer" : "Iniciar"}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
