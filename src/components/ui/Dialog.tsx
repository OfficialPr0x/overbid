'use client';

import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import styles from './Dialog.module.css';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Visually hide the title (still labels the dialog). */
  hideTitle?: boolean;
  children: ReactNode;
  variant?: 'panel' | 'sheet';
  closeLabel?: string;
  className?: string;
}

/**
 * Native modal <dialog>: the browser makes the page inert, contains focus and fires `cancel` on Escape.
 * We add body scroll lock and restore focus to whatever opened it.
 */
export function Dialog({ open, onClose, title, hideTitle, children, variant = 'panel', closeLabel = 'Close', className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      document.body.classList.add('scroll-locked');
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      document.body.classList.remove('scroll-locked');
      const el = returnFocus.current;
      returnFocus.current = null;
      if (el && el.isConnected) el.focus({ preventScroll: true });
    };
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  useEffect(
    () => () => {
      document.body.classList.remove('scroll-locked');
    },
    [],
  );

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={[styles.dialog, styles[variant], className].filter(Boolean).join(' ')}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 id={titleId} className={hideTitle ? 'visually-hidden' : styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label={closeLabel}>
            <X aria-hidden="true" strokeWidth={1.75} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
