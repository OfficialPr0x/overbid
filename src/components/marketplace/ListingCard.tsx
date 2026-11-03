'use client';

import Link from 'next/link';
import { ArrowUpRight, Bookmark, MapPin } from 'lucide-react';
import { ListingCover } from '@/components/art/ListingCover';
import { formatCompactMoney } from '@/lib/format';
import type { Listing } from '@/lib/listings';
import styles from './ListingCard.module.css';

interface Props {
  listing: Listing;
  saved: boolean;
  onToggleSave: (id: string) => void;
  headingLevel?: 'h3' | 'h2';
}

export function ListingCard({ listing: l, saved, onToggleSave, headingLevel: H = 'h3' }: Props) {
  const titleId = `listing-${l.id}-title`;
  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <ListingCover assetId={l.coverAssetId} uid={l.id} className={styles.cover} />
      <div className={styles.body}>
        <p className={styles.category}>{l.category}</p>
        <H id={titleId} className={styles.title}>
          {l.title}
        </H>
        <dl className={styles.metrics}>
          <div>
            <dt>Asking</dt>
            <dd>
              {formatCompactMoney(l.askingPrice, l.currency)} <span className={styles.ccy}>{l.currency}</span>
            </dd>
          </div>
          <div>
            <dt>Annual revenue</dt>
            <dd>
              {formatCompactMoney(l.annualRevenue, l.currency)} <span className={styles.ccy}>{l.currency}</span>
            </dd>
          </div>
        </dl>
        <p className={styles.location}>
          <MapPin aria-hidden="true" strokeWidth={1.75} />
          <span className="visually-hidden">Location: </span>
          {l.location}
        </p>
        <div className={styles.actions}>
          <Link href={`/businesses/${l.slug}`} className={styles.view} data-event="listing_opened">
            View Opportunity
            <span className="visually-hidden">: {l.title}</span>
            <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
          </Link>
          <button
            type="button"
            className={styles.save}
            aria-pressed={saved}
            aria-label={`Save ${l.title}`}
            title={saved ? 'Saved on this device' : 'Save on this device'}
            onClick={() => onToggleSave(l.id)}
            data-event="bookmark_toggled"
          >
            <Bookmark aria-hidden="true" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </article>
  );
}
