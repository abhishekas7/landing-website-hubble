import { Inter, Playfair_Display } from 'next/font/google';

// Configuration for Sans-Serif / Body font (Variable font example)
export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Injects a Tailwind CSS variable
  display: 'swap',
});

// Configuration for Serif / Heading font (Fixed weight font example)
export const fontSerif = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
  display: 'swap',
});