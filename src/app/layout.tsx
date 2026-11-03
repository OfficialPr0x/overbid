import type { Metadata, Viewport } from 'next';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { inter, spaceGrotesk } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'OVERBID CAPITAL — Private marketplace for business owners and buyers',
    template: '%s · OVERBID CAPITAL',
  },
  description: 'A private marketplace for business owners and ambitious buyers. List your business or explore businesses for acquisition.',
  // Demo build with sample inventory: keep out of search indexes until launch inputs are supplied.
  robots: { index: false, follow: false },
  icons: { icon: '/brand/overbid-mark-640.webp' },
};

export const viewport: Viewport = {
  themeColor: '#080A09',
  colorScheme: 'dark',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
