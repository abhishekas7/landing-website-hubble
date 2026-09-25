import type { Metadata } from "next";
import { Arimo, Gelasio, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

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
    "Cavli Hubble is a comprehensive IoT connectivity and modem management platform that centralizes device management across LPWAN, LTE, 5G, and legacy networks using integrated eSIM technology. It provides real-time visibility and operational control for IoT deployments, ensuring strong security, high uptime, and consistent fleet-wide intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${arimo.variable} ${gelasio.variable} ${inter.variable}`}
    >
      <body className="min-h-full flex flex-col">
        {/* Announcement banner – shown on every page */}
        <Header />
        {/* Main navigation – shown on every page */}
        <div className="bg-[#F9F9F9] px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-[1800px]">
            <Navbar />
          </div>
        </div>
        {/* Page-specific content */}
        {children}
      </body>
    </html>
  );
}
