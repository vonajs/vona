import type { BeanScopeUtil } from 'vona';
/** meta: end */
/** meta static: begin */
import type { MetaStatic } from '../bean/meta.static.ts';
/** middlewareSystem: end */
/** meta: begin */
import type { IMiddlewareOptionsDevelopment } from '../bean/middleware.development.ts';
import type { IMiddlewareOptionsGate } from '../bean/middleware.gate.ts';
import type { IMiddlewareSystemOptionsNotfound } from '../bean/middlewareSystem.notfound.ts';
import type { IMiddlewareSystemOptionsOverrideMethod } from '../bean/middlewareSystem.overrideMethod.ts';

/** meta static: end */
/** scope: begin */
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';
import 'vona';
import 'vona';
import 'vona';

import 'vona';

export * from '../bean/meta.static.ts';
/** middleware: begin */
export * from '../bean/middleware.development.ts';
declare module 'vona-module-a-aspect' {

  export interface IMiddlewareRecordGlobal {
    'a-core:gate': IMiddlewareOptionsGate;
  }

  export interface IMiddlewareRecordLocal {
    'a-core:development': IMiddlewareOptionsDevelopment;
  }

}
declare module 'vona-module-a-core' {

  export interface MiddlewareDevelopment {
    /** @internal */
    get scope(): ScopeModuleACore;
  }

  export interface MiddlewareGate {
    /** @internal */
    get scope(): ScopeModuleACore;
  }
}
export * from '../bean/middleware.gate.ts';
/** middleware: end */
/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.notfound.ts';
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

  export interface MiddlewareSystemOverrideMethod {
    /** @internal */
    get scope(): ScopeModuleACore;
  }
}
export * from '../bean/middlewareSystem.overrideMethod.ts';
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
}

@Scope()
export class ScopeModuleACore extends BeanScopeBase {}

export interface ScopeModuleACore {
  util: BeanScopeUtil;
  static: MetaStatic;
}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-core': ScopeModuleACore;
  }

  export interface IBeanScopeContainer {
    core: ScopeModuleACore;
  }

}

/** scope: end */
