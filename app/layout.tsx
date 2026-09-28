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

async function getExhitorsData() {
  // Fetch data directly from a database or secure API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/scrape/exhibitors`, { cache: 'no-store' });
  const data = await res.json();
  return data
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(baseUrl);
  

  let updatedNavLinks: { label: string; href: string }[] = [];

  try {
    
    const exhibitorsData = await getExhitorsData();
    const {exhibitors,navLinks,events,halls,total} = exhibitorsData
    

    updatedNavLinks = navLinks.map((link: { text: string; href: string }) => {
      return {
        label: link.text,
        href: link.href,
      }
    })

    
    
    
  } catch (err) {
    console.error("Failed to fetch nav links:", err);
  }

  return (
    <html lang="en">
      <body
        className={`${arimo.variable} ${gelasio.variable} ${inter.variable} scroll-smooth`}
      >
        <Header />
        <Navbar navItems={updatedNavLinks}/>

        {children}
      </body>
    </html>
  );
}