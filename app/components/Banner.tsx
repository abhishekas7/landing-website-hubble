import React from 'react'
import type { BannerCardProps } from '../types/banner'
import Button from '../ui/Button'

function Banner({ title, subtitle, tagline, image } : BannerCardProps) {
  return (
       <section className="w-full md:px-8 lg:px-12 bg-[#D0BDF2]">
      <div className="mx-auto max-w-full border border-white/10 bg-[#D0BDF2] p-6 md:p-10 ">
        <div className="grid items-center gap-8 md:grid-cols-2 py-[120px]">
          <div className="space-y-6">

            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
               {title}
                <span className="block text-cyan-400">beautifully simple.</span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-lg bg-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-cyan-600">
                Explore Collection
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="h-[420px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-cover bg-center shadow-2xl"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80')",
              }}
              aria-label="Modern home interior"
            />

            <div className="absolute -bottom-5 left-5 rounded-2xl border border-cyan-400/30 bg-slate-950/80 px-4 py-3 shadow-lg backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">New collection</p>
              <p className="mt-1 text-lg font-semibold text-white">Elevated comfort</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-base italic text-slate-200 md:text-lg">
            Civility and humility are the quiet foundation of every lasting design.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Banner