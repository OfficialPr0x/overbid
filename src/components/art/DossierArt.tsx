import { Plate } from './Plate';

export function DossierArt({ className }: { className?: string }) {
  return <Plate id="A05" sizes="(min-width: 1024px) 45vw, 90vw" className={className} />;
}
