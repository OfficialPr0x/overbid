const compactCache = new Map<string, Intl.NumberFormat>();

/** Compact money, e.g. "$2.4M" / "CA$1.2M". Always pair with the currency code in the UI. */
export function formatCompactMoney(amount: number, currency: string) {
  let f = compactCache.get(currency);
  if (!f) {
    f = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 1,
    });
    compactCache.set(currency, f);
  }
  return f.format(amount);
}

export function formatFullMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

export const PROFIT_METRIC_LABEL = { SDE: 'SDE', EBITDA: 'EBITDA', netIncome: 'Net income' } as const;
