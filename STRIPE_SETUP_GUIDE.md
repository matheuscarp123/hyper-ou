# Guia Completo: Como Configurar o Stripe para Receber Pagamentos

Este guia vai te ensinar passo a passo como configurar o Stripe para começar a receber pagamentos no HyperGym.

## 📋 O que você vai precisar

- CPF ou CNPJ
- Conta bancária brasileira
- Email válido
- Documento de identidade (RG ou CNH)

## 🚀 Passo 1: Criar Conta no Stripe

1. Acesse: https://dashboard.stripe.com/register
2. Clique em "Sign up"
3. Preencha:
   - Email
   - Nome completo
   - Senha
4. Clique em "Create account"

## 🏦 Passo 2: Adicionar Informações Bancárias

1. No Dashboard do Stripe, vá em **Settings** > **Business settings** > **Payouts**
2. Clique em "Add bank account"
3. Preencha:
   - Nome do banco
   - Agência (sem dígito)
   - Conta (com dígito)
   - Tipo de conta (Corrente ou Poupança)
4. Clique em "Save"

**Importante**: O Stripe fará um depósito de verificação de R$0,01 na sua conta. Verifique seu extrato e confirme o valor no dashboard.

## 🔑 Passo 3: Obter Chaves API

1. No Dashboard, vá em **Developers** > **API keys**
2. Você verá duas chaves:
   - **Publishable key** (começa com `pk_test_...`)
   - **Secret key** (começa com `sk_test_...`, clique em "Reveal test key")

3. Copie ambas as chaves

4. Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_SUA_CHAVE_AQUI
STRIPE_SECRET_KEY=sk_test_SUA_CHAVE_SECRETA_AQUI
\`\`\`

## 💰 Passo 4: Criar Produtos e Preços

Para cada plano do HyperGym, você precisa criar um produto no Stripe:

### Criar Produto "Básico Mensal"

1. Vá em **Products** > **Add product**
2. Preencha:
   - **Name**: HyperGym Básico Mensal
   - **Description**: Acesso aos planos Arnold e CBum
   - **Pricing**:
     - **Price**: R$ 19,90
     - **Billing period**: Monthly
     - **Currency**: BRL
3. Clique em "Save product"
4. **IMPORTANTE**: Copie o **Price ID** (começa com `price_...`)

### Criar Produto "Pro Mensal"

1. Vá em **Products** > **Add product**
2. Preencha:
   - **Name**: HyperGym Pro Mensal
   - **Description**: Acesso a todos os planos premium
   - **Pricing**:
     - **Price**: R$ 39,90
     - **Billing period**: Monthly
     - **Currency**: BRL
3. Clique em "Save product"
4. Copie o **Price ID**

### Criar Produto "Elite Mensal"

1. Vá em **Products** > **Add product**
2. Preencha:
   - **Name**: HyperGym Elite Mensal
   - **Description**: Acesso completo + recursos avançados
   - **Pricing**:
     - **Price**: R$ 59,90
     - **Billing period**: Monthly
     - **Currency**: BRL
3. Clique em "Save product"
4. Copie o **Price ID**

### Criar Produto "Pro Anual"

1. Vá em **Products** > **Add product**
2. Preencha:
   - **Name**: HyperGym Pro Anual
   - **Description**: Acesso anual com desconto
   - **Pricing**:
     - **Price**: R$ 399,90
     - **Billing period**: Yearly
     - **Currency**: BRL
3. Clique em "Save product"
4. Copie o **Price ID**

### Criar Produto "Vitalício"

1. Vá em **Products** > **Add product**
2. Preencha:
   - **Name**: HyperGym Vitalício
   - **Description**: Acesso vitalício a todos os recursos
   - **Pricing**:
     - **Price**: R$ 997,00
     - **Billing period**: One time
     - **Currency**: BRL
3. Clique em "Save product"
4. Copie o **Price ID**

### Adicionar Price IDs ao Código

Abra o arquivo `lib/stripe-config.ts` e adicione os Price IDs:

\`\`\`typescript
export const STRIPE_PRICE_IDS = {
  trial: '',
  basic_monthly: 'price_COLE_AQUI_O_ID_DO_BASICO',
  pro_monthly: 'price_COLE_AQUI_O_ID_DO_PRO',
  elite_monthly: 'price_COLE_AQUI_O_ID_DO_ELITE',
  pro_yearly: 'price_COLE_AQUI_O_ID_DO_ANUAL',
  lifetime: 'price_COLE_AQUI_O_ID_DO_VITALICIO',
}
\`\`\`

## 🧪 Passo 5: Testar Pagamentos

Antes de ativar para clientes reais, teste o sistema:

1. Use o cartão de teste do Stripe:
   - **Número**: 4242 4242 4242 4242
   - **Data**: Qualquer data futura
   - **CVC**: Qualquer 3 dígitos
   - **CEP**: Qualquer CEP válido

2. Faça um teste de compra no seu app
3. Verifique se o pagamento aparece em **Payments** no Dashboard

## 🔔 Passo 6: Configurar Webhooks (ESSENCIAL)

Webhooks são notificações que o Stripe envia quando eventos acontecem. Isso é ESSENCIAL para processar pagamentos corretamente!

### Para Desenvolvimento Local (Teste)

1. Instale o Stripe CLI:
   \`\`\`bash
   # macOS (Homebrew)
   brew install stripe/stripe-cli/stripe
   
   # Windows (Scoop)
   scoop install stripe
   
   # Linux
   wget https://github.com/stripe/stripe-cli/releases/download/v1.17.0/stripe_1.17.0_linux_x86_64.tar.gz
   tar -xvf stripe_1.17.0_linux_x86_64.tar.gz
   \`\`\`

2. Faça login no Stripe CLI:
   \`\`\`bash
   stripe login
   \`\`\`

3. Inicie o túnel de webhooks:
   \`\`\`bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   \`\`\`

4. Copie o **webhook signing secret** exibido (começa com `whsec_...`)

5. Adicione ao `.env.local`:
   \`\`\`
   STRIPE_WEBHOOK_SECRET=whsec_SEU_SECRET_AQUI
   \`\`\`

### Para Produção (Vercel)

1. No Dashboard do Stripe, vá em **Developers** > **Webhooks**
2. Clique em "Add endpoint"
3. Preencha:
   - **Endpoint URL**: `https://hypergym.vercel.app/api/stripe/webhook`
   - **Events to send**:
     - `setup_intent.created`
     - `setup_intent.succeeded`
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.paid`
     - `invoice.payment_failed`
4. Clique em "Add endpoint"
5. Copie o **Signing secret** (começa com `whsec_...`)
6. No Vercel, vá em **Settings** > **Environment Variables**
7. Adicione:
   - Key: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_SEU_SECRET_AQUI`
   - Environment: Production

### Testar Webhooks

No terminal, execute:
\`\`\`bash
stripe trigger checkout.session.completed
\`\`\`

Você deve ver os logs no seu terminal do Next.js mostrando que o webhook foi recebido!

## 🚀 Passo 7: Ativar Modo Produção

Quando estiver pronto para aceitar pagamentos reais:

1. No Dashboard do Stripe, clique em "Activate account"
2. Complete a verificação de identidade:
   - Upload de documento (RG ou CNH)
   - Confirmação de dados pessoais
   - Informações da empresa (se CNPJ)

3. Após aprovação, vá em **Developers** > **API keys**
4. Mude para "Live mode" (toggle no topo)
5. Copie as novas chaves (agora começam com `pk_live_` e `sk_live_`)
6. No Vercel, atualize as Environment Variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...`
   - `STRIPE_SECRET_KEY=sk_live_...`

7. Configure o webhook de produção (repita o Passo 6 para produção)

## 💳 Como Funciona o Recebimento

- **Quando**: Pagamentos são transferidos automaticamente em até 7 dias úteis
- **Para onde**: Direto na sua conta bancária cadastrada
- **Taxas**: ~4.5% + R$0.39 por transação no Brasil
- **Exemplo**:
  - Venda de R$ 39,90
  - Taxa Stripe: R$ 2.19
  - Você recebe: R$ 37,71

## 📊 Tipos de Eventos do Webhook

Entenda o que cada evento significa:

| Evento | Quando acontece | O que fazer |
|--------|----------------|-------------|
| `setup_intent.created` | Cliente inicia configuração de pagamento | Registrar que o processo começou |
| `setup_intent.succeeded` | Cartão salvo com sucesso | Confirmar método de pagamento |
| `checkout.session.completed` | Pagamento concluído | **Ativar recursos premium** |
| `customer.subscription.created` | Nova assinatura criada | Ativar acesso recorrente |
| `customer.subscription.updated` | Assinatura alterada | Atualizar nível de acesso |
| `customer.subscription.deleted` | Assinatura cancelada | **Remover acesso premium** |
| `invoice.paid` | Fatura paga (renovação) | Confirmar renovação |
| `invoice.payment_failed` | Falha no pagamento | Notificar usuário |

## 📊 Acompanhamento

No Dashboard do Stripe você pode:
- Ver todas as vendas em tempo real
- Acompanhar assinaturas ativas
- Gerar relatórios financeiros
- Gerenciar reembolsos
- Ver previsão de transferências
- Monitorar webhooks enviados

## 🆘 Problemas Comuns

### "Chave API inválida"
- Verifique se copiou as chaves corretamente
- Certifique-se de estar usando as chaves do modo correto (test/live)
- Reinicie o servidor após adicionar as variáveis de ambiente

### "Pagamento recusado"
- No modo test, use apenas os cartões de teste do Stripe
- No modo live, o cartão do cliente deve ter saldo

### "Webhook não funcionando"
- Verifique se o signing secret está correto
- Certifique-se de que a URL é acessível publicamente
- Verifique os logs em "Developers > Webhooks" no Stripe
- Use o Stripe CLI para testar localmente: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### "Erro 401 no webhook"
- O signing secret está incorreto ou ausente
- Verifique a variável `STRIPE_WEBHOOK_SECRET`

### "Eventos não estão sendo processados"
- Verifique os logs do servidor
- Certifique-se de que o webhook está configurado para os eventos corretos
- Use `stripe logs tail` para ver eventos em tempo real

## 🔍 Debug de Webhooks

Para debugar webhooks em desenvolvimento:

\`\`\`bash
# Terminal 1: Rodar o app
npm run dev

# Terminal 2: Escutar webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Terminal 3: Enviar eventos de teste
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
stripe trigger invoice.paid
\`\`\`

## 📞 Suporte

- **Stripe Brasil**: https://support.stripe.com/
- **Documentação**: https://stripe.com/docs
- **Status do Sistema**: https://status.stripe.com/
- **Webhook Guide**: https://stripe.com/docs/webhooks

## ✅ Checklist Final

Antes de lançar, verifique:

- [ ] Conta Stripe criada e verificada
- [ ] Conta bancária adicionada e confirmada
- [ ] Chaves API adicionadas ao `.env.local` e Vercel
- [ ] Todos os produtos criados no Stripe
- [ ] Price IDs adicionados ao código
- [ ] Webhooks configurados em desenvolvimento
- [ ] Webhooks configurados em produção
- [ ] Webhook secret adicionado às variáveis de ambiente
- [ ] Eventos de webhook testados
- [ ] Pagamento teste funcionando
- [ ] Modo produção ativado
- [ ] Taxas do Stripe compreendidas
- [ ] Email de recibo configurado

## 🎯 Próximos Passos

Após configurar tudo:

1. **Implementar Banco de Dados**: Salve as compras e assinaturas
2. **Sistema de Emails**: Envie confirmações e recibos
3. **Dashboard Admin**: Monitore vendas e usuários
4. **Analytics**: Acompanhe conversões e cancelamentos
5. **Testes A/B**: Otimize preços e ofertas

---

🎉 **Parabéns!** Você está pronto para receber pagamentos!

Todos os pagamentos virão diretamente para sua conta bancária. O Stripe cuida de toda a segurança, processamento de cartões e conformidade com regulamentações.
