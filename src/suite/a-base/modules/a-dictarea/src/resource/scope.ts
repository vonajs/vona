import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleADictarea extends BeanScopeBase {}

export interface ScopeModuleADictarea
  extends TypeModuleResource<
    IModuleService,
    IModuleModel,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-dictarea': ScopeModuleADictarea;
  }

  export interface IBeanScopeConfig {
    'a-dictarea': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-dictarea': (typeof locales)[TypeLocaleBase];
  }
}
