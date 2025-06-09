"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { UserProfile } from "@/types"
import { PhysiqueCard } from "@/components/physique-card"

// Referências de físico para homens
const malePhysiques = [
  {
    id: "arnold",
    name: "Arnold Schwarzenegger",
    description: "Volume clássico e simetria",
    svgPath: "M50 0 L65 20 L60 50 L75 80 L60 110 L70 150 L55 200 L45 200 L30 150 L40 110 L25 80 L40 50 L35 20 Z",
    category: "bodybuilder",
  },
  {
    id: "cbum",
    name: "Chris Bumstead",
    description: "Classic Physique moderno",
    svgPath: "M50 0 L60 25 L55 55 L70 85 L55 115 L65 155 L52 200 L48 200 L35 155 L45 115 L30 85 L45 55 L40 25 Z",
    category: "bodybuilder",
  },
  {
    id: "ramon",
    name: "Ramon Dino",
    description: "Proporção e definição",
    svgPath: "M50 0 L58 22 L54 52 L68 82 L53 112 L62 152 L51 200 L49 200 L38 152 L47 112 L32 82 L46 52 L42 22 Z",
    category: "bodybuilder",
  },
  {
    id: "zyzz",
    name: "Zyzz",
    description: "Estética e definição",
    svgPath: "M50 0 L55 28 L52 58 L65 88 L51 118 L58 158 L50 200 L50 200 L42 158 L49 118 L35 88 L48 58 L45 28 Z",
    category: "aesthetic",
  },
  {
    id: "cristiano",
    name: "Cristiano Ronaldo",
    description: "Atlético e definido",
    svgPath: "M50 0 L58 25 L54 55 L62 85 L50 115 L58 155 L50 200 L50 200 L42 155 L50 115 L38 85 L46 55 L42 25 Z",
    category: "athlete",
  },
  {
    id: "henry",
    name: "Henry Cavill",
    description: "Musculoso e proporcional",
    svgPath: "M50 0 L62 22 L58 52 L70 82 L58 112 L66 152 L53 200 L47 200 L34 152 L42 112 L30 82 L42 52 L38 22 Z",
    category: "actor",
  },
  {
    id: "hemsworth",
    name: "Chris Hemsworth",
    description: "Físico de super-herói",
    svgPath: "M50 0 L63 20 L59 50 L72 80 L59 110 L68 150 L54 200 L46 200 L32 150 L41 110 L28 80 L41 50 L37 20 Z",
    category: "actor",
  },
  {
    id: "michael",
    name: "Michael B. Jordan",
    description: "Atlético e definido",
    svgPath: "M50 0 L60 22 L56 52 L66 82 L54 112 L62 152 L51 200 L49 200 L38 152 L46 112 L34 82 L44 52 L40 22 Z",
    category: "actor",
  },
]

// Referências de físico para mulheres
const femalePhysiques = [
  {
    id: "wellness",
    name: "Wellness",
    description: "Foco em glúteos e pernas",
    svgPath: "M50 5 L58 25 L55 50 L65 75 L50 110 L68 160 L52 200 L48 200 L32 160 L50 110 L35 75 L45 50 L42 25 Z",
    category: "bodybuilder",
  },
  {
    id: "bikini",
    name: "Bikini",
    description: "Definição e proporção",
    svgPath: "M50 5 L55 28 L52 52 L60 78 L50 112 L62 162 L51 200 L49 200 L38 162 L50 112 L40 78 L48 52 L45 28 Z",
    category: "bodybuilder",
  },
  {
    id: "figure",
    name: "Figure",
    description: "Mais muscularidade",
    svgPath: "M50 2 L62 28 L58 55 L72 80 L58 115 L70 160 L54 200 L46 200 L30 160 L42 115 L28 80 L42 55 L38 28 Z",
    category: "bodybuilder",
  },
  {
    id: "physique",
    name: "Women's Physique",
    description: "Muscularidade avançada",
    svgPath: "M50 0 L68 25 L64 50 L80 75 L65 110 L78 155 L55 200 L45 200 L22 155 L35 110 L20 75 L36 50 L32 25 Z",
    category: "bodybuilder",
  },
  {
    id: "goulart",
    name: "Izabel Goulart",
    description: "Modelo fitness",
    svgPath: "M50 5 L56 25 L53 50 L58 75 L48 110 L58 160 L50 200 L50 200 L42 160 L52 110 L42 75 L47 50 L44 25 Z",
    category: "model",
  },
  {
    id: "alba",
    name: "Jessica Alba",
    description: "Tonificada e proporcional",
    svgPath: "M50 5 L54 28 L51 52 L56 78 L48 112 L56 162 L50 200 L50 200 L44 162 L52 112 L44 78 L49 52 L46 28 Z",
    category: "actor",
  },
  {
    id: "serena",
    name: "Serena Williams",
    description: "Atlética e poderosa",
    svgPath: "M50 5 L60 25 L57 50 L68 75 L55 110 L65 160 L52 200 L48 200 L35 160 L45 110 L32 75 L43 50 L40 25 Z",
    category: "athlete",
  },
  {
    id: "alex",
    name: "Alex Morgan",
    description: "Atlética e definida",
    svgPath: "M50 5 L56 28 L53 52 L60 78 L48 112 L58 162 L50 200 L50 200 L42 162 L52 112 L40 78 L47 52 L44 28 Z",
    category: "athlete",
  },
]

export default function PhysiquePage() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({})
  const [selectedPhysique, setSelectedPhysique] = useState<string>("")
  const [category, setCategory] = useState<string>("all")

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile))
    } else {
      router.push("/onboarding")
    }
  }, [router])

  const handleSelectPhysique = (id: string) => {
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
  const filteredPhysiques = physiques.filter((p) => category === "all" || p.category === category)

  const categories = [
    { id: "all", name: "Todos" },
    { id: "bodybuilder", name: "Fisiculturistas" },
    { id: "athlete", name: "Atletas" },
    { id: "actor", name: "Atores/Atrizes" },
    { id: "model", name: "Modelos" },
    { id: "aesthetic", name: "Estética" },
  ]

  const genderTitle = userProfile.gender === "female" ? "Referências Femininas" : "Referências Masculinas"

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
          <p className="text-gray-400 mb-8">Selecione o físico que você deseja alcançar</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {categories.map((cat) => (
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredPhysiques.map((physique, index) => (
              <PhysiqueCard
                key={physique.id}
                physique={physique}
                isSelected={selectedPhysique === physique.id}
                onSelect={handleSelectPhysique}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {selectedPhysique && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent flex justify-center"
            >
              <Button size="lg" className="px-8 font-bold text-lg" onClick={handleContinue}>
                GERAR MEU PLANO <ArrowRight className="ml-2" size={18} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  )
}
