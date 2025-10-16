/**
 * Sistema de controle de acesso por dispositivo
 * Garante que cada dispositivo tenha um acesso único e rastreável
 */

import { DeviceIdentifier } from "./device-id"

export class AccessControl {
  private static instance: AccessControl
  private deviceIdentifier: DeviceIdentifier

  private constructor() {
    this.deviceIdentifier = DeviceIdentifier.getInstance()
  }

  public static getInstance(): AccessControl {
    if (!AccessControl.instance) {
      AccessControl.instance = new AccessControl()
    }
    return AccessControl.instance
  }

  /**
   * Inicializa o controle de acesso
   */
  public initialize(): void {
    if (typeof window === "undefined") return

    const deviceInfo = this.deviceIdentifier.getDeviceInfo()

    // Registrar acesso
    this.deviceIdentifier.logAccess()

    // Log em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.log("🔐 Device ID:", deviceInfo.id)
      console.log("📱 Primeiro acesso:", deviceInfo.firstAccess)
      console.log("📊 Total de acessos:", deviceInfo.accessCount)
    }

    // Adicionar marcador visual em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      this.addDevBadge(deviceInfo.id)
    }
  }

  /**
   * Adiciona badge de device ID em desenvolvimento
   */
  private addDevBadge(deviceId: string): void {
    if (typeof document === "undefined") return

    const badge = document.createElement("div")
    badge.id = "dev-device-badge"
    badge.style.cssText = `
      position: fixed;
      bottom: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #22c55e;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 11px;
      font-family: monospace;
      z-index: 9999;
      border: 1px solid #22c55e;
    `
    badge.textContent = `Device: ${deviceId.substring(0, 12)}...`

    // Remover badge anterior se existir
    const existing = document.getElementById("dev-device-badge")
    if (existing) {
      existing.remove()
    }

    document.body.appendChild(badge)

    // Remover após 5 segundos
    setTimeout(() => {
      badge.style.opacity = "0"
      badge.style.transition = "opacity 1s"
      setTimeout(() => badge.remove(), 1000)
    }, 5000)
  }

  /**
   * Obtém ID único do dispositivo
   */
  public getDeviceId(): string {
    return this.deviceIdentifier.getDeviceId()
  }

  /**
   * Verifica se o usuário tem acesso
   */
  public hasAccess(): boolean {
    // Em desenvolvimento, sempre permitir acesso
    if (process.env.NODE_ENV === "development") {
      return true
    }

    // Validar device ID
    const deviceId = this.deviceIdentifier.getDeviceId()
    return deviceId !== null && deviceId.length > 0
  }

  /**
   * Registra evento de uso do app
   */
  public trackEvent(eventName: string, data?: Record<string, unknown>): void {
    if (typeof window === "undefined") return

    const event = {
      name: eventName,
      deviceId: this.deviceIdentifier.getDeviceId(),
      timestamp: Date.now(),
      data: data || {},
    }

    // Em produção, você pode enviar para analytics
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Event:", event)
    }

    // Salvar localmente para referência
    try {
      const eventsKey = "hypergym_events"
      const events = JSON.parse(localStorage.getItem(eventsKey) || "[]")
      events.push(event)

      // Manter apenas os últimos 50 eventos
      if (events.length > 50) {
        events.shift()
      }

      localStorage.setItem(eventsKey, JSON.stringify(events))
    } catch (error) {
      console.error("Erro ao salvar evento:", error)
    }
  }
}
