
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { arimo, gelasio, inter } from "./fonts";


export const metadata: Metadata = {
  title: "Cavli Hubble - IoT Connectivity & Modem Management Platform",
  description:
    "Cavli Hubble is a comprehensive IoT connectivity and modem management platform that centralizes device management across LPWAN, LTE, 5G, and legacy networks using integrated eSIM technology.",
};

async function getExhibitorsData(page: number = 1, limit: number = 5) {
  // When calling internal APIs during server-side rendering, 
  // you must use absolute URLs, or call your database logic directly instead.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/scrape/exhibitors?page=${page}&limit=${limit}`, {
    cache: 'no-store', // Ensures fresh data on every request
  });

  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


    const exhibitorsData = await getExhibitorsData();
    const exhibitorList = exhibitorsData?.data?.exhibitors ?? [];
    const navLinks = exhibitorsData?.data?.navLinks ?? [];

    let formattedNavLinks = navLinks.map((link: any) => ({
      label: link.text,
      href: link.href.replace(/\/app\//g, '/')
    }));

  return (
    <html lang="en">
      <body
        className={`${arimo.variable} ${gelasio.variable} ${inter.variable} scroll-smooth`}
      >
        <Header />
        <Navbar navItems={formattedNavLinks} />

        {children}
        <Footer exhibitors={exhibitorList} />
      </body>
    </html>
  );
}