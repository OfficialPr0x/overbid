import { Plate } from './Plate';

export function ArchiveArt({ className }: { className?: string }) {
  return (
    <Plate
      id="A04"
      sizes="(min-width: 1024px) 50vw, 90vw"
      marks={[{ x: 0.495, y: 0.36, w: 0.075, opacity: 0.92 }]}
      className={className}
    />
  );
}
