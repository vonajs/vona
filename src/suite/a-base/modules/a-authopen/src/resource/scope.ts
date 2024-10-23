import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAAuthopen extends BeanScopeBase {}

export interface ScopeModuleAAuthopen
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
    'a-authopen': ScopeModuleAAuthopen;
  }

  export interface IBeanScopeConfig {
    'a-authopen': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-authopen': (typeof locales)[TypeLocaleBase];
  }
}
