import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { ASSETS, type AssetId } from '@/lib/assets';
import styles from './Plate.module.css';

const MARK = { src: '/brand/overbid-mark-640.webp', w: 640, h: 596 };

export interface PlateMark {
  /** Centre and width as fractions of the plate, so the mark stays pinned to the photographed object at any crop. */
  x: number;
  y: number;
  w: number;
  glow?: boolean;
  opacity?: number;
}

interface PlateProps {
  id: AssetId;
  sizes: string;
  /** Crop anchor (0–1) used when the frame's aspect ratio differs from the plate's. */
  align?: [number, number];
  marks?: PlateMark[];
  eager?: boolean;
  className?: string;
  /** Extra overlay layers positioned in plate coordinates (percent of the uncropped image). */
  children?: ReactNode;
}

/** Owner-supplied photographic plate, cropped like object-fit: cover, with the approved mark composited on top. */
export function Plate({ id, sizes, align = [0.5, 0.5], marks = [], eager, className, children }: PlateProps) {
  const a = ASSETS[id];
  const vars = {
    '--plate-ratio': `${a.width} / ${a.height}`,
    '--plate-r': a.width / a.height,
    '--plate-ax': align[0],
    '--plate-ay': align[1],
  } as CSSProperties;
  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} style={vars} data-asset={id} aria-hidden="true">
      <div className={styles.plate} data-plate="">
        <Image
          src={a.src}
          alt=""
          fill
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          className={styles.img}
          draggable={false}
        />
        {marks.map((m, i) => (
          <span
            key={i}
            className={styles.mark}
            data-glow={m.glow || undefined}
            style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%`, width: `${m.w * 100}%`, opacity: m.opacity } as CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static pre-sized brand export */}
            <img src={MARK.src} width={MARK.w} height={MARK.h} alt="" draggable={false} />
          </span>
        ))}
        {children}
      </div>
    </div>
  );
}
