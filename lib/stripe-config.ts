/**
 * Configuração do Stripe para receber pagamentos
 *
 * IMPORTANTE: Após criar sua conta no Stripe:
 * 1. Acesse https://dashboard.stripe.com/register
 * 2. Complete o cadastro com seus dados
 * 3. Adicione informações bancárias para receber pagamentos
 * 4. Copie suas chaves API (Publishable Key e Secret Key)
 * 5. Substitua as chaves abaixo pelas suas chaves reais
 */

export const STRIPE_CONFIG = {
  // Chave pública do Stripe (pode ser exposta no frontend)
  // Substitua pela sua chave após criar a conta: https://dashboard.stripe.com/apikeys
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_SUA_CHAVE_AQUI",

  // Chave secreta (NUNCA exponha no frontend, apenas no backend)
  secretKey: process.env.STRIPE_SECRET_KEY || "sk_test_SUA_CHAVE_SECRETA_AQUI",

  // URLs de retorno após pagamento
  successUrl: "https://hypergym.vercel.app/payment/success",
  cancelUrl: "https://hypergym.vercel.app/payment/cancel",
}

// IDs dos produtos no Stripe (você precisará criar esses produtos no Stripe Dashboard)
export const STRIPE_PRICE_IDS = {
  trial: "", // Teste grátis não precisa de ID
  basic_monthly: "price_BASIC_MONTHLY_ID", // Substitua pelo ID real após criar no Stripe
  pro_monthly: "price_PRO_MONTHLY_ID",
  elite_monthly: "price_ELITE_MONTHLY_ID",
  pro_yearly: "price_PRO_YEARLY_ID",
  lifetime: "price_LIFETIME_ID",
}

/**
 * INSTRUÇÕES PARA CONFIGURAR O STRIPE:
 *
 * 1. CRIAR CONTA NO STRIPE
 *    - Acesse: https://dashboard.stripe.com/register
 *    - Preencha seus dados pessoais
 *    - Confirme seu email
 *
 * 2. ADICIONAR INFORMAÇÕES BANCÁRIAS
 *    - Vá para: Settings > Business Settings > Payouts
 *    - Adicione sua conta bancária brasileira
 *    - Complete a verificação de identidade
 *
 * 3. OBTER CHAVES API
 *    - Vá para: Developers > API Keys
 *    - Copie a "Publishable key" e a "Secret key"
 *    - Cole nas variáveis de ambiente (veja .env.example)
 *
 * 4. CRIAR PRODUTOS E PREÇOS
 *    - Vá para: Products > Add Product
 *    - Crie cada plano (Básico, Pro, Elite, etc.)
 *    - Para cada produto, crie um preço
 *    - Copie os "Price IDs" e cole em STRIPE_PRICE_IDS acima
 *
 * 5. CONFIGURAR WEBHOOK (para produção)
 *    - Vá para: Developers > Webhooks
 *    - Adicione endpoint: https://hypergym.vercel.app/api/webhooks/stripe
 *    - Selecione eventos: checkout.session.completed, customer.subscription.updated
 *    - Copie o "Signing secret" e adicione nas variáveis de ambiente
 *
 * 6. VARIÁVEIS DE AMBIENTE
 *    Crie um arquivo .env.local na raiz do projeto:
 *
 *    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
 *    STRIPE_SECRET_KEY=sk_live_...
 *    STRIPE_WEBHOOK_SECRET=whsec_...
 *
 * 7. TESTAR PAGAMENTOS
 *    - Use o modo de teste primeiro (chaves começam com pk_test_ e sk_test_)
 *    - Cartão de teste: 4242 4242 4242 4242
 *    - Qualquer data futura e CVC
 *
 * 8. ATIVAR MODO PRODUÇÃO
 *    - Depois de testar, ative o modo produção no Stripe Dashboard
 *    - Substitua as chaves de teste pelas chaves de produção (pk_live_ e sk_live_)
 *
 * IMPORTANTE: Você receberá os pagamentos diretamente na sua conta bancária!
 * O Stripe cobra uma taxa de ~4.5% + R$0.39 por transação no Brasil.
 */
