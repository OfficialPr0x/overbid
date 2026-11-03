'use client';

import { Search } from 'lucide-react';
import { useDeferredValue, useMemo, useState } from 'react';
import Link from 'next/link';
import { ListingCard } from '@/components/marketplace/ListingCard';
import { useSavedListings } from '@/components/marketplace/useSavedListings';
import { opportunities } from '@/lib/content';
import { CATEGORY_OPTIONS, EMPTY_FILTERS, filterListings, type Listing } from '@/lib/listings';
import styles from './Opportunities.module.css';

const CHIPS = [{ value: '', label: 'All businesses' }, ...CATEGORY_OPTIONS.map((c) => ({ value: c.value, label: c.category }))];

export function OpportunitiesPreview({ listings }: { listings: Listing[] }) {
  const [category, setCategory] = useState('');
  const [q, setQ] = useState('');
  const deferredQ = useDeferredValue(q);
  const { isSaved, toggle } = useSavedListings();

  const results = useMemo(
    () => filterListings(listings, { ...EMPTY_FILTERS, category: category || null, q: deferredQ.slice(0, 100) }).slice(0, 3),
    [listings, category, deferredQ],
  );

  const reset = () => {
    setCategory('');
    setQ('');
  };

  const browseHref = `/businesses${category || q.trim() ? `?${new URLSearchParams({ ...(category && { category }), ...(q.trim() && { q: q.trim() }) })}` : ''}`;

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.chips} role="group" aria-label="Filter by category">
          {CHIPS.map((c) => (
            <button
              key={c.label}
              type="button"
              className={styles.chip}
              aria-pressed={category === c.value}
              onClick={() => setCategory(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <form
          role="search"
          className={styles.search}
          action="/businesses"
          method="get"
          onSubmit={(e) => {
            if (results.length) e.preventDefault();
          }}
        >
          <label htmlFor="home-search" className="visually-hidden">
            {opportunities.searchLabel}
          </label>
          <Search aria-hidden="true" strokeWidth={1.75} />
          <input
            id="home-search"
            name="q"
            type="search"
            maxLength={100}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={opportunities.searchPlaceholder}
            autoComplete="off"
          />
        </form>
      </div>

      <div className={styles.noticeRow}>
        <p className={styles.notice}>{opportunities.sampleNotice}</p>
        <p className={styles.count} role="status" aria-live="polite">
          {results.length} sample {results.length === 1 ? 'listing' : 'listings'} shown
        </p>
      </div>

      {results.length > 0 ? (
        <ul role="list" className={styles.cards}>
          {results.map((l) => (
            <li key={l.id}>
              <ListingCard listing={l} saved={isSaved(l.id)} onToggleSave={toggle} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No sample listings match that search.</p>
          <p>Try another category or keyword.</p>
          <button type="button" className={styles.reset} onClick={reset}>
            Reset filters
          </button>
        </div>
      )}

      <p className={styles.browse}>
        <Link href={browseHref}>Browse all sample listings</Link>
        <span aria-hidden="true"> · </span>
        <Link href="/saved">Saved on this device</Link>
      </p>
    </>
  );
}
