"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { LogoWithText } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PremiumManager } from "@/lib/premium"
import { AdManager } from "@/lib/ads"

export default function Home() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Inicializar sistemas
    const premiumManager = PremiumManager.getInstance()
    const adManager = AdManager.getInstance()

    // Verificar acessos temporários expirados
    premiumManager.checkTemporaryAccess()

    // Se já existe um plano completo, redireciona para o dashboard
    const existingPlan = localStorage.getItem("fitnessProfile")
    if (existingPlan) {
      router.push("/dashboard")
    }
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 text-lg text-gray-400 max-w-md"
        >
          Planos de treino e dieta personalizados para hipertrofia extrema
        </motion.p>

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
