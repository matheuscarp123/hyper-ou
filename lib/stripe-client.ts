/**
 * Cliente Stripe para pagamentos
 * Gerencia criação de sessões de checkout e validação de pagamentos
 */

import { STRIPE_CONFIG, STRIPE_PRICE_IDS } from "./stripe-config"
import type { PremiumPlan } from "./premium"

/**
 * Cria uma sessão de checkout do Stripe
 * Esta função redireciona o usuário para a página de pagamento do Stripe
 */
export async function createCheckoutSession(plan: PremiumPlan): Promise<string | null> {
  try {
    // Obter o Price ID correto do plano
    const priceId = STRIPE_PRICE_IDS[plan.id as keyof typeof STRIPE_PRICE_IDS]

    if (!priceId) {
      console.error("Price ID não encontrado para o plano:", plan.id)
      return null
    }

    // Fazer requisição para criar sessão de checkout
    const response = await fetch("/api/stripe/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        planId: plan.id,
        planName: plan.name,
        mode: plan.period === "lifetime" ? "payment" : "subscription",
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("Erro ao criar sessão:", error)
      return null
    }

    const { url } = await response.json()
    return url
  } catch (error) {
    console.error("Erro ao criar checkout:", error)
    return null
  }
}

/**
 * Carrega o script do Stripe
 * Necessário apenas para pagamentos inline (não usado atualmente)
 */
export function loadStripe(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window não disponível"))
      return
    }

    // Verificar se já está carregado
    if ((window as any).Stripe) {
      resolve((window as any).Stripe(STRIPE_CONFIG.publishableKey))
      return
    }

    // Carregar script
    const script = document.createElement("script")
    script.src = "https://js.stripe.com/v3/"
    script.async = true

    script.onload = () => {
      if ((window as any).Stripe) {
        resolve((window as any).Stripe(STRIPE_CONFIG.publishableKey))
      } else {
        reject(new Error("Stripe não carregou corretamente"))
      }
    }

    script.onerror = () => {
      reject(new Error("Erro ao carregar Stripe"))
    }

    document.head.appendChild(script)
  })
}

/**
 * Verifica o status de um pagamento
 */
export async function checkPaymentStatus(sessionId: string): Promise<{
  success: boolean
  planId?: string
}> {
  try {
    const response = await fetch(`/api/stripe/check-payment?session_id=${sessionId}`)

    if (!response.ok) {
      return { success: false }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro ao verificar pagamento:", error)
    return { success: false }
  }
}
