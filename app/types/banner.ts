import type { StaticImageData } from 'next/image';

export interface BannerCardProps {
    title: React.ReactNode;
    subtitle?: string;
    tagline?: string;
    image?: string | StaticImageData;
}