import type { BeanScopeUtil, TypeModuleConfig } from 'vona';
/** startup: begin */
import type { IDecoratorStartupOptions } from 'vona-module-a-startup';
import type { config } from '../config/config.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

export * from '../bean/startup.printTip.ts';
declare module 'vona-module-a-startup' {

  export interface IStartupRecord {
    'a-printtip:printTip': IDecoratorStartupOptions;
  }

}
declare module 'vona-module-a-printtip' {

  export interface StartupPrintTip {
    /** @internal */
    get scope(): ScopeModuleAPrinttip;
  }
}
/** startup: end */
/** config: begin */
export * from '../config/config.ts';

@Scope()
export class ScopeModuleAPrinttip extends BeanScopeBase {}

export interface ScopeModuleAPrinttip {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-printtip': ScopeModuleAPrinttip;
  }

  export interface IBeanScopeContainer {
    printtip: ScopeModuleAPrinttip;
  }

  export interface IBeanScopeConfig {
    'a-printtip': ReturnType<typeof config>;
  }

}

/** scope: end */
