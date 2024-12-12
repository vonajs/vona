/** beans: begin */
export * from '../bean/bean.event.js';
import { BeanEvent } from '../bean/bean.event.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    event: BeanEvent;
  }

  export interface IBeanRecordGeneral {}
}
declare module 'vona-module-a-event' {
  export interface BeanEvent {
    get scope(): ScopeModuleAEvent;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAEvent extends BeanScopeBase {}

export interface ScopeModuleAEvent {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
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
    'a-event': ScopeModuleAEvent;
  }

  export interface IBeanScopeContainer {
    event: ScopeModuleAEvent;
  }
}

/** scope: end */
