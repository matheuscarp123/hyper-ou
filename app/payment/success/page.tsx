"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { LogoWithText } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Loader2 } from "lucide-react"
import { PremiumManager, PREMIUM_PLANS } from "@/lib/premium"
import { checkPaymentStatus } from "@/lib/stripe-client"

function SuccessPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isVerifying, setIsVerifying] = useState(true)
  const [success, setSuccess] = useState(false)
  const [planName, setPlanName] = useState("")

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id")
      const planId = searchParams.get("plan_id")

      if (!sessionId || !planId) {
        setIsVerifying(false)
        return
      }

      try {
        // Verificar status do pagamento
        const result = await checkPaymentStatus(sessionId)

        if (result.success) {
          // Ativar recursos premium
          const premiumManager = PremiumManager.getInstance()
          const plan = PREMIUM_PLANS.find((p) => p.id === planId)

          if (plan) {
            setPlanName(plan.name)
            await premiumManager.purchasePlan(planId)
            setSuccess(true)
          }
        }
      } catch (error) {
        console.error("Erro ao verificar pagamento:", error)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [searchParams])

  const handleContinue = () => {
    router.push("/dashboard")
  }

  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="bg-gray-900/50 border-gray-800 max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Loader2 className="animate-spin mx-auto mb-4 text-blue-400" size={48} />
            <h2 className="text-xl font-bold text-white mb-2">Verificando pagamento...</h2>
            <p className="text-gray-400">Aguarde enquanto confirmamos sua compra</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_rgba(0,0,0,0)_60%)]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="mx-auto text-green-500 mb-6" size={80} />
        </motion.div>

        <Card className="bg-gray-900/80 border-green-500/30 backdrop-blur-sm max-w-md mx-4">
          <CardContent className="p-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h1 className="text-3xl font-bold text-white mb-2">Pagamento Confirmado!</h1>
              <p className="text-gray-400 mb-6">
                Sua compra do plano <span className="text-green-400 font-semibold">{planName}</span> foi confirmada com
                sucesso
              </p>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300">
                  ✓ Recursos premium desbloqueados
                  <br />✓ Acesso a todos os planos de treino
                  <br />✓ Nutrição personalizada
                  <br />✓ Sem anúncios
                </p>
              </div>

              <Button onClick={handleContinue} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                Começar Agora
              </Button>

              <p className="text-xs text-gray-500 mt-4">
                Um recibo foi enviado para seu email
                <br />© 2025 Matheus Carvalho - HyperGym
              </p>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6">
          <LogoWithText />
        </motion.div>
      </motion.div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="animate-spin text-gray-400" size={48} />
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  )
}
