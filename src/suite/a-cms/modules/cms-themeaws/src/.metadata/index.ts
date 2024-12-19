/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleCmsThemeaws extends BeanScopeBase {}

export interface ScopeModuleCmsThemeaws {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

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
