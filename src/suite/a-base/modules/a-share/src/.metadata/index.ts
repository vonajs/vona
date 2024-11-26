/** beans: begin */
export * from '../bean/bean.share.js';
export * from '../bean/version.manager.js';
import { BeanShare } from '../bean/bean.share.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    share: BeanShare;
  }

  export interface IBeanRecordGeneral {
    'a-share.version.manager': VersionManager;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/share.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/share.js';
export * from '../entity/shareRecordPV.js';
export * from '../entity/shareRecordUV.js';
/** entities: end */
/** models: begin */
export * from '../model/share.js';
export * from '../model/shareRecordPV.js';
export * from '../model/shareRecordUV.js';
import { ModelShare } from '../model/share.js';
import { ModelShareRecordPV } from '../model/shareRecordPV.js';
import { ModelShareRecordUV } from '../model/shareRecordUV.js';
export interface IModuleModel {
  share: ModelShare;
  shareRecordPV: ModelShareRecordPV;
  shareRecordUV: ModelShareRecordUV;
}
/** models: end */
/** services: begin */
export * from '../service/share.js';
import { ServiceShare } from '../service/share.js';
export interface IModuleService {
  share: ServiceShare;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-share.service.share': ServiceShare;
  }
}
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAShare extends BeanScopeBase {}

export interface ScopeModuleAShare
  extends TypeModuleResource<never, never, never, never, IModuleService, IModuleModel> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-share': ScopeModuleAShare;
  }

  export interface IBeanScopeContainer {
    share: ScopeModuleAShare;
  }
}

/** scope: end */
