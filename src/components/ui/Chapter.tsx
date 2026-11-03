import styles from './Chapter.module.css';

/** Small decorative chapter marker with a hairline rule, as in the references. */
export function ChapterRule({ n, label, className }: { n: string; label: string; className?: string }) {
  return (
    <div className={[styles.rule, className].filter(Boolean).join(' ')} aria-hidden="true">
      <span className={styles.line} />
      <span className={styles.diamond} />
      <span className={styles.line} />
      <span className={styles.label}>
        <span className={styles.n}>{n}</span> / {label}
      </span>
    </div>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={[styles.eyebrow, className].filter(Boolean).join(' ')}>{children}</p>;
}
