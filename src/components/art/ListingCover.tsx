import type { AssetId } from '@/lib/assets';
import { Plate } from './Plate';
import styles from './art.module.css';

const COVERS = ['A06', 'A07', 'A08'] as const;

/** Generic category plate (A06 software, A07 commerce, A08 services). Not a photo of the listed business. */
export function ListingCover({
  assetId,
  className,
  eager,
  sizes = '(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 100vw',
}: {
  assetId: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  const id: AssetId = (COVERS as readonly string[]).includes(assetId) ? (assetId as AssetId) : 'A06';
  return <Plate id={id} sizes={sizes} align={[0.5, 0.55]} eager={eager} className={[styles.cover, className].filter(Boolean).join(' ')} />;
}
