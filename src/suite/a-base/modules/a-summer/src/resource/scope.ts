import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleASummer extends BeanScopeBase {}

export interface ScopeModuleASummer
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales[TypeLocaleBase],
    typeof constants
  > {}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-summer': ScopeModuleASummer;
  }

  export interface IBeanScopeConfig {
    'a-summer': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-summer': typeof locales[TypeLocaleBase];
  }
}
