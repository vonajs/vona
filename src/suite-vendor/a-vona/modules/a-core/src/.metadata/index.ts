/** interceptor: begin */
export * from '../bean/interceptor.body.js';
import { IInterceptorOptionsBody } from '../bean/interceptor.body.js';
import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IInterceptorRecordGlobal {
    'a-core:body': IInterceptorOptionsBody;
  }
}
declare module 'vona-module-a-core' {
  export interface InterceptorBody {
    /** @internal */
    get scope(): ScopeModuleACore;
  }
}
/** interceptor: end */
/** middleware: begin */
export * from '../bean/middleware.development.js';
export * from '../bean/middleware.gate.js';
import { IMiddlewareOptionsDevelopment } from '../bean/middleware.development.js';
import { IMiddlewareOptionsGate } from '../bean/middleware.gate.js';
import 'vona';
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
/** middleware: end */
/** middlewareSystem: begin */
export * from '../bean/middlewareSystem.bodyparser.js';
export * from '../bean/middlewareSystem.meta.js';
export * from '../bean/middlewareSystem.notfound.js';
export * from '../bean/middlewareSystem.overrideMethod.js';
import { IMiddlewareSystemOptionsBodyparser } from '../bean/middlewareSystem.bodyparser.js';
import { IMiddlewareSystemOptionsMeta } from '../bean/middlewareSystem.meta.js';
import { IMiddlewareSystemOptionsNotfound } from '../bean/middlewareSystem.notfound.js';
import { IMiddlewareSystemOptionsOverrideMethod } from '../bean/middlewareSystem.overrideMethod.js';
import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IMiddlewareSystemRecord {
    'a-core:bodyparser': IMiddlewareSystemOptionsBodyparser;
    'a-core:meta': IMiddlewareSystemOptionsMeta;
    'a-core:notfound': IMiddlewareSystemOptionsNotfound;
    'a-core:overrideMethod': IMiddlewareSystemOptionsOverrideMethod;
  }
}
declare module 'vona-module-a-core' {
  export interface MiddlewareSystemBodyparser {
    /** @internal */
    get scope(): ScopeModuleACore;
  }

  export interface MiddlewareSystemMeta {
    /** @internal */
    get scope(): ScopeModuleACore;
  }

  export interface MiddlewareSystemNotfound {
    /** @internal */
    get scope(): ScopeModuleACore;
  }

  export interface MiddlewareSystemOverrideMethod {
    /** @internal */
    get scope(): ScopeModuleACore;
  }
}
/** middlewareSystem: end */
/** meta: begin */
export * from '../bean/meta.static.js';

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
}
/** meta: end */
/** meta static: begin */
import { MetaStatic } from '../bean/meta.static.js';
/** meta static: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'vona';
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
