import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HyperGym - Treino e Dieta Personalizada",
  description: "Planos de treino e dieta personalizados para hipertrofia extrema por Matheus Carvalho",
  generator: "HyperGym v1.0.0 - Matheus Carvalho",
  applicationName: "HyperGym",
  authors: [{ name: "Matheus Carvalho", url: "https://matheuscarvalho.dev" }],
  creator: "Matheus Carvalho",
  publisher: "Matheus Carvalho",
  keywords: ["treino", "dieta", "hipertrofia", "musculação", "fitness", "matheus carvalho"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="copyright" content="© 2024 Matheus Carvalho" />
        <meta name="author" content="Matheus Carvalho" />
        <meta name="owner" content="Matheus Carvalho" />
        <meta name="application-name" content="HyperGym by Matheus Carvalho" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
