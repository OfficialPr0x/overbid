import { Plate, type PlateMark } from './Plate';

/** Approved mark seated in the empty lit aperture of the A01 gateway plate. */
const APERTURE_MARK: PlateMark = { x: 0.744, y: 0.625, w: 0.105, glow: true };

export function HeroGatewayArt({ className }: { className?: string }) {
  return <Plate id="A01" sizes="100vw" align={[0.9, 0.5]} marks={[APERTURE_MARK]} eager className={className} />;
}