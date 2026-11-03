import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { ListingCover } from '@/components/art/ListingCover';
import { DemoNotice } from '@/components/layout/PageHeader';
import { DetailActions } from '@/components/marketplace/DetailActions';
import { Eyebrow } from '@/components/ui/Chapter';
import { PROFIT_METRIC_LABEL, formatFullMoney } from '@/lib/format';
import { listingRepository } from '@/lib/listings';
import styles from './detail.module.css';

export function generateStaticParams() {
  return listingRepository.all().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = listingRepository.getPublicBySlug(slug);
  return { title: l ? `${l.title} (sample)` : 'Listing not found' };
}

const SOURCE_LABEL = { sellerProvided: 'Seller provided', documentReviewed: 'Documents reviewed' } as const;

export default function ListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <article className={`container ${styles.page}`} aria-labelledby="main-heading">
      <Link href="/businesses" className={styles.back}>
        <ArrowLeft aria-hidden="true" strokeWidth={1.75} />
        All sample listings
      </Link>
      <Suspense fallback={<p className={styles.loading} role="status">Loading sample listing…</p>}>
        <ListingDetail params={params} />
      </Suspense>
    </article>
  );
}

async function ListingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = listingRepository.getPublicBySlug(slug);
  if (!l) notFound();

  return (
      <div className={styles.grid}>
        <div className={styles.main}>
          <div className={styles.badges}>
            <span className={styles.sample}>Illustrative listing — sample data</span>
            <span className={styles.category}>{l.category}</span>
          </div>
          <h1 id="main-heading" className={styles.title}>
            {l.title}
          </h1>
          <p className={styles.location}>
            <MapPin aria-hidden="true" strokeWidth={1.75} />
            {l.location}
          </p>
          <ListingCover assetId={l.coverAssetId} eager sizes="(min-width: 1440px) 1280px, 100vw" className={styles.cover} />
          <section aria-labelledby="overview-title" className={styles.block}>
            <Eyebrow>Overview</Eyebrow>
            <h2 id="overview-title" className="visually-hidden">
              Overview
            </h2>
            <p className={styles.description}>{l.description}</p>
          </section>
          <DemoNotice>
            Not an actual business for sale. In production this page would show only fields the seller has approved for public view; private details would be
            released server-side after the seller grants a specific request.
          </DemoNotice>
        </div>

        <aside className={styles.side} aria-labelledby="financials-title">
          <h2 id="financials-title" className={styles.sideTitle}>
            Financial summary
          </h2>
          <dl className={styles.facts}>
            <div>
              <dt>Asking price</dt>
              <dd>
                {formatFullMoney(l.askingPrice, l.currency)} <span>{l.currency}</span>
              </dd>
            </div>
            <div>
              <dt>Annual revenue</dt>
              <dd>
                {formatFullMoney(l.annualRevenue, l.currency)} <span>{l.currency}</span>
              </dd>
            </div>
            <div>
              <dt>Profit{l.profitMetric ? ` (${PROFIT_METRIC_LABEL[l.profitMetric]})` : ''}</dt>
              <dd className={l.profitAmount === null ? styles.undisclosed : undefined}>
                {l.profitAmount === null ? 'Not disclosed' : `${formatFullMoney(l.profitAmount, l.currency)} ${l.currency}`}
              </dd>
            </div>
            <div>
              <dt>Financial period</dt>
              <dd className={styles.small}>{l.financialPeriod}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd className={styles.small}>
                {SOURCE_LABEL[l.financialSource]} (illustrative, not verified)
              </dd>
            </div>
          </dl>
          <p className={styles.caveat}>Revenue is not profit. Figures are sample values for interface demonstration.</p>
          <DetailActions listingId={l.id} title={l.title} />
        </aside>
      </div>
  );
}
