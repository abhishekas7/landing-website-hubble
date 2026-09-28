import type { Metadata } from "next";
import { Arimo, Gelasio, Inter } from "next/font/google";

import "./globals.css";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import apiService from "./services/apiService";

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arimo",
});

const gelasio = Gelasio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-gelasio",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cavli Hubble - IoT Connectivity & Modem Management Platform",
  description:
    "Cavli Hubble is a comprehensive IoT connectivity and modem management platform that centralizes device management across LPWAN, LTE, 5G, and legacy networks using integrated eSIM technology.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  let navLinks: { label: string; href: string }[] = [];
  try {
    // Scraper returns { text, href } but NavItem expects { label, href } — map here
    const exhibitors = await apiService.get<{ navLinks?: { text: string; href: string }[] }>(
      `${baseUrl}/api/scrape/exhibitors`
    );
    navLinks = (exhibitors?.navLinks ?? [])
      .filter((item) => item.text && item.text.trim().length > 0)
      .map((item) => ({
        label: item.text.trim(),
        href: item.href,
      }));
    console.log("Exhibitors navLinks:", navLinks);
  } catch (err) {
    console.error("Failed to fetch nav links:", err);
  }

  return (
    <html lang="en">
      <body
        className={`${arimo.variable} ${gelasio.variable} ${inter.variable} scroll-smooth`}
      >
        <Header />
        <Navbar navItems={navLinks}/>

        {children}
      </body>
    </html>
  );
}