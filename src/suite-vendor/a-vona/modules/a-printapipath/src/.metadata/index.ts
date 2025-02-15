/** startup: end */
/** scope: begin */
import type { BeanScopeUtil } from 'vona';
/** startup: begin */
import type { IDecoratorStartupOptions } from 'vona-module-a-startup';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

export * from '../bean/startup.printApiPath.js';
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

@Scope()
export class ScopeModuleAPrintapipath extends BeanScopeBase {}

export interface ScopeModuleAPrintapipath {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-printapipath': ScopeModuleAPrintapipath;
  }

  export interface IBeanScopeContainer {
    printapipath: ScopeModuleAPrintapipath;
  }
}

/** scope: end */
