import type { UserProfile, Workout } from "@/types"

/**
 * Gera plano de treino personalizado baseado no perfil do usuário
 * Ajusta automaticamente o número de dias e a divisão muscular
 */
export async function generateWorkoutPlan(userProfile: UserProfile): Promise<Workout> {
  // Simular tempo de processamento
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const { trainingDays = 3 } = userProfile

  // Definir divisões de treino baseadas nos dias disponíveis
  const workoutSplits: Record<number, Workout> = {
    2: generate2DaySplit(),
    3: generate3DaySplit(),
    4: generate4DaySplit(),
    5: generate5DaySplit(),
    6: generate6DaySplit(),
  }

  // Retornar o plano apropriado ou usar o de 3 dias como padrão
  return workoutSplits[trainingDays] || workoutSplits[3]
}

// Plano de 2 dias - Full Body
function generate2DaySplit(): Workout {
  return {
    split: "Full Body 2x",
    routine: [
      {
        day: "Dia 1",
        focus: "Full Body A",
        exercises: [
          {
            name: "Agachamento",
            sets: "4",
            reps: "8-12",
            importance: "Exercício fundamental para desenvolvimento completo das pernas",
            technique: "Mantenha o peito erguido e desça até que as coxas fiquem paralelas ao solo.",
          },
          {
            name: "Supino Reto",
            sets: "4",
            reps: "8-12",
            importance: "Base para desenvolvimento do peitoral",
            technique: "Mantenha os cotovelos em ângulo de 45° e desça a barra até tocar o peito.",
          },
          {
            name: "Remada Curvada",
            sets: "4",
            reps: "10-12",
            importance: "Desenvolve a espessura das costas",
            technique: "Mantenha as costas paralelas ao solo e puxe o peso em direção ao umbigo.",
          },
          {
            name: "Desenvolvimento Militar",
            sets: "3",
            reps: "10-12",
            importance: "Desenvolve os três feixes do deltóide",
            technique: "Mantenha o core contraído e não arqueie as costas.",
          },
          {
            name: "Rosca Direta",
            sets: "3",
            reps: "10-12",
            importance: "Desenvolvimento dos bíceps",
            technique: "Mantenha os cotovelos junto ao corpo.",
          },
        ],
      },
      {
        day: "Dia 2",
        focus: "Full Body B",
        exercises: [
          {
            name: "Leg Press",
            sets: "4",
            reps: "10-15",
            importance: "Complementa o agachamento para desenvolvimento dos quadríceps",
            technique: "Posicione os pés na parte superior da plataforma.",
          },
          {
            name: "Supino Inclinado",
            sets: "4",
            reps: "8-12",
            importance: "Desenvolve a parte superior do peitoral",
            technique: "Use um ângulo de 30° para máxima ativação.",
          },
          {
            name: "Puxada Frontal",
            sets: "4",
            reps: "10-12",
            importance: "Trabalha o dorsal com ênfase na largura",
            technique: "Puxe a barra até a altura do peito.",
          },
          {
            name: "Elevação Lateral",
            sets: "3",
            reps: "12-15",
            importance: "Isolamento do deltóide lateral",
            technique: "Eleve os braços até a altura dos ombros.",
          },
          {
            name: "Tríceps na Polia",
            sets: "3",
            reps: "12-15",
            importance: "Desenvolvimento dos tríceps",
            technique: "Mantenha os cotovelos fixos próximos ao corpo.",
          },
        ],
      },
    ],
  }
}

// Plano de 3 dias - ABC
function generate3DaySplit(): Workout {
  return {
    split: "ABC (Corpo dividido em 3)",
    routine: [
      {
        day: "Dia A",
        focus: "Peito e Tríceps",
        exercises: [
          {
            name: "Supino Reto",
            sets: "4",
            reps: "8-12",
            importance: "Exercício fundamental para desenvolvimento do peitoral",
            technique: "Mantenha os cotovelos em ângulo de 45° em relação ao corpo.",
          },
          {
            name: "Supino Inclinado",
            sets: "3",
            reps: "8-12",
            importance: "Desenvolve a parte superior do peitoral",
            technique: "Use um ângulo de 30° para máxima ativação.",
          },
          {
            name: "Crucifixo",
            sets: "3",
            reps: "10-12",
            importance: "Isola o peitoral e proporciona maior amplitude",
            technique: "Mantenha um leve dobramento nos cotovelos.",
          },
          {
            name: "Tríceps Testa",
            sets: "3",
            reps: "10-12",
            importance: "Desenvolve a cabeça longa do tríceps",
            technique: "Mantenha os cotovelos apontados para cima.",
          },
          {
            name: "Tríceps Corda",
            sets: "3",
            reps: "12-15",
            importance: "Permite maior supinação no final do movimento",
            technique: "Abra as cordas para os lados no final.",
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
            importance: "Desenvolve a largura das costas",
            technique: "Use uma pegada mais larga que os ombros.",
          },
          {
            name: "Remada Curvada",
            sets: "4",
            reps: "10-12",
            importance: "Desenvolve a espessura das costas",
            technique: "Mantenha as costas paralelas ao solo.",
          },
          {
            name: "Puxada Frontal",
            sets: "3",
            reps: "10-12",
            importance: "Trabalha o dorsal com ênfase na largura",
            technique: "Puxe a barra até a altura do peito.",
          },
          {
            name: "Rosca Direta",
            sets: "4",
            reps: "8-12",
            importance: "Exercício básico para desenvolvimento dos bíceps",
            technique: "Mantenha os cotovelos junto ao corpo.",
          },
          {
            name: "Rosca Martelo",
            sets: "3",
            reps: "12-15",
            importance: "Trabalha o braquial e bíceps",
            technique: "Mantenha os punhos neutros durante todo o movimento.",
          },
        ],
      },
      {
        day: "Dia C",
        focus: "Pernas e Ombros",
        exercises: [
          {
            name: "Agachamento",
            sets: "4",
            reps: "8-12",
            importance: "Exercício fundamental para desenvolvimento completo das pernas",
            technique: "Mantenha o peito erguido e desça até as coxas ficarem paralelas.",
          },
          {
            name: "Leg Press",
            sets: "3",
            reps: "10-15",
            importance: "Complementa o agachamento para desenvolvimento dos quadríceps",
            technique: "Posicione os pés na parte superior da plataforma.",
          },
          {
            name: "Desenvolvimento Militar",
            sets: "4",
            reps: "8-12",
            importance: "Desenvolve os três feixes do deltóide",
            technique: "Mantenha o core contraído e não arqueie as costas.",
          },
          {
            name: "Elevação Lateral",
            sets: "4",
            reps: "12-15",
            importance: "Isolamento do deltóide lateral",
            technique: "Eleve os braços até a altura dos ombros.",
          },
          {
            name: "Panturrilha em Pé",
            sets: "4",
            reps: "15-20",
            importance: "Desenvolvimento das panturrilhas",
            technique: "Eleve-se o mais alto possível e segure por 1 segundo no topo.",
          },
        ],
      },
    ],
  }
}

// Plano de 4 dias - Upper/Lower
function generate4DaySplit(): Workout {
  return {
    split: "Upper/Lower 2x",
    routine: [
      {
        day: "Dia 1",
        focus: "Superiores A (Peito e Costas)",
        exercises: [
          {
            name: "Supino Reto",
            sets: "4",
            reps: "8-10",
            importance: "Exercício fundamental para desenvolvimento do peitoral",
            technique: "Mantenha os cotovelos em ângulo de 45°.",
          },
          {
            name: "Remada Curvada",
            sets: "4",
            reps: "8-10",
            importance: "Desenvolve a espessura das costas",
            technique: "Puxe o peso em direção ao umbigo.",
          },
          {
            name: "Supino Inclinado",
            sets: "3",
            reps: "10-12",
            importance: "Desenvolve a parte superior do peitoral",
            technique: "Use um ângulo de 30°.",
          },
          {
            name: "Puxada Frontal",
            sets: "3",
            reps: "10-12",
            importance: "Trabalha o dorsal com ênfase na largura",
            technique: "Puxe a barra até a altura do peito.",
          },
          {
            name: "Crucifixo",
            sets: "3",
            reps: "12-15",
            importance: "Isolamento do peitoral",
            technique: "Mantenha um leve dobramento nos cotovelos.",
          },
        ],
      },
      {
        day: "Dia 2",
        focus: "Inferiores A",
        exercises: [
          {
            name: "Agachamento",
            sets: "4",
            reps: "6-10",
            importance: "Exercício fundamental para desenvolvimento completo das pernas",
            technique: "Mantenha o peito erguido.",
          },
          {
            name: "Leg Press",
            sets: "4",
            reps: "10-15",
            importance: "Complementa o agachamento",
            technique: "Posicione os pés na parte superior da plataforma.",
          },
          {
            name: "Cadeira Extensora",
            sets: "3",
            reps: "12-15",
            importance: "Isolamento dos quadríceps",
            technique: "Contraia o músculo no topo do movimento.",
          },
          {
            name: "Mesa Flexora",
            sets: "3",
            reps: "12-15",
            importance: "Desenvolvimento dos isquiotibiais",
            technique: "Evite arqueamento excessivo das costas.",
          },
          {
            name: "Panturrilha em Pé",
            sets: "4",
            reps: "15-20",
            importance: "Desenvolvimento das panturrilhas",
            technique: "Eleve-se o mais alto possível.",
          },
        ],
      },
      {
        day: "Dia 3",
        focus: "Superiores B (Ombros e Braços)",
        exercises: [
          {
            name: "Desenvolvimento Militar",
            sets: "4",
            reps: "8-10",
            importance: "Desenvolve os três feixes do deltóide",
            technique: "Mantenha o core contraído.",
          },
          {
            name: "Elevação Lateral",
            sets: "4",
            reps: "12-15",
            importance: "Isolamento do deltóide lateral",
            technique: "Eleve os braços até a altura dos ombros.",
          },
          {
            name: "Rosca Direta",
            sets: "4",
            reps: "10-12",
            importance: "Desenvolvimento dos bíceps",
            technique: "Mantenha os cotovelos junto ao corpo.",
          },
          {
            name: "Tríceps Testa",
            sets: "4",
            reps: "10-12",
            importance: "Desenvolve a cabeça longa do tríceps",
            technique: "Mantenha os cotovelos apontados para cima.",
          },
          {
            name: "Rosca Martelo",
            sets: "3",
            reps: "12-15",
            importance: "Trabalha o braquial e bíceps",
            technique: "Mantenha os punhos neutros.",
          },
        ],
      },
      {
        day: "Dia 4",
        focus: "Inferiores B",
        exercises: [
          {
            name: "Agachamento Frontal",
            sets: "4",
            reps: "8-12",
            importance: "Variação que enfatiza os quadríceps",
            technique: "Mantenha o tronco mais ereto.",
          },
          {
            name: "Stiff",
            sets: "4",
            reps: "10-12",
            importance: "Desenvolvimento dos isquiotibiais e glúteos",
            technique: "Mantenha as pernas levemente flexionadas.",
          },
          {
            name: "Avanço",
            sets: "3",
            reps: "10-12 (cada perna)",
            importance: "Trabalha as pernas unilateralmente",
            technique: "Mantenha o joelho alinhado com o pé.",
          },
          {
            name: "Cadeira Abdutora",
            sets: "3",
            reps: "15-20",
            importance: "Isolamento dos glúteos médio e mínimo",
            technique: "Controle o movimento de volta.",
          },
          {
            name: "Panturrilha Sentado",
            sets: "4",
            reps: "15-20",
            importance: "Enfatiza o sóleo",
            technique: "Pausa de 1 segundo no topo.",
          },
        ],
      },
    ],
  }
}

// Plano de 5 dias - ABCDE
function generate5DaySplit(): Workout {
  return {
    split: "ABCDE (5 grupos musculares)",
    routine: [
      {
        day: "Dia 1",
        focus: "Peito",
        exercises: [
          {
            name: "Supino Reto",
            sets: "5",
            reps: "8-12",
            importance: "Exercício fundamental para desenvolvimento do peitoral",
            technique: "Mantenha os cotovelos em ângulo de 45°.",
          },
          {
            name: "Supino Inclinado",
            sets: "4",
            reps: "8-12",
            importance: "Desenvolve a parte superior do peitoral",
            technique: "Use um ângulo de 30°.",
          },
          {
            name: "Crucifixo Inclinado",
            sets: "3",
            reps: "10-15",
            importance: "Isolamento do peitoral superior",
            technique: "Mantenha um leve dobramento nos cotovelos.",
          },
          {
            name: "Crossover",
            sets: "3",
            reps: "12-15",
            importance: "Isolamento para máxima contração",
            technique: "Cruze as mãos na frente do corpo.",
          },
          {
            name: "Flexão de Braço",
            sets: "3",
            reps: "Máximo",
            importance: "Finalização com peso corporal",
            technique: "Mantenha o corpo reto.",
          },
        ],
      },
      {
        day: "Dia 2",
        focus: "Costas",
        exercises: [
          {
            name: "Barra Fixa",
            sets: "5",
            reps: "Máximo",
            importance: "Desenvolve a largura das costas",
            technique: "Use uma pegada mais larga que os ombros.",
          },
          {
            name: "Remada Curvada",
            sets: "4",
            reps: "8-12",
            importance: "Desenvolve a espessura das costas",
            technique: "Mantenha as costas paralelas ao solo.",
          },
          {
            name: "Puxada Frontal",
            sets: "4",
            reps: "10-12",
            importance: "Trabalha o dorsal",
            technique: "Puxe a barra até a altura do peito.",
          },
          {
            name: "Remada Baixa",
            sets: "3",
            reps: "10-12",
            importance: "Trabalha a região média das costas",
            technique: "Puxe em direção ao abdômen.",
          },
          {
            name: "Pullover",
            sets: "3",
            reps: "12-15",
            importance: "Expande a caixa torácica",
            technique: "Mantenha os cotovelos levemente flexionados.",
          },
        ],
      },
      {
        day: "Dia 3",
        focus: "Ombros",
        exercises: [
          {
            name: "Desenvolvimento Militar",
            sets: "5",
            reps: "8-12",
            importance: "Desenvolve os três feixes do deltóide",
            technique: "Mantenha o core contraído.",
          },
          {
            name: "Elevação Lateral",
            sets: "4",
            reps: "12-15",
            importance: "Isolamento do deltóide lateral",
            technique: "Eleve os braços até a altura dos ombros.",
          },
          {
            name: "Elevação Frontal",
            sets: "3",
            reps: "12-15",
            importance: "Trabalha o deltóide anterior",
            technique: "Mantenha os cotovelos levemente flexionados.",
          },
          {
            name: "Elevação Posterior",
            sets: "4",
            reps: "12-15",
            importance: "Desenvolve o deltóide posterior",
            technique: "Incline o tronco para frente.",
          },
          {
            name: "Encolhimento",
            sets: "4",
            reps: "12-15",
            importance: "Desenvolve os trapézios",
            technique: "Eleve os ombros em direção às orelhas.",
          },
        ],
      },
      {
        day: "Dia 4",
        focus: "Braços",
        exercises: [
          {
            name: "Rosca Direta",
            sets: "4",
            reps: "8-12",
            importance: "Desenvolvimento dos bíceps",
            technique: "Mantenha os cotovelos junto ao corpo.",
          },
          {
            name: "Tríceps Testa",
            sets: "4",
            reps: "8-12",
            importance: "Desenvolve a cabeça longa do tríceps",
            technique: "Mantenha os cotovelos apontados para cima.",
          },
          {
            name: "Rosca Martelo",
            sets: "3",
            reps: "10-12",
            importance: "Trabalha o braquial e bíceps",
            technique: "Mantenha os punhos neutros.",
          },
          {
            name: "Tríceps na Polia",
            sets: "3",
            reps: "12-15",
            importance: "Isolamento dos tríceps",
            technique: "Mantenha os cotovelos fixos.",
          },
          {
            name: "Rosca Scott",
            sets: "3",
            reps: "10-12",
            importance: "Isola o bíceps",
            technique: "Mantenha os cotovelos apoiados.",
          },
          {
            name: "Mergulho",
            sets: "3",
            reps: "Máximo",
            importance: "Trabalha todas as cabeças do tríceps",
            technique: "Incline o corpo para frente.",
          },
        ],
      },
      {
        day: "Dia 5",
        focus: "Pernas",
        exercises: [
          {
            name: "Agachamento",
            sets: "5",
            reps: "8-12",
            importance: "Exercício fundamental para desenvolvimento das pernas",
            technique: "Mantenha o peito erguido.",
          },
          {
            name: "Leg Press",
            sets: "4",
            reps: "10-15",
            importance: "Complementa o agachamento",
            technique: "Posicione os pés na parte superior da plataforma.",
          },
          {
            name: "Cadeira Extensora",
            sets: "3",
            reps: "12-15",
            importance: "Isolamento dos quadríceps",
            technique: "Contraia o músculo no topo.",
          },
          {
            name: "Mesa Flexora",
            sets: "4",
            reps: "12-15",
            importance: "Desenvolvimento dos isquiotibiais",
            technique: "Evite arqueamento excessivo das costas.",
          },
          {
            name: "Stiff",
            sets: "3",
            reps: "10-12",
            importance: "Trabalha isquiotibiais e glúteos",
            technique: "Mantenha as pernas levemente flexionadas.",
          },
          {
            name: "Panturrilha em Pé",
            sets: "5",
            reps: "15-20",
            importance: "Desenvolvimento das panturrilhas",
            technique: "Eleve-se o mais alto possível.",
          },
        ],
      },
    ],
  }
}

// Plano de 6 dias - PPL 2x (Push/Pull/Legs)
function generate6DaySplit(): Workout {
  return {
    split: "PPL 2x (Push/Pull/Legs)",
    routine: [
      {
        day: "Dia 1",
        focus: "Push A (Peito, Ombros, Tríceps)",
        exercises: [
          {
            name: "Supino Reto",
            sets: "4",
            reps: "8-10",
            importance: "Exercício fundamental para desenvolvimento do peitoral",
            technique: "Mantenha os cotovelos em ângulo de 45°.",
          },
          {
            name: "Desenvolvimento Militar",
            sets: "4",
            reps: "8-10",
            importance: "Desenvolve os deltóides",
            technique: "Mantenha o core contraído.",
          },
          {
            name: "Supino Inclinado",
            sets: "3",
            reps: "10-12",
            importance: "Desenvolve a parte superior do peitoral",
            technique: "Use um ângulo de 30°.",
          },
          {
            name: "Elevação Lateral",
            sets: "3",
            reps: "12-15",
            importance: "Isolamento do deltóide lateral",
            technique: "Eleve os braços até a altura dos ombros.",
          },
          {
            name: "Tríceps Testa",
            sets: "3",
            reps: "10-12",
            importance: "Desenvolve a cabeça longa do tríceps",
            technique: "Mantenha os cotovelos apontados para cima.",
          },
        ],
      },
      {
        day: "Dia 2",
        focus: "Pull A (Costas e Bíceps)",
        exercises: [
          {
            name: "Barra Fixa",
            sets: "4",
            reps: "Máximo",
            importance: "Desenvolve a largura das costas",
            technique: "Use uma pegada mais larga que os ombros.",
          },
          {
            name: "Remada Curvada",
            sets: "4",
            reps: "8-10",
            importance: "Desenvolve a espessura das costas",
            technique: "Mantenha as costas paralelas ao solo.",
          },
          {
            name: "Puxada Frontal",
            sets: "3",
            reps: "10-12",
            importance: "Trabalha o dorsal",
            technique: "Puxe a barra até a altura do peito.",
          },
          {
            name: "Rosca Direta",
            sets: "3",
            reps: "10-12",
            importance: "Desenvolvimento dos bíceps",
            technique: "Mantenha os cotovelos junto ao corpo.",
          },
          {
            name: "Rosca Martelo",
            sets: "3",
            reps: "12-15",
            importance: "Trabalha o braquial e bíceps",
            technique: "Mantenha os punhos neutros.",
          },
        ],
      },
      {
        day: "Dia 3",
        focus: "Legs A (Pernas)",
        exercises: [
          {
            name: "Agachamento",
            sets: "5",
            reps: "6-10",
            importance: "Exercício fundamental para desenvolvimento das pernas",
            technique: "Mantenha o peito erguido.",
          },
          {
            name: "Leg Press",
            sets: "4",
            reps: "10-15",
            importance: "Complementa o agachamento",
            technique: "Posicione os pés na parte superior da plataforma.",
          },
          {
            name: "Cadeira Extensora",
            sets: "3",
            reps: "12-15",
            importance: "Isolamento dos quadríceps",
            technique: "Contraia o músculo no topo.",
          },
          {
            name: "Mesa Flexora",
            sets: "3",
            reps: "12-15",
            importance: "Desenvolvimento dos isquiotibiais",
            technique: "Evite arqueamento excessivo das costas.",
          },
          {
            name: "Panturrilha em Pé",
            sets: "4",
            reps: "15-20",
            importance: "Desenvolvimento das panturrilhas",
            technique: "Eleve-se o mais alto possível.",
          },
        ],
      },
      {
        day: "Dia 4",
        focus: "Push B (Peito, Ombros, Tríceps)",
        exercises: [
          {
            name: "Supino Inclinado com Halteres",
            sets: "4",
            reps: "8-10",
            importance: "Desenvolve a parte superior do peitoral",
            technique: "Permite maior amplitude de movimento.",
          },
          {
            name: "Desenvolvimento com Halteres",
            sets: "4",
            reps: "8-10",
            importance: "Trabalha os deltóides de forma equilibrada",
            technique: "Mantenha o core contraído.",
          },
          {
            name: "Crucifixo",
            sets: "3",
            reps: "10-12",
            importance: "Isolamento do peitoral",
            technique: "Mantenha um leve dobramento nos cotovelos.",
          },
          {
            name: "Elevação Frontal",
            sets: "3",
            reps: "12-15",
            importance: "Trabalha o deltóide anterior",
            technique: "Mantenha os cotovelos levemente flexionados.",
          },
          {
            name: "Tríceps na Polia",
            sets: "3",
            reps: "12-15",
            importance: "Isolamento dos tríceps",
            technique: "Mantenha os cotovelos fixos.",
          },
        ],
      },
      {
        day: "Dia 5",
        focus: "Pull B (Costas e Bíceps)",
        exercises: [
          {
            name: "Levantamento Terra",
            sets: "4",
            reps: "6-8",
            importance: "Exercício composto completo para costas",
            technique: "Mantenha as costas retas durante todo o movimento.",
          },
          {
            name: "Remada Unilateral",
            sets: "4",
            reps: "10-12",
            importance: "Trabalha cada lado independentemente",
            technique: "Mantenha o tronco paralelo ao solo.",
          },
          {
            name: "Pullover",
            sets: "3",
            reps: "12-15",
            importance: "Expande a caixa torácica",
            technique: "Mantenha os cotovelos levemente flexionados.",
          },
          {
            name: "Rosca Scott",
            sets: "3",
            reps: "10-12",
            importance: "Isola o bíceps",
            technique: "Mantenha os cotovelos apoiados.",
          },
          {
            name: "Rosca Concentrada",
            sets: "3",
            reps: "12-15",
            importance: "Máximo isolamento do bíceps",
            technique: "Foque na contração no topo.",
          },
        ],
      },
      {
        day: "Dia 6",
        focus: "Legs B (Pernas)",
        exercises: [
          {
            name: "Agachamento Frontal",
            sets: "4",
            reps: "8-12",
            importance: "Variação que enfatiza os quadríceps",
            technique: "Mantenha o tronco mais ereto.",
          },
          {
            name: "Stiff",
            sets: "4",
            reps: "10-12",
            importance: "Desenvolvimento dos isquiotibiais e glúteos",
            technique: "Mantenha as pernas levemente flexionadas.",
          },
          {
            name: "Avanço",
            sets: "3",
            reps: "10-12 (cada perna)",
            importance: "Trabalha as pernas unilateralmente",
            technique: "Mantenha o joelho alinhado com o pé.",
          },
          {
            name: "Cadeira Abdutora",
            sets: "3",
            reps: "15-20",
            importance: "Isolamento dos glúteos",
            technique: "Controle o movimento de volta.",
          },
          {
            name: "Panturrilha Sentado",
            sets: "4",
            reps: "15-20",
            importance: "Enfatiza o sóleo",
            technique: "Pausa de 1 segundo no topo.",
          },
        ],
      },
    ],
  }
}
