import { HeroGatewayArt } from '@/components/art/Gateway';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Chapter';
import { entrance } from '@/lib/content';
import styles from './Entrance.module.css';

export function Entrance() {
  const { headline } = entrance;
  return (
    <section id="home" className={styles.hero} aria-labelledby="main-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <Eyebrow className={styles.eyebrow}>{entrance.eyebrow}</Eyebrow>
          <h1 id="main-heading" className={styles.title}>
            {headline.plain.map((l) => (
              <span key={l} className={styles.line}>
                {l}{' '}
              </span>
            ))}
            {headline.accent.map((l) => (
              <span key={l} className={`${styles.line} ${styles.accent}`}>
                {l}{' '}
              </span>
            ))}
          </h1>
          <p className={styles.lead}>{entrance.description}</p>
          <div className={`${styles.actions} cta-row`}>
            <ButtonLink href={entrance.primary.href} arrow data-event="hero_sell_click">
              {entrance.primary.label}
            </ButtonLink>
            <ButtonLink href={entrance.secondary.href} variant="secondary" data-event="hero_buy_click">
              {entrance.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </div>

      <HeroGatewayArt className={styles.art} />

      <div className={`container ${styles.stripWrap}`}>
        <ul role="list" className={styles.strip} aria-label="How OVERBID is designed to work">
          {entrance.strip.map((s, i) => (
            <li key={s}>
              {i > 0 && (
                <span className={styles.slash} aria-hidden="true">
                  /
                </span>
              )}
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
