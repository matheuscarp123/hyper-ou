// Proteções de segurança avançadas
export class SecurityManager {
  private static instance: SecurityManager
  private readonly appSignature = "HYPERGYM_MATHEUS_CARVALHO_2024"

  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager()
    }
    return SecurityManager.instance
  }

  // Criptografia de dados
  public encryptData(data: any): string {
    const jsonString = JSON.stringify(data)
    const encoded = btoa(jsonString)
    return `${this.appSignature}_${encoded}_${Date.now()}`
  }

  public decryptData(encryptedData: string): any {
    try {
      if (!encryptedData.includes(this.appSignature)) {
        throw new Error("Invalid signature")
      }
      const parts = encryptedData.split("_")
      const encoded = parts[1]
      const jsonString = atob(encoded)
      return JSON.parse(jsonString)
    } catch {
      return null
    }
  }

  // Verificação de integridade
  public verifyIntegrity(): boolean {
    const expectedElements = ["HYPERGYM", "Matheus Carvalho", "com.matheuscarvalho.hypergym"]

    return expectedElements.every((element) => document.documentElement.innerHTML.includes(element))
  }

  // Proteção contra debugging
  public enableAntiDebug(): void {
    if (typeof window !== "undefined") {
      // Detectar DevTools
      const devtools = { open: false }

      const threshold = 160
      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
          this.handleTamperDetection()
        }
      }, 500)

      // Desabilitar teclas de debug
      document.addEventListener("keydown", (e) => {
        if (
          e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && e.key === "I") ||
          (e.ctrlKey && e.shiftKey && e.key === "C") ||
          (e.ctrlKey && e.key === "u") ||
          (e.ctrlKey && e.key === "s")
        ) {
          e.preventDefault()
          this.handleTamperDetection()
        }
      })

      // Desabilitar clique direito
      document.addEventListener("contextmenu", (e) => {
        e.preventDefault()
        this.handleTamperDetection()
      })

      // Detectar seleção de texto suspeita
      document.addEventListener("selectstart", (e) => {
        if (e.ctrlKey) {
          e.preventDefault()
        }
      })

      // Detectar print screen
      document.addEventListener("keyup", (e) => {
        if (e.key === "PrintScreen") {
          this.handleTamperDetection()
        }
      })
    }
  }

  private handleTamperDetection(): void {
    console.clear()
    console.log("%cVIOLAÇÃO DETECTADA!", "color: red; font-size: 20px; font-weight: bold;")
    console.log("%cEste aplicativo é propriedade de Matheus Carvalho", "color: red; font-size: 14px;")
    console.log("%cUso não autorizado é crime federal", "color: red; font-size: 14px;")

    if (typeof window !== "undefined") {
      // Redirecionar para página de aviso
      window.location.href = "about:blank"
    }
  }

  // Watermark invisível
  public addWatermark(): void {
    if (typeof document !== "undefined") {
      const watermark = document.createElement("div")
      watermark.style.position = "fixed"
      watermark.style.top = "0"
      watermark.style.left = "0"
      watermark.style.width = "100%"
      watermark.style.height = "100%"
      watermark.style.pointerEvents = "none"
      watermark.style.zIndex = "9999"
      watermark.style.opacity = "0.005"
      watermark.style.fontSize = "12px"
      watermark.style.color = "#ffffff"
      watermark.innerHTML = `
        <div style="transform: rotate(-45deg); position: absolute; top: 50%; left: 50%;">
          HyperGym © 2024 Matheus Carvalho - Todos os direitos reservados
          <br>Uso não autorizado é crime - Lei 9.610/98
          <br>ID: ${Date.now()}-${Math.random().toString(36).substr(2, 9)}
        </div>
      `
      document.body.appendChild(watermark)
    }
  }

  // Proteção contra cópia de código
  public protectSource(): void {
    if (typeof window !== "undefined") {
      // Ofuscar console
      const originalLog = console.log
      console.log = (...args) => {
        originalLog("%cHyperGym - Propriedade de Matheus Carvalho", "color: #dc2626; font-weight: bold;")
      }

      // Detectar tentativas de acesso ao código
      Object.defineProperty(window, "source", {
        get: () => {
          this.handleTamperDetection()
          return undefined
        },
      })
    }
  }
}
