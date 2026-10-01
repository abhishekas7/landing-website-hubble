import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { iotModuleProducts } from "@/app/data/productPageDatas";
import { toIotSlug } from "@/app/utils/iotSlug";
import ConsultSection from "@/app/components/ConsultSection";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckboxCircleFill,
  RiCpuLine,
  RiSignalTowerLine,
  RiSettings3Line,
  RiSpeedLine,
  RiStarLine,
} from "react-icons/ri";
import { IotModuleChip } from "@/app/types/product";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getProductBySlug(slug: string) {
  return iotModuleProducts.find((p) => toIotSlug(p.name) === slug);
}

export async function generateStaticParams() {
  return iotModuleProducts.map((p) => ({ slug: toIotSlug(p.name) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not Found | Cavli Hubble" };
  return {
    title: `${product.detailsView.title} | Cavli Hubble IoT Modules`,
    description: product.detailsView.des,
    openGraph: {
      title: `${product.detailsView.title} — Cavli Hubble`,
      description: product.detailsView.des,
    },
  };
}

// ── Chip detail card ──────────────────────────────────────────────────────────

function ChipCard({ chip, productImage }: { chip: IotModuleChip; productImage: string }) {
  return (
    <div className="rounded-2xl border border-[#E5DCEE] bg-white overflow-hidden shadow-sm">
      {/* Chip header */}
      <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-[#E5DCEE] bg-[#FAF7FC]">
        <div>
          <div className="flex flex-wrap gap-2 mb-1">
            {chip.types.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-[#EAE0F5] text-[#392259] text-xs font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-[#392259] font-arimo">{chip.name}</h3>
          <p className="text-xs text-[#756383] mt-0.5 font-inter">{chip.os}</p>
        </div>

        {/* Chip image */}
        <div className="relative shrink-0 h-20 w-20 rounded-xl overflow-hidden border border-[#E5DCEE] bg-white">
          <Image
            src={chip.imgUrl || productImage}
            alt={chip.name}
            fill
            className="object-contain p-1"
          />
        </div>
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E5DCEE]">

        {/* Cellular Bands */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#756383] uppercase tracking-wider mb-3">
            <RiSignalTowerLine className="text-[#392259]" size={14} />
            Cellular Bands
          </div>
          <div className="space-y-2">
            {Object.entries(chip.cellularBands).map(([region, bands]) => (
              <div key={region}>
                <span className="text-[10px] font-bold text-[#392259] uppercase tracking-wide">
                  {region}
                </span>
                <p className="text-xs text-[#756383] leading-relaxed mt-0.5 font-mono">
                  {typeof bands === "string"
                    ? bands
                    : Object.entries(bands)
                        .map(([tech, b]) => `${tech}: ${b}`)
                        .join(" | ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interfaces */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#756383] uppercase tracking-wider mb-3">
            <RiSettings3Line className="text-[#392259]" size={14} />
            Interfaces
          </div>
          <ul className="space-y-1">
            {chip.interfaces.map((iface) => (
              <li key={iface} className="flex items-center gap-1.5 text-xs text-[#756383]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#392259] shrink-0" />
                {iface}
              </li>
            ))}
          </ul>
        </div>

        {/* Speeds */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#756383] uppercase tracking-wider mb-3">
            <RiSpeedLine className="text-[#392259]" size={14} />
            Data Speeds
          </div>
          <div className="space-y-3">
            {Object.entries(chip.speeds).map(([tech, speed]) => (
              <div key={tech} className="rounded-lg bg-[#FAF7FC] border border-[#E5DCEE] p-3">
                <p className="text-[10px] font-bold text-[#392259] uppercase mb-1">{tech}</p>
                <div className="flex justify-between text-xs text-[#756383]">
                  <span>↓ {speed.download}</span>
                  <span>↑ {speed.upload}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#756383] uppercase tracking-wider mb-3">
            <RiStarLine className="text-[#392259]" size={14} />
            Key Highlights
          </div>
          <ul className="space-y-1.5">
            {chip.keyHighlights.map((h) => (
              <li key={h} className="flex items-start gap-1.5 text-xs text-[#756383]">
                <RiCheckboxCircleFill
                  size={13}
                  className="text-[#392259] shrink-0 mt-0.5"
                />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function IotModuleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const { detailsView, imageLink } = product;
  const otherProducts = iotModuleProducts.filter((p) => toIotSlug(p.name) !== slug);

  return (
    <main className="min-h-screen bg-white text-[#28242F] font-inter">

      {/* ── Hero / Section 1 ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7FC] via-[#FAF7FC]/60 to-white border-b border-[#E5DCEE]">
        {/* dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#392259_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

        <div className="relative mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">

          {/* Two-column hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0F5] text-xs font-semibold text-[#392259] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#392259] animate-pulse" />
                Cavli IoT Module
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#392259] font-arimo tracking-tight leading-tight">
                {detailsView.title}
              </h1>

              <p className="text-base sm:text-lg text-[#756383] font-inter leading-relaxed">
                {detailsView.des}
              </p>

              {/* What is */}
              <div className="rounded-xl bg-white border border-[#E5DCEE] p-5 shadow-sm">
                <p className="text-xs font-bold text-[#392259] uppercase tracking-wider mb-2">
                  What is {detailsView.title}?
                </p>
                <p className="text-sm text-[#756383] leading-relaxed">
                  {detailsView.whatIs}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#chips"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#392259] text-white font-medium text-sm hover:bg-[#4b2f73] transition-all shadow-md hover:shadow-lg"
                >
                  <RiCpuLine size={18} /> View Module Specs
                </a>
                <a
                  href="#consult"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#E5DCEE] bg-white text-[#392259] font-medium text-sm hover:bg-[#FAF7FC] transition-colors"
                >
                  Book a Consultation <RiArrowRightLine size={16} />
                </a>
              </div>
            </div>

            {/* Right — product image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-[#E5DCEE] bg-[#F7F2FA] shadow-lg">
                <Image
                  src={imageLink}
                  alt={detailsView.title}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chip Table Section ────────────────────────────────────────────── */}
      <section id="chips" className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 py-20 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0F5] text-xs font-semibold text-[#392259] uppercase tracking-wider mb-3">
            <RiCpuLine size={14} /> Available Modules
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#392259] font-arimo">
            Module Specifications
          </h2>
          <p className="mt-2 text-base text-[#756383] font-inter max-w-2xl">
            Compare the full technical specification of each module in the {detailsView.title} family.
          </p>
        </div>

        <div className="space-y-6">
          {detailsView.chip.map((chip) => (
            <ChipCard key={chip.name} chip={chip} productImage={imageLink} />
          ))}
        </div>
      </section>

      {/* ── Related Products ─────────────────────────────────────────────── */}
      {otherProducts.length > 0 && (
        <section className="border-t border-[#E5DCEE] mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 py-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#392259] font-arimo">
                Explore More IoT Modules
              </h2>
              <p className="mt-1 text-sm text-[#756383] font-inter">
                Discover other Cavli Hubble module families.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProducts.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/iot-module/${toIotSlug(item.name)}`}
                className="group flex gap-4 items-start rounded-xl border border-[#E5DCEE] bg-white p-5 hover:shadow-md hover:border-[#392259]/30 transition-all duration-200"
              >
                <div className="relative shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-[#E5DCEE] bg-[#FAF7FC]">
                  <Image src={item.imageLink} alt={item.name} fill className="object-contain p-1" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[#756383] font-medium uppercase tracking-wide mb-0.5">
                    {item.subtitle}
                  </p>
                  <h3 className="text-base font-bold text-[#392259] font-arimo leading-snug group-hover:text-[#4b2f73] transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#756383] line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Consult ──────────────────────────────────────────────────────── */}
      <ConsultSection />
    </main>
  );
}
