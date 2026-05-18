import type { Metadata, Viewport } from "next";
import { RegisterServiceWorker } from "@/components/pwa/RegisterServiceWorker";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accenture Quantum Algorithm Library",
  description:
    "Biblioteca interativa para explorar, comparar e entender algoritmos quânticos.",
  applicationName: "Quantum Algorithm Library",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Quantum Library",
    statusBarStyle: "black-translucent"
  },
  formatDetection: {
    telephone: false
  }
};

export const viewport: Viewport = {
  themeColor: "#a100ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  );
}