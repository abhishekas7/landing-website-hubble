"use client";

import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import IotProductCard from "./IotProductCard";
import { iotModuleProducts } from "../data/productPageDatas";
import { iotModuleProductTypes } from "../types/product";
import { toIotSlug } from "../utils/iotSlug";

type Props = {};

function IotModules({ }: Props) {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay.current]
  );

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };


  return (
    <div className="mx-auto border-t border-b border-[#E5DCEE] px-8 py-12 text-center font-inter text-[#756383] sm:px-6 lg:px-[180px]">

      <h1 className="mb-6 font-arimo text-4xl font-semibold text-[#392259]">
        IoT Modules
      </h1>

      <p className="mx-auto mb-10 max-w-[1800px] text-left text-lg text-[#392259] mb-3">
        The platform streamlines modem onboarding, data plan management, and
        OTA updates, enabling our clients to activate and manage eSIM-enabled
        modems deployed anywhere in the world with minimal field intervention.
        This helps them simplify operations, reduce system complexity, and
        maintain a connected ecosystem that remains secure, transparent, and
        deployment-ready at all times.
      </p>

      {/* Carousel */}
      <div className="relative">

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">

            {iotModuleProducts.map((product: iotModuleProductTypes) => (
              <div
                key={product.id}
                className="
                  min-w-[500px]
                "
              >
                <IotProductCard
                  imgLink={product.imageLink}
                  title={product.name}
                  subtitle={product.subtitle}
                  desc={product.desc}
                  slug={toIotSlug(product.name)}
                />
              </div>
            ))}

          </div>
        </div>

        {/* Previous */}
        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-[-24px] top-1/2 flex h-11 w-11
          -translate-y-1/2 items-center justify-center rounded-full
          border border-[#E5DCEE] bg-white text-[#392259] shadow-sm
          hover:bg-[#F7F3FA]"
        >
          ←
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-[-24px] top-1/2 flex h-11 w-11
          -translate-y-1/2 items-center justify-center rounded-full
          border border-[#E5DCEE] bg-white text-[#392259] shadow-sm
          hover:bg-[#F7F3FA]"
        >
          →
        </button>

      </div>
    </div>
  );
}

export default IotModules;