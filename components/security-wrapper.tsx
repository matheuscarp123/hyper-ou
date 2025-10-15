"use client"

import type React from "react"
import { useEffect } from "react"
import { SecurityManager } from "@/lib/security"
import { LICENSE_INFO, validateLicense } from "@/lib/license"

interface SecurityWrapperProps {
  children: React.ReactNode
}

export function SecurityWrapper({ children }: SecurityWrapperProps) {
  useEffect(() => {
    // Skip security in development
    if (process.env.NODE_ENV === "development") {
      console.log(`%c${LICENSE_INFO.copyright}`, "color: #dc2626; font-weight: bold; font-size: 16px;")
      return
    }

    const security = SecurityManager.getInstance()

    // Validar licença
    if (!validateLicense()) {
      console.warn("Licença não validada - modo limitado")
      return
    }

    // Ativar proteções apenas em produção
    if (typeof window !== "undefined" && !window.location.hostname.includes("localhost")) {
      security.enableAntiDebug()
      security.protectSource()
    }

    // Logs de copyright
    console.clear()
    console.log(`%c${LICENSE_INFO.copyright}`, "color: #dc2626; font-weight: bold; font-size: 16px;")
    console.log(`%cHyperGym v${LICENSE_INFO.version} - ${LICENSE_INFO.registrationId}`, "color: #666; font-size: 12px;")
    console.log(`%c${LICENSE_INFO.legalWarning}`, "color: #ff0000; font-weight: bold; font-size: 14px;")
    console.log(`%cContato: ${LICENSE_INFO.contact}`, "color: #0066cc; font-size: 12px;")
  }, [])

  return <>{children}</>
}
