import { Navbar } from "@/components/navbar"
import { WorkoutCard } from "@/components/workout-card"
import { NutritionCard } from "@/components/nutrition-card"
import { ProgressCard } from "@/components/progress-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Dumbbell, Target, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bem-vindo ao HyperGym</h1>
          <p className="text-xl text-muted-foreground">
            Transforme seu corpo com treinos personalizados e acompanhamento completo
          </p>
        </section>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Treinos Concluídos</CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calorias Queimadas</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,540</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meta Semanal</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5/7</div>
              <p className="text-xs text-muted-foreground">Dias de treino</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+3.2kg</div>
              <p className="text-xs text-muted-foreground">Ganho de massa muscular</p>
            </CardContent>
          </Card>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WorkoutCard />
            <NutritionCard />
          </div>

          <div>
            <ProgressCard />
          </div>
        </div>
      </main>
    </div>
  )
}
