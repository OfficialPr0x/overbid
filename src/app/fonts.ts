import localFont from 'next/font/local';

// Self-hosted variable fonts (SIL OFL 1.1; licences in /licenses). Latin subset from @fontsource-variable.
export const spaceGrotesk = localFont({
  src: './fonts/SpaceGrotesk-Variable-latin.woff2',
  weight: '300 700',
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const inter = localFont({
  src: './fonts/Inter-Variable-latin.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
});
