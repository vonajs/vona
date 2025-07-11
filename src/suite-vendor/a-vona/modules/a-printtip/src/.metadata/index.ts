/* eslint-disable */
/** startup: begin */
export * from '../bean/startup.printTip.ts';

import { type IDecoratorStartupOptions } from 'vona-module-a-startup';
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

          export interface StartupPrintTip {
            get $beanFullName(): 'a-printtip.startup.printTip';
            get $onionName(): 'a-printtip:printTip';
          } 
}
/** startup: end */
/** config: begin */
export * from '../config/config.ts';
import type { config } from '../config/config.ts';
/** config: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAPrinttip extends BeanScopeBase {}

export interface ScopeModuleAPrinttip {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
}

import 'vona';
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
