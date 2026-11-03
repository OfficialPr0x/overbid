// Runtime view of design/asset-manifest.json.
// `approved` = owner-supplied plate in /public/media. `derived` = crop of another approved plate
// standing in for a slot with no dedicated file. `temporary` = hand-built SVG stand-in (visible tag).
export type AssetStatus = 'temporary' | 'approved' | 'derived';

interface AssetEntry {
  name: string;
  status: AssetStatus;
  src: string;
  width: number;
  height: number;
  derivedFrom?: string;
}

export const ASSETS = {
  A01: { name: 'hero-gateway', status: 'approved', src: '/media/hero-gateway.webp', width: 1672, height: 941 },
  A02: { name: 'intro-threshold', status: 'approved', src: '/media/splash-threshold.webp', width: 1672, height: 941 },
  A03: { name: 'sculptural-key', status: 'approved', src: '/media/sculptural-key.webp', width: 1254, height: 1254 },
  A04: { name: 'archive-dossiers', status: 'approved', src: '/media/archive-dossiers.webp', width: 1448, height: 1086 },
  A05: { name: 'trust-dossier', status: 'approved', src: '/media/trust-dossier.webp', width: 1448, height: 1086 },
  A06: { name: 'listing-software', status: 'approved', src: '/media/listing-software.webp', width: 1672, height: 941 },
  A07: { name: 'listing-commerce', status: 'approved', src: '/media/listing-commerce.webp', width: 1672, height: 941 },
  A08: { name: 'listing-services', status: 'approved', src: '/media/listing-services.webp', width: 1672, height: 941 },
  A09: { name: 'mobile-gateway', status: 'derived', derivedFrom: 'A01', src: '/media/hero-gateway.webp', width: 1672, height: 941 },
} as const satisfies Record<string, AssetEntry>;

export type AssetId = keyof typeof ASSETS;
