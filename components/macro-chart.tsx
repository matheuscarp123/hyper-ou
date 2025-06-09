"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { Macros } from "@/types"

interface MacroChartProps {
  macros: Macros
}

const COLORS = ["#DC2626", "#F59E0B", "#3B82F6"]

export function MacroChart({ macros }: MacroChartProps) {
  const data = [
    { name: "Proteínas", value: macros.protein, color: COLORS[0] },
    { name: "Carboidratos", value: macros.carbs, color: COLORS[1] },
    { name: "Gorduras", value: macros.fat, color: COLORS[2] },
  ]

  const totalCalories = macros.protein * 4 + macros.carbs * 4 + macros.fat * 9

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Macronutrientes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}g`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Total de Calorias</span>
            <span className="font-bold text-lg">{Math.round(totalCalories)}</span>
          </div>

          {data.map((macro, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }} />
                <span className="text-sm">{macro.name}</span>
              </div>
              <span className="font-semibold">{macro.value}g</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
