import { Arimo, Gelasio, Inter } from "next/font/google";

export const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arimo",
});

export const gelasio = Gelasio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-gelasio",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});