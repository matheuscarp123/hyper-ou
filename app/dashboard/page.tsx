"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Target, Utensils, Dumbbell } from "lucide-react"
import type { FitnessProfile } from "@/types"
import { MacroChart } from "@/components/macro-chart"
import { WorkoutCard } from "@/components/workout-card"
import { MealCard } from "@/components/meal-card"
import { HamburgerMenu } from "@/components/hamburger-menu"

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<FitnessProfile | null>(null)
  const [currentTab, setCurrentTab] = useState("workout")

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

  const handleTabChange = (tab: string) => {
    if (tab === "supplements") {
      router.push("/supplements")
    } else {
      setCurrentTab(tab)
    }
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <Logo size="lg" />
          <p className="mt-4 text-gray-400">Carregando seu plano...</p>
        </div>
      </div>
    )
  }

  const totalCalories = profile.diet.macros.protein * 4 + profile.diet.macros.carbs * 4 + profile.diet.macros.fat * 9

  return (
    <main className="min-h-screen bg-black relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-900">
          <div className="flex items-center">
            <Logo className="mr-3" size="sm" />
            <h1 className="text-xl font-bold">
              <span className="text-white">HYPER</span>
              <span className="text-red-600">GYM</span>
            </h1>
          </div>
          <HamburgerMenu currentTab={currentTab} onTabChange={handleTabChange} onNewPlan={handleNewPlan} />
        </div>

        {/* Welcome Section */}
        <div className="p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Olá, {profile.user.name}!</h2>
            <p className="text-gray-400">
              Seu plano inspirado em <span className="text-red-500 font-bold">{profile.user.physique}</span>
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4 text-center">
                <Calendar className="mx-auto mb-2 text-red-400" size={24} />
                <p className="text-sm text-gray-400">Dias de Treino</p>
                <p className="text-2xl font-bold text-white">{profile.workout.routine.length}</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4 text-center">
                <Target className="mx-auto mb-2 text-blue-400" size={24} />
                <p className="text-sm text-gray-400">Exercícios</p>
                <p className="text-2xl font-bold text-white">
                  {profile.workout.routine.reduce((total, day) => total + day.exercises.length, 0)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4 text-center">
                <Utensils className="mx-auto mb-2 text-green-400" size={24} />
                <p className="text-sm text-gray-400">Refeições</p>
                <p className="text-2xl font-bold text-white">{profile.diet.meals.length}</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4 text-center">
                <Dumbbell className="mx-auto mb-2 text-purple-400" size={24} />
                <p className="text-sm text-gray-400">Calorias/dia</p>
                <p className="text-2xl font-bold text-white">{Math.round(totalCalories)}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content based on current tab */}
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentTab === "workout" && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Dumbbell className="mr-3 text-red-500" size={24} />
                  Seu Treino
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.workout.routine.map((day, index) => (
                    <WorkoutCard key={index} day={day} index={index} />
                  ))}
                </div>
              </div>
            )}

            {currentTab === "diet" && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Utensils className="mr-3 text-red-500" size={24} />
                  Sua Dieta
                </h3>
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
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-gray-600">Créditos: Matheus Carvalho</div>
    </main>
  )
}
