"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Target } from "lucide-react"
import type { WorkoutDay } from "@/types"

interface WorkoutCardProps {
  day: WorkoutDay
  index: number
}

export function WorkoutCard({ day, index }: WorkoutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-red-600 transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-red-600 font-black">{day.day}</span>
            <Dumbbell className="text-red-600" size={20} />
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Target size={14} />
            <span>{day.focus}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {day.exercises.map((exercise, i) => (
            <div key={i} className="border-l-2 border-red-600 pl-3 py-1">
              <h4 className="font-semibold text-sm">{exercise.name}</h4>
              <p className="text-xs text-gray-400">
                {exercise.sets} séries × {exercise.reps} reps
              </p>
              <p className="text-xs text-gray-300 mt-1">{exercise.importance}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
