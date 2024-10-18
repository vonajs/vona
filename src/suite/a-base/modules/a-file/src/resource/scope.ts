import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAFile extends BeanScopeBase {}

export interface ScopeModuleAFile
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
    'a-file': ScopeModuleAFile;
  }

  export interface IBeanScopeConfig {
    'a-file': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-file': typeof locales[TypeLocaleBase];
  }
}
