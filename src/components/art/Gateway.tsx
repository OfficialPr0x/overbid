import { StoneDefs, paint, stop } from './Filters';
import { TempTag } from './TempTag';
import styles from './art.module.css';

/*
 * Temporary SVG stand-ins for A01 hero-gateway / A02 intro-threshold.
 * Core gateway is drawn in a 1100×1000 local space; portal centroid at (550, 620).
 */

function Rings({ p }: { p: string }) {
  const cx = 550;
  const cy = 360;
  const ticks = Array.from({ length: 24 }, (_, i) => (i * Math.PI * 2) / 24);
  return (
    <g style={{ stroke: paint.gold }} fill="none" strokeWidth="1.2" opacity="0.75">
      <circle cx={cx} cy={cy} r="300" opacity="0.55" />
      <circle cx={cx} cy={cy} r="372" opacity="0.4" />
      <circle cx={cx} cy={cy} r="440" strokeDasharray="1 9" opacity="0.6" />
      {ticks.map((a, i) => (
        <line
          key={i}
          x1={cx + Math.cos(a) * 300}
          y1={cy + Math.sin(a) * 300}
          x2={cx + Math.cos(a) * (i % 3 === 0 ? 452 : 384)}
          y2={cy + Math.sin(a) * (i % 3 === 0 ? 452 : 384)}
          opacity={i % 3 === 0 ? 0.5 : 0.22}
        />
      ))}
      {[-0.42, 0.42, Math.PI - 0.9, 0.9].map((a, i) => (
        <circle key={i} cx={cx + Math.sin(a) * 372} cy={cy - Math.cos(a) * 372} r="5" style={{ fill: paint.gold }} opacity="0.8" />
      ))}
      {/* crescent above apex */}
      <circle cx={cx} cy="70" r="20" strokeWidth="1.6" />
      <path d={`M ${cx - 8} 53 A 20 20 0 0 0 ${cx - 8} 87 A 15 17 0 0 1 ${cx - 8} 53`} style={{ fill: paint.ivory }} stroke="none" opacity="0.85" />
      <line x1={cx} y1="90" x2={cx} y2="120" opacity="0.6" />
      <g filter={`url(#${p}-blur-s)`} opacity="0.5">
        <circle cx={cx} cy="70" r="12" style={{ fill: paint.gold }} />
      </g>
    </g>
  );
}

function Pillar({ x, w, p, flip }: { x: number; w: number; p: string; flip?: boolean }) {
  const sx = x + w / 2;
  return (
    <g>
      <rect x={x - 10} y="300" width={w + 20} height="26" style={{ fill: paint.mid }} />
      <rect x={x} y="326" width={w} height="490" fill={`url(#${p}-pillar${flip ? 'R' : 'L'})`} />
      <rect x={x} y="326" width={w} height="490" filter={`url(#${p}-veins)`} opacity="0.35" />
      <line x1={x + (flip ? 0 : w)} y1="326" x2={x + (flip ? 0 : w)} y2="816" style={{ stroke: paint.ivory }} strokeOpacity="0.18" />
      <g style={{ stroke: paint.gold }} fill="none" strokeWidth="1.3" opacity="0.85">
        <circle cx={sx} cy="560" r="30" />
        <circle cx={sx} cy="560" r="20" opacity="0.6" />
        {[0, 45, 90, 135].map((d) => (
          <line key={d} x1={sx} y1="522" x2={sx} y2="598" transform={`rotate(${d} ${sx} 560)`} opacity="0.7" />
        ))}
        <line x1={sx} y1="380" x2={sx} y2="480" opacity="0.45" />
        <circle cx={sx} cy="410" r="7" />
        <line x1={sx} y1="640" x2={sx} y2="760" opacity="0.45" />
      </g>
      <g filter={`url(#${p}-blur-s)`} opacity="0.55">
        <circle cx={sx} cy="560" r="6" style={{ fill: paint.gold }} />
      </g>
    </g>
  );
}

export function GatewayCore({ p, pillars = true }: { p: string; pillars?: boolean }) {
  const apex = [550, 150];
  const bl = [150, 812];
  const br = [950, 812];
  const ia = [550, 318];
  const ibl = [318, 790];
  const ibr = [782, 790];
  const pt = (a: number[]) => `${a[0]},${a[1]}`;

  return (
    <g>
      <defs>
        <StoneDefs p={p} />
        <linearGradient id={`${p}-faceL`} x1="0.9" y1="0" x2="0" y2="1">
          <stop offset="0" style={stop(paint.hi)} />
          <stop offset="0.45" style={stop(paint.mid)} />
          <stop offset="1" style={stop(paint.deep)} />
        </linearGradient>
        <linearGradient id={`${p}-faceR`} x1="0.1" y1="0" x2="1" y2="1">
          <stop offset="0" style={stop(paint.mid)} />
          <stop offset="0.5" style={stop(paint.low)} />
          <stop offset="1" style={stop(paint.deep)} />
        </linearGradient>
        <linearGradient id={`${p}-aperture`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={stop(paint.lime, 0.42)} />
          <stop offset="0.3" style={stop(paint.lime, 0.14)} />
          <stop offset="0.62" style={stop(paint.deep, 0.92)} />
          <stop offset="0.9" style={stop(paint.low, 0.95)} />
          <stop offset="1" style={stop(paint.lime, 0.3)} />
        </linearGradient>
        <radialGradient id={`${p}-apertureCore`} cx="0.5" cy="0.25" r="0.7">
          <stop offset="0" style={stop(paint.lime, 0.32)} />
          <stop offset="1" style={stop(paint.deep, 0)} />
        </radialGradient>
        <linearGradient id={`${p}-pillarL`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={stop(paint.deep)} />
          <stop offset="0.7" style={stop(paint.mid)} />
          <stop offset="1" style={stop(paint.hi)} />
        </linearGradient>
        <linearGradient id={`${p}-pillarR`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" style={stop(paint.deep)} />
          <stop offset="0.7" style={stop(paint.low)} />
          <stop offset="1" style={stop(paint.mid)} />
        </linearGradient>
        <linearGradient id={`${p}-step`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={stop(paint.mid)} />
          <stop offset="1" style={stop(paint.deep)} />
        </linearGradient>
        <clipPath id={`${p}-faces`}>
          <polygon points={`${pt(apex)} ${pt(bl)} ${pt(br)}`} />
        </clipPath>
      </defs>

      <Rings p={p} />

      {pillars && (
        <>
          <Pillar x={40} w={120} p={p} />
          <Pillar x={940} w={120} p={p} flip />
        </>
      )}

      {/* stone faces */}
      <polygon points={`${pt(apex)} ${pt(bl)} ${pt(ibl)} ${pt(ia)}`} fill={`url(#${p}-faceL)`} />
      <polygon points={`${pt(apex)} ${pt(ia)} ${pt(ibr)} ${pt(br)}`} fill={`url(#${p}-faceR)`} />
      <g clipPath={`url(#${p}-faces)`}>
        <rect x="150" y="150" width="800" height="662" filter={`url(#${p}-veins)`} opacity="0.7" />
        <rect x="150" y="150" width="800" height="662" filter={`url(#${p}-grain)`} />
      </g>
      {/* ridge highlights */}
      <polyline points={`${pt(bl)} ${pt(apex)} ${pt(br)}`} fill="none" style={{ stroke: paint.ivory }} strokeOpacity="0.28" strokeWidth="1.5" />
      <line x1={apex[0]} y1={apex[1]} x2={ia[0]} y2={ia[1]} style={{ stroke: paint.ivory }} strokeOpacity="0.2" />

      {/* lit aperture */}
      <polygon points={`${pt(ia)} ${pt(ibl)} ${pt(ibr)}`} fill={`url(#${p}-aperture)`} />
      <polygon points={`${pt(ia)} ${pt(ibl)} ${pt(ibr)}`} fill={`url(#${p}-apertureCore)`} />
      <polygon points="550,330 534,788 566,788" style={{ fill: paint.lime }} opacity="0.35" filter={`url(#${p}-blur-s)`} />
      <polygon
        points={`${pt(ia)} ${pt(ibl)} ${pt(ibr)}`}
        fill="none"
        style={{ stroke: paint.lime }}
        strokeWidth="10"
        opacity="0.55"
        filter={`url(#${p}-blur-m)`}
      />
      <polygon points={`${pt(ia)} ${pt(ibl)} ${pt(ibr)}`} fill="none" style={{ stroke: paint.lime }} strokeWidth="3" strokeLinejoin="miter" />

      {/* steps */}
      {[
        [790, 520, 18],
        [808, 620, 18],
        [826, 740, 20],
        [846, 880, 22],
      ].map(([y, w, h], i) => (
        <g key={i}>
          <rect x={550 - w / 2} y={y} width={w} height={h} fill={`url(#${p}-step)`} />
          <line x1={550 - w / 2} y1={y} x2={550 + w / 2} y2={y} style={{ stroke: i === 0 ? paint.lime : paint.ivory }} strokeOpacity={i === 0 ? 0.7 : 0.14} />
        </g>
      ))}
      <ellipse cx="550" cy="792" rx="190" ry="10" style={{ fill: paint.lime }} opacity="0.55" filter={`url(#${p}-blur-s)`} />
      <ellipse cx="550" cy="792" rx="150" ry="3" fill="none" style={{ stroke: paint.lime }} strokeOpacity="0.9" />

      {/* Approved mark composited from the brand export, never redrawn. */}
      <image href={MARK_HREF} x={550 - 96} y={500} width="192" height={(192 * 562) / 604} />
    </g>
  );
}

const MARK_HREF = '/brand/overbid-mark-640.webp';

function Floor({ p, y, w, cx }: { p: string; y: number; w: number; cx: number }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${p}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={stop(paint.low)} />
          <stop offset="1" style={stop(paint.deep)} />
        </linearGradient>
      </defs>
      <rect x="0" y={y} width={w} height="400" fill={`url(#${p}-floor)`} />
      <rect x="0" y={y} width={w} height="400" filter={`url(#${p}-veins)`} opacity="0.18" />
      {/* reflection */}
      <g opacity="0.55">
        <rect x={cx - 14} y={y + 4} width="28" height="190" style={{ fill: paint.lime }} opacity="0.35" filter={`url(#${p}-blur-m)`} />
        <rect x={cx - 230} y={y + 6} width="16" height="120" style={{ fill: paint.lime }} opacity="0.3" filter={`url(#${p}-blur-m)`} transform={`skewX(14)`} />
        <rect x={cx + 214} y={y + 6} width="16" height="120" style={{ fill: paint.lime }} opacity="0.3" filter={`url(#${p}-blur-m)`} transform={`skewX(-14)`} />
      </g>
      <g style={{ stroke: paint.gold }} opacity="0.18" fill="none">
        <ellipse cx={cx} cy={y + 70} rx="360" ry="34" />
        <ellipse cx={cx} cy={y + 70} rx="520" ry="58" opacity="0.6" />
      </g>
    </g>
  );
}

function Fog({ p, w, y }: { p: string; w: number; y: number }) {
  return (
    <g filter={`url(#${p}-blur-l)`} style={{ fill: paint.fog }}>
      <ellipse cx={w * 0.08} cy={y - 20} rx={w * 0.2} ry="70" opacity="0.13" />
      <ellipse cx={w * 0.92} cy={y - 40} rx={w * 0.2} ry="90" opacity="0.16" />
      <ellipse cx={w * 0.5} cy={y + 30} rx={w * 0.34} ry="40" opacity="0.08" />
      <ellipse cx={w * 0.96} cy={y - 260} rx={w * 0.1} ry="160" opacity="0.07" />
      <ellipse cx={w * 0.03} cy={y - 240} rx={w * 0.08} ry="150" opacity="0.06" />
    </g>
  );
}

export function HeroGatewayArt({ className }: { className?: string }) {
  const p = 'hero';
  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} data-asset="A01">
      <svg viewBox="0 0 1100 1000" preserveAspectRatio="xMidYMid slice" className={styles.svg} aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={`${p}-bg`} cx="0.5" cy="0.42" r="0.62">
            <stop offset="0" style={stop(paint.mid)} />
            <stop offset="1" style={stop(paint.bg)} />
          </radialGradient>
        </defs>
        <rect width="1100" height="1000" fill={`url(#${p}-bg)`} />
        <GatewayCore p={p} />
        <Floor p={p} y={868} w={1100} cx={550} />
        <Fog p={p} w={1100} y={880} />
      </svg>
      <TempTag id="A01" className={styles.tempTagHero} />
    </div>
  );
}

export function ThresholdArt({ className }: { className?: string }) {
  const p = 'thr';
  const W = 1600;
  const monoliths = [0, 1, 2, 3, 4];
  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} data-asset="A02">
      <svg viewBox={`0 0 ${W} 900`} preserveAspectRatio="xMidYMid slice" className={styles.svg} aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={`${p}-bg`} cx="0.5" cy="0.32" r="0.6">
            <stop offset="0" style={stop(paint.mid)} />
            <stop offset="1" style={stop(paint.bg)} />
          </radialGradient>
          <linearGradient id={`${p}-mono`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={stop(paint.deep)} />
            <stop offset="0.75" style={stop(paint.mid)} />
            <stop offset="1" style={stop(paint.hi)} />
          </linearGradient>
        </defs>
        <rect width={W} height="900" fill={`url(#${p}-bg)`} />
        {monoliths.map((i) => {
          const s = 1 - i * 0.16;
          const w = 120 * s;
          const h = 520 * s;
          const off = 40 + i * 120;
          const base = 600 - i * 22;
          return (
            <g key={i} opacity={1 - i * 0.12}>
              {[off, W - off - w].map((x, j) => (
                <g key={j}>
                  <rect x={x} y={base - h} width={w} height={h} fill={`url(#${p}-mono)`} transform={j ? `scale(-1 1) translate(${-2 * x - w} 0)` : undefined} />
                  <rect x={x + (j ? 6 : w - 9)} y={base - h + 30} width="3" height={h * 0.5} style={{ fill: paint.lime }} opacity="0.55" />
                </g>
              ))}
            </g>
          );
        })}
        <g transform="translate(395 -40) scale(0.74)">
          <GatewayCore p={p} pillars={false} />
        </g>
        <Floor p={p} y={600} w={W} cx={800} />
        <Fog p={p} w={W} y={620} />
      </svg>
      <TempTag id="A02" />
    </div>
  );
}
