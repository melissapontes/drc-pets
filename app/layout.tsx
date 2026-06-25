import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drc-pets.vercel.app"),
  title: "DRC em Pets — Guia para Responsáveis",
  description: "Guia educativo sobre doença renal crônica em cães e gatos, baseado nas diretrizes da IRIS.",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon-512.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} bg-white text-slate-900 min-h-screen antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[9999] focus:bg-[#550084] focus:text-white focus:px-4 focus:py-3 focus:rounded-br-xl focus:font-semibold"
        >
          Ir para o conteúdo principal
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
