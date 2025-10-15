import { type NextRequest, NextResponse } from "next/server"

/**
 * API Route para criar sessão de checkout do Stripe
 * Esta rota cria uma sessão de pagamento e retorna a URL para redirecionar o usuário
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { priceId, planId, planName, mode } = body

    // Validar dados
    if (!priceId || !planId || !planName) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Em ambiente de desenvolvimento, simular resposta
    if (process.env.NODE_ENV === "development" && !process.env.STRIPE_SECRET_KEY) {
      console.log("🔧 Modo desenvolvimento: simulando criação de checkout")

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Retornar URL de sucesso simulada
      return NextResponse.json({
        url: `/payment/success?session_id=dev_${Date.now()}&plan_id=${planId}`,
      })
    }

    // PRODUÇÃO: Criar sessão real do Stripe
    // Você precisará instalar o pacote stripe: npm install stripe

    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    
    const session = await stripe.checkout.sessions.create({
      mode: mode || 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${STRIPE_CONFIG.successUrl}?session_id={CHECKOUT_SESSION_ID}&plan_id=${planId}`,
      cancel_url: STRIPE_CONFIG.cancelUrl,
      metadata: {
        planId,
        planName,
      },
      // Informações do cliente (opcional)
      customer_email: '', // Você pode pegar do perfil do usuário
    })

    return NextResponse.json({ url: session.url })
    */

    // Por enquanto, retornar erro pedindo configuração
    return NextResponse.json(
      {
        error: "Stripe não configurado",
        message: "Configure suas chaves do Stripe nas variáveis de ambiente",
      },
      { status: 500 },
    )
  } catch (error) {
    console.error("Erro ao criar checkout:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
