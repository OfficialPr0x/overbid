import localFont from 'next/font/local';

// Self-hosted variable fonts (SIL OFL 1.1; licences in /licenses). Latin subset from @fontsource-variable.
export const hostGrotesk = localFont({
  src: './fonts/HostGrotesk-Variable-latin.woff2',
  weight: '300 800',
  variable: '--font-host-grotesk',
  display: 'swap',
});

/** Editorial accent: italic only, reserved for single emphasised phrases inside display headlines. */
export const instrumentSerif = localFont({
  src: './fonts/InstrumentSerif-Italic-latin.woff2',
  weight: '400',
  style: 'italic',
  variable: '--font-instrument-serif',
  display: 'swap',
  preload: false,
});

export const inter = localFont({
  src: './fonts/Inter-Variable-latin.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
});
