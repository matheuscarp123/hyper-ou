"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", weight: 75 },
  { month: "Fev", weight: 76 },
  { month: "Mar", weight: 77 },
  { month: "Abr", weight: 78 },
  { month: "Mai", weight: 78.5 },
  { month: "Jun", weight: 79 },
]

export function ProgressCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresso de Peso</CardTitle>
        <CardDescription>Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
