"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import type { Meal } from "@/types"

interface MealCardProps {
  meal: Meal
  index: number
}

const mealColors = [
  "from-yellow-600 to-orange-600", // Café da manhã
  "from-green-600 to-teal-600", // Lanche manhã
  "from-blue-600 to-cyan-600", // Almoço
  "from-purple-600 to-indigo-600", // Pré-treino
  "from-red-600 to-pink-600", // Pós-treino
  "from-gray-600 to-gray-700", // Jantar
  "from-indigo-600 to-purple-600", // Ceia
]

export function MealCard({ meal, index }: MealCardProps) {
  const colorClass = mealColors[index % mealColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={`bg-gradient-to-r ${colorClass} border-0 text-white`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="font-bold">{meal.name}</span>
            <div className="flex items-center gap-1 text-sm bg-black bg-opacity-20 px-2 py-1 rounded-full">
              <Clock size={12} />
              {meal.time}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-90 leading-relaxed">{meal.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
