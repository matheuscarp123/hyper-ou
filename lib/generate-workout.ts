import type { UserProfile, Workout } from "@/types"

export async function generateWorkoutPlan(userProfile: UserProfile): Promise<Workout> {
  // Em um app real, isso seria uma chamada para uma API de IA
  // Aqui estamos simulando a resposta
  
  // Esperar um pouco para simular o processamento
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Planos específicos baseados na referência de físico
  const workoutPlans: Record<string, Workout> = {
    arnold: {
      routine: [
        {
          day: "Dia 1",
          focus: "Peito e Costas",
          exercises: [
            {
              name: "Supino Reto",
              sets: "5",
              reps: "8-12",
              importance: "Exercício fundamental para desenvolvimento do peitoral, essencial para o volume torácico característico de Arnold."
            },
            {
              name: "Pullover com Halteres",
              sets: "4",
              reps: "10-12",
              importance: "Expande a caixa torácica e trabalha a conexão entre peito e costas, técnica favorita de Arnold."
            },
            {
              name: "Crucifixo Inclinado",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolve a parte superior do peitoral, criando a definição e volume característicos."
            },
            {
              name: "Barra Fixa",
              sets: "4",
              reps: "8-12",
              importance: "Desenvolve a largura das costas, essencial para o formato em V do torso."
            },
            {
              name: "Remada Curvada",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolve a espessura das costas, complementando a largura para o físico completo."
            }
          ]
        },
        {
          day: "Dia 2",
          focus: "Pernas",
          exercises: [
            {
              name: "Agachamento",
              sets: "5",
              reps: "8-12",
              importance: "Exercício fundamental para desenvolvimento completo das pernas e estimulação hormonal."
            },
            {
              name: "Leg Press",
              sets: "4",
              reps: "10-15",
              importance: "Complementa o agachamento para desenvolvimento dos quadríceps."
            },
            {
              name: "Extensão de Pernas",
              sets: "4",
              reps: "12-15",
              importance: "Isolamento dos quadríceps para definição e separação muscular."
            },
            {
              name: "Flexão de Pernas",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolvimento dos isquiotibiais para equilíbrio e proporção."
            },
            {
              name: "Panturrilha em Pé",
              sets: "5",
              reps: "15-20",
              importance: "Desenvolvimento das panturrilhas, ponto fraco de muitos fisiculturistas."
            }
          ]
        },
        {
          day: "Dia 3",
          focus: "Ombros e Braços",
          exercises: [
            {
              name: "Desenvolvimento Militar",
              sets: "5",
              reps: "8-12",
              importance: "Desenvolve os três feixes do deltóide, criando ombros largos e imponentes."
            },
            {
              name: "Elevação Lateral",
              sets: "4",
              reps: "10-15",
              importance: "Isolamento do deltóide lateral, criando a largura característica dos ombros."
            },
            {
              name: "Rosca Direta com Barra",
              sets: "4",
              reps: "8-12",
              importance: "Desenvolvimento dos bíceps, criando o pico característico."
            },
            {
              name: "Rosca Concentrada",
              sets: "3",
              reps: "10-12",
              importance: "Isolamento do bíceps para máximo pico, técnica favorita de Arnold."
            },
            {
              name: "Tríceps Testa",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolvimento da cabeça longa do tríceps para braços volumosos."
            },
            {
              name: "Mergulho entre Bancos",
              sets: "4",
              reps: "10-15",
              importance: "Trabalha todas as cabeças do tríceps para desenvolvimento completo."
            }
          ]
        },
        {
          day: "Dia 4",
          focus: "Peito e Costas",
          exercises: [
            {
              name: "Supino Inclinado",
              sets: "5",
              reps: "8-12",
              importance: "Desenvolve a parte superior do peitoral para o formato completo."
            },
            {
              name: "Crucifixo Reto",
              sets: "4",
              reps: "10-12",
              importance: "Estica as fibras do peitoral para máximo desenvolvimento."
            },
            {
              name: "Puxada Frontal",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolve a largura do dorsal, complementando a barra fixa."
            },
            {
              name: "Remada Unilateral",
              sets: "4",
              reps: "10-12",
              importance: "Trabalha cada lado independentemente para corrigir desequilíbrios."
            },
            {
              name: "Encolhimento de Ombros",
              sets: "4",
              reps: "12-15",
              importance: "Desenvolve os trapézios para completar o visual das costas."
            }
          ]
        },
        {
          day: "Dia 5",
          focus: "Pernas e Abdômen",
          exercises: [
            {
              name: "Agachamento Frontal",
              sets: "4",
              reps: "8-12",
              importance: "Variação que enfatiza os quadríceps para desenvolvimento completo."
            },
            {
              name: "Stiff",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolvimento dos isquiotibiais e glúteos."
            },
            {
              name: "Avanço",
              sets: "3",
              reps: "10-12 (cada perna)",
              importance: "Trabalha as pernas unilateralmente para equilíbrio e definição."
            },
            {
              name: "Elevação de Panturrilha Sentado",
              sets: "4",
              reps: "15-20",
              importance: "Enfatiza a parte interna da panturrilha para desenvolvimento completo."
            },
            {
              name: "Abdominal Crunch",
              sets: "4",
              reps: "15-20",
              importance: "Desenvolve o reto abdominal para definição do abdômen."
            },
            {
              name: "Elevação de Pernas",
              sets: "4",
              reps: "15-20",
              importance: "Trabalha o abdômen inferior para desenvolvimento completo."
            }
          ]
        }
      ]
    },
    cbum: {
      routine: [
        {
          day: "Dia 1",
          focus: "Peito e Tríceps",
          exercises: [
            {
              name: "Supino Inclinado com Halteres",
              sets: "4",
              reps: "8-10",
              importance: "Desenvolve a parte superior do peitoral, criando a estética do Classic Physique."
            },
            {
              name: "Supino Reto",
              sets: "4",
              reps: "8-12",
              importance: "Constrói a base do peitoral para o visual amplo e cheio."
            },
            {
              name: "Crucifixo na Máquina",
              sets: "3",
              reps: "10-15",
              importance: "Isolamento para máxima contração e definição do peitoral."
            },
            {
              name: "Tríceps na Polia",
              sets: "4",
              reps: "10-15",
              importance: "Mantém tensão constante para desenvolvimento dos tríceps."
            },
            {
              name: "Extensão de Tríceps Deitado",
              sets: "3",
              reps: "10-12",
              importance: "Enfatiza a cabeça longa do tríceps para braços completos."
            }
          ]
        },
        {
          day: "Dia 2",
          focus: "Costas e Bíceps",
          exercises: [
            {
              name: "Puxada Frontal",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolve a largura do dorsal para o formato em V característico."
            },
            {
              name: "Remada Baixa",
              sets: "4",
              reps: "10-12",
              importance: "Trabalha a espessura das costas para o visual tridimensional."
            },
            {
              name: "Pullover na Máquina",
              sets: "3",
              reps: "12-15",
              importance: "Expande a caixa torácica e trabalha a conexão entre costas e peito."
            },
            {
              name: "Rosca Scott",
              sets: "4",
              reps: "10-12",
              importance: "Isola o bíceps para máximo desenvolvimento e pico."
            },
            {
              name: "Rosca Martelo",
              sets: "3",
              reps: "10-12",
              importance: "Desenvolve o braquial e o bíceps para braços mais grossos."
            }
          ]
        },
        {
          day: "Dia 3",
          focus: "Pernas",
          exercises: [
            {
              name: "Hack Squat",
              sets: "4",
              reps: "8-12",
              importance: "Enfatiza os quadríceps mantendo a postura adequada."
            },
            {
              name: "Leg Press",
              sets: "4",
              reps: "10-15",
              importance: "Permite trabalhar com cargas pesadas para hipertrofia máxima."
            },
            {
              name: "Cadeira Extensora",
              sets: "3",
              reps: "12-15",
              importance: "Isolamento dos quadríceps para definição e separação muscular."
            },
            {
              name: "Mesa Flexora",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolvimento dos isquiotibiais para equilíbrio e proporção."
            },
            {
              name: "Elevação de Panturrilha em Pé",
              sets: "5",
              reps: "15-20",
              importance: "Desenvolvimento das panturrilhas para completar o visual das pernas."
            }
          ]
        },
        {
          day: "Dia 4",
          focus: "Ombros e Abdômen",
          exercises: [
            {
              name: "Press Arnold",
              sets: "4",
              reps: "10-12",
              importance: "Trabalha todos os feixes do deltóide com rotação para maior ativação."
            },
            {
              name: "Elevação Lateral",
              sets: "4",
              reps: "12-15",
              importance: "Desenvolve o deltóide lateral para ombros largos e redondos."
            },
            {
              name: "Elevação Frontal",
              sets: "3",
              reps: "12-15",
              importance: "Trabalha o deltóide anterior para desenvolvimento completo."
            },
            {
              name: "Face Pull",
              sets: "3",
              reps: "15-20",
              importance: "Fortalece os rotadores externos e deltóide posterior para equilíbrio."
            },
            {
              name: "Abdominal no Cabo",
              sets: "4",
              reps: "15-20",
              importance: "Mantém tensão constante para máxima ativação abdominal."
            }
          ]
        },
        {
          day: "Dia 5",
          focus: "Treino de Fraquezas",
          exercises: [
            {
              name: "Agachamento Búlgaro",
              sets: "3",
              reps: "10-12 (cada perna)",
              importance: "Corrige desequilíbrios entre as pernas e desenvolve os glúteos."
            },
            {
              name: "Desenvolvimento com Halteres",
              sets: "3",
              reps: "10-12",
              importance: "Trabalha cada ombro independentemente para corrigir assimetrias."
            },
            {
              name: "Crucifixo Inclinado",
              sets: "3",
              reps: "12-15",
              importance: "Enfatiza a parte superior do peitoral para proporção ideal."
            },
            {
              name: "Rosca 21s",
              sets: "3",
              reps: "21",
              importance: "Trabalha o bíceps em diferentes ângulos para desenvolvimento completo."
            },
            {
              name: "Prancha",
              sets: "3",
              reps: "60 segundos",
              importance: "Fortalece o core para estabilidade e postura."
            }
          ]
        }
      ]
    },
    ramon: {
      routine: [
        {
          day: "Dia 1",
          focus: "Costas e Bíceps",
          exercises: [
            {
              name: "Puxada Aberta",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolve a largura do dorsal para o V-taper característico de Ramon."
            },
            {
              name: "Remada Curvada",
              sets: "4",
              reps: "8-10",
              importance: "Constrói a espessura das costas para o visual denso e detalhado."
            },
            {
              name: "Pullover com Corda",
              sets: "3",
              reps: "12-15",
              importance: "Trabalha a conexão entre costas e peito para fluidez muscular."
            },
            {
              name: "Rosca Alternada",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolve os bíceps com ênfase na supinação para pico máximo."
            },
            {
              name: "Rosca Concentrada",
              sets: "3",
              reps: "12-15",
              importance: "Isolamento para máximo pico do bíceps, característica estética importante."
            }
          ]
        },
        {
          day: "Dia 2",
          focus: "Pernas",
          exercises: [
            {
              name: "Agachamento",
              sets: "4",
              reps: "8-10",
              importance: "Base para o desenvolvimento completo das pernas, mantendo proporção."
            },
            {
              name: "Leg Press",
              sets: "4",
              reps: "10-15",
              importance: "Permite trabalhar com cargas pesadas para hipertrofia máxima."
            },
            {
              name: "Cadeira Extensora",
              sets: "3",
              reps: "15-20",
              importance: "Isolamento para definição e separação dos quadríceps."
            },
            {
              name: "Stiff",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolvimento dos isquiotibiais para equilíbrio e proporção."
            },
            {
              name: "Panturrilha em Pé",
              sets: "5",
              reps: "15-20",
              importance: "Desenvolvimento das panturrilhas para completar o visual das pernas."
            }
          ]
        },
        {
          day: "Dia 3",
          focus: "Peito e Tríceps",
          exercises: [
            {
              name: "Supino Inclinado",
              sets: "4",
              reps: "8-10",
              importance: "Desenvolve a parte superior do peitoral para o visual estético."
            },
            {
              name: "Crucifixo com Cabos",
              sets: "4",
              reps: "12-15",
              importance: "Mantém tensão constante para máxima ativação e definição."
            },
            {
              name: "Supino Declinado",
              sets: "3",
              reps: "10-12",
              importance: "Completa o desenvolvimento do peitoral inferior."
            },
            {
              name: "Tríceps Corda",
              sets: "4",
              reps: "12-15",
              importance: "Trabalha todas as cabeças do tríceps com ênfase na definição."
            },
            {
              name: "Tríceps Francês",
              sets: "3",
              reps: "10-12",
              importance: "Isolamento da cabeça longa para braços completos e definidos."
            }
          ]
        },
        {
          day: "Dia 4",
          focus: "Ombros e Abdômen",
          exercises: [
            {
              name: "Desenvolvimento com Halteres",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolve os deltóides de forma equilibrada para ombros redondos."
            },
            {
              name: "Elevação Lateral",
              sets: "4",
              reps: "12-15",
              importance: "Cria a largura dos ombros característica do físico de Ramon."
            },
            {
              name: "Elevação Posterior",
              sets: "3",
              reps: "12-15",
              importance: "Equilibra o desenvolvimento posterior para visual completo."
            },
            {
              name: "Abdominal Declinado",
              sets: "4",
              reps: "15-20",
              importance: "Desenvolve o reto abdominal para definição do six-pack."
            },
            {
              name: "Abdominal Oblíquo",
              sets: "3",
              reps: "15-20 (cada lado)",
              importance: "Trabalha a cintura para o visual estético e proporcionado."
            }
          ]
        },
        {
          day: "Dia 5",
          focus: "Pernas e Braços",
          exercises: [
            {
              name: "Agachamento Hack",
              sets: "4",
              reps: "10-12",
              importance: "Enfatiza os quadríceps para desenvolvimento detalhado."
            },
            {
              name: "Cadeira Flexora",
              sets: "4",
              reps: "12-15",
              importance: "Isolamento dos isquiotibiais para equilíbrio posterior."
            },
            {
              name: "Rosca Scott",
              sets: "3",
              reps: "10-12",
              importance: "Desenvolve o bíceps com ênfase na parte inferior."
            },
            {
              name: "Mergulho",
              sets: "4",
              reps: "10-15",
              importance: "Trabalha o tríceps com o peso corporal para definição."
            },
            {
              name: "Panturrilha Sentado",
              sets: "4",
              reps: "15-20",
              importance: "Enfatiza o sóleo para desenvolvimento completo da panturrilha."
            }
          ]
        }
      ]
    },
    zyzz: {
      routine: [
        {
          day: "Dia 1",
          focus: "Peito e Tríceps",
          exercises: [
            {
              name: "Supino Inclinado",
              sets: "4",
              reps: "8-10",
              importance: "Desenvolve a parte superior do peitoral para o visual estético de Zyzz."
            },
            {
              name: "Supino com Halteres",
              sets: "4",
              reps: "10-12",
              importance: "Permite maior amplitude de movimento para desenvolvimento completo."
            },
            {
              name: "Crossover",
              sets: "3",
              reps: "12-15",
              importance: "Isolamento para máxima contração e definição do peitoral."
            },
            {
              name: "Tríceps Corda",
              sets: "4",
              reps: "12-15",
              importance: "Trabalha todas as cabeças do tríceps com ênfase na definição."
            },
            {
              name: "Tríceps Testa",
              sets: "3",
              reps: "10-12",
              importance: "Isolamento da cabeça longa para braços definidos."
            }
          ]
        },
        {
          day: "Dia 2",
          focus: "Costas e Bíceps",
          exercises: [
            {
              name: "Barra Fixa",
              sets: "4",
              reps: "Máximo",
              importance: "Desenvolve a largura do dorsal para o V-taper estético."
            },
            {
              name: "Remada Curvada",
              sets: "4",
              reps: "10-12",
              importance: "Constrói a espessura das costas para o visual completo."
            },
            {
              name: "Puxada Neutra",
              sets: "3",
              reps: "10-12",
              importance: "Trabalha o dorsal com ênfase na parte inferior."
            },
            {
              name: "Rosca Barra W",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolve os bíceps com ênfase no pico para o visual estético."
            },
            {
              name: "Rosca Martelo",
              sets: "3",
              reps: "12-15",
              importance: "Trabalha o braquial e bíceps para braços mais grossos."
            }
          ]
        },
        {
          day: "Dia 3",
          focus: "Pernas",
          exercises: [
            {
              name: "Agachamento",
              sets: "4",
              reps: "8-10",
              importance: "Base para o desenvolvimento completo das pernas, mantendo proporção."
            },
            {
              name: "Leg Press",
              sets: "4",
              reps: "12-15",
              importance: "Permite trabalhar com cargas pesadas para hipertrofia máxima."
            },
            {
              name: "Cadeira Extensora",
              sets: "3",
              reps: "15-20",
              importance: "Isolamento para definição e separação dos quadríceps."
            },
            {
              name: "Mesa Flexora",
              sets: "4",
              reps: "12-15",
              importance: "Desenvolvimento dos isquiotibiais para equilíbrio e proporção."
            },
            {
              name: "Panturrilha em Pé",
              sets: "5",
              reps: "15-20",
              importance: "Desenvolvimento das panturrilhas para completar o visual estético."
            }
          ]
        },
        {
          day: "Dia 4",
          focus: "Ombros e Abdômen",
          exercises: [
            {
              name: "Desenvolvimento Militar",
              sets: "4",
              reps: "8-10",
              importance: "Desenvolve todos os feixes do deltóide para ombros largos."
            },
            {
              name: "Elevação Lateral",
              sets: "4",
              reps: "12-15",
              importance: "Cria a largura dos ombros característica do físico de Zyzz."
            },
            {
              name: "Elevação Frontal",
              sets: "3",
              reps: "12-15",
              importance: "Completa o desenvolvimento anterior para visual equilibrado."
            },
            {
              name: "Abdominal Declinado",
              sets: "4",
              reps: "15-20",
              importance: "Desenvolve o reto abdominal para definição do six-pack."
            },
            {
              name: "Prancha Lateral",
              sets: "3",
              reps: "30-60 segundos (cada lado)",
              importance: "Trabalha os oblíquos para a cintura definida característica."
            }
          ]
        },
        {
          day: "Dia 5",
          focus: "Braços e Cardio",
          exercises: [
            {
              name: "Rosca Scott",
              sets: "4",
              reps: "10-12",
              importance: "Isola o bíceps para máximo desenvolvimento e pico."
            },
            {
              name: "Rosca Concentrada",
              sets: "3",
              reps: "12-15",
              importance: "Isolamento para máximo pico do bíceps, característica estética importante."
            },
            {
              name: "Tríceps Mergulho",
              sets: "4",
              reps: "Máximo",
              importance: "Trabalha todas as cabeças do tríceps com o peso corporal."
            },
            {
              name: "Tríceps Unilateral",
              sets: "3",
              reps: "12-15",
              importance: "Trabalha cada braço independentemente para corrigir assimetrias."
            },
            {
              name: "HIIT na Esteira",
              sets: "10",
              reps: "30s sprint / 30s descanso",
              importance: "Cardio de alta intensidade para definição sem perder massa muscular."
            }
          ]
        }
      ]
    },
    wellness: {
      routine: [
        {
          day: "Dia 1",
          focus: "Glúteos e Posterior de Coxa",
          exercises: [
            {
              name: "Hip Thrust",
              sets: "5",
              reps: "10-12",
              importance: "Exercício principal para desenvolvimento dos glúteos, foco da categoria Wellness."
            },
            {
              name: "Stiff",
              sets: "4",
              reps: "10-12",
              importance: "Trabalha isquiotibiais e glúteos simultaneamente para desenvolvimento posterior."
            },
            {
              name: "Elevação Pélvica",
              sets: "3",
              reps: "15-20",
              importance: "Isolamento dos glúteos para máxima ativação e hipertrofia."
            },
            {
              name: "Mesa Flexora",
              sets: "4",
              reps: "12-15",
              importance: "Isolamento dos isquiotibiais para equilíbrio e proporção."
            },
            {
              name: "Abdução de Quadril",
              sets: "4",
              reps: "15-20",
              importance: "Trabalha os glúteos médio e mínimo para o formato arredondado."
            }
          ]
        },
        {
          day: "Dia 2",
          focus: "Costas e Ombros",
          exercises: [
            {
              name: "Puxada Frontal",
              sets: "4",
              reps: "10-12",
              importance: "Desenvolve a largura do dorsal para o V-taper que contrasta com os quadris."
            },
            {
              name: "Remada Baixa",
              sets: "4",
              reps: "12-15",
              importance: "Trabalha a espessura das costas para o visual tridimensional."
            },
            {
              name: "Elevação Lateral",
              sets: "4",
              reps: "12-15",
              importance: "Desenvolve os deltóides laterais para equilibrar a proporção com os quadris."
            },
            {
              name: "Face Pull",
              sets: "3",
              reps: "15-20",
              importance: "Fortalece a postura e desenvolve os deltóides posteriores."
            },
            {
              name: "Encolhimento",
              sets: "3",
              reps: "15-20",
              importance: "Desenvolve os trapézios para completar o visual superior."
            }
          ]
        },
        {
          day: "Dia 3",
          focus: "Quadríceps",
          exercises: [
            {
              name: "Agachamento",
              sets: "\
