"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Crown, Check, X, Gift } from "lucide-react"
import { PremiumManager, PREMIUM_PLANS } from "@/lib/premium"
import { AdManager } from "@/lib/ads"

interface PremiumGateProps {
  feature: keyof import("@/lib/premium").PremiumFeatures
  title: string
  description: string
  children: React.ReactNode
  allowRewardedUnlock?: boolean
}

export function PremiumGate({ feature, title, description, children, allowRewardedUnlock = true }: PremiumGateProps) {
  const [showPaywall, setShowPaywall] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>("")

  const premiumManager = PremiumManager.getInstance()
  const adManager = AdManager.getInstance()

  const hasAccess = premiumManager.hasFeature(feature)

  const handleUpgrade = async () => {
    if (!selectedPlan) return

    setPurchasing(true)
    try {
      const result = await premiumManager.purchasePlan(selectedPlan)

      if (result.success) {
        setShowPaywall(false)
        // Recarregar para mostrar conteúdo desbloqueado
        window.location.reload()
      } else {
        alert(`Erro na compra: ${result.error || "Tente novamente"}`)
      }
    } catch (error) {
      console.error("Erro na compra:", error)
      alert("Erro na compra. Tente novamente.")
    } finally {
      setPurchasing(false)
    }
  }

  const handleRewardedUnlock = async () => {
    const success = await adManager.showRewardedAd(() => {
      premiumManager.grantTemporaryAccess(feature, 24)
      setShowPaywall(false)
      window.location.reload()
    })

    if (!success) {
      alert("Não foi possível carregar o anúncio. Tente novamente.")
    }
  }

  if (hasAccess) {
    return <>{children}</>
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
        {/* Conteúdo ofuscado */}
        <div className="relative">
          <div className="filter blur-sm pointer-events-none select-none opacity-50">{children}</div>

          {/* Overlay de bloqueio */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
            <Card className="bg-gray-900/95 border-yellow-500/30 max-w-sm mx-4">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full w-fit">
                  <Crown size={24} className="text-white" />
                </div>
                <CardTitle className="text-xl text-white">{title}</CardTitle>
                <p className="text-gray-400 text-sm">{description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <Lock size={16} />
                  <span>Conteúdo Premium</span>
                </div>

                <Button
                  onClick={() => setShowPaywall(true)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
                >
                  <Crown className="mr-2" size={16} />
                  Fazer Upgrade
                </Button>

                {allowRewardedUnlock && (
                  <Button
                    onClick={handleRewardedUnlock}
                    variant="outline"
                    className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"
                  >
                    <Gift className="mr-2" size={16} />
                    Desbloquear por 24h (Anúncio)
                  </Button>
                )}

                <p className="text-xs text-gray-500 text-center">Acesso aos melhores planos de treino e dieta</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Modal de Pagamento */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPaywall(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl border border-gray-800 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Upgrade Premium</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPaywall(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </Button>
                </div>

                <div className="space-y-4">
                  {PREMIUM_PLANS.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? "border-yellow-500 bg-yellow-500/10"
                          : "border-gray-700 hover:border-gray-600"
                      } ${plan.popular ? "relative" : ""}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <div className="bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold">
                            MAIS POPULAR
                          </div>
                        </div>
                      )}

                      <CardHeader className={`pb-4 ${plan.popular ? "pt-6" : ""}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            <p className="text-gray-400 text-sm">
                              {plan.period === "monthly" ? "Mensal" : plan.period === "yearly" ? "Anual" : "Vitalício"}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">R$ {plan.price.toFixed(2)}</div>
                            {plan.period !== "lifetime" && (
                              <div className="text-xs text-gray-400">/{plan.period === "monthly" ? "mês" : "ano"}</div>
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-2">
                        {Object.entries(plan.features).map(([key, value]) => {
                          if (!value) return null

                          const featureNames: Record<string, string> = {
                            arnoldPlan: "Plano Arnold",
                            cbumPlan: "Plano CBum",
                            ramonPlan: "Plano Ramon",
                            zyzzPlan: "Plano Zyzz",
                            wellnessPlan: "Plano Wellness",
                            bikiniPlan: "Plano Bikini",
                            figurePlan: "Plano Figure",
                            physiquePlan: "Plano Physique",
                            advancedWorkouts: "Treinos Avançados",
                            detailedNutrition: "Nutrição Detalhada",
                            supplementGuide: "Guia de Suplementos",
                            personalizedMacros: "Macros Personalizados",
                            adFree: "Sem Anúncios",
                            prioritySupport: "Suporte Prioritário",
                          }

                          return (
                            <div key={key} className="flex items-center gap-2 text-sm">
                              <Check size={16} className="text-green-400 flex-shrink-0" />
                              <span>{featureNames[key] || key}</span>
                            </div>
                          )
                        })}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button
                  onClick={handleUpgrade}
                  disabled={!selectedPlan || purchasing}
                  className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold h-12"
                >
                  {purchasing ? "Processando..." : "Confirmar Compra"}
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">Pagamento seguro • Cancele quando quiser • Suporte 24/7</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
