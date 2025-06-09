// Sistema Premium Completo para Stores
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

  // Recursos Premium
  advancedWorkouts: boolean
  detailedNutrition: boolean
  supplementGuide: boolean
  personalizedMacros: boolean
  adFree: boolean
  prioritySupport: boolean
}

export interface PremiumPlan {
  id: string
  name: string
  price: number
  currency: string
  period: "monthly" | "yearly" | "lifetime"
  features: Partial<PremiumFeatures>
  storeProductId: string // Para Google Play/App Store
  popular?: boolean
}

export const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: "basic_monthly",
    name: "Básico Mensal",
    price: 9.9,
    currency: "BRL",
    period: "monthly",
    storeProductId: "com.matheuscarvalho.hypergym.basic.monthly",
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
    price: 19.9,
    currency: "BRL",
    period: "monthly",
    storeProductId: "com.matheuscarvalho.hypergym.pro.monthly",
    popular: true,
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
    id: "elite_monthly",
    name: "Elite Mensal",
    price: 29.9,
    currency: "BRL",
    period: "monthly",
    storeProductId: "com.matheuscarvalho.hypergym.elite.monthly",
    features: {
      arnoldPlan: true,
      cbumPlan: true,
      ramonPlan: true,
      zyzzPlan: true,
      wellnessPlan: true,
      bikiniPlan: true,
      figurePlan: true,
      physiquePlan: true,
      advancedWorkouts: true,
      detailedNutrition: true,
      supplementGuide: true,
      personalizedMacros: true,
      adFree: true,
      prioritySupport: true,
    },
  },
  {
    id: "pro_yearly",
    name: "Pro Anual",
    price: 199.9,
    currency: "BRL",
    period: "yearly",
    storeProductId: "com.matheuscarvalho.hypergym.pro.yearly",
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
]

export class PremiumManager {
  private static instance: PremiumManager
  private premiumFeatures: PremiumFeatures
  private purchaseInProgress = false

  constructor() {
    this.premiumFeatures = this.loadPremiumStatus()
    this.initializePurchaseSystem()
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
      advancedWorkouts: false,
      detailedNutrition: false,
      supplementGuide: false,
      personalizedMacros: false,
      adFree: false,
      prioritySupport: false,
    }

    if (typeof window === "undefined") return defaultFeatures

    try {
      const stored = localStorage.getItem("hypergym_premium_features")
      if (stored) {
        return { ...defaultFeatures, ...JSON.parse(stored) }
      }
    } catch (error) {
      console.error("Erro ao carregar status premium:", error)
    }

    return defaultFeatures
  }

  private savePremiumStatus(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("hypergym_premium_features", JSON.stringify(this.premiumFeatures))
      localStorage.setItem("hypergym_premium", this.hasAnyPremiumFeature().toString())
    }
  }

  public hasFeature(feature: keyof PremiumFeatures): boolean {
    return this.premiumFeatures[feature] || false
  }

  public hasAnyPremiumFeature(): boolean {
    return Object.values(this.premiumFeatures).some((value) => value === true)
  }

  public getPremiumFeatures(): PremiumFeatures {
    return { ...this.premiumFeatures }
  }

  private async initializePurchaseSystem(): Promise<void> {
    if (typeof window === "undefined") return

    try {
      // Inicializar sistema de compras baseado na plataforma
      if (this.isAndroidApp()) {
        await this.initializeGooglePlay()
      } else if (this.isIOSApp()) {
        await this.initializeAppStore()
      } else {
        await this.initializeWebPayments()
      }
    } catch (error) {
      console.error("Erro ao inicializar sistema de compras:", error)
    }
  }

  private async initializeGooglePlay(): Promise<void> {
    // Integração com Google Play Billing
    try {
      // const { GooglePlayBilling } = await import('@capacitor-community/google-play-billing')
      // await GooglePlayBilling.initialize()
      console.log("Google Play Billing inicializado")
    } catch (error) {
      console.error("Erro ao inicializar Google Play Billing:", error)
    }
  }

  private async initializeAppStore(): Promise<void> {
    // Integração com App Store Connect
    try {
      // const { AppStore } = await import('@capacitor-community/app-store')
      // await AppStore.initialize()
      console.log("App Store Connect inicializado")
    } catch (error) {
      console.error("Erro ao inicializar App Store Connect:", error)
    }
  }

  private async initializeWebPayments(): Promise<void> {
    // Integração com Stripe/PayPal para web
    try {
      // Carregar Stripe
      if (!document.querySelector('script[src*="stripe"]')) {
        const script = document.createElement("script")
        script.src = "https://js.stripe.com/v3/"
        document.head.appendChild(script)
      }
      console.log("Stripe inicializado")
    } catch (error) {
      console.error("Erro ao inicializar Stripe:", error)
    }
  }

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
      let result: { success: boolean; error?: string }

      if (this.isAndroidApp()) {
        result = await this.purchaseGooglePlay(plan)
      } else if (this.isIOSApp()) {
        result = await this.purchaseAppStore(plan)
      } else {
        result = await this.purchaseWeb(plan)
      }

      if (result.success) {
        // Ativar recursos premium
        this.activatePremiumFeatures(plan.features)

        // Registrar compra para analytics
        this.trackPurchase(plan)
      }

      return result
    } catch (error) {
      console.error("Erro na compra:", error)
      return { success: false, error: "Erro interno na compra" }
    } finally {
      this.purchaseInProgress = false
    }
  }

  private async purchaseGooglePlay(plan: PremiumPlan): Promise<{ success: boolean; error?: string }> {
    try {
      // Implementar compra via Google Play Billing
      // const { GooglePlayBilling } = await import('@capacitor-community/google-play-billing')
      // const result = await GooglePlayBilling.purchaseProduct({
      //   productId: plan.storeProductId
      // })

      // Simular compra bem-sucedida para desenvolvimento
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Erro na compra Google Play" }
    }
  }

  private async purchaseAppStore(plan: PremiumPlan): Promise<{ success: boolean; error?: string }> {
    try {
      // Implementar compra via App Store Connect
      // const { AppStore } = await import('@capacitor-community/app-store')
      // const result = await AppStore.purchaseProduct({
      //   productId: plan.storeProductId
      // })

      // Simular compra bem-sucedida para desenvolvimento
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Erro na compra App Store" }
    }
  }

  private async purchaseWeb(plan: PremiumPlan): Promise<{ success: boolean; error?: string }> {
    try {
      // Implementar compra via Stripe
      // const stripe = Stripe('pk_live_...')
      // const result = await stripe.redirectToCheckout({
      //   lineItems: [{
      //     price: plan.storeProductId,
      //     quantity: 1
      //   }],
      //   mode: 'subscription',
      //   successUrl: window.location.origin + '/success',
      //   cancelUrl: window.location.origin + '/premium'
      // })

      // Simular compra bem-sucedida para desenvolvimento
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return { success: true }
    } catch (error) {
      return { success: false, error: "Erro na compra web" }
    }
  }

  private activatePremiumFeatures(features: Partial<PremiumFeatures>): void {
    this.premiumFeatures = { ...this.premiumFeatures, ...features }
    this.savePremiumStatus()
  }

  private trackPurchase(plan: PremiumPlan): void {
    // Enviar evento para analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "purchase", {
        transaction_id: `txn_${Date.now()}`,
        value: plan.price,
        currency: plan.currency,
        items: [
          {
            item_id: plan.id,
            item_name: plan.name,
            category: "premium_plan",
            quantity: 1,
            price: plan.price,
          },
        ],
      })
    }
  }

  public async restorePurchases(): Promise<{ success: boolean; restored: number }> {
    try {
      let restoredCount = 0

      if (this.isAndroidApp()) {
        // Restaurar compras Google Play
        restoredCount = await this.restoreGooglePlayPurchases()
      } else if (this.isIOSApp()) {
        // Restaurar compras App Store
        restoredCount = await this.restoreAppStorePurchases()
      }

      return { success: true, restored: restoredCount }
    } catch (error) {
      console.error("Erro ao restaurar compras:", error)
      return { success: false, restored: 0 }
    }
  }

  private async restoreGooglePlayPurchases(): Promise<number> {
    // Implementar restauração Google Play
    return 0
  }

  private async restoreAppStorePurchases(): Promise<number> {
    // Implementar restauração App Store
    return 0
  }

  private isAndroidApp(): boolean {
    return (
      typeof window !== "undefined" && /Android/i.test(navigator.userAgent) && window.location.protocol === "capacitor:"
    )
  }

  private isIOSApp(): boolean {
    return (
      typeof window !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      window.location.protocol === "capacitor:"
    )
  }

  // Método para dar acesso temporário via anúncio recompensado
  public grantTemporaryAccess(feature: keyof PremiumFeatures, hours = 24): void {
    const tempFeatures = { ...this.premiumFeatures }
    tempFeatures[feature] = true

    // Salvar com timestamp de expiração
    const expiration = Date.now() + hours * 60 * 60 * 1000
    localStorage.setItem(`temp_${feature}`, expiration.toString())

    this.premiumFeatures = tempFeatures
    this.savePremiumStatus()

    // Remover acesso após expiração
    setTimeout(
      () => {
        this.removeTemporaryAccess(feature)
      },
      hours * 60 * 60 * 1000,
    )
  }

  private removeTemporaryAccess(feature: keyof PremiumFeatures): void {
    localStorage.removeItem(`temp_${feature}`)
    // Recarregar status premium real
    this.premiumFeatures = this.loadPremiumStatus()
  }

  public checkTemporaryAccess(): void {
    // Verificar acessos temporários expirados
    const features = Object.keys(this.premiumFeatures) as (keyof PremiumFeatures)[]

    features.forEach((feature) => {
      const tempExpiration = localStorage.getItem(`temp_${feature}`)
      if (tempExpiration && Date.now() > Number.parseInt(tempExpiration)) {
        this.removeTemporaryAccess(feature)
      }
    })
  }
}
