import { type NextRequest, NextResponse } from "next/server"

/**
 * API Route para verificar status de pagamento
 * Valida se o pagamento foi concluído com sucesso
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID não fornecido" }, { status: 400 })
    }

    // Em ambiente de desenvolvimento, simular resposta
    if (process.env.NODE_ENV === "development" && !process.env.STRIPE_SECRET_KEY) {
      console.log("🔧 Modo desenvolvimento: simulando verificação de pagamento")

      // Extrair planId da session_id simulada
      const planId = sessionId.includes("dev_") ? "pro_monthly" : null

      return NextResponse.json({
        success: true,
        planId: planId || "pro_monthly",
      })
    }

    // PRODUÇÃO: Verificar sessão real do Stripe
    /*
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status === 'paid') {
      return NextResponse.json({
        success: true,
        planId: session.metadata.planId
      })
    }
    
    return NextResponse.json({
      success: false
    })
    */

    return NextResponse.json(
      {
        error: "Stripe não configurado",
        message: "Configure suas chaves do Stripe nas variáveis de ambiente",
      },
      { status: 500 },
    )
  } catch (error) {
    console.error("Erro ao verificar pagamento:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
