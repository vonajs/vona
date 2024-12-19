/** filter: begin */
export * from '../bean/filter.error.js';
import { IFilterOptionsError } from '../bean/filter.error.js';
import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IFilterRecordGlobal {
    'a-core:error': IFilterOptionsError;
  }
}
declare module 'vona-module-a-core' {
  export interface FilterError {
    /** @internal */
    get scope(): ScopeModuleACore;
  }
}
/** filter: end */
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
/** guard: begin */
export * from '../bean/guard.user.js';
import { IGuardOptionsUser } from '../bean/guard.user.js';
import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IGuardRecordGlobal {
    'a-core:user': IGuardOptionsUser;
  }
}
declare module 'vona-module-a-core' {
  export interface GuardUser {
    /** @internal */
    get scope(): ScopeModuleACore;
  }
}
/** guard: end */
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
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACore extends BeanScopeBase {}

export interface ScopeModuleACore {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-core': ScopeModuleACore;
  }

  export interface IBeanScopeContainer {
    core: ScopeModuleACore;
  }

  export interface IBeanScopeConfig {
    'a-core': ReturnType<typeof config>;
  }
}

/** scope: end */
