/** beans: begin */
export * from '../bean/bean.pinyin.js';
export * from '../bean/version.manager.js';
import { BeanPinyin } from '../bean/bean.pinyin.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    pinyin: BeanPinyin;
  }

  export interface IBeanRecordGeneral {
    'a-pinyin.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-pinyin' {
  export interface BeanPinyin {
    get scope(): ScopeModuleAPinyin;
  }

  export interface VersionManager {
    get scope(): ScopeModuleAPinyin;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAPinyin extends BeanScopeBase {}

export interface ScopeModuleAPinyin {
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
    'a-pinyin': ScopeModuleAPinyin;
  }

  export interface IBeanScopeContainer {
    pinyin: ScopeModuleAPinyin;
  }
}

/** scope: end */
