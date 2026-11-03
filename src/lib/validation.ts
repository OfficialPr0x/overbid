export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export type IntroIntent = 'seller' | 'buyer';

export interface IntroductionInput {
  intent: IntroIntent | '';
  name: string;
  email: string;
  website: string;
  message: string;
}

export type IntroductionField = keyof IntroductionInput;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function parseHttpUrl(value: string): URL | null {
  const v = value.trim();
  if (!v) return null;
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(v) ? v : `https://${v}`);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (!url.hostname.includes('.')) return null;
    return url;
  } catch {
    return null;
  }
}

/** Shared by client (UX) and the future server handler (authoritative). */
export function validateIntroduction(input: IntroductionInput): FieldErrors<IntroductionField> {
  const e: FieldErrors<IntroductionField> = {};
  if (input.intent !== 'seller' && input.intent !== 'buyer') e.intent = 'Choose whether you want to sell or buy.';
  const name = input.name.trim();
  if (name.length < 2) e.name = 'Enter your full name (at least 2 characters).';
  else if (name.length > 100) e.name = 'Name must be 100 characters or fewer.';
  const email = input.email.trim();
  if (!email) e.email = 'Enter your work email.';
  else if (email.length > 254 || !EMAIL_RE.test(email)) e.email = 'Enter a valid email address, like name@company.com.';
  if (input.website.trim() && !parseHttpUrl(input.website)) e.website = 'Enter a web address starting with http:// or https://, or leave it blank.';
  const message = input.message.trim();
  if (message.length < 20) e.message = `Tell us a little more (at least 20 characters; ${message.length} so far).`;
  else if (message.length > 2000) e.message = 'Keep the overview to 2,000 characters or fewer.';
  return e;
}

// ---- Seller wizard -------------------------------------------------------

export interface DraftInput {
  category: string;
  title: string;
  location: string;
  website: string;
  currency: string;
  period: string;
  revenue: string;
  asking: string;
  profit: string;
  profitMetric: string;
  identity: 'withheld' | 'visible' | '';
  documentAccess: 'approval' | 'none' | '';
}

export type DraftField = keyof DraftInput;

export const EMPTY_DRAFT: DraftInput = {
  category: '',
  title: '',
  location: '',
  website: '',
  currency: 'USD',
  period: '',
  revenue: '',
  asking: '',
  profit: '',
  profitMetric: '',
  identity: 'withheld',
  documentAccess: 'approval',
};

export const MAX_AMOUNT = 10_000_000_000;

function amountError(v: string, label: string, required: boolean): string | undefined {
  if (!v.trim()) return required ? `Enter ${label}.` : undefined;
  const n = Number(v);
  if (!Number.isFinite(n) || !/^\d+(\.\d{1,2})?$/.test(v.trim())) return `${label[0].toUpperCase()}${label.slice(1)} must be a number without symbols or commas.`;
  if (n < 0) return `${label} cannot be negative.`;
  if (n > MAX_AMOUNT) return `${label[0].toUpperCase()}${label.slice(1)} looks too large for this demo.`;
  return undefined;
}

export function validateDraftStep(step: number, d: DraftInput): FieldErrors<DraftField> {
  const e: FieldErrors<DraftField> = {};
  if (step === 0) {
    if (!d.category) e.category = 'Choose a category.';
    const t = d.title.trim();
    if (t.length < 4) e.title = 'Enter a listing title (at least 4 characters).';
    else if (t.length > 80) e.title = 'Keep the title to 80 characters or fewer.';
    if (!d.location) e.location = 'Choose a general location.';
    if (d.website.trim() && !parseHttpUrl(d.website)) e.website = 'Enter a valid http(s) address or leave it blank.';
  }
  if (step === 1) {
    if (!d.currency) e.currency = 'Choose a currency.';
    if (!d.period.trim()) e.period = 'Enter the financial period, e.g. “FY2025” or “Trailing 12 months”.';
    const r = amountError(d.revenue, 'annual revenue', true);
    if (r) e.revenue = r;
    const a = amountError(d.asking, 'asking price', true);
    if (a) e.asking = a;
    const p = amountError(d.profit, 'profit', false);
    if (p) e.profit = p;
    if (d.profit.trim() && !d.profitMetric) e.profitMetric = 'Choose which profit metric this figure represents.';
  }
  if (step === 2) {
    if (!d.identity) e.identity = 'Choose how your identity is shown.';
    if (!d.documentAccess) e.documentAccess = 'Choose a document access rule.';
  }
  return e;
}
