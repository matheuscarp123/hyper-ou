"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Target, Info, Zap, Eye, ChevronDown } from "lucide-react"
import type { WorkoutDay } from "@/types"

interface WorkoutCardProps {
  day: WorkoutDay
  index: number
}

const dayColors = [
  {
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/25",
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    gradient: "from-blue-500 to-cyan-600",
    shadow: "shadow-blue-500/25",
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/25",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    gradient: "from-orange-500 to-red-600",
    shadow: "shadow-orange-500/25",
    accent: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    gradient: "from-pink-500 to-rose-600",
    shadow: "shadow-pink-500/25",
    accent: "text-pink-400",
    bg: "bg-pink-500/10",
  },
]

export function WorkoutCard({ day, index }: WorkoutCardProps) {
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null)
  const colorScheme = dayColors[index % dayColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card
        className={`bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm ${colorScheme.shadow} overflow-hidden`}
      >
        {/* Header with Gradient */}
        <div className={`bg-gradient-to-r ${colorScheme.gradient} p-1 rounded-t-lg`}>
          <div className="bg-gray-900/95 rounded-t-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${colorScheme.gradient}`}>
                    <Dumbbell className="text-white" size={18} />
                  </div>
                  <div>
                    <span className={`font-black text-lg ${colorScheme.accent}`}>{day.day}</span>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                      <Target size={12} />
                      <span>{day.focus}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full ${colorScheme.bg} border border-gray-700`}>
                  <span className="text-xs font-medium text-gray-300">{day.exercises.length} exercícios</span>
                </div>
              </CardTitle>
            </CardHeader>
          </div>
        </div>

        <CardContent className="space-y-3 p-4">
          {day.exercises.map((exercise, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              className="group"
            >
              <div
                className={`border-l-3 border-gradient-to-b ${colorScheme.gradient} pl-4 py-3 rounded-r-lg bg-gradient-to-r from-gray-800/50 to-transparent hover:from-gray-800/80 transition-all duration-300 cursor-pointer`}
                onClick={() => setExpandedExercise(expandedExercise === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-white group-hover:text-gray-100 transition-colors">
                        {exercise.name}
                      </h4>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`p-1 rounded-full ${colorScheme.bg} opacity-0 group-hover:opacity-100 transition-opacity`}
                      >
                        <Info size={12} className={colorScheme.accent} />
                      </motion.div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Zap size={12} className={colorScheme.accent} />
                        <span className="text-gray-400">{exercise.sets} séries</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target size={12} className={colorScheme.accent} />
                        <span className="text-gray-400">{exercise.reps} reps</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedExercise === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-1 rounded-full ${colorScheme.bg}`}
                  >
                    <ChevronDown size={16} className={colorScheme.accent} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedExercise === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="mt-3 pt-3 border-t border-gray-700/50"
                    >
                      {/* Importância */}
                      <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`p-1 rounded ${colorScheme.bg}`}>
                            <Target size={12} className={colorScheme.accent} />
                          </div>
                          <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Por que fazer?
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed pl-6">{exercise.importance}</p>
                      </div>

                      {/* Técnica */}
                      {exercise.technique && (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`p-1 rounded ${colorScheme.bg}`}>
                              <Eye size={12} className={colorScheme.accent} />
                            </div>
                            <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Técnica</span>
                          </div>
                          <p className="text-sm text-gray-400 leading-relaxed pl-6">{exercise.technique}</p>
                        </div>
                      )}

                      {/* Dica Visual */}
                      <div className={`mt-3 p-3 rounded-lg ${colorScheme.bg} border border-gray-700/30`}>
                        <div className="flex items-center space-x-2">
                          <Zap size={14} className={colorScheme.accent} />
                          <span className="text-xs font-medium text-gray-300">Dica Pro</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {exercise.name.includes("Supino") && "Mantenha os pés firmes no chão e controle a descida"}
                          {exercise.name.includes("Agachamento") && "Desça até as coxas ficarem paralelas ao solo"}
                          {exercise.name.includes("Rosca") && "Evite balançar o corpo, foque na contração"}
                          {exercise.name.includes("Remada") && "Puxe com as costas, não com os braços"}
                          {exercise.name.includes("Desenvolvimento") && "Não arqueie as costas excessivamente"}
                          {!exercise.name.includes("Supino") &&
                            !exercise.name.includes("Agachamento") &&
                            !exercise.name.includes("Rosca") &&
                            !exercise.name.includes("Remada") &&
                            !exercise.name.includes("Desenvolvimento") &&
                            "Mantenha a forma correta em todas as repetições"}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
