import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

interface Props {
  id?: string;
  as?: 'h1' | 'h2' | 'h3';
  plain: string;
  accent?: string;
  /** Put the accent clause on its own line (desktop only; mobile wraps naturally). */
  breakBeforeAccent?: boolean;
  description?: ReactNode;
  size?: 'section' | 'wide';
  className?: string;
}

export function SectionHeading({ id, as: Tag = 'h2', plain, accent, breakBeforeAccent = true, description, size = 'section', className }: Props) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <Tag id={id} className={[styles.heading, size === 'wide' && styles.wide].filter(Boolean).join(' ')}>
        <span className={breakBeforeAccent ? styles.line : undefined}>{plain}</span>
        {accent && (
          <>
            {' '}
            <span className={[styles.accent, breakBeforeAccent && styles.line].filter(Boolean).join(' ')}>{accent}</span>
          </>
        )}
      </Tag>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
