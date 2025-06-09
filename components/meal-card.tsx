"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Utensils, Sparkles } from "lucide-react"
import type { Meal } from "@/types"

interface MealCardProps {
  meal: Meal
  index: number
}

const mealColors = [
  {
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/25",
    icon: "🌅",
    accent: "text-amber-400",
  },
  {
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/25",
    icon: "🥗",
    accent: "text-emerald-400",
  },
  {
    gradient: "from-blue-500 to-cyan-600",
    shadow: "shadow-blue-500/25",
    icon: "🍽️",
    accent: "text-blue-400",
  },
  {
    gradient: "from-purple-500 to-indigo-600",
    shadow: "shadow-purple-500/25",
    icon: "⚡",
    accent: "text-purple-400",
  },
  {
    gradient: "from-red-500 to-pink-600",
    shadow: "shadow-red-500/25",
    icon: "💪",
    accent: "text-red-400",
  },
  {
    gradient: "from-slate-500 to-gray-600",
    shadow: "shadow-slate-500/25",
    icon: "🌙",
    accent: "text-slate-400",
  },
  {
    gradient: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/25",
    icon: "🌟",
    accent: "text-indigo-400",
  },
]

export function MealCard({ meal, index }: MealCardProps) {
  const colorScheme = mealColors[index % mealColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <Card
        className={`bg-gradient-to-br ${colorScheme.gradient} border-0 text-white ${colorScheme.shadow} overflow-hidden relative`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>

        {/* Floating Icon */}
        <div className="absolute top-4 right-4 text-2xl opacity-20">{colorScheme.icon}</div>

        <CardHeader className="pb-3 relative z-10">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Utensils size={18} />
              </div>
              <div>
                <span className="font-bold text-lg">{meal.name}</span>
                <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
                  <Clock size={12} />
                  <span>{meal.time}</span>
                </div>
              </div>
            </div>
            <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
              <Sparkles size={16} />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm leading-relaxed opacity-95">{meal.description}</p>
          </div>

          {/* Nutrition Hint */}
          <div className="mt-3 flex items-center space-x-2 text-xs opacity-80">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>
              {meal.name.includes("Café") && "Rico em proteínas para começar o dia"}
              {meal.name.includes("Lanche") && "Energia rápida entre refeições"}
              {meal.name.includes("Almoço") && "Refeição principal do dia"}
              {meal.name.includes("Pré") && "Combustível para o treino"}
              {meal.name.includes("Pós") && "Recuperação muscular"}
              {meal.name.includes("Jantar") && "Nutrição para a noite"}
              {meal.name.includes("Ceia") && "Proteína de digestão lenta"}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
