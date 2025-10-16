import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AccessControlProvider } from "@/components/access-control-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HyperGym - Treino e Dieta Personalizada 100% GRÁTIS",
  description: "Planos de treino e dieta personalizados baseados nos maiores atletas do mundo - Totalmente gratuito",
  generator: "HyperGym v1.0.0 - Matheus Carvalho",
  applicationName: "HyperGym",
  authors: [{ name: "Matheus Carvalho", url: "https://matheuscarvalho.dev" }],
  creator: "Matheus Carvalho",
  publisher: "Matheus Carvalho",
  keywords: [
    "treino",
    "dieta",
    "hipertrofia",
    "musculação",
    "fitness",
    "grátis",
    "arnold",
    "cbum",
    "ramon dino",
    "zyzz",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://hypergym.vercel.app",
    title: "HyperGym - Treino e Dieta 100% GRÁTIS",
    description: "Planos personalizados baseados nos maiores atletas do mundo",
    siteName: "HyperGym",
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
        <meta name="copyright" content="© 2025 Matheus Carvalho" />
        <meta name="author" content="Matheus Carvalho" />
        <meta name="owner" content="Matheus Carvalho" />
        <meta name="application-name" content="HyperGym by Matheus Carvalho" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="HyperGym" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AccessControlProvider>{children}</AccessControlProvider>
      </body>
    </html>
  )
}
