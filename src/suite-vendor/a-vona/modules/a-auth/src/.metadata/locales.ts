import type { TypeLocaleBase } from 'vona';
import locale_en_us from '../config/locale/en-us.ts';
import locale_zh_cn from '../config/locale/zh-cn.ts';

export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-auth::${K}` {
  return `a-auth::${key}`;
}
