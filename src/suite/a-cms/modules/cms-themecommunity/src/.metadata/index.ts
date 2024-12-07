/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
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
export class ScopeModuleCmsThemecommunity extends BeanScopeBase {}

export interface ScopeModuleCmsThemecommunity
  extends TypeModuleResource<
    typeof config,
    never,
    (typeof locales)[TypeLocaleBase],
    never,
    never,
    never,
    never,
    never,
    never
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-themecommunity': ScopeModuleCmsThemecommunity;
  }

  export interface IBeanScopeContainer {
    cmsThemecommunity: ScopeModuleCmsThemecommunity;
  }

  export interface IBeanScopeConfig {
    'cms-themecommunity': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'cms-themecommunity': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `cms-themecommunity:${K}` {
  return `cms-themecommunity:${key}`;
}
/** scope: end */
