import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function NutritionCard() {
  const nutrition = {
    calories: { current: 1850, target: 2500 },
    protein: { current: 125, target: 150 },
    carbs: { current: 180, target: 250 },
    fats: { current: 55, target: 70 },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrição Diária</CardTitle>
        <CardDescription>Seu consumo de hoje</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Calorias</span>
            <span className="text-muted-foreground">
              {nutrition.calories.current} / {nutrition.calories.target} kcal
            </span>
          </div>
          <Progress value={(nutrition.calories.current / nutrition.calories.target) * 100} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Proteínas</span>
            <span className="text-muted-foreground">
              {nutrition.protein.current} / {nutrition.protein.target}g
            </span>
          </div>
          <Progress value={(nutrition.protein.current / nutrition.protein.target) * 100} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Carboidratos</span>
            <span className="text-muted-foreground">
              {nutrition.carbs.current} / {nutrition.carbs.target}g
            </span>
          </div>
          <Progress value={(nutrition.carbs.current / nutrition.carbs.target) * 100} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Gorduras</span>
            <span className="text-muted-foreground">
              {nutrition.fats.current} / {nutrition.fats.target}g
            </span>
          </div>
          <Progress value={(nutrition.fats.current / nutrition.fats.target) * 100} />
        </div>
      </CardContent>
    </Card>
  )
}
