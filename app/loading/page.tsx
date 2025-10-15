"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import type { UserProfile, FitnessProfile } from "@/types"
import { generateWorkoutPlan } from "@/lib/generate-workout"

const loadingMessages = [
  "Analisando seu perfil...",
  "Consultando especialistas em hipertrofia...",
  "Criando sua rotina de treino personalizada...",
  "Calculando seus macronutrientes ideais...",
  "Montando seu plano de dieta...",
  "Finalizando seu plano de dominação...",
]

export default function LoadingPage() {
  const router = useRouter()
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Recuperar perfil do usuário
    const storedProfile = localStorage.getItem("userProfile")
    if (!storedProfile) {
      router.push("/onboarding")
      return
    }

    const userProfile = JSON.parse(storedProfile) as UserProfile

    // Alternar mensagens de carregamento
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    // Simular progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 150)

    // Gerar planos usando a função dedicada
    const generatePlans = async () => {
      try {
        // Simular tempo de processamento
        await new Promise((resolve) => setTimeout(resolve, 15000))

        // Gerar plano baseado no perfil (agora com dias corretos)
        const workout = await generateWorkoutPlan(userProfile)

        const fitnessProfile: FitnessProfile = {
          user: userProfile,
          workout,
          diet: generateDietPlan(userProfile),
        }

        localStorage.setItem("fitnessProfile", JSON.stringify(fitnessProfile))
        router.push("/dashboard")
      } catch (error) {
        console.error("Erro ao gerar planos:", error)
        router.push("/")
      }
    }

    generatePlans()

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0 bg-black bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.08)_0%,_rgba(0,0,0,0)_60%)]"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="z-10 flex flex-col items-center text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <Logo size="lg" />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Construindo seu plano
        </motion.h2>

        <div className="h-8 mt-4 relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400"
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          className="w-full max-w-md mt-8 bg-gray-900 rounded-full h-2 overflow-hidden"
          initial={{ width: "60%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="bg-gradient-to-r from-red-600 to-red-500 h-2"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-red-900/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />
      </motion.div>
    </main>
  )
}

// Função para gerar plano de dieta baseado no perfil
function generateDietPlan(userProfile: UserProfile) {
  // Calcular necessidades calóricas baseadas no peso e altura
  const bmr =
    userProfile.gender === "male"
      ? 88.362 + 13.397 * userProfile.weight + 4.799 * userProfile.height - 5.677 * 25
      : 447.593 + 9.247 * userProfile.weight + 3.098 * userProfile.height - 4.33 * 25

  const totalCalories = Math.round(bmr * 1.7) // Fator de atividade alta

  const proteinGrams = Math.round(userProfile.weight * 2.2) // 2.2g por kg
  const fatGrams = Math.round((totalCalories * 0.25) / 9) // 25% das calorias
  const carbGrams = Math.round((totalCalories - proteinGrams * 4 - fatGrams * 9) / 4)

  return {
    macros: {
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams,
    },
    meals: [
      {
        name: "Café da Manhã",
        time: "07:00",
        description: `6 claras de ovo + 2 gemas, 80g de aveia, 1 banana, 200ml de leite desnatado. Rico em proteínas para iniciar o dia com energia.`,
      },
      {
        name: "Lanche da Manhã",
        time: "10:00",
        description: `Whey protein (30g) + 1 maçã + 30g de amendoim. Combinação perfeita para manter o anabolismo.`,
      },
      {
        name: "Almoço",
        time: "13:00",
        description: `200g de frango grelhado, 150g de arroz integral, 100g de brócolis, salada verde com azeite. Refeição completa para sustentar o treino.`,
      },
      {
        name: "Pré-Treino",
        time: "16:00",
        description: `1 banana + 30g de whey protein + 200ml de água. Energia rápida para o treino intenso.`,
      },
      {
        name: "Pós-Treino",
        time: "18:30",
        description: `40g de whey protein + 1 banana + 30g de dextrose. Janela anabólica para máxima recuperação.`,
      },
      {
        name: "Jantar",
        time: "20:00",
        description: `200g de salmão grelhado, 200g de batata doce, aspargos refogados. Proteína de qualidade e carboidratos complexos.`,
      },
      {
        name: "Ceia",
        time: "22:30",
        description: `200g de queijo cottage + 30g de castanhas. Proteína de digestão lenta para a noite.`,
      },
    ],
  }
}
