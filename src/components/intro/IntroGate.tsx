'use client';

import { ArrowUpRight, KeyRound } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ThresholdArt } from '@/components/art/Gateway';
import { Logo } from '@/components/ui/Logo';
import { footer, splash } from '@/lib/content';
import { REPLAY_EVENT, markIntroSeen, shouldShowIntro } from './introState';
import styles from './IntroGate.module.css';

type IntroState = 'bypassed' | 'showing-poster' | 'entering' | 'dismissed';

const ENTER_MS = 850;

/**
 * Optional first-visit threshold rendered as a modal dialog over the already-rendered page.
 * Never server-rendered, so crawlers and no-JS visitors always get the full homepage.
 */
export function IntroGate() {
  const [state, setState] = useState<IntroState>('bypassed');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const timer = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    markIntroSeen();
    setState('dismissed');
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    document.body.classList.remove('scroll-locked');
    const h1 = document.getElementById('main-heading');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
      h1.addEventListener('blur', () => h1.removeAttribute('tabindex'), { once: true });
    }
  }, []);

  useEffect(() => {
    // Deciding on mount is the point: the server always renders the page without the gate.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (shouldShowIntro()) setState('showing-poster');
    const onReplay = () => setState('showing-poster');
    window.addEventListener(REPLAY_EVENT, onReplay);
    return () => {
      window.removeEventListener(REPLAY_EVENT, onReplay);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (state === 'showing-poster' && !dialog.open) {
      try {
        dialog.showModal();
        document.body.classList.add('scroll-locked');
      } catch {
        queueMicrotask(dismiss);
      }
    }
  }, [state, dismiss]);

  const enter = () => {
    if (state !== 'showing-poster') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return dismiss();
    setState('entering');
    timer.current = window.setTimeout(dismiss, ENTER_MS);
  };

  if (state === 'bypassed' || state === 'dismissed') return null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.gate}
      data-state={state}
      aria-labelledby="intro-title"
      aria-describedby="intro-desc"
      onCancel={(e) => {
        e.preventDefault();
        dismiss();
      }}
    >
      <ThresholdArt className={styles.art} />
      <div className={styles.top}>
        <Logo width={200} className={styles.logo} />
        <button type="button" className={styles.skip} onClick={dismiss}>
          {splash.skip}
          <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
        </button>
      </div>
      <div className={styles.content}>
        <p className={styles.kicker}>{splash.kicker}</p>
        <h2 id="intro-title" className={styles.title}>
          {splash.headline.map((l) => (
            <span key={l}>{l} </span>
          ))}
        </h2>
        <p id="intro-desc" className={styles.desc}>
          {splash.description}
        </p>
        <button type="button" className={styles.enter} onClick={enter} disabled={state === 'entering'} autoFocus>
          <KeyRound aria-hidden="true" strokeWidth={1.75} />
          {splash.enter}
          <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
        </button>
      </div>
      <p className={styles.bottom} aria-hidden="true">
        {footer.services.join(' / ')}
      </p>
    </dialog>
  );
}
