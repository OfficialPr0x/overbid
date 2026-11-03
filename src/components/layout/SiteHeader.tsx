'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Dialog } from '@/components/ui/Dialog';
import { ButtonLink } from '@/components/ui/Button';
import { nav } from '@/lib/content';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={styles.header} data-scrolled={scrolled || undefined}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logoLink} aria-label="OVERBID CAPITAL home">
          <Logo width={250} priority className={styles.logo} />
        </Link>

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul role="list" className={styles.links}>
            {nav.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href={nav.cta.href} variant="secondary" size="sm" className={styles.cta}>
            {nav.cta.label}
          </ButtonLink>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu aria-hidden="true" strokeWidth={1.75} />
          <span>Menu</span>
        </button>
      </div>

      <Dialog open={open} onClose={close} title="Menu" hideTitle variant="sheet" closeLabel="Close menu">
        <nav aria-label="Mobile" className={styles.mobileNav}>
          <Logo width={168} className={styles.menuLogo} />
          <ul role="list">
            {[...nav.links, nav.cta].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.mobileLink} onClick={close}>
                  {l.label}
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/saved" className={styles.mobileLink} onClick={close}>
                Saved opportunities
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
              </Link>
            </li>
          </ul>
        </nav>
      </Dialog>
    </header>
  );
}
