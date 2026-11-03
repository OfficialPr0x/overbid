import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'text';

interface Common {
  variant?: Variant;
  arrow?: boolean;
  block?: boolean;
  size?: 'md' | 'sm';
  children: ReactNode;
  className?: string;
}

function classes({ variant = 'primary', block, size = 'md', className }: Omit<Common, 'children'>) {
  return [styles.button, styles[variant], size === 'sm' && styles.sm, block && styles.block, className]
    .filter(Boolean)
    .join(' ');
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className={styles.label}>{children}</span>
      {arrow && <ArrowUpRight className={styles.arrow} aria-hidden="true" strokeWidth={1.75} />}
    </>
  );
}

export function ButtonLink({
  href,
  variant,
  arrow,
  block,
  size,
  children,
  className,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, 'className' | 'children'>) {
  return (
    <Link href={href} className={classes({ variant, block, size, className })} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant,
  arrow,
  block,
  size,
  children,
  className,
  loading,
  type = 'button',
  ...rest
}: Common & { loading?: boolean } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>) {
  return (
    <button
      type={type}
      className={classes({ variant, block, size, className })}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      <Inner arrow={arrow && !loading}>{children}</Inner>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
    </button>
  );
}
