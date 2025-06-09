import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  }

  return (
    <div className={cn("relative", className)}>
      <svg viewBox="0 0 100 100" className={cn("text-white", sizeClasses[size])}>
        {/* Barra do halter */}
        <rect x="25" y="45" width="50" height="10" fill="#E32636" />

        {/* Pesos do halter (esquerda) */}
        <rect x="5" y="35" width="20" height="30" rx="2" fill="white" />

        {/* Pesos do halter (direita) */}
        <rect x="75" y="35" width="20" height="30" rx="2" fill="white" />

        {/* Detalhes vermelhos nos pesos */}
        <rect x="0" y="40" width="5" height="20" rx="1" fill="#E32636" />
        <rect x="95" y="40" width="5" height="20" rx="1" fill="#E32636" />
      </svg>
    </div>
  )
}

export function LogoWithText({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Logo size="lg" />
      <h1 className="text-4xl font-black mt-4">
        <span className="text-white">HYPER</span>
        <span className="text-red-600">GYM</span>
      </h1>
    </div>
  )
}
