import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAFlowchart extends BeanScopeBase {}

export interface ScopeModuleAFlowchart
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
    'a-flowchart': ScopeModuleAFlowchart;
  }

  export interface IBeanScopeConfig {
    'a-flowchart': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-flowchart': typeof locales[TypeLocaleBase];
  }
}
