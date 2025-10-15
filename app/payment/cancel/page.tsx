"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LogoWithText } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle } from "lucide-react"

export default function CancelPage() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.1)_0%,_rgba(0,0,0,0)_60%)]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <XCircle className="mx-auto text-red-500 mb-6" size={80} />
        </motion.div>

        <Card className="bg-gray-900/80 border-red-500/30 backdrop-blur-sm max-w-md mx-4">
          <CardContent className="p-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h1 className="text-3xl font-bold text-white mb-2">Pagamento Cancelado</h1>
              <p className="text-gray-400 mb-6">
                Você cancelou o processo de pagamento. Nenhuma cobrança foi realizada.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/physique")}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  Tentar Novamente
                </Button>

                <Button onClick={() => router.push("/")} variant="outline" className="w-full" size="lg">
                  Voltar ao Início
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Precisa de ajuda? Entre em contato
                <br />© 2025 Matheus Carvalho - HyperGym
              </p>
            </motion.div>
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6">
          <LogoWithText />
        </motion.div>
      </motion.div>
    </main>
  )
}
