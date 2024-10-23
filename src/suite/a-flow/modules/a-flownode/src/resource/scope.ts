import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAFlownode extends BeanScopeBase {}

export interface ScopeModuleAFlownode
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
    'a-flownode': ScopeModuleAFlownode;
  }

  export interface IBeanScopeConfig {
    'a-flownode': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-flownode': (typeof locales)[TypeLocaleBase];
  }
}
