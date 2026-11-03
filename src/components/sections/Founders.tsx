import { Briefcase, ChartNoAxesColumn, FileText, LockKeyhole, Monitor, Settings, Target, Users, BarChart3, Lock } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { ChapterRule } from '@/components/ui/Chapter';
import { Mark } from '@/components/ui/Logo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { chapters, founders } from '@/lib/content';
import shell from './shell.module.css';
import styles from './Founders.module.css';

const PANEL_ICONS = [FileText, ChartNoAxesColumn, Target];
const SIDEBAR_ICONS = [Briefcase, BarChart3, Users, Lock, Settings];

/** Static interface preview. Indicators are not focusable controls; editing happens in the /sell wizard. */
function ListingPreview() {
  const p = founders.preview;
  return (
    <figure className={styles.preview} aria-label={`${p.label}: ${p.heading}`}>
      <div className={styles.sidebar} aria-hidden="true">
        <Mark width={34} className={styles.sideMark} />
        {SIDEBAR_ICONS.map((Icon, i) => (
          <span key={i} className={i === 0 ? styles.sideActive : styles.sideIcon}>
            <Icon strokeWidth={1.75} />
          </span>
        ))}
      </div>
      <div className={styles.panelArea}>
        <div className={styles.previewTop}>
          <p className={styles.previewEyebrow}>
            {p.eyebrow} <span aria-hidden="true">/</span> <span className={styles.draft}>{p.status}</span>
          </p>
          <p className={styles.previewLabel}>
            <Monitor aria-hidden="true" strokeWidth={1.75} />
            {p.label}
          </p>
        </div>
        <p className={styles.previewHeading}>{p.heading}</p>
        <ul role="list" className={styles.panels}>
          {p.panels.map((name, i) => {
            const Icon = PANEL_ICONS[i];
            return (
              <li key={name} className={styles.panel}>
                <Icon aria-hidden="true" strokeWidth={1.75} />
                <div>
                  <span>{name}</span>
                  <span className={styles.skeleton} aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.controls}>
          <p className={styles.controlsTitle}>{p.controlsTitle}</p>
          <ul role="list" className={styles.controlList}>
            {p.controls.map((c) => (
              <li key={c}>
                <span className={styles.indicator} aria-hidden="true" />
                {c}
                <span className="visually-hidden"> (enabled in preview)</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

export function Founders() {
  return (
    <section id="founders" className={`${shell.section} ${styles.section}`} aria-labelledby="founders-title">
      <Mark width={640} className={styles.watermark} />
      <div className="container">
        <ChapterRule {...chapters.founders} className={shell.chapter} />
        <div className={styles.grid}>
          <div className={styles.copy}>
            <SectionHeading id="founders-title" plain={founders.headline.plain} accent={founders.headline.accent} description={founders.description} />
            <div className={styles.actions}>
              <ButtonLink href={founders.primary.href} arrow>
                {founders.primary.label}
              </ButtonLink>
              <ButtonLink href={founders.secondary.href} variant="secondary">
                {founders.secondary.label}
              </ButtonLink>
            </div>
            <p className={styles.note}>
              <LockKeyhole aria-hidden="true" strokeWidth={1.75} />
              {founders.note}
            </p>
          </div>
          <ListingPreview />
        </div>
        <ol role="list" className={styles.steps}>
          {founders.steps.map((s, i) => (
            <li key={s}>
              <span className={styles.stepN}>0{i + 1}</span> {s}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
