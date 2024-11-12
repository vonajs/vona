import { getText } from './util.js';

export * from './util.js';

export function getLocaleText(
  locales1: Record<string, object> | undefined,
  locales2: Record<string, object> | undefined,
  locale: string,
  key: string,
  ...args: any[]
): string {
  if (!key) return '';
  // try locale
  let text = locales1?.[locale]?.[key] ?? locales2?.[locale]?.[key];
  if (text === undefined && locale !== 'en-us') {
    // try en-us
    text = locales1?.['en-us']?.[key] ?? locales2?.['en-us']?.[key];
  }
  // equal key
  if (text === undefined) {
    text = key;
  }
  // support custom message
  if (!text.replaceAll('%%', '').includes('%') && args[0]) {
    return getText(...args);
  }
  // format
  return getText(text, ...args);
}

export function formatLocale(locale) {
  // support zh_CN, en_US => zh-CN, en-US
  return locale.replace('_', '-').toLowerCase();
}
