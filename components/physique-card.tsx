"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface PhysiqueProps {
  id: string
  name: string
  description: string
  svgPath: string
  category?: string
}

interface PhysiqueCardProps {
  physique: PhysiqueProps
  isSelected: boolean
  onSelect: (id: string) => void
  index: number
}

export function PhysiqueCard({ physique, isSelected, onSelect, index }: PhysiqueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      onClick={() => onSelect(physique.id)}
      className={cn(
        "relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300",
        "border-2",
        isSelected ? "border-red-600 scale-105 shadow-lg shadow-red-600/20" : "border-gray-800 hover:border-gray-700",
      )}
    >
      <div className="bg-gradient-to-b from-gray-900 to-black p-6">
        {/* Silhueta SVG */}
        <div className="flex justify-center mb-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.1 + 0.3,
              duration: 0.8,
              type: "spring",
            }}
            className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent rounded-full blur-2xl"
            style={{
              opacity: isSelected ? 0.4 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
          <svg viewBox="0 0 100 200" className="h-40 w-auto relative z-10">
            <motion.path
              d={physique.svgPath}
              fill="currentColor"
              className={cn("transition-colors duration-300", isSelected ? "text-red-600" : "text-white")}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                transition: {
                  pathLength: { delay: index * 0.05, duration: 1.5, ease: "easeInOut" },
                  opacity: { delay: index * 0.05, duration: 0.3 },
                },
              }}
            />
          </svg>
        </div>

        {/* Nome e descrição */}
        <div className="text-center">
          <motion.h3
            className="font-bold text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
          >
            {physique.name}
          </motion.h3>
          <motion.p
            className="text-gray-400 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
          >
            {physique.description}
          </motion.p>
        </div>

        {/* Indicador de seleção */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute top-3 right-3 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
            >
              ✓
            </motion.div>
          )}
        </AnimatePresence>

        {/* Efeito de hover/seleção */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 transition-opacity duration-300",
            isSelected ? "opacity-100" : "group-hover:opacity-50",
          )}
        />
      </div>
    </motion.div>
  )
}
