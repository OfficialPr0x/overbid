import { KeyArt } from '@/components/art/KeyArt';
import { ChapterRule } from '@/components/ui/Chapter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { advantage, chapters } from '@/lib/content';
import { ApproachDialogTrigger } from './ApproachDialog';
import shell from './shell.module.css';
import styles from './Advantage.module.css';

export function Advantage() {
  return (
    <section id="approach" className={shell.section} aria-labelledby="approach-title">
      <div className="container">
        <ChapterRule {...chapters.approach} className={shell.chapter} />
        <div className={styles.grid}>
          <SectionHeading
            id="approach-title"
            plain={advantage.headline}
            breakBeforeAccent={false}
            description={advantage.description}
            size="wide"
            className={styles.head}
          />
          <div className={styles.body}>
            <ol role="list" className={styles.rows}>
              {advantage.rows.map((r) => (
                <li key={r.n} className={styles.row}>
                  <span className={styles.num} aria-hidden="true">
                    {r.n}
                  </span>
                  <span className={styles.rule} aria-hidden="true" />
                  <div>
                    <h3 className={styles.title}>{r.title}</h3>
                    <p className={styles.text}>{r.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ApproachDialogTrigger label={advantage.cta} />
          </div>
          <KeyArt className={styles.art} />
        </div>
      </div>
    </section>
  );
}
