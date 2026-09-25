import Consultform from "./Consultform";

export default function ConsultSection() {
  return (
    <section id="consult" className="w-full bg-[#FAF7FC]/60 border-t border-b border-[#E5DCEE]">
      <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-20 font-inter">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Context & Value Props */}
          <div className="flex-1 bg-[#F7F2FA] rounded-2xl p-8 sm:p-12 text-left flex flex-col justify-between border border-[#E5DCEE]/70 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0F5] text-xs font-semibold text-[#392259] uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#392259] animate-pulse"></span>
                Architecture & Strategy
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#392259] font-arimo tracking-tight leading-tight">
                Scale Your Connected Fleet With Complete Certainty
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#756383] font-inter leading-relaxed">
                Connect directly with Cavli Hubble's connectivity engineers and IoT architects. We help enterprises optimize hardware-to-cloud topology, automate global eSIM switching, and secure device operations at scale.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E8DCF5] flex items-center justify-center shrink-0 mt-0.5 text-[#392259]">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#28242F]">Global Multi-Network Connectivity</h4>
                    <p className="text-xs text-[#756383]">Automated profile switching across 150+ countries with Tier-1 carriers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E8DCF5] flex items-center justify-center shrink-0 mt-0.5 text-[#392259]">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#28242F]">Zero-Touch Modem Lifecycle</h4>
                    <p className="text-xs text-[#756383]">Over-The-Air (OTA) firmware orchestration and dynamic data plan configuration.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E8DCF5] flex items-center justify-center shrink-0 mt-0.5 text-[#392259]">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#28242F]">Hardware-Grade Security & SLA</h4>
                    <p className="text-xs text-[#756383]">Encrypted telemetry, tamper-proof keys, and enterprise-grade uptime guarantees.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#E5DCEE] flex items-center justify-between text-xs text-[#756383]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Specialist response within 24h
              </span>
              <span>NDA protected & confidential</span>
            </div>
          </div>

          {/* Right Column: Consultform */}
          <div className="flex-1 flex justify-center items-center">
            <Consultform />
          </div>
        </div>
      </div>
    </section>
  );
}
