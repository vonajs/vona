import type z from 'zod';
import type { ILocaleInfos } from '../bean/resource/locale/type.ts';
import type { VonaApplication } from '../core/application.ts';
import { setLocaleAdapter, setLocaleErrors, translateError } from '@cabloy/zod-errors-custom';
import { ZodMetadata } from '@cabloy/zod-openapi';
import { setParseAdapter } from '@cabloy/zod-query';

export type ZodLocaleError = () => { localeError: z.core.$ZodErrorMap };
export type ZodLocaleErrors = Record<keyof ILocaleInfos, ZodLocaleError>;

export function zodEnhance(app: VonaApplication) {
  setLocaleAdapter((text: string, iss?: object) => {
    return translateError((text: string, ...args: any[]) => {
      return app.meta.text(text, ...args);
    }, text, iss);
  });
  setParseAdapter(ZodMetadata);
}

export function zodSetLocaleErrors(app: VonaApplication, localeErrors: ZodLocaleErrors, localeDefault?: string) {
  setLocaleErrors(() => {
    return app.meta.locale.current;
  }, localeErrors, localeDefault);
}
