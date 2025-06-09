"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill, ChevronDown, Clock, Zap, Target, AlertTriangle, TrendingUp } from "lucide-react"

interface Supplement {
  name: string
  priority: number
  category: "essential" | "important" | "optional" | "bonus"
  timing: string
  dosage: string
  benefits: string[]
  description: string
  tips?: string
  warning?: string
}

interface SupplementCardProps {
  supplement: Supplement
  index: number
}

const priorityColors = {
  essential: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", icon: "text-red-500" },
  important: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", icon: "text-blue-500" },
  optional: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", icon: "text-green-500" },
  bonus: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", icon: "text-purple-500" },
}

const categoryLabels = {
  essential: "Essencial",
  important: "Importante",
  optional: "Opcional",
  bonus: "Bônus",
}

export function SupplementCard({ supplement, index }: SupplementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const colors = priorityColors[supplement.category]

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
              <div className={`p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg relative`}>
                <Pill size={18} className="text-white" />
                <div
                  className={`absolute -top-1 -right-1 w-5 h-5 ${colors.bg} ${colors.border} border rounded-full flex items-center justify-center`}
                >
                  <span className={`text-xs font-bold ${colors.text}`}>{supplement.priority}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-white">{supplement.name}</span>
                  <div className={`px-2 py-1 ${colors.bg} ${colors.border} border rounded-full`}>
                    <span className={`text-xs font-medium ${colors.text}`}>{categoryLabels[supplement.category]}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{supplement.timing}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target size={12} />
                    <span>{supplement.dosage}</span>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer p-1"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDown size={16} className="text-gray-400" />
            </motion.div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Descrição básica */}
          <div className="bg-gray-800/30 rounded-lg p-3">
            <p className="text-sm text-gray-300 leading-relaxed">{supplement.description}</p>
          </div>

          {/* Benefícios principais */}
          <div className="flex flex-wrap gap-2">
            {supplement.benefits.slice(0, 3).map((benefit, i) => (
              <div key={i} className="px-2 py-1 bg-gray-800/50 rounded-lg">
                <span className="text-xs text-gray-400">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Conteúdo expandido */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 pt-2 border-t border-gray-700"
              >
                {/* Todos os benefícios */}
                {supplement.benefits.length > 3 && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="p-1 bg-blue-500/20 rounded">
                        <TrendingUp size={12} className="text-blue-400" />
                      </div>
                      <h5 className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                        Benefícios Completos
                      </h5>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {supplement.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dicas especiais */}
                {supplement.tips && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="p-1 bg-amber-500/20 rounded">
                        <Zap size={12} className="text-amber-400" />
                      </div>
                      <h5 className="text-xs font-medium text-amber-400 uppercase tracking-wider">Dica Profissional</h5>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{supplement.tips}</p>
                  </div>
                )}

                {/* Avisos */}
                {supplement.warning && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="p-1 bg-orange-500/20 rounded">
                        <AlertTriangle size={12} className="text-orange-400" />
                      </div>
                      <h5 className="text-xs font-medium text-orange-400 uppercase tracking-wider">Atenção</h5>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{supplement.warning}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
