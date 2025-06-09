"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft } from "lucide-react"
import type { UserProfile } from "@/types"

const steps = [
  {
    id: "gender",
    title: "Qual é o seu gênero?",
    subtitle: "Para personalizar seu plano",
  },
  {
    id: "name",
    title: "Como podemos te chamar?",
    subtitle: "Seu nome no dashboard",
  },
  {
    id: "weight",
    title: "Qual é o seu peso?",
    subtitle: "Para calcular suas necessidades",
  },
  {
    id: "height",
    title: "Qual é a sua altura?",
    subtitle: "Para determinar seu biotipo",
  },
  {
    id: "frequency",
    title: "Quantos dias você treina?",
    subtitle: "Para otimizar seu plano",
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    gender: undefined,
    name: "",
    weight: undefined,
    height: undefined,
    trainingDays: 3,
  })

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem("userProfile", JSON.stringify(formData))
      router.push("/physique")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isCurrentStepValid = () => {
    switch (steps[currentStep].id) {
      case "gender":
        return formData.gender !== undefined
      case "name":
        return formData.name && formData.name.length > 0
      case "weight":
        return formData.weight && formData.weight > 0
      case "height":
        return formData.height && formData.height > 0
      case "frequency":
        return formData.trainingDays && formData.trainingDays > 0
      default:
        return false
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-black">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-8">
        <div className="w-full max-w-sm mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Logo className="mx-auto mb-4" size="md" />
            <h1 className="text-xl font-bold">
              <span className="text-white">HYPER</span>
              <span className="text-red-500">GYM</span>
            </h1>
          </motion.div>

          {/* Progress */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-12">
            <div className="flex justify-between text-xs text-gray-500 mb-3">
              <span>
                Etapa {currentStep + 1} de {steps.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-light text-white mb-2">{currentStepData.title}</h2>
              <p className="text-gray-400 text-sm mb-8">{currentStepData.subtitle}</p>

              {/* Gender Selection */}
              {steps[currentStep].id === "gender" && (
                <div className="space-y-3">
                  {[
                    { value: "male", label: "Masculino", emoji: "👨" },
                    { value: "female", label: "Feminino", emoji: "👩" },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, gender: option.value as "male" | "female" })}
                      className={`w-full p-5 rounded-2xl border transition-all duration-300 ${
                        formData.gender === option.value
                          ? "border-red-500 bg-red-500/10"
                          : "border-gray-800 hover:border-gray-700 bg-gray-900/30"
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="text-lg font-medium text-white">{option.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Name Input */}
              {steps[currentStep].id === "name" && (
                <div>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite seu nome"
                    className="text-center"
                    autoFocus
                  />
                </div>
              )}

              {/* Weight Input */}
              {steps[currentStep].id === "weight" && (
                <div className="relative">
                  <Input
                    type="number"
                    value={formData.weight || ""}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    placeholder="70"
                    className="text-center pr-12"
                    autoFocus
                    min="30"
                    max="200"
                  />
                  <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-medium">
                    kg
                  </span>
                </div>
              )}

              {/* Height Input */}
              {steps[currentStep].id === "height" && (
                <div className="relative">
                  <Input
                    type="number"
                    value={formData.height || ""}
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                    placeholder="175"
                    className="text-center pr-12"
                    autoFocus
                    min="140"
                    max="220"
                  />
                  <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-medium">
                    cm
                  </span>
                </div>
              )}

              {/* Training Frequency */}
              {steps[currentStep].id === "frequency" && (
                <div className="space-y-3">
                  {[
                    { days: 2, label: "2 dias - Iniciante" },
                    { days: 3, label: "3 dias - Básico" },
                    { days: 4, label: "4 dias - Intermediário" },
                    { days: 5, label: "5 dias - Avançado" },
                    { days: 6, label: "6 dias - Profissional" },
                  ].map(({ days, label }) => (
                    <motion.button
                      key={days}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, trainingDays: days })}
                      className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        formData.trainingDays === days
                          ? "border-red-500 bg-red-500/10"
                          : "border-gray-800 hover:border-gray-700 bg-gray-900/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{label}</span>
                        <div
                          className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                            formData.trainingDays === days ? "border-red-500 bg-red-500" : "border-gray-600"
                          }`}
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation - Fixed at bottom */}
      <div className="relative z-10 px-6 pb-8">
        <div className="w-full max-w-sm mx-auto flex justify-between items-center">
          {currentStep > 0 ? (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl px-4 py-2"
            >
              <ArrowLeft className="mr-2" size={16} />
              Voltar
            </Button>
          ) : (
            <div></div>
          )}

          <Button
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl font-medium transition-all duration-300"
          >
            {currentStep === steps.length - 1 ? "Finalizar" : "Continuar"}
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </main>
  )
}
