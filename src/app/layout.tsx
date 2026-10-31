import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taissa Santos Arquitetura | Interiores em Goiânia",
  description:
    "Arquitetura de interiores em Goiânia. Apartamentos, casas, suítes, cozinhas e quartos infantis. CASACOR Goiás 2025. O lar carrega a identidade de quem vive ali.",
  openGraph: {
    title: "Taissa Santos Arquitetura",
    description: "Arquitetura que também se sente. Interiores em Goiânia, CASACOR Goiás 2025.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrument.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
