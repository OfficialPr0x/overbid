/** Token-backed paint for SVG (presentation attributes cannot read CSS variables reliably). */
export const paint = {
  lime: 'var(--color-lime)',
  ivory: 'var(--color-text)',
  muted: 'var(--color-muted)',
  gold: 'var(--color-gold)',
  bg: 'var(--color-bg)',
  hi: 'var(--art-stone-hi)',
  mid: 'var(--art-stone-mid)',
  low: 'var(--art-stone-low)',
  deep: 'var(--art-stone-deep)',
  fog: 'var(--art-fog)',
} as const;

export const stop = (color: string, opacity = 1) => ({ stopColor: color, stopOpacity: opacity });

/** Shared SVG filter defs. Rendered once per art piece with a unique prefix. */
export function StoneDefs({ p }: { p: string }) {
  return (
    <>
      <filter id={`${p}-veins`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.007 0.02" numOctaves="4" seed="11" result="n" />
        <feColorMatrix in="n" type="luminanceToAlpha" result="l" />
        <feComponentTransfer in="l" result="v">
          <feFuncA type="table" tableValues="0 0 0 0 0 0 0 0 0 0 0.9 0 0 0 0 0 0 0 0 0 0 0 0 0" />
        </feComponentTransfer>
        <feFlood style={{ floodColor: 'var(--color-text)', floodOpacity: 0.32 }} />
        <feComposite in2="v" operator="in" />
      </filter>
      <filter id={`${p}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" />
        <feColorMatrix values="0 0 0 0 0.96  0 0 0 0 0.94  0 0 0 0 0.9  0 0 0 0.07 0" />
      </filter>
      <filter id={`${p}-blur-s`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
      <filter id={`${p}-blur-m`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <filter id={`${p}-blur-l`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="42" />
      </filter>
    </>
  );
}
