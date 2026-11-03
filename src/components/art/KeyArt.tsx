import { StoneDefs, paint, stop } from './Filters';
import { TempTag } from './TempTag';
import styles from './art.module.css';

/** Temporary SVG stand-in for A03 sculptural-key. */
export function KeyArt({ className }: { className?: string }) {
  const p = 'key';
  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} data-asset="A03">
      <svg viewBox="0 0 800 800" className={styles.svg} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
        <defs>
          <StoneDefs p={p} />
          <linearGradient id={`${p}-stone`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={stop(paint.hi)} />
            <stop offset="0.5" style={stop(paint.mid)} />
            <stop offset="1" style={stop(paint.deep)} />
          </linearGradient>
          <mask id={`${p}-ring`}>
            <rect x="-200" y="-200" width="400" height="400" fill="white" />
            <circle cx="0" cy="0" r="78" fill="black" />
          </mask>
        </defs>

        {/* construction geometry */}
        <g fill="none" style={{ stroke: paint.gold }} strokeWidth="1.2">
          <circle cx="400" cy="420" r="300" opacity="0.4" />
          <circle cx="400" cy="420" r="250" strokeDasharray="1 8" opacity="0.55" />
          <polygon points="400,120 660,570 140,570" opacity="0.32" />
          <line x1="400" y1="60" x2="400" y2="780" opacity="0.18" />
          <line x1="40" y1="420" x2="760" y2="420" opacity="0.18" />
          <rect x="393" y="48" width="14" height="14" transform="rotate(45 400 55)" opacity="0.8" />
          <rect x="393" y="764" width="14" height="14" transform="rotate(45 400 771)" opacity="0.8" />
        </g>
        <g style={{ fill: paint.gold }} opacity="0.75">
          <path d="M 92 408 A 14 14 0 1 0 92 432 A 10 12 0 1 1 92 408 Z" />
          <path d="M 708 408 A 14 14 0 1 1 708 432 A 10 12 0 1 0 708 408 Z" />
        </g>

        <g transform="translate(250 255) rotate(50)">
          {/* glow */}
          <g filter={`url(#${p}-blur-m)`} opacity="0.55" style={{ stroke: paint.lime }} fill="none" strokeWidth="8">
            <circle cx="0" cy="0" r="130" />
            <path d="M 128 -26 L 560 -26" />
          </g>
          <g>
            <circle cx="0" cy="0" r="132" fill={`url(#${p}-stone)`} mask={`url(#${p}-ring)`} />
            <rect x="120" y="-26" width="450" height="52" rx="6" fill={`url(#${p}-stone)`} />
            <rect x="140" y="-34" width="22" height="68" rx="4" fill={`url(#${p}-stone)`} />
            <path d="M 440 26 h 34 v 64 h 30 v -64 h 28 v 92 h -92 z" fill={`url(#${p}-stone)`} />
            <path d="M 520 26 h 50 v 46 h -50 z" fill={`url(#${p}-stone)`} />
            <circle cx="0" cy="0" r="132" filter={`url(#${p}-veins)`} mask={`url(#${p}-ring)`} opacity="0.5" />
            <rect x="120" y="-26" width="450" height="52" filter={`url(#${p}-veins)`} opacity="0.4" />
          </g>
          {/* lit edge */}
          <path d="M -120 -55 A 132 132 0 0 1 60 -118" fill="none" style={{ stroke: paint.lime }} strokeWidth="3" />
          <path d="M 132 -26 L 566 -26" style={{ stroke: paint.lime }} strokeWidth="2" opacity="0.8" />
          <circle cx="0" cy="0" r="78" fill="none" style={{ stroke: paint.ivory }} strokeOpacity="0.2" />
          <g transform="rotate(-50)">
            <image href="/brand/overbid-mark-640.webp" x="-58" y="-54" width="116" height={(116 * 562) / 604} opacity="0.92" />
          </g>
        </g>
      </svg>
      <TempTag id="A03" />
    </div>
  );
}
