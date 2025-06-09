"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Target, ChevronDown, Info, Zap, Eye, Activity, RotateCcw } from "lucide-react"
import type { WorkoutDay } from "@/types"

interface WorkoutCardProps {
  day: WorkoutDay
  index: number
}

export function WorkoutCard({ day, index }: WorkoutCardProps) {
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                <Dumbbell className="text-white" size={18} />
              </div>
              <div>
                <span className="font-bold text-lg text-white">{day.day}</span>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <Target size={12} />
                  <span>{day.focus}</span>
                </div>
              </div>
            </div>
            <div className="px-3 py-1 bg-gray-800 rounded-full">
              <span className="text-xs text-gray-300">{day.exercises.length} exercícios</span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {day.exercises.map((exercise, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
            >
              <div
                className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-700"
                onClick={() => setExpandedExercise(expandedExercise === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-2">{exercise.name}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-blue-400">
                        <RotateCcw size={12} />
                        <span>{exercise.sets} séries</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-400">
                        <Activity size={12} />
                        <span>{exercise.reps} reps</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedExercise === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                  >
                    <ChevronDown size={16} className="text-gray-400" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedExercise === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-700"
                    >
                      <div className="space-y-4">
                        {/* Importância */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="p-1 bg-blue-500/20 rounded">
                              <Info size={12} className="text-blue-400" />
                            </div>
                            <h5 className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                              Por que fazer?
                            </h5>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">{exercise.importance}</p>
                        </div>

                        {/* Técnica */}
                        {exercise.technique && (
                          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="p-1 bg-purple-500/20 rounded">
                                <Eye size={12} className="text-purple-400" />
                              </div>
                              <h5 className="text-xs font-medium text-purple-400 uppercase tracking-wider">
                                Como executar
                              </h5>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{exercise.technique}</p>
                          </div>
                        )}

                        {/* Dica extra baseada no exercício */}
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="p-1 bg-amber-500/20 rounded">
                              <Zap size={12} className="text-amber-400" />
                            </div>
                            <h5 className="text-xs font-medium text-amber-400 uppercase tracking-wider">Dica Pro</h5>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {exercise.name.toLowerCase().includes("supino") &&
                              "Mantenha os pés firmes no chão e contraia o core durante todo o movimento."}
                            {exercise.name.toLowerCase().includes("agachamento") &&
                              "Inicie o movimento empurrando o quadril para trás, como se fosse sentar em uma cadeira."}
                            {exercise.name.toLowerCase().includes("rosca") &&
                              "Evite balançar o corpo. Use apenas a força dos bíceps para levantar o peso."}
                            {exercise.name.toLowerCase().includes("remada") &&
                              "Puxe com os cotovelos, não com as mãos. Imagine que está apertando uma bola entre as omoplatas."}
                            {exercise.name.toLowerCase().includes("desenvolvimento") &&
                              "Mantenha o core contraído e evite arquear excessivamente as costas."}
                            {!exercise.name.toLowerCase().includes("supino") &&
                              !exercise.name.toLowerCase().includes("agachamento") &&
                              !exercise.name.toLowerCase().includes("rosca") &&
                              !exercise.name.toLowerCase().includes("remada") &&
                              !exercise.name.toLowerCase().includes("desenvolvimento") &&
                              "Foque na conexão mente-músculo. Sinta o músculo trabalhando a cada repetição."}
                          </p>
                        </div>
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
