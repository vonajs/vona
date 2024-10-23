import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleALayoutpc extends BeanScopeBase {}

export interface ScopeModuleALayoutpc
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
    'a-layoutpc': ScopeModuleALayoutpc;
  }

  export interface IBeanScopeConfig {
    'a-layoutpc': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-layoutpc': (typeof locales)[TypeLocaleBase];
  }
}
