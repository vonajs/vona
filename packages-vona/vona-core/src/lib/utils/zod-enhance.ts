import type { ILocaleInfos } from 'vona';
import type z from 'zod';
import type { VonaApplication } from '../core/application.ts';
import { setLocaleAdapter, setLocaleErrors } from '@cabloy/zod-errors-custom';

export type ZodLocaleError = () => { localeError: z.core.$ZodErrorMap };
export type ZodLocaleErrors = Record<keyof ILocaleInfos, ZodLocaleError>;

export function zodEnhance(app: VonaApplication) {
  setLocaleAdapter((text: string, ...args: any[]) => {
    return app.meta.text(text, ...args);
  });
}

export function zodSetLocaleErrors(app: VonaApplication, localeErrors: ZodLocaleErrors, localeDefault?: string) {
  setLocaleErrors(() => {
    return app.meta.locale.locale;
  }, localeErrors, localeDefault);
}
