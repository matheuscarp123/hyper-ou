"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import type { UserProfile, FitnessProfile, Workout } from "@/types"

const loadingMessages = [
  "Analisando seu perfil...",
  "Consultando especialistas em hipertrofia...",
  "Criando sua rotina de treino personalizada...",
  "Calculando seus macronutrientes ideais...",
  "Montando seu plano de dieta...",
  "Finalizando seu plano de dominação...",
]

export default function LoadingPage() {
  const router = useRouter()
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Recuperar perfil do usuário
    const storedProfile = localStorage.getItem("userProfile")
    if (!storedProfile) {
      router.push("/onboarding")
      return
    }

    const userProfile = JSON.parse(storedProfile) as UserProfile

    // Alternar mensagens de carregamento
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    // Simular progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 150)

    // Gerar planos (simulado)
    const generatePlans = async () => {
      try {
        // Simular tempo de processamento
        await new Promise((resolve) => setTimeout(resolve, 15000))

        // Gerar plano baseado no perfil
        const fitnessProfile: FitnessProfile = {
          user: userProfile,
          workout: generateWorkoutPlan(userProfile),
          diet: generateDietPlan(userProfile),
        }

        localStorage.setItem("fitnessProfile", JSON.stringify(fitnessProfile))
        router.push("/dashboard")
      } catch (error) {
        console.error("Erro ao gerar planos:", error)
        router.push("/")
      }
    }

    generatePlans()

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-0 bg-black bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.08)_0%,_rgba(0,0,0,0)_60%)]"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="z-10 flex flex-col items-center text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <Logo size="lg" />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Construindo seu plano
        </motion.h2>

        <div className="h-8 mt-4 relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400"
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          className="w-full max-w-md mt-8 bg-gray-900 rounded-full h-2 overflow-hidden"
          initial={{ width: "60%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="bg-gradient-to-r from-red-600 to-red-500 h-2"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-red-900/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />
      </motion.div>
    </main>
  )
}

// Função para gerar plano de treino baseado no perfil e dias disponíveis
function generateWorkoutPlan(userProfile: UserProfile): Workout {
  const { physique, trainingDays = 3 } = userProfile

  // Definir o tipo de divisão baseado nos dias disponíveis
  let split = ""

  switch (trainingDays) {
    case 2:
      split = "Full Body 2x"
      break
    case 3:
      split = "ABC (Corpo dividido em 3)"
      break
    case 4:
      split = "Upper/Lower 2x"
      break
    case 5:
      split = "ABCDE (5 grupos musculares)"
      break
    case 6:
      split = "PPL 2x (Push/Pull/Legs)"
      break
    default:
      split = "ABC (Corpo dividido em 3)"
  }

  // Plano básico para Arnold com 3 dias
  const arnoldPlan: Workout = {
    split,
    routine: [
      {
        day: "Dia A",
        focus: "Peito e Tríceps",
        exercises: [
          {
            name: "Supino Reto",
            sets: "5",
            reps: "8-12",
            importance:
              "Exercício fundamental para desenvolvimento do peitoral, essencial para o volume torácico característico de Arnold.",
            technique:
              "Mantenha os cotovelos em ângulo de 45° em relação ao corpo e desça a barra até tocar levemente o peito.",
          },
          {
            name: "Supino Inclinado",
            sets: "4",
            reps: "8-12",
            importance: "Desenvolve a parte superior do peitoral, criando a aparência completa e cheia do tórax.",
            technique:
              "Use um ângulo de 30° para máxima ativação do peitoral superior com mínimo envolvimento dos deltóides.",
          },
          {
            name: "Crucifixo",
            sets: "3",
            reps: "10-12",
            importance:
              "Isola o peitoral e proporciona maior amplitude de movimento, esticando as fibras para máximo crescimento.",
            technique:
              "Mantenha um leve dobramento nos cotovelos durante todo o movimento e sinta o alongamento no peitoral.",
          },
          {
            name: "Tríceps Testa",
            sets: "4",
            reps: "10-12",
            importance: "Desenvolve a cabeça longa do tríceps para braços volumosos e definidos.",
            technique: "Mantenha os cotovelos apontados para cima e não os deixe abrir durante o movimento.",
          },
          {
            name: "Tríceps Corda",
            sets: "3",
            reps: "12-15",
            importance: "Permite maior supinação no final do movimento, ativando todas as cabeças do tríceps.",
            technique: "Abra as cordas para os lados no final do movimento para máxima contração.",
          },
        ],
      },
      {
        day: "Dia B",
        focus: "Costas e Bíceps",
        exercises: [
          {
            name: "Barra Fixa",
            sets: "4",
            reps: "Máximo",
            importance: "Desenvolve a largura das costas, essencial para o formato em V do torso.",
            technique: "Use uma pegada mais larga que os ombros e puxe até o queixo ultrapassar a barra.",
          },
          {
            name: "Remada Curvada",
            sets: "4",
            reps: "10-12",
            importance: "Desenvolve a espessura das costas, complementando a largura para o físico completo.",
            technique: "Mantenha as costas paralelas ao solo e puxe o peso em direção ao umbigo.",
          },
          {
            name: "Pullover com Halteres",
            sets: "3",
            reps: "12-15",
            importance:
              "Expande a caixa torácica e trabalha a conexão entre peito e costas, técnica favorita de Arnold.",
            technique: "Mantenha apenas um leve dobramento nos cotovelos durante todo o movimento.",
          },
          {
            name: "Rosca Direta com Barra",
            sets: "4",
            reps: "8-12",
            importance: "Exercício básico para desenvolvimento dos bíceps, permitindo usar cargas mais pesadas.",
            technique: "Mantenha os cotovelos junto ao corpo e não balance durante o movimento.",
          },
          {
            name: "Rosca Concentrada",
            sets: "3",
            reps: "12-15",
            importance: "Isolamento do bíceps para máximo pico, técnica favorita de Arnold.",
            technique: "Apoie o cotovelo na parte interna da coxa e mantenha-o fixo durante todo o movimento.",
          },
        ],
      },
      {
        day: "Dia C",
        focus: "Pernas e Ombros",
        exercises: [
          {
            name: "Agachamento",
            sets: "5",
            reps: "8-12",
            importance: "Exercício fundamental para desenvolvimento completo das pernas e estimulação hormonal.",
            technique: "Mantenha o peito erguido e desça até que as coxas fiquem paralelas ao solo.",
          },
          {
            name: "Leg Press",
            sets: "4",
            reps: "10-15",
            importance: "Complementa o agachamento para desenvolvimento dos quadríceps.",
            technique:
              "Posicione os pés na parte superior da plataforma para maior ênfase nos glúteos e isquiotibiais.",
          },
          {
            name: "Desenvolvimento Militar",
            sets: "4",
            reps: "8-12",
            importance: "Desenvolve os três feixes do deltóide, criando ombros largos e imponentes.",
            technique: "Mantenha o core contraído e não arqueie as costas durante o movimento.",
          },
          {
            name: "Elevação Lateral",
            sets: "4",
            reps: "12-15",
            importance: "Isolamento do deltóide lateral, criando a largura característica dos ombros.",
            technique: "Mantenha um leve dobramento nos cotovelos e eleve os braços até a altura dos ombros.",
          },
          {
            name: "Panturrilha em Pé",
            sets: "5",
            reps: "15-20",
            importance: "Desenvolvimento das panturrilhas, ponto fraco de muitos fisiculturistas.",
            technique: "Eleve-se o mais alto possível e segure por 1 segundo no topo para máxima contração.",
          },
        ],
      },
    ],
  }

  // Retorna o plano baseado na referência escolhida ou um plano padrão
  return arnoldPlan
}

// Função para gerar plano de dieta baseado no perfil
function generateDietPlan(userProfile: UserProfile) {
  // Calcular necessidades calóricas baseadas no peso e altura
  const bmr = 88.362 + 13.397 * userProfile.weight + 4.799 * userProfile.height - 5.677 * 25 // Assumindo 25 anos
  const totalCalories = Math.round(bmr * 1.7) // Fator de atividade alta

  const proteinGrams = Math.round(userProfile.weight * 2.2) // 2.2g por kg
  const fatGrams = Math.round((totalCalories * 0.25) / 9) // 25% das calorias
  const carbGrams = Math.round((totalCalories - proteinGrams * 4 - fatGrams * 9) / 4)

  return {
    macros: {
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams,
    },
    meals: [
      {
        name: "Café da Manhã",
        time: "07:00",
        description: `6 claras de ovo + 2 gemas, 80g de aveia, 1 banana, 200ml de leite desnatado. Rico em proteínas para iniciar o dia com energia.`,
      },
      {
        name: "Lanche da Manhã",
        time: "10:00",
        description: `Whey protein (30g) + 1 maçã + 30g de amendoim. Combinação perfeita para manter o anabolismo.`,
      },
      {
        name: "Almoço",
        time: "13:00",
        description: `200g de frango grelhado, 150g de arroz integral, 100g de brócolis, salada verde com azeite. Refeição completa para sustentar o treino.`,
      },
      {
        name: "Pré-Treino",
        time: "16:00",
        description: `1 banana + 30g de whey protein + 200ml de água. Energia rápida para o treino intenso.`,
      },
      {
        name: "Pós-Treino",
        time: "18:30",
        description: `40g de whey protein + 1 banana + 30g de dextrose. Janela anabólica para máxima recuperação.`,
      },
      {
        name: "Jantar",
        time: "20:00",
        description: `200g de salmão grelhado, 200g de batata doce, aspargos refogados. Proteína de qualidade e carboidratos complexos.`,
      },
      {
        name: "Ceia",
        time: "22:30",
        description: `200g de queijo cottage + 30g de castanhas. Proteína de digestão lenta para a noite.`,
      },
    ],
  }
}
