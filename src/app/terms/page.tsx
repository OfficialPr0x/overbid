import type { Metadata } from 'next';
import { DemoNotice, PageHeader } from '@/components/layout/PageHeader';
import prose from '@/components/layout/prose.module.css';

export const metadata: Metadata = { title: 'Terms (draft)' };

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Draft placeholder" title="Terms.">
        <p>Approved terms of use will be published before launch.</p>
      </PageHeader>
      <div className={`container ${prose.prose}`}>
        <DemoNotice>Draft placeholder — not reviewed legal terms and not legal advice.</DemoNotice>
        <h2>About this demo</h2>
        <ul>
          <li>All listings are illustrative sample data. They are not businesses for sale and their figures are not real.</li>
          <li>Nothing on this site is an offer, a recommendation or financial, legal or tax advice.</li>
          <li>No listing is published, no request is sent and no transaction can be made in this demo.</li>
          <li>OVERBID’s legal identity, role, service scope and fees have not yet been published.</li>
        </ul>
      </div>
    </>
  );
}
