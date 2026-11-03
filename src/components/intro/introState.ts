export const INTRO_FLAG = 'overbid.intro.seen.v1';
export const REPLAY_EVENT = 'overbid:replay-intro';

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_FLAG, '1');
  } catch {
    /* storage disabled: intro simply shows again next visit */
  }
}

const REPLAY_FLAG = 'overbid.intro.replay.v1';

export function requestReplayAfterNavigation() {
  try {
    window.sessionStorage.setItem(REPLAY_FLAG, '1');
  } catch {
    /* ignore */
  }
}

/** Decide whether the first-visit intro may show. Any doubt → bypass. */
export function shouldShowIntro(): boolean {
  try {
    if (window.location.pathname !== '/') return false;
    if (window.sessionStorage.getItem(REPLAY_FLAG) === '1') {
      window.sessionStorage.removeItem(REPLAY_FLAG);
      return true;
    }
    if (window.location.hash || window.location.search) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === 'back_forward') return false;
    return window.sessionStorage.getItem(INTRO_FLAG) !== '1';
  } catch {
    return false;
  }
}
