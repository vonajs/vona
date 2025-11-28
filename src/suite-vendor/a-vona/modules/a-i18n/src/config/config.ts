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

export interface I18nConfigTz {
  defaultTz?: string;
  queryField?: keyof ICustomKeyRecord;
  headerField?: keyof ICustomKeyRecord;
  cookieField?: string;
  writeCookie: boolean;
  cookieMaxAge: number;
  cookieDomain?: string;
}

export interface I18nConfig {
  locale: I18nConfigLocale;
  tz: I18nConfigTz;
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
    tz: {
      defaultTz: undefined,
      queryField: $customKey('x-vona-tz'),
      headerField: $customKey('x-vona-tz'),
      cookieField: 'tz',
      writeCookie: true,
      cookieMaxAge: 1 * 365 * 24 * 60 * 60 * 1000,
    },
  } as I18nConfig;
}
