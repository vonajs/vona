/** beans: begin */
export * from '../bean/bean.executor.js';
import { BeanExecutor } from '../bean/bean.executor.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    executor: BeanExecutor;
  }

  export interface IBeanRecordGeneral {}
}
/** beans: end */
/** middleware: begin */
export * from '../bean/middleware.development.js';
export * from '../bean/middleware.gate.js';
import { IMiddlewareOptionsDevelopment } from '../bean/middleware.development.js';
import { IMiddlewareOptionsGate } from '../bean/middleware.gate.js';
import 'vona';
declare module 'vona' {
  export interface IMiddlewareRecordGlobal {
    'a-core:gate': IMiddlewareOptionsGate;
  }

  export interface IMiddlewareRecordLocal {
    'a-core:development': IMiddlewareOptionsDevelopment;
  }
}
/** middleware: end */
/** guard: begin */
export * from '../bean/guard.user.js';
import { IGuardOptionsUser } from '../bean/guard.user.js';
import 'vona';
declare module 'vona' {
  export interface IGuardRecordGlobal {
    'a-core:user': IGuardOptionsUser;
  }
}
/** guard: end */
/** interceptor: begin */
export * from '../bean/interceptor.body.js';
import { IInterceptorOptionsBody } from '../bean/interceptor.body.js';
import 'vona';
declare module 'vona' {
  export interface IInterceptorRecordGlobal {
    'a-core:body': IInterceptorOptionsBody;
  }
}
/** interceptor: end */
/** filter: begin */
export * from '../bean/filter.error.js';
import { IFilterOptionsError } from '../bean/filter.error.js';
import 'vona';
declare module 'vona' {
  export interface IFilterRecordGlobal {
    'a-core:error': IFilterOptionsError;
  }
}
/** filter: end */
/** services: begin */
export * from '../service/startup.js';
import { ServiceStartup } from '../service/startup.js';
export interface IModuleService {
  startup: ServiceStartup;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-core.service.startup': ServiceStartup;
  }
}
/** services: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';

@Scope()
export class ScopeModuleACore extends BeanScopeBase {}

export interface ScopeModuleACore {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
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
