import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SecurityWrapper } from "@/components/security-wrapper"

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
  robots: "noindex, nofollow, noarchive, nosnippet, noimageindex",
  other: {
    copyright: "© 2024 Matheus Carvalho. Todos os direitos reservados.",
    author: "Matheus Carvalho",
    owner: "Matheus Carvalho",
  },
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
      <body className={`${inter.className} antialiased`}>
        <SecurityWrapper>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </SecurityWrapper>
      </body>
    </html>
  )
}
