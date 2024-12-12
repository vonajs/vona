/** meta: begin */
export * from '../bean/meta.version.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-index:version': never;
  }
}
declare module 'vona-module-a-index' {
  export interface MetaVersion {
    get scope(): ScopeModuleAIndex;
  }
}
/** meta: end */
/** meta: begin */
import { MetaVersion } from '../bean/meta.version.js';
export interface IModuleMeta {
  version: MetaVersion;
}
/** meta: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';

@Scope()
export class ScopeModuleAIndex extends BeanScopeBase {}

export interface ScopeModuleAIndex {
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
    'a-index': ScopeModuleAIndex;
  }

  export interface IBeanScopeContainer {
    index: ScopeModuleAIndex;
  }

  export interface IBeanScopeConfig {
    'a-index': ReturnType<typeof config>;
  }
}

/** scope: end */
