/**
 * Sistema de identificação única de dispositivo
 * Gera um fingerprint único e persistente para cada dispositivo
 */

export class DeviceIdentifier {
  private static instance: DeviceIdentifier
  private readonly STORAGE_KEY = "hypergym_device_id"
  private deviceId: string | null = null

  private constructor() {
    this.deviceId = this.getOrCreateDeviceId()
  }

  public static getInstance(): DeviceIdentifier {
    if (!DeviceIdentifier.instance) {
      DeviceIdentifier.instance = new DeviceIdentifier()
    }
    return DeviceIdentifier.instance
  }

  /**
   * Gera fingerprint único baseado em características do dispositivo
   */
  private generateFingerprint(): string {
    if (typeof window === "undefined") {
      return this.generateRandomId()
    }

    const components = [
      navigator.userAgent,
      navigator.language,
      screen.colorDepth,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || "unknown",
      navigator.platform,
    ]

    const fingerprint = components.join("|")
    return this.hashString(fingerprint)
  }

  /**
   * Hash simples para gerar ID a partir do fingerprint
   */
  private hashString(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(36) + Date.now().toString(36)
  }

  /**
   * Gera ID aleatório como fallback
   */
  private generateRandomId(): string {
    return (
      "device_" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      "_" +
      Date.now().toString(36)
    )
  }

  /**
   * Obtém ou cria ID único do dispositivo
   */
  private getOrCreateDeviceId(): string {
    if (typeof window === "undefined") {
      return this.generateRandomId()
    }

    try {
      // Tentar recuperar ID existente
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        return stored
      }

      // Gerar novo ID baseado em fingerprint
      const newId = this.generateFingerprint()
      localStorage.setItem(this.STORAGE_KEY, newId)

      // Também salvar em backup
      try {
        sessionStorage.setItem(this.STORAGE_KEY, newId)
      } catch (e) {
        console.warn("SessionStorage não disponível")
      }

      return newId
    } catch (error) {
      console.error("Erro ao gerar device ID:", error)
      return this.generateRandomId()
    }
  }

  /**
   * Retorna o ID único do dispositivo atual
   */
  public getDeviceId(): string {
    if (!this.deviceId) {
      this.deviceId = this.getOrCreateDeviceId()
    }
    return this.deviceId
  }

  /**
   * Verifica se é o primeiro acesso do dispositivo
   */
  public isFirstAccess(): boolean {
    if (typeof window === "undefined") return false

    try {
      const firstAccessKey = `${this.STORAGE_KEY}_first_access`
      const hasAccessed = localStorage.getItem(firstAccessKey)

      if (!hasAccessed) {
        localStorage.setItem(firstAccessKey, Date.now().toString())
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  /**
   * Registra acesso do dispositivo
   */
  public logAccess(): void {
    if (typeof window === "undefined") return

    try {
      const accessLog = {
        deviceId: this.getDeviceId(),
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        screenSize: `${screen.width}x${screen.height}`,
        language: navigator.language,
      }

      // Salvar último acesso
      localStorage.setItem(`${this.STORAGE_KEY}_last_access`, JSON.stringify(accessLog))

      // Incrementar contador de acessos
      const countKey = `${this.STORAGE_KEY}_access_count`
      const currentCount = Number.parseInt(localStorage.getItem(countKey) || "0")
      localStorage.setItem(countKey, (currentCount + 1).toString())
    } catch (error) {
      console.error("Erro ao registrar acesso:", error)
    }
  }

  /**
   * Obtém informações do dispositivo
   */
  public getDeviceInfo(): {
    id: string
    firstAccess: boolean
    accessCount: number
    lastAccess: string | null
  } {
    if (typeof window === "undefined") {
      return {
        id: this.getDeviceId(),
        firstAccess: false,
        accessCount: 0,
        lastAccess: null,
      }
    }

    try {
      const countKey = `${this.STORAGE_KEY}_access_count`
      const lastAccessKey = `${this.STORAGE_KEY}_last_access`

      return {
        id: this.getDeviceId(),
        firstAccess: this.isFirstAccess(),
        accessCount: Number.parseInt(localStorage.getItem(countKey) || "0"),
        lastAccess: localStorage.getItem(lastAccessKey),
      }
    } catch (error) {
      return {
        id: this.getDeviceId(),
        firstAccess: false,
        accessCount: 0,
        lastAccess: null,
      }
    }
  }
}
