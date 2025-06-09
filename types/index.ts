export interface UserProfile {
  name: string
  weight: number
  height: number
  physique: string
  trainingDays: number
}

export interface Exercise {
  name: string
  sets: string
  reps: string
  importance: string
  technique?: string
}

export interface WorkoutDay {
  day: string
  focus: string
  exercises: Exercise[]
}

export interface Workout {
  routine: WorkoutDay[]
  split: string
}

export interface Meal {
  name: string
  time: string
  description: string
}

export interface Macros {
  protein: number
  carbs: number
  fat: number
}

export interface Diet {
  macros: Macros
  meals: Meal[]
}

export interface FitnessProfile {
  user: UserProfile
  workout: Workout
  diet: Diet
}
