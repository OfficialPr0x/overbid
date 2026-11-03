import { FolderOpen, Handshake, Search } from 'lucide-react';
import { ArchiveArt } from '@/components/art/ArchiveArt';
import { Button } from '@/components/ui/Button';
import { ChapterRule } from '@/components/ui/Chapter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buyers, chapters } from '@/lib/content';
import { CATEGORY_OPTIONS, LOCATIONS, PRICE_BANDS } from '@/lib/listings';
import shell from './shell.module.css';
import styles from './Buyers.module.css';

const PILLAR_ICONS = [Search, FolderOpen, Handshake];

/** Native GET form: filters are encoded in the /businesses URL and work without JavaScript. */
function BuyerFilterForm() {
  return (
    <form action="/businesses" method="get" className={styles.form} aria-label="Find opportunities">
      <div className={styles.field}>
        <label htmlFor="buyer-industry">Industry</label>
        <select id="buyer-industry" name="category" defaultValue="saas">
          <option value="">Any industry</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="buyer-price">Asking price</label>
        <select id="buyer-price" name="price" defaultValue="" aria-describedby="buyer-price-hint">
          <option value="">Select range</option>
          {PRICE_BANDS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </div>
      <p id="buyer-price-hint" className={styles.hint}>
        Ranges compare each listing’s asking price in its own currency.
      </p>
      <div className={styles.field}>
        <label htmlFor="buyer-location">Location</label>
        <select id="buyer-location" name="location" defaultValue="na">
          <option value="">Any location</option>
          {LOCATIONS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" arrow block data-event="filter_applied">
        {buyers.cta}
      </Button>
    </form>
  );
}

export function Buyers() {
  return (
    <section id="buyers" className={shell.section} aria-labelledby="buyers-title">
      <div className="container">
        <ChapterRule {...chapters.buyers} className={shell.chapter} />
        <div className={styles.grid}>
          <SectionHeading
            id="buyers-title"
            plain={buyers.headline.plain}
            accent={buyers.headline.accent}
            description={buyers.description}
            className={styles.head}
          />
          <div className={styles.formArea}>
            <BuyerFilterForm />
          </div>
          <ArchiveArt className={styles.art} />
        </div>
        <ul role="list" className={styles.pillars}>
          {buyers.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <li key={p}>
                <Icon aria-hidden="true" strokeWidth={1.75} />
                {p}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
