"use client"

import { useEffect, useState } from "react"
import { AdManager } from "@/lib/ads"
import { PremiumManager } from "@/lib/premium"

interface AdBannerProps {
  id: string
  className?: string
}

export function AdBanner({ id, className = "" }: AdBannerProps) {
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    const adManager = AdManager.getInstance()
    const premiumManager = PremiumManager.getInstance()

    // Verificar se deve mostrar anúncios
    const showAds = adManager.shouldShowAds() && !premiumManager.hasFeature("adFree")
    setShouldShow(showAds)

    if (showAds) {
      // Delay para não impactar performance inicial
      setTimeout(() => {
        adManager.showBanner(id)
      }, 1000)
    }
  }, [id])

  if (!shouldShow) {
    return null
  }

  return <div id={id} className={`ad-banner w-full ${className}`} style={{ minHeight: "90px" }} />
}
