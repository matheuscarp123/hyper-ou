"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FrequencySelectorProps {
  value: number
  onChange: (value: number) => void
}

export function FrequencySelector({ value, onChange }: FrequencySelectorProps) {
  const options = [
    { value: 2, label: "2 dias", description: "Iniciante" },
    { value: 3, label: "3 dias", description: "Básico" },
    { value: 4, label: "4 dias", description: "Intermediário" },
    { value: 5, label: "5 dias", description: "Avançado" },
    { value: 6, label: "6 dias", description: "Profissional" },
  ]

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <motion.div
          key={option.value}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all",
            "border-2",
            value === option.value ? "border-red-600 bg-red-600/10" : "border-gray-800 hover:border-gray-700",
          )}
        >
          <div>
            <h3 className="font-bold">{option.label}</h3>
            <p className="text-sm text-gray-400">{option.description}</p>
          </div>
          <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center">
            {value === option.value && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 rounded-full bg-red-600" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
