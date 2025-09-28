import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Image from "next/image";   // 👈 Importación añadida

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inteligencia Artificial: Conceptos y Aplicaciones | TalentoTech",
  description:
    "Explora el fascinante mundo de la inteligencia artificial con nuestra plataforma educativa interactiva. Aprende sobre conceptos básicos, aplicaciones, diferencias con la automatización y participa en actividades interactivas.",
  keywords: [
    "Inteligencia Artificial",
    "IA",
    "Machine Learning",
    "Redes Neuronales",
    "Procesamiento de Lenguaje Natural",
    "Educación Tecnológica",
    "TalentoTech",
    "Innovación Educativa",
  ],
  authors: [{ name: "TalentoTech Team" }],
  openGraph: {
    title: "Inteligencia Artificial: Conceptos y Aplicaciones | TalentoTech",
    description:
      "Plataforma educativa interactiva para aprender sobre inteligencia artificial y sus aplicaciones.",
    url: "https://tu-dominio.com",
    siteName: "TalentoTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inteligencia Artificial: Conceptos y Aplicaciones | TalentoTech",
    description:
      "Plataforma educativa interactiva para aprender sobre inteligencia artificial y sus aplicaciones.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* 👇 Aquí se muestra el logo en lugar de texto */}
        <header className="p-4 flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="TalentoTech Logo"
            width={120}
            height={40}
            priority
          />
        </header>

        {children}
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
