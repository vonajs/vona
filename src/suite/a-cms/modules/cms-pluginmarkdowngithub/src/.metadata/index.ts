/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleCmsPluginmarkdowngithub extends BeanScopeBase {}

export interface ScopeModuleCmsPluginmarkdowngithub {
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
    'cms-pluginmarkdowngithub': ScopeModuleCmsPluginmarkdowngithub;
  }

  export interface IBeanScopeContainer {
    cmsPluginmarkdowngithub: ScopeModuleCmsPluginmarkdowngithub;
  }
}

/** scope: end */
