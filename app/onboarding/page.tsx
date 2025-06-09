"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, User, Weight, Ruler, Calendar, Users, Sparkles } from "lucide-react"
import type { UserProfile } from "@/types"

const steps = [
  { id: "gender", title: "Qual é o seu gênero?", subtitle: "Vamos personalizar sua jornada", icon: Users },
  { id: "name", title: "Como podemos te chamar?", subtitle: "Seu nome aparecerá no seu plano", icon: User },
  {
    id: "weight",
    title: "Qual é o seu peso atual?",
    subtitle: "Usaremos para calcular suas necessidades",
    icon: Weight,
  },
  { id: "height", title: "Qual é a sua altura?", subtitle: "Para determinar seu biotipo ideal", icon: Ruler },
  { id: "frequency", title: "Quantos dias você pode treinar?", subtitle: "Vamos otimizar seu plano", icon: Calendar },
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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ultra Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(220,38,38,0.15)_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(220,38,38,0.1)_0%,_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 bg-red-500 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-1 h-1 bg-white rounded-full opacity-40"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center mb-16"
        >
          <Logo className="mr-3" />
          <h1 className="text-2xl font-bold">
            <span className="text-white">HYPER</span>
            <span className="text-red-500">GYM</span>
          </h1>
        </motion.div>

        {/* Ultra Modern Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex justify-center items-center mb-6">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index <= currentStep ? "bg-gradient-to-r from-red-500 to-red-400" : "bg-gray-800"
                  }`}
                  style={{ width: index <= currentStep ? "24px" : "8px" }}
                  initial={{ width: "8px" }}
                  animate={{ width: index <= currentStep ? "24px" : "8px" }}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">
              Etapa {currentStep + 1} de {steps.length}
            </span>
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center mb-16"
          >
            {/* Icon with Glow Effect */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="relative inline-flex items-center justify-center w-20 h-20 mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 rounded-full opacity-20 blur-xl"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-red-400 rounded-full p-5">
                <currentStepData.icon size={28} className="text-white" />
              </div>
            </motion.div>

            {/* Title and Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {currentStepData.title}
              </h2>
              <p className="text-gray-400 text-sm mb-10">{currentStepData.subtitle}</p>
            </motion.div>

            {/* Step-specific content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {steps[currentStep].id === "gender" && (
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, gender: "male" })}
                    className={`group w-full p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${
                      formData.gender === "male"
                        ? "border-red-500 bg-gradient-to-r from-red-500/10 to-red-400/5 shadow-lg shadow-red-500/20"
                        : "border-gray-800 hover:border-gray-700 bg-gray-900/30"
                    }`}
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">👨</div>
                    <div className="font-semibold text-lg">Masculino</div>
                    <div className="text-xs text-gray-500 mt-1">Planos focados em força e volume</div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, gender: "female" })}
                    className={`group w-full p-6 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${
                      formData.gender === "female"
                        ? "border-red-500 bg-gradient-to-r from-red-500/10 to-red-400/5 shadow-lg shadow-red-500/20"
                        : "border-gray-800 hover:border-gray-700 bg-gray-900/30"
                    }`}
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">👩</div>
                    <div className="font-semibold text-lg">Feminino</div>
                    <div className="text-xs text-gray-500 mt-1">Planos focados em tonificação e curvas</div>
                  </motion.button>
                </div>
              )}

              {steps[currentStep].id === "name" && (
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Digite seu nome"
                      className="text-center text-xl py-6 bg-gray-900/50 border-gray-800 focus:border-red-500 rounded-2xl backdrop-blur-sm transition-all duration-300"
                      autoFocus
                    />
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-400/20 opacity-0 pointer-events-none"
                      animate={{ opacity: formData.name ? 0.3 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <Sparkles size={12} className="mr-1" />
                    Seu nome aparecerá no dashboard personalizado
                  </div>
                </div>
              )}

              {steps[currentStep].id === "weight" && (
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="number"
                      value={formData.weight || ""}
                      onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                      placeholder="70"
                      className="text-center text-2xl py-6 bg-gray-900/50 border-gray-800 focus:border-red-500 rounded-2xl backdrop-blur-sm pr-16 transition-all duration-300"
                      autoFocus
                    />
                    <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                      kg
                    </span>
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-400/20 opacity-0 pointer-events-none"
                      animate={{ opacity: formData.weight ? 0.3 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    💡 Usaremos para calcular suas necessidades calóricas
                  </div>
                </div>
              )}

              {steps[currentStep].id === "height" && (
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="number"
                      value={formData.height || ""}
                      onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                      placeholder="175"
                      className="text-center text-2xl py-6 bg-gray-900/50 border-gray-800 focus:border-red-500 rounded-2xl backdrop-blur-sm pr-16 transition-all duration-300"
                      autoFocus
                    />
                    <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                      cm
                    </span>
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-400/20 opacity-0 pointer-events-none"
                      animate={{ opacity: formData.height ? 0.3 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    📏 Para determinar seu biotipo e proporções ideais
                  </div>
                </div>
              )}

              {steps[currentStep].id === "frequency" && (
                <div className="space-y-3">
                  {[
                    { days: 2, level: "Iniciante", desc: "Ideal para começar", color: "from-blue-500 to-blue-400" },
                    { days: 3, level: "Básico", desc: "Equilibrio perfeito", color: "from-green-500 to-green-400" },
                    {
                      days: 4,
                      level: "Intermediário",
                      desc: "Progresso acelerado",
                      color: "from-yellow-500 to-yellow-400",
                    },
                    { days: 5, level: "Avançado", desc: "Alta intensidade", color: "from-orange-500 to-orange-400" },
                    { days: 6, level: "Profissional", desc: "Máximo resultado", color: "from-red-500 to-red-400" },
                  ].map(({ days, level, desc, color }) => (
                    <motion.button
                      key={days}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, trainingDays: days })}
                      className={`w-full p-4 rounded-xl border transition-all duration-300 backdrop-blur-sm ${
                        formData.trainingDays === days
                          ? "border-red-500 bg-gradient-to-r from-red-500/10 to-red-400/5 shadow-lg shadow-red-500/20"
                          : "border-gray-800 hover:border-gray-700 bg-gray-900/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${color}`}></div>
                            <div>
                              <div className="font-semibold">{days} dias por semana</div>
                              <div className="text-sm text-gray-400">
                                {level} • {desc}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center">
                          {formData.trainingDays === days && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 rounded-full bg-red-500"
                            />
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Ultra Modern Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-between items-center"
        >
          {currentStep > 0 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              className="px-6 py-3 rounded-xl border-gray-800 hover:border-gray-700 bg-gray-900/30 backdrop-blur-sm"
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
            className="px-8 py-3 font-semibold rounded-xl bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/25 transition-all duration-300"
            size="lg"
          >
            {currentStep === steps.length - 1 ? "Finalizar" : "Continuar"}
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </motion.div>
      </motion.div>
    </main>
  )
}
