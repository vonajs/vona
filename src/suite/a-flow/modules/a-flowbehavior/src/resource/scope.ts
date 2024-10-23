import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAFlowbehavior extends BeanScopeBase {}

export interface ScopeModuleAFlowbehavior
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
    'a-flowbehavior': ScopeModuleAFlowbehavior;
  }

  export interface IBeanScopeConfig {
    'a-flowbehavior': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-flowbehavior': (typeof locales)[TypeLocaleBase];
  }
}
