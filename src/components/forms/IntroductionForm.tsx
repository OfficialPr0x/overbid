'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, Info } from 'lucide-react';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { introduction } from '@/lib/content';
import { demoIntroductionService } from '@/lib/services/introduction';
import { validateIntroduction, type FieldErrors, type IntroductionField, type IntroductionInput, type IntroIntent } from '@/lib/validation';
import styles from './forms.module.css';

type Status = 'idle' | 'submitting' | 'demo' | 'error';

const FIELD_ORDER: IntroductionField[] = ['intent', 'name', 'email', 'website', 'message'];

export function IntroductionFormFromUrl() {
  const params = useSearchParams();
  const intent = params.get('intent');
  return <IntroductionForm key={intent ?? 'none'} initialIntent={intent === 'buyer' ? 'buyer' : 'seller'} />;
}

export function IntroductionForm({ initialIntent = 'seller' }: { initialIntent?: IntroIntent | '' }) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const [values, setValues] = useState<IntroductionInput>({ intent: initialIntent, name: '', email: '', website: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors<IntroductionField>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [started, setStarted] = useState(false);
  const inFlight = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === 'demo') resultRef.current?.focus();
  }, [status]);

  const set = <K extends keyof IntroductionInput>(k: K, v: IntroductionInput[K]) => {
    if (!started) setStarted(true);
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    if (status === 'demo') setStatus('idle');
  };

  const focusField = (f: IntroductionField) => {
    const el = formRef.current?.querySelector<HTMLElement>(f === 'intent' ? `[name="intent"]:checked, [name="intent"]` : `#${CSS.escape(id(f))}`);
    el?.focus();
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (inFlight.current) return;
    const found = validateIntroduction(values);
    setErrors(found);
    const first = FIELD_ORDER.find((f) => found[f]);
    if (first) {
      setStatus('idle');
      requestAnimationFrame(() => focusField(first));
      return;
    }
    inFlight.current = true;
    setStatus('submitting');
    try {
      const result = await demoIntroductionService.submit(values, crypto.randomUUID());
      if (result.kind === 'invalid') {
        setErrors(result.errors);
        setStatus('idle');
      } else if (result.kind === 'demo') {
        setStatus('demo');
      } else if (result.kind === 'error') {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  }

  const errorList = FIELD_ORDER.filter((f) => errors[f]);
  const describedBy = (f: IntroductionField, extra?: string) => [errors[f] ? id(`${f}-error`) : null, extra].filter(Boolean).join(' ') || undefined;

  return (
    <form ref={formRef} className={styles.form} noValidate onSubmit={onSubmit} aria-labelledby={id('title')} data-started={started || undefined}>
      <h3 id={id('title')} className="visually-hidden">
        Request a private introduction
      </h3>

      {errorList.length > 0 && (
        <div ref={summaryRef} className={styles.errorSummary} role="alert">
          <p className={styles.errorSummaryTitle}>
            <AlertCircle aria-hidden="true" strokeWidth={1.75} />
            Please fix {errorList.length === 1 ? 'this field' : `these ${errorList.length} fields`}:
          </p>
          <ul>
            {errorList.map((f) => (
              <li key={f}>
                <a
                  href={`#${f === 'intent' ? id('intent-seller') : id(f)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    focusField(f);
                  }}
                >
                  {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className={styles.segmented} aria-describedby={describedBy('intent')}>
        <legend className="visually-hidden">What would you like to do?</legend>
        {introduction.intents.map((opt) => (
          <label key={opt.value} className={styles.segment}>
            <input
              id={id(`intent-${opt.value}`)}
              type="radio"
              name="intent"
              value={opt.value}
              checked={values.intent === opt.value}
              onChange={() => set('intent', opt.value as IntroIntent)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </fieldset>
      {errors.intent && <FieldError id={id('intent-error')} message={errors.intent} />}

      <div className={styles.field}>
        <label htmlFor={id('name')}>{introduction.fields.name}</label>
        <input
          id={id('name')}
          name="name"
          autoComplete="name"
          maxLength={100}
          value={values.name}
          onChange={(e) => set('name', e.target.value)}
          aria-invalid={Boolean(errors.name) || undefined}
          aria-describedby={describedBy('name')}
          required
        />
        {errors.name && <FieldError id={id('name-error')} message={errors.name} />}
      </div>

      <div className={styles.field}>
        <label htmlFor={id('email')}>{introduction.fields.email}</label>
        <input
          id={id('email')}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          placeholder="name@company.com"
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
          aria-invalid={Boolean(errors.email) || undefined}
          aria-describedby={describedBy('email')}
          required
        />
        {errors.email && <FieldError id={id('email-error')} message={errors.email} />}
      </div>

      <div className={styles.field}>
        <label htmlFor={id('website')}>
          {introduction.fields.website} <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id={id('website')}
          name="website"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://example.com"
          value={values.website}
          onChange={(e) => set('website', e.target.value)}
          aria-invalid={Boolean(errors.website) || undefined}
          aria-describedby={describedBy('website')}
        />
        {errors.website && <FieldError id={id('website-error')} message={errors.website} />}
      </div>

      <div className={styles.field}>
        <label htmlFor={id('message')}>{introduction.fields.message}</label>
        <textarea
          id={id('message')}
          name="message"
          rows={4}
          maxLength={2000}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={Boolean(errors.message) || undefined}
          aria-describedby={describedBy('message', id('message-hint'))}
          required
        />
        <p id={id('message-hint')} className={styles.hint}>
          A short overview, 20–2,000 characters.
        </p>
        {errors.message && <FieldError id={id('message-error')} message={errors.message} />}
      </div>

      <Button type="submit" arrow block loading={status === 'submitting'} disabled={status === 'submitting'} data-event="introduction_started">
        {status === 'submitting' ? 'Checking your details…' : introduction.submit}
      </Button>

      <p className={styles.formNote}>
        {introduction.note}{' '}
        <Link href="/privacy">How we handle your information</Link>
      </p>

      <div aria-live="polite" className={styles.live}>
        {status === 'demo' && (
          <div ref={resultRef} tabIndex={-1} className={styles.demoResult}>
            <Info aria-hidden="true" strokeWidth={1.75} />
            <div>
              <p className={styles.demoTitle}>{introduction.demoResult}</p>
              <p>Your entries passed validation and are still in the form. No data left this browser; nothing was stored or emailed.</p>
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className={styles.errorResult} role="alert">
            <AlertCircle aria-hidden="true" strokeWidth={1.75} />
            <p>Something went wrong. Your entries are still here — please try again.</p>
          </div>
        )}
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className={styles.error}>
      <AlertCircle aria-hidden="true" strokeWidth={1.75} />
      <span>
        <span className="visually-hidden">Error: </span>
        {message}
      </span>
    </p>
  );
}
