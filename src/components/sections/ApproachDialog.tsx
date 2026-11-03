'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { approachProcess } from '@/lib/content';
import styles from './ApproachDialog.module.css';

export function ApproachDialogTrigger({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <Button variant="text" arrow onClick={() => setOpen(true)} aria-haspopup="dialog">
        {label}
      </Button>
      <Dialog open={open} onClose={close} title={approachProcess.title}>
        <p className={styles.intro}>{approachProcess.intro}</p>
        <ol className={styles.steps}>
          {approachProcess.steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.n} aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3 className={styles.title}>{s.title}</h3>
                <dl className={styles.dl}>
                  <dt>Scope</dt>
                  <dd>{s.scope}</dd>
                  <dt>Responsibility</dt>
                  <dd>{s.you}</dd>
                  <dt>Next step</dt>
                  <dd>{s.next}</dd>
                </dl>
              </div>
            </li>
          ))}
        </ol>
        <p className={styles.note}>{approachProcess.note}</p>
        <div className={styles.actions}>
          <Link href="/sell" className={styles.link} onClick={close}>
            Start a draft listing
          </Link>
          <Link href="/businesses" className={styles.link} onClick={close}>
            Browse sample opportunities
          </Link>
          <Link href="/#introduction" className={styles.link} onClick={close}>
            Request a private introduction
          </Link>
        </div>
      </Dialog>
    </>
  );
}
