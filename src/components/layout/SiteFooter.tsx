import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { footer } from '@/lib/content';
import { ReplayIntroButton } from '@/components/intro/ReplayIntroButton';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandRow}>
          <Link href="/" aria-label="OVERBID CAPITAL home" className={styles.logoLink}>
            <Logo width={200} className={styles.logo} />
          </Link>
          <span className={styles.divider} aria-hidden="true" />
          <nav aria-label="Footer">
            <ul role="list" className={styles.links}>
              {footer.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <ReplayIntroButton className={styles.replay}>{footer.replayIntro}</ReplayIntroButton>
              </li>
            </ul>
          </nav>
        </div>
        <p className={styles.services} aria-label="Business sales, acquisitions, capital">
          {footer.services.map((s, i) => (
            <span key={s}>
              {i > 0 && <span className={styles.slash} aria-hidden="true"> / </span>}
              {s}
            </span>
          ))}
        </p>
      </div>
      <div className={`container ${styles.legal}`}>
        <p>{footer.demoNotice} Legal operator details will be published before launch.</p>
      </div>
    </footer>
  );
}
