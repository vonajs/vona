import type { TypeModuleConfig } from 'vona';
/** startup: begin */
import type { IDecoratorStartupOptions } from 'vona-module-a-startup';
/** config: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';
import { config } from '../config/config.ts';

import 'vona';

export * from '../bean/startup.printApiPath.ts';
declare module 'vona-module-a-startup' {

  export interface IStartupRecord {
    'a-printapipath:printApiPath': IDecoratorStartupOptions;
  }

}
declare module 'vona-module-a-printapipath' {

  export interface StartupPrintApiPath {
    /** @internal */
    get scope(): ScopeModuleAPrintapipath;
  }
}
/** startup: end */
/** config: begin */
export * from '../config/config.ts';

@Scope()
export class ScopeModuleAPrintapipath extends BeanScopeBase {}

export interface ScopeModuleAPrintapipath {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-printapipath': ScopeModuleAPrintapipath;
  }

  export interface IBeanScopeContainer {
    printapipath: ScopeModuleAPrintapipath;
  }

  export interface IBeanScopeConfig {
    'a-printapipath': ReturnType<typeof config>;
  }

}

/** scope: end */
