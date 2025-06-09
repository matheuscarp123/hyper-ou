"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Utensils, Target, Calendar, RotateCcw } from "lucide-react"
import type { FitnessProfile } from "@/types"
import { MacroChart } from "@/components/macro-chart"
import { WorkoutCard } from "@/components/workout-card"
import { MealCard } from "@/components/meal-card"

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<FitnessProfile | null>(null)

  useEffect(() => {
    const storedProfile = localStorage.getItem("fitnessProfile")
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    } else {
      router.push("/onboarding")
    }
  }, [router])

  const handleNewPlan = () => {
    localStorage.clear()
    router.push("/")
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Logo size="lg" />
          <p className="mt-4 text-gray-400">Carregando seu plano...</p>
        </div>
      </div>
    )
  }

  const totalCalories = profile.diet.macros.protein * 4 + profile.diet.macros.carbs * 4 + profile.diet.macros.fat * 9

  return (
    <main className="min-h-screen p-4 relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0 bg-black bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <Logo className="mr-3" />
            <h1 className="text-2xl font-bold">
              <span className="text-white">HYPER</span>
              <span className="text-red-600">GYM</span>
            </h1>
          </div>
          <Button variant="outline" onClick={handleNewPlan}>
            <RotateCcw className="mr-2" size={16} />
            Novo Plano
          </Button>
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-black mb-2">Olá, {profile.user.name}!</h2>
          <p className="text-gray-400 text-lg">
            Seu plano de hipertrofia inspirado em{" "}
            <span className="text-red-500 font-bold">{profile.user.physique}</span> está pronto.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-br from-red-600 to-red-700 border-0">
            <CardContent className="p-4 text-center">
              <Calendar className="mx-auto mb-2" size={24} />
              <p className="text-sm opacity-90">Dias de Treino</p>
              <p className="text-2xl font-bold">{profile.workout.routine.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0">
            <CardContent className="p-4 text-center">
              <Target className="mx-auto mb-2" size={24} />
              <p className="text-sm opacity-90">Exercícios</p>
              <p className="text-2xl font-bold">
                {profile.workout.routine.reduce((total, day) => total + day.exercises.length, 0)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 border-0">
            <CardContent className="p-4 text-center">
              <Utensils className="mx-auto mb-2" size={24} />
              <p className="text-sm opacity-90">Refeições</p>
              <p className="text-2xl font-bold">{profile.diet.meals.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-0">
            <CardContent className="p-4 text-center">
              <Dumbbell className="mx-auto mb-2" size={24} />
              <p className="text-sm opacity-90">Calorias/dia</p>
              <p className="text-2xl font-bold">{Math.round(totalCalories)}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Tabs defaultValue="workout" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="workout" className="flex items-center gap-2">
                <Dumbbell size={16} />
                Treino
              </TabsTrigger>
              <TabsTrigger value="diet" className="flex items-center gap-2">
                <Utensils size={16} />
                Dieta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workout" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.workout.routine.map((day, index) => (
                  <WorkoutCard key={index} day={day} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="diet" className="mt-0">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <MacroChart macros={profile.diet.macros} />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  {profile.diet.meals.map((meal, index) => (
                    <MealCard key={index} meal={meal} index={index} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-gray-600">Créditos: Matheus Carvalho</div>
    </main>
  )
}
