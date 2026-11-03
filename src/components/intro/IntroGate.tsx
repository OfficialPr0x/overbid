'use client';

import { ArrowUpRight, KeyRound } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Plate } from '@/components/art/Plate';
import { Logo } from '@/components/ui/Logo';
import { footer, splash } from '@/lib/content';
import { REPLAY_EVENT, markIntroSeen, shouldShowIntro } from './introState';
import styles from './IntroGate.module.css';

type IntroState = 'bypassed' | 'showing-poster' | 'entering' | 'dismissed';

const ENTER_MS = 900;

/** Last word of the command line carries the lime; punctuation stays ivory. */
function commandParts(line: string) {
  const cut = line.lastIndexOf(' ');
  const tail = cut < 0 ? line : line.slice(cut + 1);
  const lead = cut < 0 ? '' : line.slice(0, cut + 1);
  const punct = /[.!?]$/.exec(tail)?.[0] ?? '';
  return { lead, word: punct ? tail.slice(0, -1) : tail, punct };
}

/* Lit aperture of the A02 plate, measured from the source pixels (fractions of the uncropped image). */
const APEX = [50, 14.13] as const;
const BASE_Y = 56.05;
const BASE_L = 35.6;
const BASE_R = 64.2;

/** Dust in the light shaft: fixed pseudo-random layout so server and client markup match. */
const MOTES = Array.from({ length: 22 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 127.1 + n * 311.7) * 43758.5453) % 1 + 1) % 1;
  return {
    left: 38 + r(1) * 24,
    top: 30 + r(2) * 42,
    size: 1 + r(3) * 2.2,
    delay: -r(4) * 14,
    duration: 10 + r(5) * 8,
    drift: (r(6) - 0.5) * 3,
  };
});

/**
 * Optional first-visit threshold rendered as a modal dialog over the already-rendered page.
 * Never server-rendered, so crawlers and no-JS visitors always get the full homepage.
 */
export function IntroGate() {
  const [state, setState] = useState<IntroState>('bypassed');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
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
        // showModal() focuses the first focusable child (Skip); the primary action should receive focus.
        enterRef.current?.focus();
      } catch {
        queueMicrotask(dismiss);
      }
    }
  }, [state, dismiss]);

  // Pointer parallax: fine pointers only, no reduced motion, CSS variables written once per frame.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (state !== 'showing-poster' || !dialog) return;
    const allowed = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!allowed.matches) return;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      dialog.style.setProperty('--px', current.x.toFixed(4));
      dialog.style.setProperty('--py', current.y.toFixed(4));
      raf = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    dialog.addEventListener('pointermove', onMove);
    return () => {
      dialog.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [state]);

  const enter = () => {
    if (state !== 'showing-poster') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return dismiss();
    setState('entering');
    timer.current = window.setTimeout(dismiss, ENTER_MS);
  };

  if (state === 'bypassed' || state === 'dismissed') return null;

  const trace = `${APEX[0]},${APEX[1]} ${BASE_L},${BASE_Y} ${BASE_R},${BASE_Y}`;
  const [invite, command] = splash.headline;
  const own = commandParts(command);

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
      <div className={styles.stage} aria-hidden="true">
        <Plate id="A02" sizes="(orientation: portrait) 200vw, 100vw" align={[0.5, 0.4]} eager className={styles.plate}>
          <div className={styles.haze} />
          <div className={styles.shaft} />
          <div className={styles.motes}>
            {MOTES.map((m, i) => (
              <span
                key={i}
                style={
                  {
                    left: `${m.left}%`,
                    top: `${m.top}%`,
                    width: `${m.size}px`,
                    height: `${m.size}px`,
                    animationDelay: `${m.delay}s`,
                    animationDuration: `${m.duration}s`,
                    '--drift': m.drift,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <svg className={styles.trace} viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
            <polygon className={styles.traceGlow} points={trace} pathLength={1} />
            <polygon className={styles.traceLine} points={trace} pathLength={1} />
          </svg>
          <span className={styles.mark}>
            {/* eslint-disable-next-line @next/next/no-img-element -- approved brand export, composited not redrawn */}
            <img src="/brand/overbid-mark-640.webp" width={640} height={596} alt="" draggable={false} />
            <span className={styles.sheen} />
          </span>
        </Plate>
        <div className={styles.vignette} />
      </div>

      <div className={styles.top}>
        <Logo width={200} className={styles.logo} />
        <button type="button" className={styles.skip} onClick={dismiss}>
          {splash.skip}
          <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
        </button>
      </div>

      <div className={styles.content}>
        <p className={styles.kicker}>
          <span className={styles.kickerPip} aria-hidden="true" />
          <span className={styles.kickerText}>{splash.kicker}</span>
        </p>
        <h2 id="intro-title" className={styles.title}>
          <span className={styles.invite}>{invite}</span>
          <span className={styles.lineMask}>
            <span className={styles.command}>
              <span className={styles.lead}>{own.lead}</span>
              <span className={styles.prize}>
                {own.word}
                {own.punct ? <span className={styles.punct}>{own.punct}</span> : null}
              </span>
            </span>
          </span>
        </h2>
        <p id="intro-desc" className={styles.desc}>
          {splash.description}
        </p>
        <button ref={enterRef} type="button" className={styles.enter} onClick={enter} disabled={state === 'entering'}>
          <KeyRound aria-hidden="true" strokeWidth={1.75} />
          {splash.enter}
          <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
        </button>
      </div>

      <div className={styles.bottom} aria-hidden="true">
        <span className={styles.chapter}>
          <span className={styles.chapterNum}>01</span> — The Threshold
        </span>
        <span className={styles.services}>{footer.services.join(' / ')}</span>
      </div>

      <div className={styles.flash} aria-hidden="true" />
    </dialog>
  );
}
