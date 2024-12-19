/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-share.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-share' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAShare;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/share.js';
export * from '../entity/shareRecordPV.js';
export * from '../entity/shareRecordUV.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-share:share': IDecoratorEntityOptions;
    'a-share:shareRecordPV': IDecoratorEntityOptions;
    'a-share:shareRecordUV': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-share' {}
/** entity: end */
/** entity: begin */
import { EntityShare } from '../entity/share.js';
import { EntityShareRecordPV } from '../entity/shareRecordPV.js';
import { EntityShareRecordUV } from '../entity/shareRecordUV.js';
export interface IModuleEntity {
  share: EntityShare;
  shareRecordPV: EntityShareRecordPV;
  shareRecordUV: EntityShareRecordUV;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-share' {
  export interface EntityShare {
    column: <K extends keyof Omit<EntityShare, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityShare, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityShareRecordPV {
    column: <K extends keyof Omit<EntityShareRecordPV, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityShareRecordPV, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityShareRecordUV {
    column: <K extends keyof Omit<EntityShareRecordUV, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityShareRecordUV, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/share.js';
export * from '../model/shareRecordPV.js';
export * from '../model/shareRecordUV.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-share:share': IDecoratorModelOptions;
    'a-share:shareRecordPV': IDecoratorModelOptions;
    'a-share:shareRecordUV': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-share' {
  export interface ModelShare {
    /** @internal */
    get scope(): ScopeModuleAShare;
  }

  export interface ModelShareRecordPV {
    /** @internal */
    get scope(): ScopeModuleAShare;
  }

  export interface ModelShareRecordUV {
    /** @internal */
    get scope(): ScopeModuleAShare;
  }
}
/** model: end */
/** model: begin */
import { ModelShare } from '../model/share.js';
import { ModelShareRecordPV } from '../model/shareRecordPV.js';
import { ModelShareRecordUV } from '../model/shareRecordUV.js';
export interface IModuleModel {
  share: ModelShare;
  shareRecordPV: ModelShareRecordPV;
  shareRecordUV: ModelShareRecordUV;
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.share.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-share' {
  export interface BeanShare {
    /** @internal */
    get scope(): ScopeModuleAShare;
  }
}
/** bean: end */
/** bean: begin */
import { BeanShare } from '../bean/bean.share.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    share: BeanShare;
  }
}
/** bean: end */
/** event: begin */
export * from '../bean/event.shareRecordPV.js';
export * from '../bean/event.shareRecordUV.js';

import { IDecoratorEventOptions } from 'vona-module-a-event';
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-share:shareRecordPV': IDecoratorEventOptions;
    'a-share:shareRecordUV': IDecoratorEventOptions;
  }
}
declare module 'vona-module-a-share' {
  export interface EventShareRecordPV {
    /** @internal */
    get scope(): ScopeModuleAShare;
  }

  export interface EventShareRecordUV {
    /** @internal */
    get scope(): ScopeModuleAShare;
  }
}
/** event: end */
/** event: begin */
import { EventShareRecordPV } from '../bean/event.shareRecordPV.js';
import { EventShareRecordUV } from '../bean/event.shareRecordUV.js';
export interface IModuleEvent {
  shareRecordPV: EventShareRecordPV;
  shareRecordUV: EventShareRecordUV;
}
/** event: end */
/** service: begin */
export * from '../service/share.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-share:share': never;
  }
}
declare module 'vona-module-a-share' {
  export interface ServiceShare {
    /** @internal */
    get scope(): ScopeModuleAShare;
  }
}
/** service: end */
/** service: begin */
import { ServiceShare } from '../service/share.js';
export interface IModuleService {
  share: ServiceShare;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-share.service.share': ServiceShare;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/share.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-share:share': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-share' {
  export interface ControllerShare {
    /** @internal */
    get scope(): ScopeModuleAShare;
  }
}
/** controller: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAShare extends BeanScopeBase {}

export interface ScopeModuleAShare {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  entity: IModuleEntity;
  model: IModuleModel;
  event: IModuleEvent;
  service: IModuleService;
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
