import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAFlowgateway extends BeanScopeBase {}

export interface ScopeModuleAFlowgateway
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
    'a-flowgateway': ScopeModuleAFlowgateway;
  }

  export interface IBeanScopeConfig {
    'a-flowgateway': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-flowgateway': typeof locales[TypeLocaleBase];
  }
}
