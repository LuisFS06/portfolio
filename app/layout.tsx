import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import ContactRail from "@/components/ContactRail";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ML_ENGINEER | Logbook V1.0",
    template: "%s | ML_ENGINEER",
  },
  description:
    "Portafolio técnico de un Machine Learning Engineer & Data Architect: proyectos de ingeniería, publicaciones y trayectoria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-canvas font-serif text-body-md text-foreground antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-caps focus:uppercase focus:text-accent-ink"
        >
          Saltar al contenido
        </a>
        <Nav />
        <main id="contenido" className="min-h-screen pb-24 pt-16">
          {children}
        </main>
        <ContactRail />
        <Footer />
      </body>
    </html>
  );
}
