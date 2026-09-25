"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { NavItem } from "../types/navbar";
import Image from "next/image";


const navItems: NavItem[] = [
  { label: "Platform", href: "#platform" },
  { label: "Products", href: "#products" },
  { label: "Connectivity", href: "#connectivity" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full font-arimo" aria-label="Main Navigation  ">
      <div className="flex items-center justify-between py-4 border-b border-[#E5DCEE]/80  md:px-8 lg:px-12">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center gap-1.5">
            <Image
              src="/images/hubble-logo.png"
              alt="Hubble platform"
              width={120}
              height={40}
              className="h-auto w-full"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm md:text-md font-medium text-[#756383] hover:text-[#392259] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#login"
            className="cursor-not-allowed text-sm md:text-md font-medium text-[#392259] hover:text-[#28242F] transition-colors px-3 py-2"
          >
            Sign In
          </Link>
          <Link
            href="#demo"
            className=" cursor-not-allowed rounded-lg border border-[#e5dcee] px-4 py-2 text-sm font-semibold text-[#e5dcee] bg-[#392259] hover:bg-white hover:text-[#392259] hover:border-[#392259] transition-all duration-300 shadow-sm"
          >
            Request Demo
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-[#392259] hover:text-[#28242F] hover:bg-[#E5DCEE]/40 focus:outline-none transition-colors"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className="md:hidden mt-2 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-md rounded-xl border border-[#E5DCEE] shadow-lg px-4"
          id="mobile-menu"
        >
          <div className="flex flex-col space-y-2 py-3 border-b border-[#E5DCEE]/60">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md text-base font-medium text-[#28242F] hover:text-[#392259] hover:bg-[#F9F9F9] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 pb-2 flex flex-col gap-2">
            <Link
              href="#login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 text-sm font-medium text-[#392259] hover:bg-[#F9F9F9] rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="#demo"
              onClick={() => setIsOpen(false)}
              className="w-full text-center rounded-lg border border-[#e5dcee] px-4 py-2.5 text-sm font-semibold text-[#e5dcee] bg-[#392259] hover:bg-white hover:text-[#392259] hover:border-[#392259] transition-all duration-300 shadow-sm"
            >
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
