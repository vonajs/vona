import type { LocaleAdapterFn, LocaleCurrentAdapterFn, ZodLocaleErrors, ZodLocaleErrorsInstance } from './utils.ts';
import { cast } from 'vona';
import { z } from 'zod';

export function setLocaleAdapter(localeAdapterFn: LocaleAdapterFn) {
  cast(z.util).setLocaleAdapter(localeAdapterFn);
}

export function setLocaleErrors(localeCurrentAdapterFn: LocaleCurrentAdapterFn, localeErrors: ZodLocaleErrors, localeDefault: string = 'en-us') {
  const localeErrorsInstance: ZodLocaleErrorsInstance = {};
  function getLocalErrorInstance(locale: string) {
    if (!localeErrorsInstance[locale]) {
      localeErrorsInstance[locale] = localeErrors[locale]().localeError;
    }
    return localeErrorsInstance[locale];
  }
  z.config({
    localeError(issue) {
      const localeCurrent = localeCurrentAdapterFn();
      if (localeErrors[localeCurrent]) return getLocalErrorInstance(localeCurrent)(issue);
      if (localeCurrent !== localeDefault && localeErrors[localeDefault]) return getLocalErrorInstance(localeDefault)(issue);
    },
  });
}
