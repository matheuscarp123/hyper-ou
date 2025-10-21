"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Dumbbell } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6" />
            <span className="font-bold text-xl">HyperGym</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/workouts" className="text-sm font-medium hover:text-primary transition-colors">
              Treinos
            </Link>
            <Link href="/nutrition" className="text-sm font-medium hover:text-primary transition-colors">
              Nutrição
            </Link>
            <Link href="/progress" className="text-sm font-medium hover:text-primary transition-colors">
              Progresso
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button>Meu Perfil</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/workouts"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Treinos
            </Link>
            <Link
              href="/nutrition"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Nutrição
            </Link>
            <Link
              href="/progress"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Progresso
            </Link>
            <Button className="w-full mt-4">Meu Perfil</Button>
          </div>
        )}
      </div>
    </nav>
  )
}
