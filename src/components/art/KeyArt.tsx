import { Plate } from './Plate';

export function KeyArt({ className }: { className?: string }) {
  return (
    <Plate
      id="A03"
      sizes="(min-width: 1024px) 40vw, 90vw"
      marks={[{ x: 0.252, y: 0.262, w: 0.15, glow: true }]}
      className={className}
    />
  );
}
