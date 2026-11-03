import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/Chapter';
import styles from './PageHeader.module.css';

export function PageHeader({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent?: string; children?: ReactNode }) {
  return (
    <header className={`container ${styles.header}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 id="main-heading" className={styles.title}>
        {title} {accent && <span className="accent">{accent}</span>}
      </h1>
      {children && <div className={styles.intro}>{children}</div>}
    </header>
  );
}

export function DemoNotice({ children }: { children: ReactNode }) {
  return (
    <p className={styles.demo} role="note">
      <span className={styles.demoTag}>Demo</span>
      <span>{children}</span>
    </p>
  );
}
