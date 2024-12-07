/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleCmsThemeaws extends BeanScopeBase {}

export interface ScopeModuleCmsThemeaws
  extends TypeModuleResource<typeof config, never, never, never, never, never, never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'cms-themeaws': ScopeModuleCmsThemeaws;
  }

  export interface IBeanScopeContainer {
    cmsThemeaws: ScopeModuleCmsThemeaws;
  }

  export interface IBeanScopeConfig {
    'cms-themeaws': ReturnType<typeof config>;
  }
}

/** scope: end */
