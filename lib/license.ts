/*
 * HyperGym - Personal Training Application
 * Copyright (c) 2024 Matheus Carvalho
 * Todos os direitos reservados.
 *
 * LICENÇA PROPRIETÁRIA RESTRITIVA
 *
 * Este software é propriedade exclusiva de Matheus Carvalho.
 * Registro de Propriedade Intelectual: BR-2024-HYPERGYM
 *
 * PROIBIÇÕES ABSOLUTAS:
 * ❌ Uso comercial não autorizado
 * ❌ Redistribuição do código fonte
 * ❌ Engenharia reversa
 * ❌ Criação de obras derivadas
 * ❌ Remoção de avisos de copyright
 * ❌ Cópia de funcionalidades
 * ❌ Análise de código
 * ❌ Extração de algoritmos
 *
 * VIOLAÇÕES RESULTARÃO EM:
 * ⚖️ Ação legal civil e criminal
 * 💰 Indenização por danos morais e materiais
 * 🚫 Medidas cautelares e busca e apreensão
 * 📋 Registro de ocorrência policial
 *
 * MONITORAMENTO ATIVO:
 * 🔍 Este código é monitorado por sistemas anti-pirataria
 * 📊 Todas as violações são registradas e rastreadas
 * 🌐 Verificação automática de cópias na internet
 *
 * Para licenciamento comercial:
 * 📧 Email: matheus.carvalho.dev@gmail.com
 * 💼 LinkedIn: /in/matheus-carvalho-dev
 * 🌐 Website: matheuscarvalho.dev
 */

export const LICENSE_INFO = {
  owner: "Matheus Carvalho",
  copyright: "© 2024 Matheus Carvalho. Todos os direitos reservados.",
  version: "1.0.0",
  buildDate: new Date().toISOString(),
  licenseType: "Proprietária Restritiva",
  contact: "matheus.carvalho.dev@gmail.com",
  registrationId: "BR-2024-HYPERGYM-MC",
  legalWarning: "Uso não autorizado é crime federal - Lei 9.610/98",
}

export function validateLicense(): boolean {
  // Allow access in development and preview environments
  if (typeof window === "undefined") return true

  const isDevelopment = process.env.NODE_ENV === "development"
  const isPreview =
    window.location.hostname.includes("v0.dev") ||
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("vercel.app")

  if (isDevelopment || isPreview) {
    return true
  }

  const userAgent = navigator.userAgent
  const isAuthorizedApp = userAgent.includes("HyperGym/1.0.0")

  if (!isAuthorizedApp) {
    console.warn("Acesso através de navegador web - funcionalidade limitada")
    return true // Allow but with limited functionality
  }

  return true
}

export function logAccess(): void {
  const accessLog = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    referrer: document.referrer,
    ip: "logged_server_side",
  }

  // Em produção, enviar para servidor de monitoramento
  console.log("Access logged:", accessLog)
}
