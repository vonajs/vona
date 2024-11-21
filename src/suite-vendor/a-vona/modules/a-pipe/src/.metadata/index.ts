/** pipes: begin */
export * from '../bean/pipe.parseInt.js';
import { IPipeOptionsParseInt } from '../bean/pipe.parseInt.js';
import 'vona';
declare module 'vona' {
  export interface IPipeRecordLocal {
    'a-pipe:parseInt': IPipeOptionsParseInt;
  }
}
/** pipes: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAPipe extends BeanScopeBase {}

export interface ScopeModuleAPipe
  extends TypeModuleResource<never, never, (typeof locales)[TypeLocaleBase], never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-pipe': ScopeModuleAPipe;
  }

  export interface IBeanScopeContainer {
    pipe: ScopeModuleAPipe;
  }

  export interface IBeanScopeLocale {
    'a-pipe': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): K {
  return key;
}
/** scope: end */
