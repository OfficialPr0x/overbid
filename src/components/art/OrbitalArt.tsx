import { paint } from './Filters';
import styles from './art.module.css';

/** Orbital geometry around the approved mark (section 07). Intended as final SVG geometry, not a stand-in. */
export function OrbitalArt({ className }: { className?: string }) {
  const dots = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4 + Math.PI / 8);
  return (
    <div className={[styles.frame, styles.orbital, className].filter(Boolean).join(' ')}>
      <svg viewBox="0 0 720 460" className={styles.svg} aria-hidden="true" focusable="false">
        <g fill="none" style={{ stroke: paint.gold }} strokeWidth="1.3">
          <line x1="10" y1="230" x2="710" y2="230" opacity="0.55" />
          <circle cx="360" cy="230" r="162" opacity="0.8" />
          <circle cx="262" cy="230" r="118" opacity="0.5" />
          <circle cx="458" cy="230" r="118" opacity="0.5" />
          <circle cx="360" cy="230" r="208" strokeDasharray="1 7" opacity="0.7" />
          <line x1="360" y1="10" x2="360" y2="450" opacity="0.35" />
          <rect x="83" y="223" width="14" height="14" transform="rotate(45 90 230)" style={{ fill: paint.bg }} />
          <rect x="623" y="223" width="14" height="14" transform="rotate(45 630 230)" style={{ fill: paint.bg }} />
        </g>
        <g style={{ fill: paint.gold }}>
          {dots.map((a, i) => (
            <circle key={i} cx={360 + Math.cos(a) * 162} cy={230 + Math.sin(a) * 162} r="3.5" />
          ))}
          <circle cx="360" cy="22" r="5" />
          <circle cx="360" cy="438" r="5" />
        </g>
        <rect x="354" y="60" width="12" height="12" transform="rotate(45 360 66)" style={{ fill: paint.ivory }} />
        <image href="/brand/overbid-mark-640.webp" x="270" y="138" width="180" height={(180 * 562) / 604} />
      </svg>
    </div>
  );
}
