"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Crown, Gift, Star } from "lucide-react"
import type { UserProfile } from "@/types"

// Referências de físico para homens
const malePhysiques = [
  {
    id: "arnold",
    name: "Arnold Schwarzenegger",
    description: "Volume clássico e simetria",
    svgPath: "M50 0 L65 20 L60 50 L75 80 L60 110 L70 150 L55 200 L45 200 L30 150 L40 110 L25 80 L40 50 L35 20 Z",
    category: "bodybuilder",
    premium: true,
  },
  {
    id: "cbum",
    name: "Chris Bumstead",
    description: "Classic Physique moderno",
    svgPath: "M50 0 L60 25 L55 55 L70 85 L55 115 L65 155 L52 200 L48 200 L35 155 L45 115 L30 85 L45 55 L40 25 Z",
    category: "bodybuilder",
    premium: true,
  },
  {
    id: "ramon",
    name: "Ramon Dino",
    description: "Proporção e definição brasileira",
    svgPath: "M50 0 L58 22 L54 52 L68 82 L53 112 L62 152 L51 200 L49 200 L38 152 L47 112 L32 82 L46 52 L42 22 Z",
    category: "bodybuilder",
    premium: true,
  },
  {
    id: "zyzz",
    name: "Zyzz",
    description: "Estética e definição",
    svgPath: "M50 0 L55 28 L52 58 L65 88 L51 118 L58 158 L50 200 L50 200 L42 158 L49 118 L35 88 L48 58 L45 28 Z",
    category: "aesthetic",
    premium: true,
  },
  {
    id: "larry",
    name: "Larry Wheels",
    description: "Força e massa extrema",
    svgPath: "M50 0 L68 25 L64 50 L80 75 L65 110 L78 155 L55 200 L45 200 L22 155 L35 110 L20 75 L36 50 L32 25 Z",
    category: "powerlifter",
    premium: true,
  },
  {
    id: "david",
    name: "David Laid",
    description: "Estética moderna",
    svgPath: "M50 0 L56 28 L53 58 L62 88 L50 118 L58 158 L50 200 L50 200 L42 158 L50 118 L38 88 L47 58 L44 28 Z",
    category: "aesthetic",
    premium: true,
  },
  {
    id: "cristiano",
    name: "Cristiano Ronaldo",
    description: "Atlético e definido",
    svgPath: "M50 0 L58 25 L54 55 L62 85 L50 115 L58 155 L50 200 L50 200 L42 155 L50 115 L38 85 L46 55 L42 25 Z",
    category: "athlete",
    premium: false,
  },
  {
    id: "henry",
    name: "Henry Cavill",
    description: "Musculoso e proporcional",
    svgPath: "M50 0 L62 22 L58 52 L70 82 L58 112 L66 152 L53 200 L47 200 L34 152 L42 112 L30 82 L42 52 L38 22 Z",
    category: "actor",
    premium: false,
  },
  {
    id: "hemsworth",
    name: "Chris Hemsworth",
    description: "Físico de super-herói",
    svgPath: "M50 0 L63 20 L59 50 L72 80 L59 110 L68 150 L54 200 L46 200 L32 150 L41 110 L28 80 L41 50 L37 20 Z",
    category: "actor",
    premium: false,
  },
  {
    id: "michael",
    name: "Michael B. Jordan",
    description: "Atlético e definido",
    svgPath: "M50 0 L60 22 L56 52 L66 82 L54 112 L62 152 L51 200 L49 200 L38 152 L46 112 L34 82 L44 52 L40 22 Z",
    category: "actor",
    premium: false,
  },
  {
    id: "the_rock",
    name: "Dwayne Johnson",
    description: "Massa e carisma",
    svgPath: "M50 0 L70 20 L66 50 L82 80 L68 110 L80 150 L58 200 L42 200 L20 150 L32 110 L18 80 L34 50 L30 20 Z",
    category: "actor",
    premium: false,
  },
  {
    id: "lebron",
    name: "LeBron James",
    description: "Atlético e poderoso",
    svgPath: "M50 0 L64 25 L60 55 L74 85 L60 115 L70 160 L54 200 L46 200 L30 160 L40 115 L26 85 L40 55 L36 25 Z",
    category: "athlete",
    premium: false,
  },
]

// Referências de físico para mulheres
const femalePhysiques = [
  {
    id: "wellness",
    name: "Wellness Category",
    description: "Foco em glúteos e pernas",
    svgPath: "M50 5 L58 25 L55 50 L65 75 L50 110 L68 160 L52 200 L48 200 L32 160 L50 110 L35 75 L45 50 L42 25 Z",
    category: "bodybuilder",
    premium: true,
  },
  {
    id: "bikini",
    name: "Bikini Category",
    description: "Definição e proporção",
    svgPath: "M50 5 L55 28 L52 52 L60 78 L50 112 L62 162 L51 200 L49 200 L38 162 L50 112 L40 78 L48 52 L45 28 Z",
    category: "bodybuilder",
    premium: true,
  },
  {
    id: "figure",
    name: "Figure Category",
    description: "Mais muscularidade",
    svgPath: "M50 2 L62 28 L58 55 L72 80 L58 115 L70 160 L54 200 L46 200 L30 160 L42 115 L28 80 L42 55 L38 28 Z",
    category: "bodybuilder",
    premium: true,
  },
  {
    id: "physique",
    name: "Women's Physique",
    description: "Muscularidade avançada",
    svgPath: "M50 0 L68 25 L64 50 L80 75 L65 110 L78 155 L55 200 L45 200 L22 155 L35 110 L20 75 L36 50 L32 25 Z",
    category: "bodybuilder",
    premium: true,
  },
  {
    id: "gracyanne",
    name: "Gracyanne Barbosa",
    description: "Fitness brasileira",
    svgPath: "M50 5 L60 25 L57 50 L68 75 L55 110 L65 160 L52 200 L48 200 L35 160 L45 110 L32 75 L43 50 L40 25 Z",
    category: "fitness",
    premium: true,
  },
  {
    id: "eva",
    name: "Eva Andressa",
    description: "Fitness e wellness",
    svgPath: "M50 5 L58 28 L55 52 L64 78 L52 112 L62 162 L51 200 L49 200 L38 162 L48 112 L36 78 L45 52 L42 28 Z",
    category: "fitness",
    premium: true,
  },
  {
    id: "goulart",
    name: "Izabel Goulart",
    description: "Modelo fitness",
    svgPath: "M50 5 L56 25 L53 50 L58 75 L48 110 L58 160 L50 200 L50 200 L42 160 L52 110 L42 75 L47 50 L44 25 Z",
    category: "model",
    premium: false,
  },
  {
    id: "alba",
    name: "Jessica Alba",
    description: "Tonificada e proporcional",
    svgPath: "M50 5 L54 28 L51 52 L56 78 L48 112 L56 162 L50 200 L50 200 L44 162 L52 112 L44 78 L49 52 L46 28 Z",
    category: "actor",
    premium: false,
  },
  {
    id: "serena",
    name: "Serena Williams",
    description: "Atlética e poderosa",
    svgPath: "M50 5 L60 25 L57 50 L68 75 L55 110 L65 160 L52 200 L48 200 L35 160 L45 110 L32 75 L43 50 L40 25 Z",
    category: "athlete",
    premium: false,
  },
  {
    id: "alex",
    name: "Alex Morgan",
    description: "Atlética e definida",
    svgPath: "M50 5 L56 28 L53 52 L60 78 L48 112 L58 162 L50 200 L50 200 L42 162 L52 112 L40 78 L47 52 L44 28 Z",
    category: "athlete",
    premium: false,
  },
  {
    id: "ronda",
    name: "Ronda Rousey",
    description: "Lutadora e atleta",
    svgPath: "M50 5 L58 25 L55 50 L66 75 L54 110 L64 160 L52 200 L48 200 L36 160 L46 110 L34 75 L45 50 L42 25 Z",
    category: "athlete",
    premium: false,
  },
]

function PhysiqueCard({ physique, isSelected, onSelect, index, isPremium }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      onClick={() => onSelect(physique.id)}
      className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 border-2 ${
        isSelected ? "border-red-600 scale-105 shadow-lg shadow-red-600/20" : "border-gray-800 hover:border-gray-700"
      }`}
    >
      <div className="bg-gradient-to-b from-gray-900 to-black p-6">
        {/* Premium Badge */}
        {isPremium && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-black rounded-full px-2 py-1 text-xs font-bold flex items-center gap-1">
            <Crown size={12} />
            PRO
          </div>
        )}

        {/* Silhueta SVG */}
        <div className="flex justify-center mb-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.1 + 0.3,
              duration: 0.8,
              type: "spring",
            }}
            className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent rounded-full blur-2xl"
            style={{
              opacity: isSelected ? 0.4 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
          <svg viewBox="0 0 100 200" className="h-40 w-auto relative z-10">
            <motion.path
              d={physique.svgPath}
              fill="currentColor"
              className={`transition-colors duration-300 ${isSelected ? "text-red-600" : "text-white"}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                transition: {
                  pathLength: { delay: index * 0.05, duration: 1.5, ease: "easeInOut" },
                  opacity: { delay: index * 0.05, duration: 0.3 },
                },
              }}
            />
          </svg>
        </div>

        {/* Nome e descrição */}
        <div className="text-center">
          <motion.h3
            className="font-bold text-lg text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
          >
            {physique.name}
          </motion.h3>
          <motion.p
            className="text-gray-400 text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
          >
            {physique.description}
          </motion.p>
        </div>

        {/* Indicador de seleção */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute top-3 right-3 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
            >
              ✓
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function PhysiquePage() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({})
  const [selectedPhysique, setSelectedPhysique] = useState<string>("")
  const [category, setCategory] = useState<string>("all")
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile))
    } else {
      router.push("/onboarding")
    }
  }, [router])

  const handleSelectPhysique = (id: string) => {
    const physique = physiques.find((p) => p.id === id)

    if (physique?.premium) {
      setShowPremiumModal(true)
      return
    }

    setSelectedPhysique(id)
  }

  const handleContinue = () => {
    if (selectedPhysique) {
      const updatedProfile = {
        ...userProfile,
        physique: selectedPhysique,
      }
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile))
      router.push("/loading")
    }
  }

  // Selecionar físicos baseado no gênero
  const physiques = userProfile.gender === "female" ? femalePhysiques : malePhysiques
  const filteredPhysiques = physiques.filter((p) => {
    if (category === "all") return true
    return p.category === category
  })

  // Filtrar categorias que têm conteúdo
  const availableCategories = [
    { id: "all", name: "Todos" },
    ...Array.from(new Set(physiques.map((p) => p.category))).map((cat) => {
      const categoryNames: Record<string, string> = {
        bodybuilder: "Fisiculturistas",
        athlete: "Atletas",
        actor: "Atores/Atrizes",
        aesthetic: "Estética",
        powerlifter: "Powerlifting",
        fitness: "Fitness",
        model: "Modelos",
      }
      return { id: cat, name: categoryNames[cat] || cat }
    }),
  ]

  const genderTitle = userProfile.gender === "female" ? "Referências Femininas" : "Referências Masculinas"
  const premiumCount = physiques.filter((p) => p.premium).length

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-8 relative">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.08)_0%,_rgba(0,0,0,0)_60%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-6xl"
      >
        <div className="flex items-center mb-8">
          <Logo className="mr-3" />
          <h1 className="text-2xl font-bold">
            <span className="text-white">HYPER</span>
            <span className="text-red-600">GYM</span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">{genderTitle}</h2>
          <p className="text-gray-400 mb-4">Selecione o físico que você deseja alcançar</p>

          {/* Premium CTA */}
          <Card className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border-yellow-500/30 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500 rounded-full">
                    <Star size={20} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Desbloqueie {premiumCount} Físicos Premium</h3>
                    <p className="text-sm text-gray-400">Arnold, CBum, Ramon, Zyzz, Wellness e muito mais!</p>
                  </div>
                </div>
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                  onClick={() => setShowPremiumModal(true)}
                >
                  <Crown className="mr-2" size={16} />
                  Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {availableCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={category === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat.id)}
              className="rounded-full"
            >
              {cat.name}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <AnimatePresence mode="wait">
            {filteredPhysiques.map((physique, index) => (
              <PhysiqueCard
                key={physique.id}
                physique={physique}
                isSelected={selectedPhysique === physique.id}
                onSelect={handleSelectPhysique}
                index={index}
                isPremium={physique.premium}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Fixed bottom button */}
        <AnimatePresence>
          {selectedPhysique && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent flex justify-center z-50"
            >
              <Button size="lg" className="px-8 font-bold text-lg" onClick={handleContinue}>
                GERAR MEU PLANO <ArrowRight className="ml-2" size={18} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Premium Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPremiumModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl border border-yellow-500/30 max-w-md w-full"
            >
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full w-fit">
                  <Crown size={32} className="text-black" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">Conteúdo Premium</h2>
                <p className="text-gray-400 mb-6">
                  Acesse os planos dos maiores fisiculturistas do mundo: Arnold, CBum, Ramon, Zyzz e muito mais!
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Planos detalhados dos campeões</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Dietas personalizadas</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Suplementação específica</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Sem anúncios</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold h-12">
                    <Crown className="mr-2" size={16} />
                    Fazer Upgrade - R$ 19,90/mês
                  </Button>

                  <Button variant="outline" className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10">
                    <Gift className="mr-2" size={16} />
                    Teste Grátis por 7 Dias
                  </Button>

                  <Button variant="ghost" className="w-full text-gray-400" onClick={() => setShowPremiumModal(false)}>
                    Continuar com Plano Gratuito
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
