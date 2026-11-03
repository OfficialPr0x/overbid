'use client';

import Link from 'next/link';
import { ListingCard } from './ListingCard';
import { useSavedListings } from './useSavedListings';
import type { Listing } from '@/lib/listings';
import styles from './Marketplace.module.css';

export function SavedList({ listings }: { listings: Listing[] }) {
  const { ids, isSaved, toggle, persistent } = useSavedListings();
  const saved = listings.filter((l) => ids.includes(l.id));

  return (
    <div className={styles.browser}>
      <div className={styles.statusRow}>
        <p className={styles.notice}>Saved on this device</p>
        <p className={styles.count} role="status" aria-live="polite">
          {saved.length} saved sample {saved.length === 1 ? 'listing' : 'listings'}
        </p>
      </div>
      <div className={styles.results}>
        {saved.length ? (
          <ul role="list" className={styles.grid}>
            {saved.map((l) => (
              <li key={l.id}>
                <ListingCard listing={l} saved={isSaved(l.id)} onToggleSave={toggle} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Nothing saved yet.</p>
            <p>Use the bookmark on any sample listing to keep it here.</p>
            <Link href="/businesses" className={styles.emptyReset} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              Explore Businesses
            </Link>
          </div>
        )}
      </div>
      <p className={styles.saveNote}>
        {persistent
          ? 'Saved IDs are kept in this browser’s local storage. Clearing site data removes them.'
          : 'Storage is unavailable in this browser; saves last until you leave the page.'}
      </p>
    </div>
  );
}
