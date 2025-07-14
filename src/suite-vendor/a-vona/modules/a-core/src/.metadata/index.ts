/* eslint-disable */
/** middleware: begin */
export * from '../bean/middleware.gate.ts';
import type { IMiddlewareOptionsGate } from '../bean/middleware.gate.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IMiddlewareRecordGlobal {
      'a-core:gate': IMiddlewareOptionsGate;
    }

  
}
declare module 'vona-module-a-core' {
  
        export interface MiddlewareGate {
          /** @internal */
          get scope(): ScopeModuleACore;
        }

          export interface MiddlewareGate {
            get $beanFullName(): 'a-core.middleware.gate';
            get $onionName(): 'a-core:gate';
          } 
}
/** middleware: end */
/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.notfound.ts';
export * from '../bean/middlewareSystem.overrideMethod.ts';
import type { IMiddlewareSystemOptionsNotfound } from '../bean/middlewareSystem.notfound.ts';
import type { IMiddlewareSystemOptionsOverrideMethod } from '../bean/middlewareSystem.overrideMethod.ts';
import 'vona';
declare module 'vona-module-a-aspect' {
  
    export interface IMiddlewareSystemRecord {
      'a-core:notfound': IMiddlewareSystemOptionsNotfound;
'a-core:overrideMethod': IMiddlewareSystemOptionsOverrideMethod;
    }

  
}
declare module 'vona-module-a-core' {
  
        export interface MiddlewareSystemNotfound {
          /** @internal */
          get scope(): ScopeModuleACore;
        }

          export interface MiddlewareSystemNotfound {
            get $beanFullName(): 'a-core.middlewareSystem.notfound';
            get $onionName(): 'a-core:notfound';
          }

        export interface MiddlewareSystemOverrideMethod {
          /** @internal */
          get scope(): ScopeModuleACore;
        }

          export interface MiddlewareSystemOverrideMethod {
            get $beanFullName(): 'a-core.middlewareSystem.overrideMethod';
            get $onionName(): 'a-core:overrideMethod';
          } 
}
/** middlewareSystem: end */
/** meta: begin */
export * from '../bean/meta.static.ts';

import 'vona';
declare module 'vona' {
  
    export interface IMetaRecord {
      'a-core:static': never;
    }

  
}
declare module 'vona-module-a-core' {
  
        export interface MetaStatic {
          /** @internal */
          get scope(): ScopeModuleACore;
        }

          export interface MetaStatic {
            get $beanFullName(): 'a-core.meta.static';
            get $onionName(): 'a-core:static';
          } 
}
/** meta: end */
/** meta static: begin */
import type { MetaStatic } from '../bean/meta.static.ts';
/** meta static: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACore extends BeanScopeBase {}

export interface ScopeModuleACore {
  util: BeanScopeUtil;
static: MetaStatic;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-core': ScopeModuleACore;
  }

  export interface IBeanScopeContainer {
    core: ScopeModuleACore;
  }
  
  

  
}

/** scope: end */
