"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pill, Star, AlertTriangle, ArrowLeft, Filter } from "lucide-react"
import type { UserProfile } from "@/types"
import { SupplementCard } from "@/components/supplement-card"

// Base de dados de suplementos
const supplementsDatabase = {
  male: [
    {
      name: "Whey Protein",
      priority: 1,
      category: "essential" as const,
      timing: "Pós-treino",
      dosage: "25-30g",
      benefits: [
        "Síntese proteica muscular",
        "Recuperação acelerada",
        "Praticidade na ingestão",
        "Alto valor biológico",
        "Absorção rápida",
      ],
      description: "Proteína de alta qualidade essencial para hipertrofia. Fornece aminoácidos rapidamente absorvidos.",
      tips: "Combine com carboidratos simples no pós-treino para potencializar a absorção e recuperação muscular.",
    },
    {
      name: "Creatina",
      priority: 2,
      category: "essential" as const,
      timing: "Qualquer horário",
      dosage: "3-5g/dia",
      benefits: [
        "Aumento de força",
        "Maior volume muscular",
        "Melhora da potência",
        "Recuperação entre séries",
        "Ganho de massa magra",
      ],
      description: "Suplemento mais estudado e eficaz para ganho de força e massa muscular.",
      tips: "Não precisa de saturação. 3g diários são suficientes. Pode ser tomada com qualquer líquido.",
    },
    {
      name: "Multivitamínico",
      priority: 3,
      category: "important" as const,
      timing: "Manhã",
      dosage: "1 dose/dia",
      benefits: ["Suporte metabólico", "Função imunológica", "Energia celular", "Antioxidante", "Saúde geral"],
      description: "Garante aporte adequado de micronutrientes essenciais para o funcionamento otimizado do organismo.",
      tips: "Escolha versões com minerais quelatos para melhor absorção. Tome com alimentos gordurosos.",
    },
    {
      name: "Ômega 3",
      priority: 4,
      category: "important" as const,
      timing: "Com refeições",
      dosage: "1-2g/dia",
      benefits: [
        "Anti-inflamatório",
        "Saúde cardiovascular",
        "Função cerebral",
        "Recuperação muscular",
        "Saúde articular",
      ],
      description: "Ácidos graxos essenciais com potente ação anti-inflamatória e benefícios cardiovasculares.",
      tips: "Procure por EPA/DHA em proporção 2:1. Mantenha refrigerado para preservar a qualidade.",
    },
    {
      name: "BCAA",
      priority: 5,
      category: "optional" as const,
      timing: "Durante treino",
      dosage: "10-15g",
      benefits: ["Reduz catabolismo", "Energia durante treino", "Recuperação muscular", "Reduz fadiga central"],
      description: "Aminoácidos de cadeia ramificada que podem ajudar na preservação muscular durante treinos longos.",
      tips: "Mais útil em treinos em jejum ou muito longos. Se você consome proteína adequada, pode ser dispensável.",
      warning: "Não é essencial se você já consome whey protein e tem uma dieta rica em proteínas.",
    },
    {
      name: "Cafeína",
      priority: 6,
      category: "optional" as const,
      timing: "30min pré-treino",
      dosage: "200-400mg",
      benefits: [
        "Aumento de energia",
        "Foco mental",
        "Queima de gordura",
        "Melhora performance",
        "Reduz percepção de esforço",
      ],
      description: "Estimulante natural que melhora performance física e mental durante os treinos.",
      tips: "Evite após 16h para não prejudicar o sono. Comece com doses menores para avaliar tolerância.",
      warning: "Pode causar ansiedade, insônia e dependência. Evite se tiver problemas cardíacos.",
    },
    {
      name: "Feno Grego",
      priority: 7,
      category: "bonus" as const,
      timing: "Com refeições",
      dosage: "500mg/dia",
      benefits: ["Aumento de testosterona", "Melhora da libido", "Controle glicêmico", "Ganhos musculares"],
      description: "Erva natural que pode auxiliar no aumento dos níveis de testosterona e ganhos musculares.",
      tips: "Estudos mostram efetividade após 8-12 semanas de uso contínuo. Combine com treino de força.",
    },
    {
      name: "ZMA",
      priority: 8,
      category: "bonus" as const,
      timing: "Antes de dormir",
      dosage: "Conforme rótulo",
      benefits: ["Melhora do sono", "Recuperação noturna", "Suporte hormonal", "Função imunológica"],
      description: "Combinação de zinco, magnésio e vitamina B6 que pode melhorar a qualidade do sono e recuperação.",
      tips: "Tome com estômago vazio, longe de cálcio e ferro que podem interferir na absorção.",
    },
  ],
  female: [
    {
      name: "Whey Protein",
      priority: 1,
      category: "essential" as const,
      timing: "Pós-treino",
      dosage: "20-25g",
      benefits: [
        "Síntese proteica muscular",
        "Recuperação acelerada",
        "Praticidade na ingestão",
        "Controle do apetite",
        "Manutenção da massa magra",
      ],
      description: "Proteína de alta qualidade essencial para tonificação e desenvolvimento muscular feminino.",
      tips: "Ideal para mulheres que buscam tonificação sem ganho excessivo de volume muscular.",
    },
    {
      name: "Colágeno",
      priority: 2,
      category: "essential" as const,
      timing: "Manhã ou noite",
      dosage: "10-15g/dia",
      benefits: [
        "Saúde da pele",
        "Fortalecimento de unhas",
        "Saúde articular",
        "Elasticidade da pele",
        "Cabelos mais fortes",
      ],
      description: "Proteína estrutural importante para saúde da pele, cabelos, unhas e articulações.",
      tips: "Combine com vitamina C para potencializar a síntese de colágeno. Pode ser misturado em bebidas.",
    },
    {
      name: "Ferro",
      priority: 3,
      category: "important" as const,
      timing: "Manhã, jejum",
      dosage: "14-18mg/dia",
      benefits: [
        "Prevenção de anemia",
        "Transporte de oxigênio",
        "Energia e disposição",
        "Função cognitiva",
        "Sistema imunológico",
      ],
      description: "Mineral essencial, especialmente importante para mulheres devido ao ciclo menstrual.",
      tips: "Tome com vitamina C para melhor absorção. Evite com café, chá ou laticínios.",
      warning: "Faça exames regulares para monitorar os níveis. Excesso pode ser tóxico.",
    },
    {
      name: "Ácido Fólico",
      priority: 4,
      category: "important" as const,
      timing: "Manhã",
      dosage: "400mcg/dia",
      benefits: [
        "Saúde reprodutiva",
        "Formação de células",
        "Função neurológica",
        "Prevenção de defeitos",
        "Energia celular",
      ],
      description: "Vitamina B essencial para mulheres em idade reprodutiva e saúde geral.",
      tips: "Especialmente importante para mulheres que planejam engravidar ou estão grávidas.",
    },
    {
      name: "Ômega 3",
      priority: 5,
      category: "important" as const,
      timing: "Com refeições",
      dosage: "1-2g/dia",
      benefits: ["Saúde hormonal", "Anti-inflamatório", "Saúde cardiovascular", "Função cerebral", "Pele saudável"],
      description: "Ácidos graxos essenciais com benefícios especiais para a saúde hormonal feminina.",
      tips: "Pode ajudar a reduzir sintomas da TPM e melhorar a saúde da pele.",
    },
    {
      name: "Magnésio",
      priority: 6,
      category: "optional" as const,
      timing: "Noite",
      dosage: "200-400mg",
      benefits: ["Relaxamento muscular", "Melhora do sono", "Reduz cãibras", "Saúde óssea", "Controle da ansiedade"],
      description: "Mineral que ajuda no relaxamento muscular e pode melhorar a qualidade do sono.",
      tips: "Especialmente útil para mulheres que sofrem com cãibras menstruais ou insônia.",
    },
    {
      name: "Vitex (Agnus Castus)",
      priority: 7,
      category: "bonus" as const,
      timing: "Manhã",
      dosage: "400mg/dia",
      benefits: [
        "Equilíbrio hormonal",
        "Reduz sintomas TPM",
        "Regula ciclo menstrual",
        "Melhora humor",
        "Reduz acne hormonal",
      ],
      description: "Erva natural que pode ajudar no equilíbrio hormonal feminino e redução dos sintomas da TPM.",
      tips: "Efeitos podem levar 2-3 ciclos para aparecer. Consulte médico se estiver tomando anticoncepcionais.",
    },
    {
      name: "Probióticos",
      priority: 8,
      category: "bonus" as const,
      timing: "Manhã, jejum",
      dosage: "10-50 bilhões UFC",
      benefits: ["Saúde intestinal", "Imunidade", "Saúde íntima", "Absorção de nutrientes", "Controle do peso"],
      description:
        "Bactérias benéficas que promovem saúde intestinal e podem ter benefícios específicos para mulheres.",
      tips: "Procure por cepas específicas para saúde feminina, como Lactobacillus rhamnosus.",
    },
  ],
}

const categoryLabels = {
  essential: "Essencial",
  important: "Importante",
  optional: "Opcional",
  bonus: "Bônus",
}

export default function SupplementsPage() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({})
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile))
    } else {
      router.push("/onboarding")
    }
  }, [router])

  const supplements = userProfile.gender ? supplementsDatabase[userProfile.gender] : []

  const filteredSupplements = filter === "all" ? supplements : supplements.filter((s) => s.category === filter)

  const categories = [
    { id: "all", label: "Todos", count: supplements.length },
    { id: "essential", label: "Essenciais", count: supplements.filter((s) => s.category === "essential").length },
    { id: "important", label: "Importantes", count: supplements.filter((s) => s.category === "important").length },
    { id: "optional", label: "Opcionais", count: supplements.filter((s) => s.category === "optional").length },
    { id: "bonus", label: "Bônus", count: supplements.filter((s) => s.category === "bonus").length },
  ]

  return (
    <main className="min-h-screen bg-black relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-900">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-3 w-10 h-10 rounded-xl bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50"
            >
              <ArrowLeft size={20} />
            </Button>
            <Logo className="mr-3" size="sm" />
            <h1 className="text-xl font-bold">
              <span className="text-white">HYPER</span>
              <span className="text-red-600">GYM</span>
            </h1>
          </div>
        </div>

        <div className="p-6">
          {/* Title Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <Pill size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Suplementos</h2>
                <p className="text-gray-400">Ranking de prioridade para seus objetivos</p>
              </div>
            </div>

            {/* Aviso importante */}
            <Card className="bg-amber-500/10 border-amber-500/20 mb-6">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-400 mb-1">Aviso Importante</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Estas são sugestões baseadas em evidências científicas. Em caso de alergias, condições médicas ou
                      falta de efetividade, consulte um profissional de saúde qualificado antes de iniciar qualquer
                      suplementação.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">Filtrar por categoria:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={filter === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category.id)}
                  className="rounded-full"
                >
                  {category.label}
                  <span className="ml-1 text-xs opacity-70">({category.count})</span>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Lista de Suplementos */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSupplements.map((supplement, index) => (
              <SupplementCard key={supplement.name} supplement={supplement} index={index} />
            ))}
          </div>

          {/* Ranking visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star size={20} className="text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Ranking de Prioridade</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {supplements.slice(0, 8).map((supplement, index) => (
                    <div key={supplement.name} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold">{supplement.priority}</span>
                      </div>
                      <p className="text-sm font-medium text-white">{supplement.name}</p>
                      <p className="text-xs text-gray-400">{categoryLabels[supplement.category]}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
