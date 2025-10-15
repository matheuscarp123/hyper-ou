// Sistema Premium Completo para Stores - Compatível com futuras atualizações
import { createCheckoutSession } from "./stripe-client"

export interface PremiumFeatures {
  // Físicos Premium
  arnoldPlan: boolean
  cbumPlan: boolean
  ramonPlan: boolean
  zyzzPlan: boolean
  wellnessPlan: boolean
  bikiniPlan: boolean
  figurePlan: boolean
  physiquePlan: boolean
  larryPlan: boolean
  davidPlan: boolean
  gracyannePlan: boolean
  evaPlan: boolean

  // Recursos Premium
  advancedWorkouts: boolean
  detailedNutrition: boolean
  supplementGuide: boolean
  personalizedMacros: boolean
  adFree: boolean
  prioritySupport: boolean

  // Recursos futuros
  aiCoach: boolean
  progressTracking: boolean
  videoGuides: boolean
  mealPlanner: boolean
  communityAccess: boolean
  exportData: boolean
}

export interface PremiumPlan {
  id: string
  name: string
  price: number
  currency: string
  period: "monthly" | "yearly" | "lifetime" | "trial"
  features: Partial<PremiumFeatures>
  storeProductId: string
  popular?: boolean
  trialDays?: number
}

// Planos premium disponíveis
export const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: "trial",
    name: "Teste Grátis",
    price: 0,
    currency: "BRL",
    period: "trial",
    trialDays: 7,
    storeProductId: "trial",
    features: {
      arnoldPlan: true,
      cbumPlan: true,
      ramonPlan: true,
      zyzzPlan: true,
      wellnessPlan: true,
      bikiniPlan: true,
      advancedWorkouts: true,
      detailedNutrition: true,
      supplementGuide: true,
      adFree: true,
    },
  },
  {
    id: "basic_monthly",
    name: "Básico Mensal",
    price: 19.9,
    currency: "BRL",
    period: "monthly",
    storeProductId: "basic_monthly",
    features: {
      arnoldPlan: true,
      cbumPlan: true,
      advancedWorkouts: true,
      detailedNutrition: true,
    },
  },
  {
    id: "pro_monthly",
    name: "Pro Mensal",
    price: 39.9,
    currency: "BRL",
    period: "monthly",
    storeProductId: "pro_monthly",
    popular: true,
    features: {
      arnoldPlan: true,
      cbumPlan: true,
      ramonPlan: true,
      zyzzPlan: true,
      wellnessPlan: true,
      bikiniPlan: true,
      larryPlan: true,
      davidPlan: true,
      advancedWorkouts: true,
      detailedNutrition: true,
      supplementGuide: true,
      adFree: true,
    },
  },
  {
    id: "elite_monthly",
    name: "Elite Mensal",
    price: 59.9,
    currency: "BRL",
    period: "monthly",
    storeProductId: "elite_monthly",
    features: {
      arnoldPlan: true,
      cbumPlan: true,
      ramonPlan: true,
      zyzzPlan: true,
      wellnessPlan: true,
      bikiniPlan: true,
      figurePlan: true,
      physiquePlan: true,
      larryPlan: true,
      davidPlan: true,
      gracyannePlan: true,
      evaPlan: true,
      advancedWorkouts: true,
      detailedNutrition: true,
      supplementGuide: true,
      personalizedMacros: true,
      adFree: true,
      prioritySupport: true,
      progressTracking: true,
      videoGuides: true,
    },
  },
  {
    id: "pro_yearly",
    name: "Pro Anual",
    price: 399.9,
    currency: "BRL",
    period: "yearly",
    storeProductId: "pro_yearly",
    features: {
      arnoldPlan: true,
      cbumPlan: true,
      ramonPlan: true,
      zyzzPlan: true,
      wellnessPlan: true,
      bikiniPlan: true,
      larryPlan: true,
      davidPlan: true,
      advancedWorkouts: true,
      detailedNutrition: true,
      supplementGuide: true,
      adFree: true,
      progressTracking: true,
    },
  },
  {
    id: "lifetime",
    name: "Vitalício",
    price: 997.0,
    currency: "BRL",
    period: "lifetime",
    storeProductId: "lifetime",
    features: {
      arnoldPlan: true,
      cbumPlan: true,
      ramonPlan: true,
      zyzzPlan: true,
      wellnessPlan: true,
      bikiniPlan: true,
      figurePlan: true,
      physiquePlan: true,
      larryPlan: true,
      davidPlan: true,
      gracyannePlan: true,
      evaPlan: true,
      advancedWorkouts: true,
      detailedNutrition: true,
      supplementGuide: true,
      personalizedMacros: true,
      adFree: true,
      prioritySupport: true,
      progressTracking: true,
      videoGuides: true,
      mealPlanner: true,
      communityAccess: true,
      exportData: true,
      aiCoach: true,
    },
  },
]

export class PremiumManager {
  private static instance: PremiumManager
  private premiumFeatures: PremiumFeatures
  private purchaseInProgress = false
  private readonly VERSION = "1.0.0"
  private readonly STORAGE_KEY = "hypergym_premium_features"
  private readonly STATUS_KEY = "hypergym_premium"

  constructor() {
    this.premiumFeatures = this.loadPremiumStatus()
  }

  public static getInstance(): PremiumManager {
    if (!PremiumManager.instance) {
      PremiumManager.instance = new PremiumManager()
    }
    return PremiumManager.instance
  }

  private loadPremiumStatus(): PremiumFeatures {
    const defaultFeatures: PremiumFeatures = {
      arnoldPlan: false,
      cbumPlan: false,
      ramonPlan: false,
      zyzzPlan: false,
      wellnessPlan: false,
      bikiniPlan: false,
      figurePlan: false,
      physiquePlan: false,
      larryPlan: false,
      davidPlan: false,
      gracyannePlan: false,
      evaPlan: false,
      advancedWorkouts: false,
      detailedNutrition: false,
      supplementGuide: false,
      personalizedMacros: false,
      adFree: false,
      prioritySupport: false,
      aiCoach: false,
      progressTracking: false,
      videoGuides: false,
      mealPlanner: false,
      communityAccess: false,
      exportData: false,
    }

    if (typeof window === "undefined") return defaultFeatures

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return { ...defaultFeatures, ...parsed.features }
      }
    } catch (error) {
      console.error("Erro ao carregar status premium:", error)
    }

    return defaultFeatures
  }

  private savePremiumStatus(): void {
    if (typeof window !== "undefined") {
      try {
        const dataToSave = {
          version: this.VERSION,
          features: this.premiumFeatures,
          timestamp: Date.now(),
        }

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToSave))
        localStorage.setItem(this.STATUS_KEY, this.hasAnyPremiumFeature().toString())
      } catch (error) {
        console.error("Erro ao salvar status premium:", error)
      }
    }
  }

  public hasFeature(feature: keyof PremiumFeatures): boolean {
    if (this.hasTemporaryAccess(feature)) {
      return true
    }
    return this.premiumFeatures[feature] || false
  }

  public hasAnyPremiumFeature(): boolean {
    return Object.values(this.premiumFeatures).some((value) => value === true)
  }

  public getPremiumFeatures(): PremiumFeatures {
    return { ...this.premiumFeatures }
  }

  /**
   * Realiza a compra de um plano premium
   * Agora redireciona para o Stripe Checkout real
   */
  public async purchasePlan(planId: string): Promise<{ success: boolean; error?: string }> {
    if (this.purchaseInProgress) {
      return { success: false, error: "Compra já em andamento" }
    }

    const plan = PREMIUM_PLANS.find((p) => p.id === planId)
    if (!plan) {
      return { success: false, error: "Plano não encontrado" }
    }

    this.purchaseInProgress = true

    try {
      // Se for teste grátis, ativar direto
      if (plan.period === "trial" && plan.trialDays) {
        this.activatePremiumFeatures(plan.features)
        this.setTrialExpiration(plan.trialDays)
        this.purchaseInProgress = false
        return { success: true }
      }

      // Para outros planos, redirecionar para Stripe
      const checkoutUrl = await createCheckoutSession(plan)

      if (checkoutUrl) {
        // Redirecionar para o checkout do Stripe
        window.location.href = checkoutUrl
        return { success: true }
      } else {
        return { success: false, error: "Erro ao criar sessão de pagamento" }
      }
    } catch (error) {
      console.error("Erro na compra:", error)
      return { success: false, error: "Erro interno na compra" }
    } finally {
      this.purchaseInProgress = false
    }
  }

  private activatePremiumFeatures(features: Partial<PremiumFeatures>): void {
    this.premiumFeatures = { ...this.premiumFeatures, ...features }
    this.savePremiumStatus()
  }

  public grantTemporaryAccess(feature: keyof PremiumFeatures, hours = 24): void {
    const expiration = Date.now() + hours * 60 * 60 * 1000
    localStorage.setItem(`temp_${feature}`, expiration.toString())

    const tempFeatures = { ...this.premiumFeatures }
    tempFeatures[feature] = true
    this.premiumFeatures = tempFeatures
    this.savePremiumStatus()

    setTimeout(
      () => {
        this.removeTemporaryAccess(feature)
      },
      hours * 60 * 60 * 1000,
    )
  }

  private removeTemporaryAccess(feature: keyof PremiumFeatures): void {
    localStorage.removeItem(`temp_${feature}`)
    this.premiumFeatures = this.loadPremiumStatus()
    this.savePremiumStatus()
  }

  private hasTemporaryAccess(feature: keyof PremiumFeatures): boolean {
    const tempExpiration = localStorage.getItem(`temp_${feature}`)
    if (tempExpiration) {
      const expirationTime = Number.parseInt(tempExpiration)
      if (!isNaN(expirationTime) && Date.now() < expirationTime) {
        return true
      }
      localStorage.removeItem(`temp_${feature}`)
    }
    return false
  }

  private setTrialExpiration(days: number): void {
    const expiration = Date.now() + days * 24 * 60 * 60 * 1000
    localStorage.setItem("hypergym_trial_expiration", expiration.toString())
  }

  public async restorePurchases(): Promise<{ success: boolean; restored: number }> {
    // Implementação futura para restaurar compras das stores
    return { success: true, restored: 0 }
  }
}
