'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { RotateCcw, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { ListingCard } from './ListingCard';
import { useSavedListings } from './useSavedListings';
import {
  CATEGORY_OPTIONS,
  LOCATIONS,
  PRICE_BANDS,
  bandRange,
  filterListings,
  hasActiveFilters,
  parseFilters,
  priceBandFor,
  serializeFilters,
  type Listing,
  type ListingFilters,
} from '@/lib/listings';
import styles from './Marketplace.module.css';

const DEBOUNCE_MS = 250;
const CUSTOM = '__custom';

export function MarketplaceBrowser({ listings }: { listings: Listing[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = useMemo(() => parseFilters(new URLSearchParams(params.toString())), [params]);
  const [q, setQ] = useState(filters.q);
  const [lastUrlQ, setLastUrlQ] = useState(filters.q);
  const [pending, startTransition] = useTransition();
  const { isSaved, toggle, persistent } = useSavedListings();
  const debounce = useRef<number | null>(null);

  // Back/forward or external navigation changed the query: adopt it (render-time sync, no effect).
  if (filters.q !== lastUrlQ) {
    setLastUrlQ(filters.q);
    setQ(filters.q);
  }

  const results = useMemo(() => filterListings(listings, filters), [listings, filters]);

  const navigate = (next: ListingFilters, mode: 'push' | 'replace') => {
    const qs = serializeFilters(next);
    const url = qs ? `${pathname}?${qs}` : pathname;
    startTransition(() => {
      if (mode === 'push') router.push(url, { scroll: false });
      else router.replace(url, { scroll: false });
    });
  };

  useEffect(() => {
    if (q === filters.q) return;
    if (debounce.current) window.clearTimeout(debounce.current);
    debounce.current = window.setTimeout(() => navigate({ ...filters, q: q.slice(0, 100) }, 'replace'), DEBOUNCE_MS);
    return () => {
      if (debounce.current) window.clearTimeout(debounce.current);
    };
    // navigate is stable enough for this debounce; re-run only when the typed value or URL filters change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, filters]);

  const customRange = (filters.min !== null || filters.max !== null) && !priceBandFor(filters.min, filters.max);
  const settled = q === filters.q && !pending;
  const active = hasActiveFilters(filters);

  return (
    <div className={styles.browser}>
      <form
        role="search"
        className={styles.filters}
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ ...filters, q }, 'push');
        }}
      >
        <div className={`${styles.field} ${styles.searchField}`}>
          <label htmlFor="mk-q">Search</label>
          <div className={styles.searchBox}>
            <Search aria-hidden="true" strokeWidth={1.75} />
            <input
              id="mk-q"
              type="search"
              name="q"
              maxLength={100}
              value={q}
              placeholder="Businesses, industries, or keywords"
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="mk-category">Industry</label>
          <select id="mk-category" value={filters.category ?? ''} onChange={(e) => navigate({ ...filters, category: e.target.value || null }, 'push')}>
            <option value="">Any industry</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="mk-price">Asking price</label>
          <select
            id="mk-price"
            value={customRange ? CUSTOM : priceBandFor(filters.min, filters.max)}
            onChange={(e) => navigate({ ...filters, ...bandRange(e.target.value) }, 'push')}
            aria-describedby="mk-price-hint"
          >
            <option value="">Any price</option>
            {PRICE_BANDS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
            {customRange && (
              <option value={CUSTOM} disabled>
                Custom range from link
              </option>
            )}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="mk-location">Location</label>
          <select id="mk-location" value={filters.location ?? ''} onChange={(e) => navigate({ ...filters, location: (e.target.value || null) as ListingFilters['location'] }, 'push')}>
            <option value="">Any location</option>
            {LOCATIONS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            setQ('');
            navigate({ q: '', category: null, min: null, max: null, location: null }, 'push');
          }}
          disabled={!active && !q}
        >
          <RotateCcw aria-hidden="true" strokeWidth={1.75} />
          Reset
        </button>
      </form>
      <p id="mk-price-hint" className={styles.hint}>
        Price ranges compare each listing’s asking price in its own currency (USD or CAD).
      </p>

      <div className={styles.statusRow}>
        <p className={styles.notice}>Illustrative listings — sample data</p>
        <p className={styles.count} role="status" aria-live="polite" aria-atomic="true">
          {settled ? `${results.length} of ${listings.length} sample ${listings.length === 1 ? 'listing' : 'listings'}` : 'Updating results…'}
        </p>
      </div>

      <div aria-busy={pending || undefined} className={styles.results} data-pending={pending || undefined}>
        {results.length > 0 ? (
          <ul role="list" className={styles.grid}>
            {results.map((l) => (
              <li key={l.id}>
                <ListingCard listing={l} saved={isSaved(l.id)} onToggleSave={toggle} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No sample listings match these filters.</p>
            <p>Try a broader price range, another industry, or clear the search.</p>
            <button
              type="button"
              className={styles.emptyReset}
              onClick={() => {
                setQ('');
                navigate({ q: '', category: null, min: null, max: null, location: null }, 'push');
              }}
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
      <p className={styles.saveNote}>
        {persistent ? 'Bookmarks are saved on this device only.' : 'Storage is unavailable in this browser; bookmarks last until you leave the page.'}
      </p>
    </div>
  );
}

export function MarketplaceFallback({ listings }: { listings: Listing[] }) {
  return (
    <div className={styles.browser}>
      <p className={styles.count} role="status">
        Loading filters… {listings.length} sample listings available.
      </p>
      <ul role="list" className={styles.fallbackList}>
        {listings.map((l) => (
          <li key={l.id}>
            <a href={`/businesses/${l.slug}`}>{l.title}</a> — {l.category}, {l.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
