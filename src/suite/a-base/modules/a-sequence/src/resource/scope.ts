import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleASequence extends BeanScopeBase {}

export interface ScopeModuleASequence
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
    'a-sequence': ScopeModuleASequence;
  }

  export interface IBeanScopeConfig {
    'a-sequence': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-sequence': typeof locales[TypeLocaleBase];
  }
}
