import { Suspense } from 'react';
import { OrbitalArt } from '@/components/art/OrbitalArt';
import { ChapterRule } from '@/components/ui/Chapter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IntroductionForm, IntroductionFormFromUrl } from '@/components/forms/IntroductionForm';
import { chapters, introduction } from '@/lib/content';
import shell from './shell.module.css';
import styles from './Introduction.module.css';

export function Introduction() {
  return (
    <section id="introduction" className={shell.section} aria-labelledby="introduction-title">
      <div className="container">
        <ChapterRule {...chapters.introduction} className={shell.chapter} />
        <div className={styles.grid}>
          <SectionHeading
            id="introduction-title"
            plain={introduction.headline.plain}
            accent={introduction.headline.accent}
            description={introduction.description}
            className={styles.head}
          />
          <div className={styles.card}>
            <Suspense fallback={<IntroductionForm />}>
              <IntroductionFormFromUrl />
            </Suspense>
          </div>
          <div className={styles.artArea}>
            <OrbitalArt className={styles.art} />
            <p className={styles.rabbitLine}>{introduction.rabbitLine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
