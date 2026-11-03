import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DemoNotice, PageHeader } from '@/components/layout/PageHeader';
import { MarketplaceBrowser, MarketplaceFallback } from '@/components/marketplace/MarketplaceBrowser';
import { listingRepository } from '@/lib/listings';

export const metadata: Metadata = { title: 'Explore Businesses' };

export default function BusinessesPage() {
  const listings = listingRepository.all();
  return (
    <>
      <PageHeader eyebrow="For buyers" title="Find the business" accent="worth your next move.">
        <p>Discover opportunities that fit your acquisition strategy.</p>
        <DemoNotice>These are illustrative sample listings, not businesses for sale. Figures are invented to demonstrate the interface.</DemoNotice>
      </PageHeader>
      <div className="container">
        <Suspense fallback={<MarketplaceFallback listings={listings} />}>
          <MarketplaceBrowser listings={listings} />
        </Suspense>
      </div>
    </>
  );
}
