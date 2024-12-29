/** startup: begin */
export * from '../bean/startup.printApiPath.js';

import { IDecoratorStartupOptions } from 'vona-module-a-startup';
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
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAPrintapipath extends BeanScopeBase {}

export interface ScopeModuleAPrintapipath {
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-printapipath': ScopeModuleAPrintapipath;
  }

  export interface IBeanScopeContainer {
    printapipath: ScopeModuleAPrintapipath;
  }
}

/** scope: end */
