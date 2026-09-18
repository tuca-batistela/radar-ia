import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Radar de Casos de Uso de IA",
  description:
    "Mural da turma — o que a inteligência artificial já resolve (ou pode resolver) no seu ofício",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${serif.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
