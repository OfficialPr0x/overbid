import { StoneDefs, paint, stop } from './Filters';
import { TempTag } from './TempTag';
import styles from './art.module.css';

const MARK = '/brand/overbid-mark-640.webp';

function Dossier({ p, x, y, w, h, r }: { p: string; x: number; y: number; w: number; h: number; r: number }) {
  const cx = x + w / 2;
  return (
    <g transform={`rotate(${r} ${cx} ${y + h / 2})`}>
      <rect x={x + 10} y={y + 14} width={w} height={h} rx="8" style={{ fill: paint.deep }} opacity="0.7" filter={`url(#${p}-blur-m)`} />
      <rect x={x + w - 6} y={y + 6} width="10" height={h - 12} rx="2" style={{ fill: paint.ivory }} opacity="0.5" />
      <rect x={x} y={y} width={w} height={h} rx="8" fill={`url(#${p}-cover)`} />
      <rect x={x} y={y} width={w} height={h} rx="8" filter={`url(#${p}-grain)`} />
      <rect x={x + 14} y={y} width="5" height={h} style={{ fill: paint.lime }} opacity="0.9" />
      <rect x={x} y={y} width={w} height={h} rx="8" fill="none" style={{ stroke: paint.ivory }} strokeOpacity="0.14" />
      <image href={MARK} x={cx - 20} y={y + 30} width="40" height={(40 * 562) / 604} opacity="0.85" />
      <g fill="none" style={{ stroke: paint.gold }} strokeWidth="1.1" opacity="0.6">
        <path d={`M ${x + 40} ${y + h - 30} A ${w / 2 - 40} ${w / 2 - 40} 0 0 1 ${x + w - 40} ${y + h - 30}`} />
        <path d={`M ${x + 70} ${y + h - 30} A ${w / 2 - 70} ${w / 2 - 70} 0 0 1 ${x + w - 70} ${y + h - 30}`} opacity="0.6" />
        <line x1={cx} y1={y + h - 30 - (w / 2 - 40)} x2={cx} y2={y + h - 30} opacity="0.5" />
        <line x1={cx - 22} y1={y + h * 0.55} x2={cx + 22} y2={y + h * 0.55} style={{ stroke: paint.lime }} opacity="0.9" />
      </g>
    </g>
  );
}

/** Temporary SVG stand-in for A04 archive-dossiers. Covers are intentionally blank. */
export function ArchiveArt({ className }: { className?: string }) {
  const p = 'arc';
  const books = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} data-asset="A04">
      <svg viewBox="0 0 1000 750" className={styles.svg} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
        <defs>
          <StoneDefs p={p} />
          <radialGradient id={`${p}-bg`} cx="0.55" cy="0.35" r="0.7">
            <stop offset="0" style={stop(paint.mid)} />
            <stop offset="1" style={stop(paint.bg)} />
          </radialGradient>
          <linearGradient id={`${p}-cover`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={stop(paint.mid)} />
            <stop offset="1" style={stop(paint.deep)} />
          </linearGradient>
          <linearGradient id={`${p}-col`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={stop(paint.deep)} />
            <stop offset="0.6" style={stop(paint.mid)} />
            <stop offset="1" style={stop(paint.low)} />
          </linearGradient>
          <linearGradient id={`${p}-disc`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={stop(paint.mid)} />
            <stop offset="1" style={stop(paint.deep)} />
          </linearGradient>
        </defs>
        <rect width="1000" height="750" fill={`url(#${p}-bg)`} />

        {/* back arch */}
        <g fill="none" style={{ stroke: paint.gold }} strokeWidth="1.4">
          <path d="M 330 560 V 230 A 170 170 0 0 1 670 230 V 560" opacity="0.5" />
          <path d="M 360 560 V 240 A 140 140 0 0 1 640 240 V 560" opacity="0.3" />
          <polygon points="500,110 640,470 360,470" opacity="0.45" />
        </g>
        <path d="M 360 560 V 240 A 140 140 0 0 1 640 240 V 560 Z" style={{ fill: paint.deep }} opacity="0.55" />

        {/* shelves */}
        {[
          [20, 160],
          [820, 160],
        ].map(([x, w], s) => (
          <g key={s}>
            <rect x={x} y="60" width={w} height="560" fill={`url(#${p}-col)`} />
            {[0, 1, 2, 3, 4].map((row) => (
              <g key={row}>
                <line x1={x + 10} y1={150 + row * 100} x2={x + w - 10} y2={150 + row * 100} style={{ stroke: paint.gold }} strokeOpacity="0.4" />
                {books.slice(0, 9).map((b) => (
                  <rect
                    key={b}
                    x={x + 16 + b * 15}
                    y={150 + row * 100 - (56 + ((b * 7 + row * 3) % 5) * 6)}
                    width="11"
                    height={56 + ((b * 7 + row * 3) % 5) * 6}
                    style={{ fill: (b + row) % 4 === 0 ? paint.hi : paint.mid }}
                    opacity="0.8"
                  />
                ))}
              </g>
            ))}
            <rect x={x + (s ? 0 : w - 3)} y="60" width="3" height="560" style={{ fill: paint.gold }} opacity="0.35" />
          </g>
        ))}

        {/* columns */}
        {[230, 735].map((x) => (
          <g key={x}>
            <rect x={x} y="40" width="36" height="590" fill={`url(#${p}-col)`} />
            <rect x={x} y="40" width="36" height="590" filter={`url(#${p}-veins)`} opacity="0.3" />
          </g>
        ))}

        {/* pedestal */}
        <ellipse cx="500" cy="640" rx="330" ry="46" fill={`url(#${p}-disc)`} />
        <rect x="170" y="640" width="660" height="40" fill={`url(#${p}-disc)`} />
        <ellipse cx="500" cy="680" rx="330" ry="46" style={{ fill: paint.deep }} />
        <ellipse cx="500" cy="640" rx="330" ry="46" fill="none" style={{ stroke: paint.gold }} strokeWidth="2" opacity="0.8" />
        <ellipse cx="500" cy="682" rx="320" ry="40" fill="none" style={{ stroke: paint.gold }} strokeWidth="6" opacity="0.5" filter={`url(#${p}-blur-s)`} />
        <ellipse cx="500" cy="560" rx="260" ry="60" style={{ fill: paint.lime }} opacity="0.08" filter={`url(#${p}-blur-l)`} />

        <Dossier p={p} x={250} y={250} w={200} h={270} r={-12} />
        <Dossier p={p} x={610} y={255} w={200} h={270} r={10} />
        <Dossier p={p} x={400} y={190} w={230} h={310} r={-3} />

        <g filter={`url(#${p}-blur-l)`} style={{ fill: paint.fog }}>
          <ellipse cx="160" cy="650" rx="220" ry="60" opacity="0.08" />
          <ellipse cx="880" cy="640" rx="200" ry="60" opacity="0.08" />
        </g>
      </svg>
      <TempTag id="A04" />
    </div>
  );
}
