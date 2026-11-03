import { ButtonLink } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="This path leads nowhere.">
        <p>The page you were looking for does not exist or is not public.</p>
      </PageHeader>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, paddingBottom: 'var(--section-pad)' }}>
        <ButtonLink href="/" arrow>
          Back to OVERBID
        </ButtonLink>
        <ButtonLink href="/businesses" variant="secondary">
          Explore Businesses
        </ButtonLink>
      </div>
    </>
  );
}
