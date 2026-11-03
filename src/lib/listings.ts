import rawListings from '../../data/sample-listings.json';

export const CATEGORIES = ['SaaS', 'E-commerce', 'Services'] as const;
export type Category = (typeof CATEGORIES)[number];

export type ProfitMetric = 'SDE' | 'EBITDA' | 'netIncome';
export type FinancialSource = 'sellerProvided' | 'documentReviewed';

export interface Listing {
  id: string;
  slug: string;
  title: string;
  category: Category;
  location: string;
  currency: string;
  askingPrice: number;
  annualRevenue: number;
  profitAmount: number | null;
  profitMetric: ProfitMetric | null;
  financialPeriod: string;
  financialSource: FinancialSource;
  description: string;
  coverAssetId: string;
  publicationStatus: string;
  isSample: boolean;
}

export const LOCATIONS = [
  { value: 'us', label: 'United States', match: ['United States'] },
  { value: 'ca', label: 'Canada', match: ['Canada'] },
  { value: 'na', label: 'Canada & United States', match: ['United States', 'Canada', 'Remote / North America'] },
  { value: 'remote', label: 'Remote / North America', match: ['Remote / North America'] },
] as const;
export type LocationValue = (typeof LOCATIONS)[number]['value'];

export const CATEGORY_OPTIONS: { value: string; label: string; category: Category }[] = [
  { value: 'saas', label: 'SaaS & Software', category: 'SaaS' },
  { value: 'ecommerce', label: 'E-commerce', category: 'E-commerce' },
  { value: 'services', label: 'Services', category: 'Services' },
];

// Asking-price bands compare the number in each listing's own currency; the UI says so.
export const PRICE_BANDS = [
  { value: 'lt1m', label: 'Under 1M', min: 0, max: 999_999 },
  { value: '1m-2.5m', label: '1M – 2.5M', min: 1_000_000, max: 2_500_000 },
  { value: '2.5m-5m', label: '2.5M – 5M', min: 2_500_000, max: 5_000_000 },
  { value: 'gt5m', label: '5M and above', min: 5_000_000, max: null },
] as const;

export interface ListingFilters {
  q: string;
  category: string | null;
  min: number | null;
  max: number | null;
  location: LocationValue | null;
}

export const EMPTY_FILTERS: ListingFilters = { q: '', category: null, min: null, max: null, location: null };

const listings: Listing[] = (rawListings as Listing[]).filter((l) => l.isSample);

function normalize(s: string) {
  return s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function toAmount(v: string | null): number | null {
  if (v === null || v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
}

/** URL is the source of truth for marketplace filters. Invalid values are dropped. */
export function parseFilters(params: URLSearchParams): ListingFilters {
  const q = (params.get('q') ?? '').slice(0, 100);
  const category = params.get('category');
  const location = params.get('location');
  let min = toAmount(params.get('min'));
  let max = toAmount(params.get('max'));
  const band = PRICE_BANDS.find((b) => b.value === params.get('price'));
  if (band && min === null && max === null) {
    min = band.min || null;
    max = band.max;
  }
  if (min !== null && max !== null && min > max) [min, max] = [max, min];
  return {
    q,
    category: CATEGORY_OPTIONS.some((c) => c.value === category) ? category : null,
    min,
    max,
    location: LOCATIONS.some((l) => l.value === location) ? (location as LocationValue) : null,
  };
}

export function serializeFilters(f: ListingFilters): string {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set('q', f.q.trim().slice(0, 100));
  if (f.category) p.set('category', f.category);
  if (f.min !== null) p.set('min', String(f.min));
  if (f.max !== null) p.set('max', String(f.max));
  if (f.location) p.set('location', f.location);
  return p.toString();
}

export function hasActiveFilters(f: ListingFilters) {
  return Boolean(f.q.trim() || f.category || f.min !== null || f.max !== null || f.location);
}

export function filterListings(all: Listing[], f: ListingFilters): Listing[] {
  const q = normalize(f.q);
  const cat = CATEGORY_OPTIONS.find((c) => c.value === f.category)?.category;
  const loc = LOCATIONS.find((l) => l.value === f.location);
  return all.filter((l) => {
    if (cat && l.category !== cat) return false;
    if (loc && !(loc.match as readonly string[]).includes(l.location)) return false;
    if (f.min !== null && l.askingPrice < f.min) return false;
    if (f.max !== null && l.askingPrice > f.max) return false;
    if (q) {
      const hay = normalize(`${l.title} ${l.category} ${l.location} ${l.description}`);
      if (!q.split(/\s+/).every((term) => hay.includes(term))) return false;
    }
    return true;
  });
}

/** Demo ListingRepository. A production adapter must return only published, seller-approved fields. */
export const listingRepository = {
  listPublic(filters: ListingFilters = EMPTY_FILTERS): Listing[] {
    return filterListings(listings, filters);
  },
  getPublicBySlug(slug: string): Listing | undefined {
    return listings.find((l) => l.slug === slug);
  },
  all(): Listing[] {
    return listings;
  },
};

export function priceBandFor(min: number | null, max: number | null) {
  return PRICE_BANDS.find((b) => b.min === (min ?? 0) && b.max === max)?.value ?? '';
}

export function bandRange(value: string): { min: number | null; max: number | null } {
  const b = PRICE_BANDS.find((x) => x.value === value);
  return b ? { min: b.min || null, max: b.max } : { min: null, max: null };
}
