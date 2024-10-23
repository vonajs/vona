import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleTestFlow extends BeanScopeBase {}

export interface ScopeModuleTestFlow
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
    'test-flow': ScopeModuleTestFlow;
  }

  export interface IBeanScopeConfig {
    'test-flow': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'test-flow': (typeof locales)[TypeLocaleBase];
  }
}
