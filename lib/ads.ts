// Sistema de Anúncios Otimizado para Receita
export class AdManager {
  private static instance: AdManager
  private adConfig = {
    // IDs reais de produção (substitua pelos seus)
    banner: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX",
    interstitial: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX",
    rewarded: "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX",
    // Configurações de frequência para maximizar receita sem irritar usuários
    interstitialFrequency: 3, // A cada 3 ações
    bannerRefreshRate: 30000, // 30 segundos
    maxAdsPerSession: 8, // Máximo 8 anúncios por sessão
  }

  private adCounter = 0
  private sessionAds = 0
  private lastInterstitial = 0

  public static getInstance(): AdManager {
    if (!AdManager.instance) {
      AdManager.instance = new AdManager()
    }
    return AdManager.instance
  }

  constructor() {
    this.initializeAds()
  }

  private async initializeAds(): Promise<void> {
    if (typeof window === "undefined") return

    // Inicializar AdMob para mobile
    if (this.isMobileApp()) {
      await this.initializeAdMob()
    }

    // Inicializar AdSense para web
    if (this.isWebApp()) {
      await this.initializeAdSense()
    }
  }

  private async initializeAdMob(): Promise<void> {
    // Integração com Capacitor AdMob
    try {
      // const { AdMob } = await import('@capacitor-community/admob')
      // await AdMob.initialize({
      //   requestTrackingAuthorization: true,
      //   testingDevices: ['YOUR_TESTING_DEVICE_ID'],
      //   initializeForTesting: false
      // })
      console.log("AdMob initialized")
    } catch (error) {
      console.error("Erro ao inicializar AdMob:", error)
    }
  }

  private async initializeAdSense(): Promise<void> {
    // Carregar Google AdSense
    if (!document.querySelector('script[src*="adsbygoogle"]')) {
      const script = document.createElement("script")
      script.async = true
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
      script.crossOrigin = "anonymous"
      document.head.appendChild(script)
    }
  }

  public shouldShowAds(): boolean {
    // Verificar se usuário é premium
    const premiumStatus = localStorage.getItem("hypergym_premium")
    if (premiumStatus === "true") return false

    // Verificar limite de anúncios por sessão
    if (this.sessionAds >= this.adConfig.maxAdsPerSession) return false

    return true
  }

  public async showBanner(containerId: string): Promise<boolean> {
    if (!this.shouldShowAds()) return false

    try {
      const container = document.getElementById(containerId)
      if (!container) return false

      // Criar banner com botão de fechar
      container.innerHTML = `
        <div class="ad-container relative bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden" style="min-height: 90px;">
          <button class="ad-close absolute top-2 right-2 z-10 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-xs transition-all" onclick="this.parentElement.parentElement.style.display='none'">
            ×
          </button>
          <div class="ad-content p-4 text-center">
            <div class="text-sm text-gray-400 mb-2">Anúncio</div>
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded">
              <div class="font-bold">Upgrade para Premium</div>
              <div class="text-xs mt-1">Remova anúncios e desbloqueie todos os recursos</div>
            </div>
          </div>
        </div>
      `

      this.sessionAds++

      // Auto-refresh banner
      setTimeout(() => {
        if (this.shouldShowAds()) {
          this.showBanner(containerId)
        }
      }, this.adConfig.bannerRefreshRate)

      return true
    } catch (error) {
      console.error("Erro ao exibir banner:", error)
      return false
    }
  }

  public async showInterstitial(): Promise<boolean> {
    if (!this.shouldShowAds()) return false

    // Controlar frequência de intersticiais
    this.adCounter++
    if (this.adCounter % this.adConfig.interstitialFrequency !== 0) return false

    // Evitar spam de intersticiais
    const now = Date.now()
    if (now - this.lastInterstitial < 60000) return false // Mínimo 1 minuto entre intersticiais

    this.lastInterstitial = now

    try {
      // Criar overlay de intersticial
      const overlay = document.createElement("div")
      overlay.className = "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
      overlay.innerHTML = `
        <div class="bg-gray-900 rounded-2xl border border-gray-800 max-w-sm mx-4 relative">
          <button class="absolute top-4 right-4 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white font-bold transition-all" onclick="this.parentElement.parentElement.remove()">
            ×
          </button>
          <div class="p-8 text-center">
            <div class="text-2xl mb-4">🎯</div>
            <h3 class="text-xl font-bold text-white mb-2">Maximize seus Resultados!</h3>
            <p class="text-gray-400 mb-6">Upgrade para Premium e tenha acesso aos melhores planos de treino dos maiores fisiculturistas do mundo.</p>
            <button class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all" onclick="window.location.href='/premium'">
              Fazer Upgrade Agora
            </button>
            <div class="text-xs text-gray-500 mt-4">Anúncio será fechado automaticamente em <span id="countdown">5</span>s</div>
          </div>
        </div>
      `

      document.body.appendChild(overlay)
      this.sessionAds++

      // Countdown para fechar automaticamente
      let countdown = 5
      const countdownEl = overlay.querySelector("#countdown")
      const timer = setInterval(() => {
        countdown--
        if (countdownEl) countdownEl.textContent = countdown.toString()
        if (countdown <= 0) {
          clearInterval(timer)
          overlay.remove()
        }
      }, 1000)

      return true
    } catch (error) {
      console.error("Erro ao exibir intersticial:", error)
      return false
    }
  }

  public async showRewardedAd(onReward: () => void): Promise<boolean> {
    if (this.sessionAds >= this.adConfig.maxAdsPerSession) {
      alert("Limite de anúncios atingido. Upgrade para Premium para acesso ilimitado!")
      return false
    }

    try {
      // Criar anúncio recompensado
      const overlay = document.createElement("div")
      overlay.className = "fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
      overlay.innerHTML = `
        <div class="bg-gray-900 rounded-2xl border border-gray-800 max-w-sm mx-4">
          <div class="p-8 text-center">
            <div class="text-4xl mb-4">🎁</div>
            <h3 class="text-xl font-bold text-white mb-2">Ganhe Acesso Temporário!</h3>
            <p class="text-gray-400 mb-6">Assista a este anúncio e desbloqueie este conteúdo premium por 24 horas.</p>
            <div class="space-y-3">
              <button id="watch-ad" class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all">
                Assistir Anúncio (30s)
              </button>
              <button class="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition-all" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      `

      document.body.appendChild(overlay)

      // Simular anúncio recompensado
      const watchBtn = overlay.querySelector("#watch-ad") as HTMLButtonElement
      watchBtn.onclick = () => {
        watchBtn.innerHTML = 'Assistindo... <span id="ad-countdown">30</span>s'
        watchBtn.disabled = true

        let adCountdown = 30
        const adTimer = setInterval(() => {
          adCountdown--
          const countdownEl = overlay.querySelector("#ad-countdown")
          if (countdownEl) countdownEl.textContent = adCountdown.toString()

          if (adCountdown <= 0) {
            clearInterval(adTimer)
            overlay.remove()
            onReward()
            this.sessionAds++
          }
        }, 1000)
      }

      return true
    } catch (error) {
      console.error("Erro ao exibir anúncio recompensado:", error)
      return false
    }
  }

  private isMobileApp(): boolean {
    return (
      typeof window !== "undefined" &&
      (/Android/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent)) &&
      window.location.protocol === "capacitor:"
    )
  }

  private isWebApp(): boolean {
    return typeof window !== "undefined" && !this.isMobileApp()
  }

  // Métodos para integração com stores
  public getAdRevenue(): number {
    // Retornar receita estimada (integrar com analytics reais)
    return this.sessionAds * 0.05 // $0.05 por anúncio (exemplo)
  }

  public resetSession(): void {
    this.sessionAds = 0
    this.adCounter = 0
  }
}
