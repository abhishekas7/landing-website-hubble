import React from 'react'
import type { BannerCardProps } from '../types/banner'
import Button from '../ui/Button'
import Image from 'next/image'
import Navbar from './Navbar'

function Banner({ title, tagline, image }: BannerCardProps) {
  return (
    <section className="w-full md:px-8 lg:px-12 bg-[#F9F9F9]">
      <Navbar/>
      <div className="mx-auto max-w-[1800px] border border-white/10 bg-[#F9F9F9] p-6 md:p-10 ">
        <div className="grid items-center gap-8 md:grid-cols-2 py-[120px]">
          <div className="space-y-6">

            <div className="space-y-4">
              <h1 className="text-4xl font-light leading-tight text-[#28242F] md:text-5xl lg:text-6xl font-arimo">
                {title}
              </h1>
              <h1 className="text-4xl font-light italic leading-tight text-[#28242F] md:text-5xl lg:text-6xl font-gelasio">
                Infinite Possibilities.
              </h1>
              <p className="text-lg text-[#28242F] md:text-xl font-arimo">
                {tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-lg border border-[#e5dcee] px-6 py-3 text-base font-semibold text-[#e5dcee] hover:text-[#392259] cursor-pointer hover:border-[#392259]  hover:bg-[#FFFFFF] bg-[#392259] transition-colors duration-300">
               Consult Now
              </Button>
            </div>
          </div>

          <div className="relative flex items-end justify-center">
            <Image
              src={image}
              alt="Cavli Chip Module"
              className="object-contain"
              width={500}
              height={500}
              priority
            />
          </div>

        </div>
        
      </div>
      
    </section>
  )
}

export default Banner