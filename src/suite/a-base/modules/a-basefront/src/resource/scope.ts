import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleABasefront extends BeanScopeBase {}

export interface ScopeModuleABasefront
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
    'a-basefront': ScopeModuleABasefront;
  }

  export interface IBeanScopeConfig {
    'a-basefront': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-basefront': (typeof locales)[TypeLocaleBase];
  }
}
