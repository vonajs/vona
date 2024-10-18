import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAPinyin extends BeanScopeBase {}

export interface ScopeModuleAPinyin
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-pinyin': ScopeModuleAPinyin;
  }

  export interface IBeanScopeConfig {
    'a-pinyin': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-pinyin': typeof locales[TypeLocaleBase];
  }
}
