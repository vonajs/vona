/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';

@Scope()
export class ScopeModuleCmsPluginbacktotop extends BeanScopeBase {}

export interface ScopeModuleCmsPluginbacktotop {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
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
    'cms-pluginbacktotop': ScopeModuleCmsPluginbacktotop;
  }

  export interface IBeanScopeContainer {
    cmsPluginbacktotop: ScopeModuleCmsPluginbacktotop;
  }

  export interface IBeanScopeConfig {
    'cms-pluginbacktotop': ReturnType<typeof config>;
  }
}

/** scope: end */
