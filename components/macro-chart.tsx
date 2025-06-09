"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Beef, Wheat, Droplets, Flame } from "lucide-react"
import type { Macros } from "@/types"

interface MacroChartProps {
  macros: Macros
}

const COLORS = ["#3B82F6", "#F59E0B", "#10B981"]

export function MacroChart({ macros }: MacroChartProps) {
  const data = [
    { name: "Proteínas", value: macros.protein, color: COLORS[0], calories: macros.protein * 4 },
    { name: "Carboidratos", value: macros.carbs, color: COLORS[1], calories: macros.carbs * 4 },
    { name: "Gorduras", value: macros.fat, color: COLORS[2], calories: macros.fat * 9 },
  ]

  const totalCalories = data.reduce((sum, item) => sum + item.calories, 0)

  const macroIcons = {
    Proteínas: Beef,
    Carboidratos: Wheat,
    Gorduras: Droplets,
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
            <Flame size={18} className="text-white" />
          </div>
          <span>Macronutrientes</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gráfico */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" outerRadius={70} dataKey="value" stroke="none">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                formatter={(value: number, name: string) => [`${value}g`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Total de Calorias */}
        <div className="text-center p-4 bg-gray-800/30 rounded-xl">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Flame size={16} className="text-red-400" />
            <span className="text-sm text-gray-400">Total de Calorias</span>
          </div>
          <span className="font-bold text-2xl text-white">{Math.round(totalCalories)}</span>
        </div>

        {/* Detalhes dos Macros */}
        <div className="space-y-3">
          {data.map((macro, index) => {
            const Icon = macroIcons[macro.name as keyof typeof macroIcons]
            const percentage = ((macro.calories / totalCalories) * 100).toFixed(0)

            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${macro.color}20`, border: `1px solid ${macro.color}40` }}
                  >
                    <Icon size={14} style={{ color: macro.color }} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">{macro.name}</span>
                    <div className="text-xs text-gray-400">{percentage}% das calorias</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{macro.value}g</div>
                  <div className="text-xs text-gray-400">{macro.calories} kcal</div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
