import type { ILocaleInfos, VonaApplication } from 'vona';

export interface I18nConfig {
  defaultLocale: keyof ILocaleInfos;
  queryField: string;
  headerField: string;
  localeAlias: any;
  writeCookie: boolean;
  cookieMaxAge: number;
  cookieDomain?: string;
}

export function config(_app: VonaApplication) {
  return {
    i18n: {
      defaultLocale: 'en-us',
      queryField: 'x-vona-locale',
      headerField: 'x-vona-locale',
      localeAlias: {},
      writeCookie: true,
      cookieMaxAge: 1 * 365 * 24 * 60 * 60 * 1000,
    } as I18nConfig,
  };
}
