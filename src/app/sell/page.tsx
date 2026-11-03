import type { Metadata } from 'next';
import { DemoNotice, PageHeader } from '@/components/layout/PageHeader';
import { ListingWizard } from '@/components/forms/ListingWizard';

export const metadata: Metadata = { title: 'List Your Business' };

export default function SellPage() {
  return (
    <>
      <PageHeader eyebrow="For founders" title="Your business." accent="Presented properly.">
        <p>Bring your business to market with a clear story and control over what you share.</p>
        <DemoNotice>
          Demo draft only. Use example text, not real confidential details. Your draft stays in this browser tab and is cleared when you reload or close it.
          Nothing is published.
        </DemoNotice>
      </PageHeader>
      <div className="container">
        <ListingWizard />
      </div>
    </>
  );
}
