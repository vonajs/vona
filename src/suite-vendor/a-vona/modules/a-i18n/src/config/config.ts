import { ILocalInfos, VonaApplication } from 'vona';

export interface I18nConfig {
  defaultLocale: keyof ILocalInfos;
  queryField: string;
  cookieField: string;
  localeAlias: any;
  writeCookie: boolean;
  cookieMaxAge: string;
}

export const config = (_app: VonaApplication) => {
  return {
    i18n: {
      defaultLocale: 'en-us',
      queryField: 'locale',
      cookieField: 'locale',
      localeAlias: {},
      writeCookie: true,
      cookieMaxAge: '1y',
    } as I18nConfig,
  };
};
