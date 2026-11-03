// Runtime view of design/asset-manifest.json. `temporary` = hand-built SVG stand-in for an
// ungenerated KIE plate; the UI shows a visible tag until an approved export replaces it.
export type AssetStatus = 'temporary' | 'approved';

export const ASSETS = {
  A01: { name: 'hero-gateway', status: 'temporary' },
  A02: { name: 'intro-threshold', status: 'temporary' },
  A03: { name: 'sculptural-key', status: 'temporary' },
  A04: { name: 'archive-dossiers', status: 'temporary' },
  A05: { name: 'trust-dossier', status: 'temporary' },
  A06: { name: 'listing-software', status: 'temporary' },
  A07: { name: 'listing-commerce', status: 'temporary' },
  A08: { name: 'listing-services', status: 'temporary' },
  A09: { name: 'mobile-gateway', status: 'temporary' },
} as const satisfies Record<string, { name: string; status: AssetStatus }>;

export type AssetId = keyof typeof ASSETS;
