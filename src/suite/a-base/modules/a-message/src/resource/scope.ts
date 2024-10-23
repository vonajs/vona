import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAMessage extends BeanScopeBase {}

export interface ScopeModuleAMessage
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
    'a-message': ScopeModuleAMessage;
  }

  export interface IBeanScopeConfig {
    'a-message': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-message': (typeof locales)[TypeLocaleBase];
  }
}
