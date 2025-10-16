import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"

/**
 * Webhook do Stripe para receber notificações de eventos
 * IMPORTANTE: Configure este endpoint no Stripe Dashboard
 *
 * Eventos suportados:
 * - setup_intent.created: Quando uma intenção de pagamento é criada
 * - setup_intent.succeeded: Quando o setup de pagamento é concluído
 * - checkout.session.completed: Quando um pagamento é concluído
 * - customer.subscription.created: Quando uma assinatura é criada
 * - customer.subscription.updated: Quando uma assinatura é atualizada
 * - customer.subscription.deleted: Quando uma assinatura é cancelada
 * - invoice.paid: Quando uma fatura é paga
 * - invoice.payment_failed: Quando o pagamento de uma fatura falha
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
      console.error("❌ Webhook: Assinatura ausente")
      return NextResponse.json({ error: "Assinatura ausente" }, { status: 400 })
    }

    // Em ambiente de desenvolvimento, apenas logar
    if (process.env.NODE_ENV === "development") {
      console.log("🔧 Webhook recebido (desenvolvimento)")

      try {
        const event = JSON.parse(body)
        console.log("📦 Tipo de evento:", event.type)
        console.log("📋 ID do evento:", event.id)
        console.log("🔍 Dados:", JSON.stringify(event.data, null, 2))

        // Processar evento em desenvolvimento
        await processWebhookEvent(event)

        return NextResponse.json({ received: true, event: event.type })
      } catch (parseError) {
        console.error("❌ Erro ao parsear evento:", parseError)
        return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
      }
    }

    // PRODUÇÃO: Validar e processar webhook
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-09-30.clover",
    })
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error("❌ STRIPE_WEBHOOK_SECRET não configurado")
      return NextResponse.json({ error: "Webhook não configurado" }, { status: 500 })
    }

    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error("❌ Erro ao validar webhook:", err.message)
      return NextResponse.json({ error: "Webhook inválido" }, { status: 400 })
    }

    // Processar evento
    await processWebhookEvent(event)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("❌ Erro no webhook:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

/**
 * Processa diferentes tipos de eventos do Stripe
 */
async function processWebhookEvent(event: any) {
  console.log(`\n🎯 Processando evento: ${event.type}`)

  switch (event.type) {
    case "setup_intent.created":
      // Intenção de setup criada (geralmente para salvar cartão)
      const setupIntent = event.data.object
      console.log("✅ Setup Intent criado:", {
        id: setupIntent.id,
        status: setupIntent.status,
        customer: setupIntent.customer,
        payment_method: setupIntent.payment_method,
      })
      // Aqui você pode salvar no banco de dados que o usuário iniciou o setup
      break

    case "setup_intent.succeeded":
      // Setup de pagamento concluído com sucesso
      const succeededSetup = event.data.object
      console.log("✅ Setup Intent concluído:", {
        id: succeededSetup.id,
        customer: succeededSetup.customer,
        payment_method: succeededSetup.payment_method,
      })
      // Aqui você pode marcar que o método de pagamento foi salvo com sucesso
      break

    case "checkout.session.completed":
      // Pagamento concluído
      const session = event.data.object
      const planId = session.metadata?.planId
      const customerId = session.customer

      console.log("💰 Pagamento concluído:", {
        sessionId: session.id,
        planId,
        customerId,
        amount: session.amount_total / 100,
        currency: session.currency,
        email: session.customer_details?.email,
      })

      // TODO: Aqui você deve:
      // 1. Salvar a compra no banco de dados
      // 2. Enviar email de confirmação para o cliente
      // 3. Ativar recursos premium para o usuário
      // 4. Registrar o evento para analytics

      break

    case "customer.subscription.created":
      // Nova assinatura criada
      const newSubscription = event.data.object
      console.log("🆕 Assinatura criada:", {
        id: newSubscription.id,
        customer: newSubscription.customer,
        status: newSubscription.status,
        plan: newSubscription.items.data[0]?.price?.id,
      })
      break

    case "customer.subscription.updated":
      // Assinatura atualizada
      const updatedSubscription = event.data.object
      console.log("🔄 Assinatura atualizada:", {
        id: updatedSubscription.id,
        status: updatedSubscription.status,
        cancel_at_period_end: updatedSubscription.cancel_at_period_end,
      })

      // Se a assinatura foi cancelada
      if (updatedSubscription.cancel_at_period_end) {
        console.log("⚠️ Assinatura será cancelada em:", new Date(updatedSubscription.current_period_end * 1000))
      }
      break

    case "customer.subscription.deleted":
      // Assinatura cancelada
      const deletedSub = event.data.object
      console.log("❌ Assinatura cancelada:", {
        id: deletedSub.id,
        customer: deletedSub.customer,
      })

      // TODO: Remover acesso premium do usuário
      break

    case "invoice.paid":
      // Fatura paga
      const paidInvoice = event.data.object
      console.log("💵 Fatura paga:", {
        id: paidInvoice.id,
        customer: paidInvoice.customer,
        amount: paidInvoice.amount_paid / 100,
        subscription: paidInvoice.subscription,
      })
      break

    case "invoice.payment_failed":
      // Falha no pagamento
      const failedInvoice = event.data.object
      console.log("⚠️ Falha no pagamento:", {
        id: failedInvoice.id,
        customer: failedInvoice.customer,
        amount: failedInvoice.amount_due / 100,
      })

      // TODO: Enviar email notificando sobre a falha no pagamento
      break

    default:
      console.log(`⚪ Evento não tratado: ${event.type}`)
  }
}

// Configuração especial do Next.js para webhooks
export const runtime = "nodejs"
export const dynamic = "force-dynamic"
