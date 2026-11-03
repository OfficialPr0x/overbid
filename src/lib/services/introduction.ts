import { validateIntroduction, type FieldErrors, type IntroductionField, type IntroductionInput } from '../validation';

export type IntroductionResult =
  | { kind: 'demo' }
  | { kind: 'accepted'; receiptId: string }
  | { kind: 'invalid'; errors: FieldErrors<IntroductionField> }
  | { kind: 'error'; message: string };

export interface IntroductionService {
  readonly mode: 'demo' | 'production';
  submit(input: IntroductionInput, requestId: string): Promise<IntroductionResult>;
}

/**
 * Demo adapter: validates, then reports that nothing was sent. It never returns `accepted`.
 * A production adapter must POST to /api/introduction and return `accepted` only with a durable receipt.
 */
export const demoIntroductionService: IntroductionService = {
  mode: 'demo',
  async submit(input) {
    const errors = validateIntroduction(input);
    if (Object.keys(errors).length) return { kind: 'invalid', errors };
    await new Promise((r) => setTimeout(r, 450));
    return { kind: 'demo' };
  },
};
