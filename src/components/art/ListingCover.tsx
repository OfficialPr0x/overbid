import type { AssetId } from '@/lib/assets';
import { paint, stop } from './Filters';
import { TempTag } from './TempTag';
import styles from './art.module.css';

/** Temporary generic category art (A06 software, A07 commerce, A08 services). Not photos of real businesses. */
export function ListingCover({ assetId, uid, className }: { assetId: string; uid: string; className?: string }) {
  const id = (['A06', 'A07', 'A08'].includes(assetId) ? assetId : 'A06') as AssetId;
  const p = `cov-${uid}`;
  return (
    <div className={[styles.frame, styles.cover, className].filter(Boolean).join(' ')} data-asset={id}>
      <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className={styles.svg} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${p}-iv`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={stop(paint.ivory)} />
            <stop offset="1" style={stop(paint.muted, 0.85)} />
          </linearGradient>
          <linearGradient id={`${p}-sh`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={stop(paint.mid)} />
            <stop offset="1" style={stop(paint.deep)} />
          </linearGradient>
          <radialGradient id={`${p}-bg`} cx="0.5" cy="0" r="1">
            <stop offset="0" style={stop(paint.mid)} />
            <stop offset="1" style={stop(paint.deep)} />
          </radialGradient>
        </defs>
        <rect width="400" height="200" fill={`url(#${p}-bg)`} />
        {id === 'A06' &&
          [0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <polygon
                points={`${40 + i * 62},${200} ${40 + i * 62},${150 - i * 26} ${92 + i * 62},${128 - i * 26} ${92 + i * 62},200`}
                fill={`url(#${p}-iv)`}
                opacity={0.55 + i * 0.1}
              />
              <polygon points={`${92 + i * 62},${128 - i * 26} ${102 + i * 62},${132 - i * 26} ${102 + i * 62},200 ${92 + i * 62},200`} fill={`url(#${p}-sh)`} />
              {i === 4 && <polygon points={`${288},${46} ${400},${8} ${400},${38} ${288},${76}`} style={{ fill: paint.lime }} />}
            </g>
          ))}
        {id === 'A07' && (
          <g>
            <polygon points="70,200 70,95 230,55 230,200" fill={`url(#${p}-iv)`} opacity="0.85" />
            <polygon points="230,55 350,85 350,200 230,200" fill={`url(#${p}-sh)`} />
            <polygon points="70,95 230,55 350,85 190,125" style={{ fill: paint.ivory }} opacity="0.95" />
            <polygon points="150,75 200,62 320,92 270,105" style={{ fill: paint.lime }} />
            <polygon points="270,105 320,92 320,200 270,200" style={{ fill: paint.lime }} opacity="0.8" />
          </g>
        )}
        {id === 'A08' && (
          <g fill="none" strokeLinecap="round">
            <path d="M -20 210 C 80 120, 160 40, 420 30" style={{ stroke: paint.lime }} strokeWidth="26" />
            <path d="M 40 230 C 140 140, 220 80, 420 78" style={{ stroke: paint.ivory }} strokeWidth="30" opacity="0.9" />
            <path d="M 110 240 C 200 170, 270 130, 420 128" style={{ stroke: paint.ivory }} strokeWidth="30" opacity="0.65" />
            <path d="M 190 250 C 260 205, 320 180, 420 176" style={{ stroke: paint.ivory }} strokeWidth="26" opacity="0.4" />
          </g>
        )}
      </svg>
      <TempTag id={id} className={styles.tempTagSm} />
    </div>
  );
}
