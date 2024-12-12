/** services: begin */
export * from '../service/redlock.js';
import { ServiceRedlock } from '../service/redlock.js';
export interface IModuleService {
  redlock: ServiceRedlock;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-redlock.service.redlock': ServiceRedlock;
  }
}
declare module 'vona-module-a-redlock' {
  export interface ServiceRedlock {
    get scope(): ScopeModuleARedlock;
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
export class ScopeModuleARedlock extends BeanScopeBase {}

export interface ScopeModuleARedlock {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  service: IModuleService;
  atom: IModuleatom;
  middleware: IModulemiddleware;
  guard: IModuleguard;
  interceptor: IModuleinterceptor;
  pipe: IModulepipe;
  filter: IModulefilter;
  socketConnection: IModulesocketConnection;
  socketPacket: IModulesocketPacket;
  aop: IModuleaop;
  entity: IModuleentity;
  model: IModulemodel;
  controller: IModulecontroller;
  meta: IModulemeta;
  summerCache: IModulesummerCache;
  startup: IModulestartup;
  queue: IModulequeue;
  schedule: IModuleschedule;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-redlock': ScopeModuleARedlock;
  }

  export interface IBeanScopeContainer {
    redlock: ScopeModuleARedlock;
  }

  export interface IBeanScopeConfig {
    'a-redlock': ReturnType<typeof config>;
  }
}

/** scope: end */
