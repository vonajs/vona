export const LocaleModuleNameSeparator = '::';

export interface IModuleLocale {
  (...args: any[]): string;
  locale: <T extends keyof ILocaleInfoRecord>(locale: T, ...args: any[]) => string;
}

export interface IModuleLocaleText {
  (text: string, ...args: any[]): string;
  locale: <T extends keyof ILocaleInfoRecord>(locale: T, text: string, ...args: any[]) => string;
}

export type TypeModuleLocales<T> = {
  [prop in keyof T]: IModuleLocale;
};

export type TypeLocaleBase = 'en-us';

export interface ILocaleInfoRecord {
  'en-us': never;
  'zh-cn': never;
}
