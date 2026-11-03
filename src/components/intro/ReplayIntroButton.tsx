'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { REPLAY_EVENT, requestReplayAfterNavigation } from './introState';

export function ReplayIntroButton({ children, className }: { children: ReactNode; className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (pathname === '/') {
          window.dispatchEvent(new Event(REPLAY_EVENT));
        } else {
          requestReplayAfterNavigation();
          router.push('/');
        }
      }}
    >
      {children}
    </button>
  );
}
