/** beans: begin */
export * from '../bean/bean.markdown.js';
export * from '../bean/version.manager.js';
import { BeanMarkdown } from '../bean/bean.markdown.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    markdown: BeanMarkdown;
  }

  export interface IBeanRecordGeneral {
    'a-markdown.version.manager': VersionManager;
  }
}
/** beans: end */
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
export class ScopeModuleAMarkdown extends BeanScopeBase {}

export interface ScopeModuleAMarkdown
  extends TypeModuleResource<never, never, (typeof locales)[TypeLocaleBase], never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-markdown': ScopeModuleAMarkdown;
  }

  export interface IBeanScopeContainer {
    markdown: ScopeModuleAMarkdown;
  }

  export interface IBeanScopeLocale {
    'a-markdown': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-markdown:${K}` {
  return `a-markdown:${key}`;
}
/** scope: end */
