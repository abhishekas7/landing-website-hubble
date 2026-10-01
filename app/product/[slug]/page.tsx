import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/app/data/product";
import ConsultSection from "@/app/components/ConsultSection";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCheckboxCircleFill,
  RiShieldCheckLine,
  RiLightbulbLine,
  RiApps2Line,
  RiListSettingsLine,
} from "react-icons/ri";
import ModelRender from "@/app/components/ModelRender";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getProductBySlug(slug: string) {
  return products.find(
    (product) =>
      product.id.toString() === slug ||
      product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id.toString(),

  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Cavli Hubble",
      description: "The requested Cavli Hubble product could not be found.",
    };
  }

  return {
    title: `${product.name} | Cavli Hubble IoT Solutions`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Cavli Hubble`,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categorySpec = product.specifications.find(
    (item) => item.label.toLowerCase() === "category"
  );
  const otherProducts = products.filter((p) => p.id !== product.id);

  return (
    <main className="min-h-screen bg-white text-[#28242F] font-inter">


      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7FC] via-[#FAF7FC]/60 to-white border-b border-[#E5DCEE]">
        <div className="absolute inset-0 bg-[radial-gradient(#392259_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

        <div className="relative mx-auto max-[1800px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 p-[40px]">
            {/* Title & Description */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0F5] text-xs font-semibold text-[#392259] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#392259] animate-pulse"></span>
                {categorySpec ? categorySpec.value : "Cavli Hubble Solution"}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#392259] font-arimo tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-[#756383] font-inter leading-relaxed max-w-3xl">
                {product.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  id="hero-consult-btn"
                  href="#consult"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#392259] text-white font-medium text-sm hover:bg-[#4b2f73] transition-all duration-200 shadow-md hover:shadow-lg gap-2"
                >
                  Request Architecture Consultation
                  <RiArrowRightLine size={18} />
                </a>

                <a
                  id="hero-specs-btn"
                  href="#specifications"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#E5DCEE] bg-white text-[#392259] font-medium text-sm hover:bg-[#FAF7FC] transition-colors duration-200 gap-2"
                >
                  <RiListSettingsLine size={18} />
                  Technical Specifications
                </a>
              </div>
            </div>

            {/* Product Icon & Visual Badge */}
            <div className="shrink-0 flex items-center  justify-center lg:justify-end bg-[transparent] rounded-2xl p-4 lg:p-6 border border-[#E5DCEE] shadow-sm">
       <ModelRender />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1600px] py-16 sm:px-10 ">
        {/* Overview & Quick Specs Grid */}
        <section aria-labelledby="section-overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Overview */}
            <div className="lg:col-span-7 bg-[#FAF7FC]/50 rounded-2xl p-8 sm:p-10 border border-[#E5DCEE] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#756383] uppercase tracking-wider mb-3">
                <RiLightbulbLine size={18} className="text-[#392259]" />
                System Overview
              </div>
              <h2
                id="section-overview"
                className="text-2xl sm:text-3xl font-bold text-[#392259] font-arimo mb-4"
              >
                Comprehensive Platform Architecture
              </h2>
              <p className="text-base sm:text-lg text-[#756383] font-inter leading-relaxed">
                {product.overview}
              </p>
            </div>

            {/* Specifications Card */}
            <div
              id="specifications"
              className="lg:col-span-5 bg-white rounded-2xl p-8 border border-[#E5DCEE] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#756383] uppercase tracking-wider mb-3">
                  <RiListSettingsLine size={18} className="text-[#392259]" />
                  Technical Parameters
                </div>
                <h3 className="text-xl font-bold text-[#392259] font-arimo mb-4">
                  Quick Specifications
                </h3>

                <dl className="divide-y divide-[#E5DCEE]">
                  {product.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="py-3 flex items-center justify-between text-sm"
                    >
                      <dt className="text-[#756383] font-medium">{spec.label}</dt>
                      <dd className="text-[#392259] font-semibold text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5DCEE] text-xs text-[#756383] flex items-center justify-between">
                <span>Deployment Model</span>
                <span className="font-semibold text-[#392259]">Cloud & Edge Native</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Capabilities */}
        <section aria-labelledby="section-features" className="space-y-8">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0F5] text-xs font-semibold text-[#392259] uppercase tracking-wider mb-3">
              Capabilities
            </div>
            <h2
              id="section-features"
              className="text-2xl sm:text-3xl font-bold text-[#392259] font-arimo"
            >
              Key Capabilities & Features
            </h2>
            <p className="mt-2 text-base text-[#756383] max-w-2xl font-inter">
              Built to withstand real-world industrial IoT demands, ensure uninterrupted
              telemetry, and deliver enterprise-scale reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-[#E5DCEE] hover:border-[#392259]/40 hover:shadow-md transition-all duration-200 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-[#EAE0F5] text-[#392259] flex items-center justify-center shrink-0 mt-0.5">
                  <RiCheckboxCircleFill size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#28242F] font-arimo">
                    {feature}
                  </h3>
                  <p className="mt-1 text-xs text-[#756383] leading-relaxed font-inter">
                    Integrated directly into Hubble runtime workflows for zero-touch
                    orchestration.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Benefits & Target Use Cases */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-16">
          {/* Benefits */}
          <div className="lg:col-span-7 bg-[#F7F2FA] rounded-2xl p-8 sm:p-10 border border-[#E5DCEE] shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0F5] text-xs font-semibold text-[#392259] uppercase tracking-wider mb-3">
                <RiShieldCheckLine size={16} />
                Value Propositions
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#392259] font-arimo mb-4">
                Operational & Business Benefits
              </h2>
              <p className="text-base text-[#756383] font-inter mb-6">
                Deliver tangible efficiency gains, shorten development cycles, and ensure
                continuous uptime across complex connected fleets.
              </p>

              <div className="space-y-4">
                {product.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 bg-white/80 rounded-xl p-4 border border-[#E5DCEE]/70"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#392259] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-sm font-medium text-[#28242F] leading-snug">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-8 sm:p-10 border border-[#E5DCEE] shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7FC] border border-[#E5DCEE] text-xs font-semibold text-[#392259] uppercase tracking-wider mb-3">
                <RiApps2Line size={16} />
                Target Industries
              </div>
              <h2 className="text-2xl font-bold text-[#392259] font-arimo mb-4">
                Proven Use Cases
              </h2>
              <p className="text-sm text-[#756383] font-inter mb-6">
                Engineered for critical mission verticals that demand resilience and
                fleet-wide visibility.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {product.useCases.map((useCase, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7FC] border border-[#E5DCEE] text-xs sm:text-sm font-semibold text-[#392259] hover:bg-[#EAE0F5] transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#392259]"></span>
                    {useCase}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5DCEE]">
              <p className="text-xs text-[#756383]">
                Custom solutions available for proprietary device architectures and private
                APNs.
              </p>
            </div>
          </div>
        </section>

        {/* Other Platform Solutions */}
        {otherProducts.length > 0 && (
          <section
            aria-labelledby="section-other-products"
            className="pt-8 border-t border-[#E5DCEE] space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2
                  id="section-other-products"
                  className="text-2xl sm:text-3xl font-bold text-[#392259] font-arimo"
                >
                  Explore More Platform Capabilities
                </h2>
                <p className="mt-1 text-sm sm:text-base text-[#756383] font-inter">
                  Discover how other Hubble modules integrate seamlessly with {product.name}.
                </p>
              </div>

              <Link
                href="/#features"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#392259] hover:text-[#756383] transition-colors duration-200"
              >
                View all solutions
                <RiArrowRightLine size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 flex flex-col justify-between border border-[#E5DCEE] hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#FAF7FC] border border-[#E5DCEE] flex items-center justify-center text-[#392259] mb-4 group-hover:scale-105 transition-transform duration-200">
                      {item.image}
                    </div>
                    <h3 className="text-lg font-bold text-[#392259] font-arimo mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#756383] font-inter line-clamp-3 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <Link
                    href={`/product/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#392259] hover:text-[#756383] transition-colors duration-200 pt-2 border-t border-[#E5DCEE]/60 mt-auto"
                  >
                    Explore details
                    <RiArrowRightUpLine size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Embedded Consultation Section */}
      <ConsultSection />
    </main>
  );
}
