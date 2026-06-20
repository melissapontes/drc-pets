import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRC em Pets — Guia para Tutores",
  description: "Guia educativo sobre doença renal crônica em cães e gatos, baseado nas diretrizes da IRIS.",
  icons: { icon: "/rim.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 text-slate-900 min-h-screen antialiased font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[9999] focus:bg-purple-700 focus:text-white focus:px-4 focus:py-3 focus:rounded-br-xl focus:font-semibold"
        >
          Ir para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
