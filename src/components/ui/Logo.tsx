import Image from 'next/image';
import { brand } from '@/lib/content';

// Transparent exports keyed from Reference-Guidelines/00-approved-logo.png by scripts/prepare-logo.mjs.
// Raster source logo, not a vector. Dark backgrounds only.
const LOGO = { src: '/brand/overbid-logo.png', width: 1948, height: 562 };
const MARK = { src: '/brand/overbid-mark.png', width: 604, height: 562 };

export function Logo({ width = 250, priority, className }: { width?: number; priority?: boolean; className?: string }) {
  return (
    <Image
      src={LOGO.src}
      alt={brand.logoAlt}
      width={width}
      height={Math.round((width * LOGO.height) / LOGO.width)}
      priority={priority}
      sizes={`${width}px`}
      className={className}
    />
  );
}

/** Rabbit/triangle mark. Decorative by default (empty alt). */
export function Mark({ width = 160, alt = '', className, priority }: { width?: number; alt?: string; className?: string; priority?: boolean }) {
  return (
    <Image
      src={MARK.src}
      alt={alt}
      width={width}
      height={Math.round((width * MARK.height) / MARK.width)}
      sizes={`${width}px`}
      className={className}
      priority={priority}
    />
  );
}
