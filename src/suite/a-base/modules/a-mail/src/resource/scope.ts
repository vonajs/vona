import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAMail extends BeanScopeBase {}

export interface ScopeModuleAMail
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
    'a-mail': ScopeModuleAMail;
  }

  export interface IBeanScopeConfig {
    'a-mail': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-mail': typeof locales[TypeLocaleBase];
  }
}
