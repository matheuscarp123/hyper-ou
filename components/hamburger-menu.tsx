"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Dumbbell, Utensils, Pill, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HamburgerMenuProps {
  currentTab: string
  onTabChange: (tab: string) => void
  onNewPlan: () => void
}

export function HamburgerMenu({ currentTab, onTabChange, onNewPlan }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "workout", label: "Treino", icon: Dumbbell },
    { id: "diet", label: "Dieta", icon: Utensils },
    { id: "supplements", label: "Suplementos", icon: Pill },
  ]

  const handleItemClick = (id: string) => {
    onTabChange(id)
    setIsOpen(false)
  }

  return (
    <>
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 w-10 h-10 rounded-xl bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 backdrop-blur-sm"
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.div>
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 z-40 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold">
                <span className="text-white">HYPER</span>
                <span className="text-red-500">GYM</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">Navegação</p>
            </div>

            {/* Menu Items */}
            <div className="flex-1 p-6">
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                      currentTab === item.id
                        ? "bg-red-500/20 border border-red-500/30 text-red-400"
                        : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800">
              <Button
                onClick={() => {
                  onNewPlan()
                  setIsOpen(false)
                }}
                variant="outline"
                className="w-full border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
              >
                <RotateCcw className="mr-2" size={16} />
                Novo Plano
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
