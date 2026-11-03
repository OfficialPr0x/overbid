import { ChevronDown } from 'lucide-react';
import { DossierArt } from '@/components/art/DossierArt';
import { ButtonLink } from '@/components/ui/Button';
import { ChapterRule } from '@/components/ui/Chapter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { chapters, trust } from '@/lib/content';
import shell from './shell.module.css';
import styles from './Trust.module.css';

export function Trust() {
  return (
    <section id="trust" className={`${shell.section} ${styles.section}`} aria-labelledby="trust-title">
      <div className="container">
        <ChapterRule {...chapters.trust} className={shell.chapter} />
        <div className={styles.grid}>
          <div className={styles.copy}>
            <SectionHeading id="trust-title" plain={trust.headline.plain} accent={trust.headline.accent} description={trust.description} />
            <div className={styles.faqs}>
              {trust.faqs.map((f, i) => (
                <details key={f.q} className={styles.faq} open={i === 0}>
                  <summary>
                    <h3 className={styles.q}>{f.q}</h3>
                    <ChevronDown aria-hidden="true" strokeWidth={1.75} className={styles.chev} />
                  </summary>
                  <p className={styles.a}>{f.a}</p>
                </details>
              ))}
            </div>
            <div className={styles.standardRow}>
              <div className={styles.standard}>
                <p className={styles.standardTitle}>{trust.standardTitle}</p>
                <p>{trust.standard}</p>
              </div>
              <ButtonLink href={trust.cta.href} arrow>
                {trust.cta.label}
              </ButtonLink>
            </div>
          </div>
          <DossierArt className={styles.art} />
        </div>
      </div>
    </section>
  );
}
