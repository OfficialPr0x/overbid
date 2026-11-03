'use client';

import { AlertCircle, Check, Download } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { CATEGORIES } from '@/lib/listings';
import { formatFullMoney, PROFIT_METRIC_LABEL } from '@/lib/format';
import { EMPTY_DRAFT, validateDraftStep, type DraftField, type DraftInput, type FieldErrors } from '@/lib/validation';
import f from './forms.module.css';
import styles from './ListingWizard.module.css';

const STEPS = ['Overview', 'Financials', 'Disclosure', 'Review'] as const;
const LOCATIONS = ['United States', 'Canada', 'Remote / North America', 'United Kingdom', 'European Union', 'Other'];
const CURRENCIES = ['USD', 'CAD', 'GBP', 'EUR'];

export function ListingWizard() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<DraftInput>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<FieldErrors<DraftField>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const set = <K extends DraftField>(k: K, v: DraftInput[K]) => {
    setDraft((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const next = () => {
    const found = validateDraftStep(step, draft);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      requestAnimationFrame(() => document.getElementById(`wz-${first}`)?.focus());
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const exportDraft = () => {
    const blob = new Blob([JSON.stringify({ status: 'demo-draft-not-published', exportedAt: new Date().toISOString(), draft }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'overbid-demo-draft.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const err = (k: DraftField) =>
    errors[k] ? (
      <p id={`wz-${k}-error`} className={f.error}>
        <AlertCircle aria-hidden="true" strokeWidth={1.75} />
        <span>
          <span className="visually-hidden">Error: </span>
          {errors[k]}
        </span>
      </p>
    ) : null;
  const a11y = (k: DraftField, hint?: string) => ({
    id: `wz-${k}`,
    'aria-invalid': Boolean(errors[k]) || undefined,
    'aria-describedby': [errors[k] ? `wz-${k}-error` : null, hint].filter(Boolean).join(' ') || undefined,
  });

  return (
    <div className={styles.wizard}>
      <ol className={styles.progress} aria-label="Listing steps">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? 'step' : undefined} data-done={i < step || undefined}>
            <span className={styles.dot} aria-hidden="true">
              {i < step ? <Check strokeWidth={2} /> : i + 1}
            </span>
            <span>
              {s}
              {i < step && <span className="visually-hidden"> (completed)</span>}
            </span>
          </li>
        ))}
      </ol>

      <form
        className={styles.panel}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step < STEPS.length - 1) next();
        }}
      >
        <h2 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </h2>

        {Object.values(errors).some(Boolean) && (
          <p className={f.errorSummaryTitle} role="alert">
            <AlertCircle aria-hidden="true" strokeWidth={1.75} />
            Please fix the highlighted fields to continue.
          </p>
        )}

        {step === 0 && (
          <div className={styles.fields}>
            <Field label="Category">
              <select {...a11y('category')} value={draft.category} onChange={(e) => set('category', e.target.value)}>
                <option value="">Choose a category</option>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {err('category')}
            </Field>
            <Field label="Listing title" hint="A short, anonymous description — not your company name. Example: “B2B workflow SaaS”.">
              <input {...a11y('title', 'wz-title-hint')} maxLength={80} value={draft.title} onChange={(e) => set('title', e.target.value)} />
              {err('title')}
            </Field>
            <Field label="General location">
              <select {...a11y('location')} value={draft.location} onChange={(e) => set('location', e.target.value)}>
                <option value="">Choose a region</option>
                {LOCATIONS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
              {err('location')}
            </Field>
            <Field label="Business website (private, optional)" hint="Never shown publicly. Leave blank in this demo if you prefer.">
              <input {...a11y('website', 'wz-website-hint')} type="url" inputMode="url" placeholder="https://example.com" value={draft.website} onChange={(e) => set('website', e.target.value)} />
              {err('website')}
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className={styles.fields}>
            <div className={styles.row2}>
              <Field label="Currency">
                <select {...a11y('currency')} value={draft.currency} onChange={(e) => set('currency', e.target.value)}>
                  {CURRENCIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                {err('currency')}
              </Field>
              <Field label="Financial period" hint="Example: FY2025 or Trailing 12 months.">
                <input {...a11y('period', 'wz-period-hint')} maxLength={40} value={draft.period} onChange={(e) => set('period', e.target.value)} />
                {err('period')}
              </Field>
            </div>
            <div className={styles.row2}>
              <Field label={`Annual revenue (${draft.currency})`} hint="Whole number, no symbols.">
                <input {...a11y('revenue', 'wz-revenue-hint')} inputMode="decimal" value={draft.revenue} onChange={(e) => set('revenue', e.target.value.trim())} />
                {err('revenue')}
              </Field>
              <Field label={`Asking price (${draft.currency})`} hint="Whole number, no symbols.">
                <input {...a11y('asking', 'wz-asking-hint')} inputMode="decimal" value={draft.asking} onChange={(e) => set('asking', e.target.value.trim())} />
                {err('asking')}
              </Field>
            </div>
            <div className={styles.row2}>
              <Field label={`Profit (${draft.currency}, optional)`} hint="Leave blank to show “Not disclosed”.">
                <input {...a11y('profit', 'wz-profit-hint')} inputMode="decimal" value={draft.profit} onChange={(e) => set('profit', e.target.value.trim())} />
                {err('profit')}
              </Field>
              <Field label="Profit metric">
                <select {...a11y('profitMetric')} value={draft.profitMetric} onChange={(e) => set('profitMetric', e.target.value)}>
                  <option value="">Not applicable</option>
                  {Object.entries(PROFIT_METRIC_LABEL).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
                {err('profitMetric')}
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.fields}>
            <fieldset className={f.choiceGroup} id="wz-identity" tabIndex={-1} aria-describedby={errors.identity ? 'wz-identity-error' : undefined}>
              <legend>Identity visibility</legend>
              <Choice name="identity" value="withheld" checked={draft.identity === 'withheld'} onChange={() => set('identity', 'withheld')} title="Withhold my identity" note="Buyers see the anonymous listing only." />
              <Choice name="identity" value="visible" checked={draft.identity === 'visible'} onChange={() => set('identity', 'visible')} title="Show business name to approved buyers" note="Only after you approve a specific request." />
              {err('identity')}
            </fieldset>
            <fieldset className={f.choiceGroup} id="wz-documentAccess" tabIndex={-1} aria-describedby={errors.documentAccess ? 'wz-documentAccess-error' : undefined}>
              <legend>Document access</legend>
              <Choice name="docs" value="approval" checked={draft.documentAccess === 'approval'} onChange={() => set('documentAccess', 'approval')} title="Approve each access request" note="Nothing is shared until you say yes." />
              <Choice name="docs" value="none" checked={draft.documentAccess === 'none'} onChange={() => set('documentAccess', 'none')} title="No documents for now" note="Buyers can only request an introduction." />
              {err('documentAccess')}
            </fieldset>
            <p className={styles.callout}>This demo does not accept document uploads.</p>
          </div>
        )}

        {step === 3 && (
          <div className={styles.review}>
            <p className={styles.reviewBadge} role="status">
              Demo draft — not published
            </p>
            <dl className={styles.reviewList}>
              <Item k="Category" v={draft.category} />
              <Item k="Listing title" v={draft.title} />
              <Item k="General location" v={draft.location} />
              <Item k="Website (private)" v={draft.website || 'Not provided'} />
              <Item k="Financial period" v={draft.period} />
              <Item k="Annual revenue" v={formatFullMoney(Number(draft.revenue), draft.currency) + ` ${draft.currency}`} />
              <Item k="Asking price" v={formatFullMoney(Number(draft.asking), draft.currency) + ` ${draft.currency}`} />
              <Item
                k="Profit"
                v={draft.profit ? `${formatFullMoney(Number(draft.profit), draft.currency)} ${draft.currency} (${PROFIT_METRIC_LABEL[draft.profitMetric as keyof typeof PROFIT_METRIC_LABEL]})` : 'Not disclosed'}
              />
              <Item k="Identity" v={draft.identity === 'withheld' ? 'Withheld' : 'Shown to approved buyers'} />
              <Item k="Documents" v={draft.documentAccess === 'approval' ? 'Approve each request' : 'No documents'} />
            </dl>
            <div className={styles.reviewActions}>
              <Button disabled aria-describedby="wz-publish-note">
                Publish listing
              </Button>
              <Button variant="secondary" onClick={exportDraft}>
                <Download aria-hidden="true" strokeWidth={1.75} style={{ width: 18, height: 18, display: 'inline', marginRight: 8, verticalAlign: '-3px' }} />
                Export draft (JSON)
              </Button>
            </div>
            <p id="wz-publish-note" className={styles.callout}>
              Publishing is unavailable in this demo. Production will require an account, ownership verification, review and an explicit publish confirmation.
            </p>
          </div>
        )}

        <div className={styles.nav}>
          {step > 0 && (
            <Button variant="secondary" onClick={back}>
              Back
            </Button>
          )}
          {step < STEPS.length - 1 && (
            <Button type="submit" arrow>
              {step === STEPS.length - 2 ? 'Review draft' : 'Next'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  // Children carry id="wz-<field>"; we derive the label target from the first child's id.
  const child = Array.isArray(children) ? children[0] : children;
  const id = (child as { props?: { id?: string } })?.props?.id;
  return (
    <div className={f.field}>
      <label htmlFor={id}>{label}</label>
      {hint && (
        <p id={`${id}-hint`} className={f.hint}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

function Choice({ name, value, checked, onChange, title, note }: { name: string; value: string; checked: boolean; onChange: () => void; title: string; note: string }) {
  return (
    <label className={f.choice}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span>
        {title}
        <small>{note}</small>
      </span>
    </label>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
