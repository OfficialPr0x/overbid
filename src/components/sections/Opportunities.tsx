import { ButtonLink } from '@/components/ui/Button';
import { ChapterRule } from '@/components/ui/Chapter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { paint } from '@/components/art/Filters';
import { chapters, opportunities } from '@/lib/content';
import { listingRepository } from '@/lib/listings';
import { OpportunitiesPreview } from './OpportunitiesPreview';
import shell from './shell.module.css';
import styles from './Opportunities.module.css';

function CornerGeometry() {
  return (
    <svg className={styles.corner} viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <g fill="none" style={{ stroke: paint.gold }} strokeWidth="1.2">
        <polygon points="200,20 360,290 40,290" opacity="0.55" />
        <circle cx="200" cy="200" r="190" opacity="0.25" />
        <path d="M 330 40 A 260 260 0 0 1 400 120" opacity="0.4" />
      </g>
      <rect x="192" y="110" width="16" height="16" transform="rotate(45 200 118)" style={{ fill: paint.ivory }} opacity="0.85" />
    </svg>
  );
}

export function Opportunities() {
  return (
    <section id="opportunities" className={`${shell.section} ${styles.section}`} aria-labelledby="opportunities-title">
      <CornerGeometry />
      <div className="container">
        <ChapterRule {...chapters.opportunities} className={shell.chapter} />
        <SectionHeading id="opportunities-title" plain={opportunities.headline.plain} accent={opportunities.headline.accent} />
        <OpportunitiesPreview listings={listingRepository.all()} />
        <div className={styles.footer}>
          <p className={styles.footerPrompt}>{opportunities.footer.prompt}</p>
          <span className={styles.footerLine} aria-hidden="true" />
          <ButtonLink href={opportunities.footer.href} variant="text" arrow>
            {opportunities.footer.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
