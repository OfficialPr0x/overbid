'use client';

import { Bookmark } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { useSavedListings } from './useSavedListings';
import styles from './DetailActions.module.css';

export function DetailActions({ listingId, title }: { listingId: string; title: string }) {
  const { isSaved, toggle, persistent } = useSavedListings();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const saved = isSaved(listingId);

  return (
    <div className={styles.actions}>
      <Button arrow block onClick={() => setOpen(true)} aria-haspopup="dialog">
        Preview information request
      </Button>
      <button type="button" className={styles.save} aria-pressed={saved} onClick={() => toggle(listingId)}>
        <Bookmark aria-hidden="true" strokeWidth={1.75} />
        {saved ? 'Saved on this device' : 'Save on this device'}
        <span className="visually-hidden">: {title}</span>
      </button>
      {!persistent && <p className={styles.note}>Storage is unavailable; this save lasts until you leave the page.</p>}

      <Dialog open={open} onClose={close} title="Information request — simulation">
        <p className={styles.sim}>Simulation only. Nothing is sent and no documents exist for sample listings.</p>
        <p>In the production workflow, requesting detailed information about “{title}” would involve:</p>
        <ol className={styles.steps}>
          <li>Signing in with a buyer account and completing a short acquisition profile.</li>
          <li>Accepting a confidentiality agreement if the seller requires one.</li>
          <li>The seller reviewing your request and choosing whether to grant access.</li>
          <li>If granted, viewing approved documents through short-lived, logged links. The seller can revoke access.</li>
        </ol>
        <p className={styles.muted}>None of these services are connected in this demo.</p>
        <div className={styles.dialogActions}>
          <Button onClick={close}>Close simulation</Button>
        </div>
      </Dialog>
    </div>
  );
}
