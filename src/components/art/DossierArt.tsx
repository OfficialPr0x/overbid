import { StoneDefs, paint, stop } from './Filters';
import { TempTag } from './TempTag';
import styles from './art.module.css';

/** Temporary SVG stand-in for A05 trust-dossier. Blank tab; no document text. */
export function DossierArt({ className }: { className?: string }) {
  const p = 'dos';
  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} data-asset="A05">
      <svg viewBox="0 0 800 900" className={styles.svg} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
        <defs>
          <StoneDefs p={p} />
          <linearGradient id={`${p}-surface`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={stop(paint.low)} />
            <stop offset="1" style={stop(paint.deep)} />
          </linearGradient>
          <linearGradient id={`${p}-leather`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={stop(paint.mid)} />
            <stop offset="0.55" style={stop(paint.low)} />
            <stop offset="1" style={stop(paint.deep)} />
          </linearGradient>
          <radialGradient id={`${p}-light`} cx="0.35" cy="0.3" r="0.6">
            <stop offset="0" style={stop(paint.ivory, 0.1)} />
            <stop offset="1" style={stop(paint.ivory, 0)} />
          </radialGradient>
        </defs>
        <rect width="800" height="900" fill={`url(#${p}-surface)`} />
        <rect width="800" height="900" filter={`url(#${p}-veins)`} opacity="0.14" />

        <g transform="rotate(-7 400 470)">
          <rect x="118" y="132" width="560" height="740" rx="14" style={{ fill: paint.deep }} opacity="0.85" filter={`url(#${p}-blur-m)`} />
          {/* page edges */}
          <rect x="112" y="118" width="572" height="740" rx="12" style={{ fill: paint.ivory }} opacity="0.22" />
          {/* lime tab */}
          <rect x="640" y="250" width="64" height="210" rx="4" style={{ fill: paint.lime }} />
          <rect x="100" y="100" width="570" height="740" rx="12" fill={`url(#${p}-leather)`} />
          <rect x="100" y="100" width="570" height="740" rx="12" filter={`url(#${p}-grain)`} />
          <rect x="100" y="100" width="570" height="740" rx="12" fill={`url(#${p}-light)`} />
          <g fill="none" style={{ stroke: paint.gold }} strokeWidth="1.5" opacity="0.75">
            <rect x="130" y="130" width="510" height="680" rx="4" />
            <rect x="140" y="140" width="490" height="660" rx="2" opacity="0.4" />
            <path d="M 150 175 L 150 150 L 175 150" />
            <path d="M 620 175 L 620 150 L 595 150" />
            <path d="M 150 765 L 150 790 L 175 790" />
            <path d="M 620 765 L 620 790 L 595 790" />
          </g>
          {/* elastic band */}
          <rect x="560" y="96" width="26" height="748" style={{ fill: paint.deep }} />
          <rect x="560" y="96" width="4" height="748" style={{ fill: paint.ivory }} opacity="0.1" />
          <image href="/brand/overbid-mark-640.webp" x="220" y="300" width="300" height={(300 * 562) / 604} opacity="0.94" />
        </g>
      </svg>
      <TempTag id="A05" />
    </div>
  );
}
