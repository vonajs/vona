import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleService } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAMarkdownblock extends BeanScopeBase {}

export interface ScopeModuleAMarkdownblock
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
    'a-markdownblock': ScopeModuleAMarkdownblock;
  }

  export interface IBeanScopeConfig {
    'a-markdownblock': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-markdownblock': (typeof locales)[TypeLocaleBase];
  }
}
