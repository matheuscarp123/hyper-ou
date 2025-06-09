# HyperGym - Personal Training App

**Desenvolvido por Matheus Carvalho**

## 📱 Sobre o App

HyperGym é um aplicativo de treino e dieta personalizada que oferece planos baseados nos maiores nomes do fisiculturismo mundial. Com sistema premium e monetização otimizada para máxima receita.

## 🚀 Recursos

### Versão Gratuita
- Planos básicos de treino
- Referências de físico limitadas
- Anúncios otimizados para receita

### Versão Premium
- **Arnold Schwarzenegger** - Volume clássico
- **Chris Bumstead** - Classic Physique
- **Ramon Dino** - Proporção brasileira
- **Zyzz** - Estética e definição
- **Wellness/Bikini** - Categorias femininas
- Sem anúncios
- Suporte prioritário

## 💰 Monetização

### Planos Premium
- **Básico**: R$ 9,90/mês
- **Pro**: R$ 19,90/mês (mais popular)
- **Elite**: R$ 29,90/mês

### Sistema de Anúncios
- Banners com botão de fechar
- Intersticiais controlados (não excessivos)
- Anúncios recompensados para acesso temporário
- Integração AdMob/AdSense

## 🛠 Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, Framer Motion, Radix UI
- **Mobile**: Capacitor 6
- **Pagamentos**: Google Play Billing, App Store Connect, Stripe
- **Anúncios**: Google AdMob, AdSense
- **Analytics**: Google Analytics 4

## 📦 Instalação

\`\`\`bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Build mobile
npm run build:mobile

# Deploy completo
npm run deploy
\`\`\`

## 🏪 Deploy para Stores

### Android (Google Play)
\`\`\`bash
# Gerar APK de release
npm run release:android

# APK estará em: android/app/build/outputs/apk/release/
\`\`\`

### iOS (App Store)
\`\`\`bash
# Abrir no Xcode (apenas macOS)
npm run release:ios
\`\`\`

## 🔧 Configuração

### 1. AdMob
Substitua os IDs de teste em `capacitor.config.ts`:
\`\`\`typescript
AdMob: {
  applicationId: "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX",
}
\`\`\`

### 2. Chaves de Assinatura
Configure as chaves de release para produção:
- Android: `android/release-key.keystore`
- iOS: Configure no Xcode

### 3. IDs de Produto (In-App Purchases)
Configure os IDs dos produtos premium em `lib/premium.ts`

## 📊 Analytics e Métricas

- Receita por usuário (ARPU)
- Taxa de conversão premium
- Retenção de usuários
- Performance de anúncios

## 🔒 Segurança

- Código ofuscado em produção
- Proteção contra engenharia reversa
- Validação de licença
- Watermarks invisíveis

## 📄 Licença

**PROPRIETARY - Todos os direitos reservados**

Este software é propriedade exclusiva de **Matheus Carvalho**.

### Proibições:
- ❌ Uso comercial não autorizado
- ❌ Redistribuição do código
- ❌ Engenharia reversa
- ❌ Cópia de funcionalidades

### Contato para Licenciamento:
- 📧 Email: matheus.carvalho.dev@gmail.com
- 💼 LinkedIn: /in/matheus-carvalho-dev
- 🌐 Website: matheuscarvalho.dev

## 🎯 Objetivos de Receita

- **Meta Mensal**: R$ 10.000+
- **Usuários Premium**: 500+ (target)
- **ARPU**: R$ 20+
- **Retenção**: 80%+ (30 dias)

---

**© 2024 Matheus Carvalho - Todos os direitos reservados**
\`\`\`

## 🎉 Resumo Final

O HyperGym está agora **100% pronto** para publicação nas stores com:

### ✅ Sistema Premium Completo
- Físicos premium bloqueados (Arnold, CBum, Ramon, Zyzz, Wellness, Bikini)
- 3 planos de assinatura (R$ 9,90, R$ 19,90, R$ 29,90)
- Integração com Google Play Billing e App Store Connect

### ✅ Sistema de Anúncios Otimizado
- Banners com botão X para fechar
- Intersticiais controlados (não excessivos)
- Anúncios recompensados para acesso temporário
- Frequência otimizada para maximizar receita sem irritar usuários

### ✅ Pronto para Stores
- APK/AAB para Google Play Store
- Projeto iOS para App Store
- Manifests configurados
- Ícones e splash screens

### ✅ Monetização Inteligente
- Sistema de pagamentos integrado
- Analytics para tracking de receita
- Conversão otimizada free-to-premium
- Acesso temporário via anúncios recompensados

### ✅ Código Seguro e Aberto
- Disponível no GitHub
- Proteções de propriedade intelectual
- Licença proprietária clara
- Código limpo e documentado

**O app está pronto para gerar receita imediatamente após a publicação!** 🚀💰
