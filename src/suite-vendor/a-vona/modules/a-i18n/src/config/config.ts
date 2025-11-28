import type { ICustomKeyRecord, ILocaleRecord, VonaApplication } from 'vona';
import { $customKey } from 'vona';

export interface I18nConfigLocale {
  defaultLocale: keyof ILocaleRecord;
  queryField?: keyof ICustomKeyRecord;
  headerField?: keyof ICustomKeyRecord;
  cookieField?: string;
  localeAlias: any;
  writeCookie: boolean;
  cookieMaxAge: number;
  cookieDomain?: string;
}

export interface I18nConfig {
  locale: I18nConfigLocale;
}

export function config(_app: VonaApplication) {
  return {
    locale: {
      defaultLocale: 'en-us',
      queryField: $customKey('x-vona-locale'),
      headerField: $customKey('x-vona-locale'),
      cookieField: 'locale',
      localeAlias: {},
      writeCookie: true,
      cookieMaxAge: 1 * 365 * 24 * 60 * 60 * 1000,
    },
  } as I18nConfig;
}
