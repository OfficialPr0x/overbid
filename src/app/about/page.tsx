import type { Metadata } from 'next';
import Link from 'next/link';
import { DemoNotice, PageHeader } from '@/components/layout/PageHeader';
import prose from '@/components/layout/prose.module.css';

export const metadata: Metadata = { title: 'Meet OVERBID' };

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Behind the curtain" title="Meet OVERBID.">
        <p>Team information will be published before launch.</p>
      </PageHeader>
      <div className={`container ${prose.prose}`}>
        <DemoNotice>
          This is a pre-launch demo. We will not show team profiles, credentials, licences or client names until they are real and approved for publication.
        </DemoNotice>
        <h2>What OVERBID is being built to do</h2>
        <p>
          OVERBID is a marketplace and introduction workflow for two groups: business owners preparing to sell, and acquisition buyers looking for the right business.
        </p>
        <ul>
          <li>Sellers draft a listing and control what is public.</li>
          <li>Buyers search by industry, asking price and location, and save opportunities.</li>
          <li>Detailed information is intended to move only after a seller approves a specific request.</li>
        </ul>
        <h2>What will be published before launch</h2>
        <ul>
          <li>The legal operator, address and contact details.</li>
          <li>The people responsible, their roles and any credentials we claim.</li>
          <li>Service scope, jurisdictions and fees.</li>
          <li>Privacy policy and terms of use.</li>
        </ul>
        <p className={prose.muted}>
          Until then, you can explore <Link href="/businesses">sample opportunities</Link>, try the <Link href="/sell">draft listing wizard</Link> or preview the{' '}
          <Link href="/#introduction">introduction form</Link>. None of these send or publish anything.
        </p>
      </div>
    </>
  );
}
