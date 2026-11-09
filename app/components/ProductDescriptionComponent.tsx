'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  desc: string;
}

export default function ProductDescriptionComponent({ desc }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p
      className={`text-base sm:text-lg text-[#756383] font-inter leading-relaxed transition-opacity duration-700 ${
        visible ? 'block' : 'hidden'
      }`}
    >
      {desc}
    </p>
  );
}
