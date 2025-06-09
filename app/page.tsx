"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { LogoWithText } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const motivationalPhrases = [
  "HyperGym será seu personal trainer e nutricionista particular",
  "Baseado na rotina dos maiores atletas (Arnold, CBum, Ramon, Zyzz)",
  "Economize dinheiro com seu app all-in-one",
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

    // Alternar frases motivacionais
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % motivationalPhrases.length)
    }, 3000)

    // Se já existe um plano completo, redireciona para o dashboard
    const existingPlan = localStorage.getItem("fitnessProfile")
    if (existingPlan) {
      router.push("/dashboard")
    }

    return () => clearInterval(phraseInterval)
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0 bg-black bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.08)_0%,_rgba(0,0,0,0)_60%)]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center"
      >
        <LogoWithText />

        {/* Frases motivacionais rotativas */}
        <div className="mt-6 h-16 flex items-center justify-center max-w-md">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhraseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
          <Button size="lg" className="mt-8 px-8 font-bold text-lg" onClick={() => router.push("/onboarding")}>
            COMEÇAR AGORA <ArrowRight className="ml-2" size={18} />
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-4 right-4 text-xs text-gray-600">© 2024 Matheus Carvalho</div>
    </main>
  )
}
