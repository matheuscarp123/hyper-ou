"use client"

import type React from "react"
import { useEffect } from "react"
import { AccessControl } from "@/lib/access-control"

interface AccessControlProviderProps {
  children: React.ReactNode
}

export function AccessControlProvider({ children }: AccessControlProviderProps) {
  useEffect(() => {
    // Inicializar controle de acesso
    const accessControl = AccessControl.getInstance()
    accessControl.initialize()

    // Registrar primeira visualização
    accessControl.trackEvent("app_opened")
  }, [])

  return <>{children}</>
}
