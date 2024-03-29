import { getText } from './util.js';

export * from './util.js';

export function getLocaleText(locales: Record<string, object>, locale: string, key: string, ...args: any[]): string {
  if (!key) return '';
  // try locale
  let resource = locales[locale] || {};
  let text = resource[key];
  if (text === undefined && locale !== 'en-us') {
    // try en-us
    resource = locales['en-us'] || {};
    text = resource[key];
  }
  // equal key
  if (text === undefined) {
    text = key;
  }
  // format
  return getText(text, ...args);
}
