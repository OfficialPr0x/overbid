import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { SavedList } from '@/components/marketplace/SavedList';
import { listingRepository } from '@/lib/listings';

export const metadata: Metadata = { title: 'Saved opportunities' };

export default function SavedPage() {
  return (
    <>
      <PageHeader eyebrow="For buyers" title="Saved opportunities.">
        <p>Sample listings you bookmarked on this device. No account is involved.</p>
      </PageHeader>
      <div className="container">
        <SavedList listings={listingRepository.all()} />
      </div>
    </>
  );
}
