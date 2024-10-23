import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleACodemirror extends BeanScopeBase {}

export interface ScopeModuleACodemirror
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
    'a-codemirror': ScopeModuleACodemirror;
  }

  export interface IBeanScopeConfig {
    'a-codemirror': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-codemirror': (typeof locales)[TypeLocaleBase];
  }
}
