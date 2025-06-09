"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft } from "lucide-react"
import type { UserProfile } from "@/types"
import { FrequencySelector } from "@/components/frequency-selector"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: "",
    weight: undefined,
    height: undefined,
    trainingDays: 3,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "name" ? value : Number(value),
    }))
  }

  const handleFrequencyChange = (days: number) => {
    setFormData((prev) => ({
      ...prev,
      trainingDays: days,
    }))
  }

  const handleNext = () => {
    if (step === 1 && formData.name && formData.weight && formData.height) {
      setStep(2)
    } else if (step === 2) {
      localStorage.setItem("userProfile", JSON.stringify(formData))
      router.push("/physique")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStep1Valid = Boolean(formData.name && formData.weight && formData.height)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0 bg-black bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.08)_0%,_rgba(0,0,0,0)_60%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <div className="flex items-center mb-8">
          <Logo className="mr-3" />
          <h1 className="text-2xl font-bold">
            <span className="text-white">HYPER</span>
            <span className="text-red-600">GYM</span>
          </h1>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold">{step === 1 ? "Seus dados" : "Frequência de treino"}</h2>
          <div className="flex gap-1">
            <div className={`h-2 w-8 rounded-full ${step === 1 ? "bg-red-600" : "bg-gray-700"}`}></div>
            <div className={`h-2 w-8 rounded-full ${step === 2 ? "bg-red-600" : "bg-gray-700"}`}></div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Seu nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="Como podemos te chamar?"
                    className="bg-secondary border-gray-800"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="weight" className="text-sm font-medium text-gray-300">
                      Peso (kg)
                    </label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight || ""}
                      onChange={handleChange}
                      placeholder="70"
                      className="bg-secondary border-gray-800"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="height" className="text-sm font-medium text-gray-300">
                      Altura (cm)
                    </label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height || ""}
                      onChange={handleChange}
                      placeholder="175"
                      className="bg-secondary border-gray-800"
                      required
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <p className="text-gray-400">
                  Quantos dias por semana você pode dedicar aos treinos? Seu plano será otimizado com base na sua
                  disponibilidade.
                </p>
                <FrequencySelector value={formData.trainingDays || 3} onChange={handleFrequencyChange} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2" size={16} />
              VOLTAR
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={handleNext} disabled={step === 1 && !isStep1Valid}>
            {step === 2 ? "CONTINUAR" : "PRÓXIMO"}
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
