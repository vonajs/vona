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
/** entity: begin */
export * from '../entity/share.js';
export * from '../entity/shareRecordPV.js';
export * from '../entity/shareRecordUV.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-share:share': IDecoratorEntityOptions;
    'a-share:shareRecordPV': IDecoratorEntityOptions;
    'a-share:shareRecordUV': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/share.js';
export * from '../model/shareRecordPV.js';
export * from '../model/shareRecordUV.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-share:share': IDecoratorModelOptions;
    'a-share:shareRecordPV': IDecoratorModelOptions;
    'a-share:shareRecordUV': IDecoratorModelOptions;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/share.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-share:share': IDecoratorControllerOptions;
  }
}
/** controller: end */
/** entities: begin */
import { EntityShare } from '../entity/share.js';
import { EntityShareRecordPV } from '../entity/shareRecordPV.js';
import { EntityShareRecordUV } from '../entity/shareRecordUV.js';
export interface IModuleEntity {
  share: EntityShare;
  shareRecordPV: EntityShareRecordPV;
  shareRecordUV: EntityShareRecordUV;
}
/** entities: end */
/** models: begin */
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
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAShare extends BeanScopeBase {}

export interface ScopeModuleAShare {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  service: IModuleService;
  model: IModuleModel;
  entity: IModuleEntity;
}

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
