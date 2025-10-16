"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { LogoWithText } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AccessControl } from "@/lib/access-control"

const motivationalPhrases = [
  "Seu personal trainer e nutricionista de bolso - 100% GRÁTIS",
  "Baseado na rotina dos maiores atletas (Arnold, CBum, Ramon, Zyzz)",
  "Treinos e dietas personalizados sem custo algum",
  "Suplementação e dieta ajustadas às suas medidas",
  "Transforme seu corpo com os segredos dos campeões",
  "Planos personalizados dos maiores fisiculturistas do mundo",
]

export default function Home() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)

  useEffect(() => {
    setIsLoaded(true)

    // Inicializar controle de acesso
    const accessControl = AccessControl.getInstance()
    accessControl.trackEvent("home_page_viewed")

    // Alternar frases motivacionais a cada 5 segundos
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % motivationalPhrases.length)
    }, 5000)

    // Se já existe um plano completo, redireciona para o dashboard
    const existingPlan = localStorage.getItem("fitnessProfile")
    if (existingPlan) {
      router.push("/dashboard")
    }

    return () => clearInterval(phraseInterval)
  }, [router])

  const handleStart = () => {
    const accessControl = AccessControl.getInstance()
    accessControl.trackEvent("start_button_clicked")
    router.push("/onboarding")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0 bg-black bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_rgba(0,0,0,0)_60%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center"
      >
        <LogoWithText />

        {/* Badge FREE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-4 px-6 py-2 bg-green-500 rounded-full"
        >
          <span className="text-black font-black text-lg">100% GRÁTIS</span>
        </motion.div>

        {/* Frases motivacionais */}
        <div className="mt-6 h-16 flex items-center justify-center max-w-md overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhraseIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-lg text-gray-400 text-center leading-relaxed"
            >
              {motivationalPhrases[currentPhraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            size="lg"
            className="mt-8 px-8 font-bold text-lg bg-green-600 hover:bg-green-700"
            onClick={handleStart}
          >
            COMEÇAR AGORA <ArrowRight className="ml-2" size={18} />
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-4 right-4 text-xs text-gray-600">© 2025 Matheus Carvalho</div>
    </main>
  )
}
