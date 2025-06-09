"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Utensils, Beef, Wheat, Droplets } from "lucide-react"
import type { Meal } from "@/types"

interface MealCardProps {
  meal: Meal
  index: number
}

export function MealCard({ meal, index }: MealCardProps) {
  // Função para extrair informações nutricionais da descrição
  const extractNutrients = (description: string) => {
    const proteins = description.match(/(\d+g?\s*de\s*(frango|salmão|whey|claras?|ovos?|queijo|carne))/gi) || []
    const carbs = description.match(/(\d+g?\s*de\s*(aveia|arroz|banana|batata|pão|macarrão))/gi) || []
    const fats = description.match(/(\d+g?\s*de\s*(amendoim|castanha|azeite|abacate))/gi) || []

    return { proteins, carbs, fats }
  }

  const nutrients = extractNutrients(meal.description)

  // Função para destacar ingredientes na descrição
  const highlightIngredients = (text: string) => {
    return text
      .replace(/(whey protein|frango|salmão|queijo cottage)/gi, '<span class="text-blue-400 font-medium">$1</span>')
      .replace(/(aveia|arroz|banana|batata doce|dextrose)/gi, '<span class="text-yellow-400 font-medium">$1</span>')
      .replace(/(amendoim|castanhas|azeite|abacate)/gi, '<span class="text-green-400 font-medium">$1</span>')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                <Utensils size={18} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-white">{meal.name}</span>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <Clock size={12} />
                  <span>{meal.time}</span>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Descrição principal */}
          <div className="bg-gray-800/30 rounded-xl p-4">
            <p
              className="text-sm text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightIngredients(meal.description) }}
            />
          </div>

          {/* Indicadores nutricionais */}
          {(nutrients.proteins.length > 0 || nutrients.carbs.length > 0 || nutrients.fats.length > 0) && (
            <div className="grid grid-cols-3 gap-2">
              {nutrients.proteins.length > 0 && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2 text-center">
                  <Beef size={14} className="text-blue-400 mx-auto mb-1" />
                  <span className="text-xs text-blue-400 font-medium">Proteína</span>
                </div>
              )}
              {nutrients.carbs.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2 text-center">
                  <Wheat size={14} className="text-yellow-400 mx-auto mb-1" />
                  <span className="text-xs text-yellow-400 font-medium">Carboidrato</span>
                </div>
              )}
              {nutrients.fats.length > 0 && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 text-center">
                  <Droplets size={14} className="text-green-400 mx-auto mb-1" />
                  <span className="text-xs text-green-400 font-medium">Gordura</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
