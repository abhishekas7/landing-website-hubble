import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  imgLink: StaticImageData | string;
  title: string;
  subtitle: string;
  desc: string;
};

function IotProductCard({ imgLink, title, subtitle, desc }: Props) {
  return (
    <div className="group w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-100 w-full overflow-hidden bg-gray-100">
        <Image
          src={imgLink}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[#1a3cb5]">
          {subtitle}
        </p>

        <h3 className="mb-3 text-xl font-semibold text-gray-900">
          {title}
        </h3>

        <p className="line-clamp-3 text-sm leading-6 text-gray-600">
          {desc}
        </p>

        <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-blue-600">
          Learn more
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
}

export default IotProductCard;