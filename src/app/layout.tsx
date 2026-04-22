import './globals.css'
import type { Metadata } from 'next'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export const metadata: Metadata = {
  title: 'Quantum Algorithm Library',
  description: 'Plataforma para consulta e organização de algoritmos quânticos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}