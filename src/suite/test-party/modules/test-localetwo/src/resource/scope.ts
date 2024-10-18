import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleTestLocaletwo extends BeanScopeBase {}

export interface ScopeModuleTestLocaletwo
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
    'test-localetwo': ScopeModuleTestLocaletwo;
  }

  export interface IBeanScopeConfig {
    'test-localetwo': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'test-localetwo': typeof locales[TypeLocaleBase];
  }
}
