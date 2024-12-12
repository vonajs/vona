/** controller: begin */
export * from '../controller/monkeyer.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'test-partymonkey:monkeyer': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-test-partymonkey' {
  export interface ControllerMonkeyer {
    get scope(): ScopeModuleTestPartymonkey;
  }
}
/** controller: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleTestPartymonkey extends BeanScopeBase {}

export interface ScopeModuleTestPartymonkey {
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
    'test-partymonkey': ScopeModuleTestPartymonkey;
  }

  export interface IBeanScopeContainer {
    testPartymonkey: ScopeModuleTestPartymonkey;
  }
}

/** scope: end */
