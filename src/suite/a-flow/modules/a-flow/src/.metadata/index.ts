/** beans: begin */
export * from '../bean/flow.behavior.base.js';
export * from '../bean/stats.flowInitiateds.js';
export * from '../bean/version.manager.js';
import { FlowBehaviorBase } from '../bean/flow.behavior.base.js';
import { StatsFlowInitiateds } from '../bean/stats.flowInitiateds.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-flow.flow.behavior.base': FlowBehaviorBase;
    'a-flow.stats.flowInitiateds': StatsFlowInitiateds;
    'a-flow.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-flow' {
  export interface FlowBehaviorBase {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface StatsFlowInitiateds {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/flow.js';
export * from '../entity/flowDef.js';
export * from '../entity/flowDefContent.js';
export * from '../entity/flowDefFull.js';
export * from '../entity/flowHistory.js';
export * from '../entity/flowNode.js';
export * from '../entity/flowNodeHistory.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-flow:flow': IDecoratorEntityOptions;
    'a-flow:flowDef': IDecoratorEntityOptions;
    'a-flow:flowDefContent': IDecoratorEntityOptions;
    'a-flow:flowDefFull': IDecoratorEntityOptions;
    'a-flow:flowHistory': IDecoratorEntityOptions;
    'a-flow:flowNode': IDecoratorEntityOptions;
    'a-flow:flowNodeHistory': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-flow' {}
/** entity: end */
/** entity: begin */
import { EntityFlow } from '../entity/flow.js';
import { EntityFlowDef } from '../entity/flowDef.js';
import { EntityFlowDefContent } from '../entity/flowDefContent.js';
import { EntityFlowDefFull } from '../entity/flowDefFull.js';
import { EntityFlowHistory } from '../entity/flowHistory.js';
import { EntityFlowNode } from '../entity/flowNode.js';
import { EntityFlowNodeHistory } from '../entity/flowNodeHistory.js';
export interface IModuleEntity {
  flow: EntityFlow;
  flowDef: EntityFlowDef;
  flowDefContent: EntityFlowDefContent;
  flowDefFull: EntityFlowDefFull;
  flowHistory: EntityFlowHistory;
  flowNode: EntityFlowNode;
  flowNodeHistory: EntityFlowNodeHistory;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-flow' {
  export interface EntityFlow {
    column: <K extends keyof Omit<EntityFlow, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFlow, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityFlowDef {
    column: <K extends keyof Omit<EntityFlowDef, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFlowDef, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityFlowDefContent {
    column: <K extends keyof Omit<EntityFlowDefContent, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFlowDefContent, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityFlowDefFull {
    column: <K extends keyof Omit<EntityFlowDefFull, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFlowDefFull, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityFlowHistory {
    column: <K extends keyof Omit<EntityFlowHistory, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFlowHistory, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityFlowNode {
    column: <K extends keyof Omit<EntityFlowNode, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFlowNode, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityFlowNodeHistory {
    column: <K extends keyof Omit<EntityFlowNodeHistory, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFlowNodeHistory, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/flow.js';
export * from '../model/flowDef.js';
export * from '../model/flowDefContent.js';
export * from '../model/flowDefFull.js';
export * from '../model/flowHistory.js';
export * from '../model/flowNode.js';
export * from '../model/flowNodeHistory.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-flow:flow': IDecoratorModelOptions;
    'a-flow:flowDef': IDecoratorModelOptions;
    'a-flow:flowDefContent': IDecoratorModelOptions;
    'a-flow:flowDefFull': IDecoratorModelOptions;
    'a-flow:flowHistory': IDecoratorModelOptions;
    'a-flow:flowNode': IDecoratorModelOptions;
    'a-flow:flowNodeHistory': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-flow' {
  export interface ModelFlow {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ModelFlowDef {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ModelFlowDefContent {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ModelFlowDefFull {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ModelFlowHistory {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ModelFlowNode {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ModelFlowNodeHistory {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }
}
/** model: end */
/** model: begin */
import { ModelFlow } from '../model/flow.js';
import { ModelFlowDef } from '../model/flowDef.js';
import { ModelFlowDefContent } from '../model/flowDefContent.js';
import { ModelFlowDefFull } from '../model/flowDefFull.js';
import { ModelFlowHistory } from '../model/flowHistory.js';
import { ModelFlowNode } from '../model/flowNode.js';
import { ModelFlowNodeHistory } from '../model/flowNodeHistory.js';
export interface IModuleModel {
  flow: ModelFlow;
  flowDef: ModelFlowDef;
  flowDefContent: ModelFlowDefContent;
  flowDefFull: ModelFlowDefFull;
  flowHistory: ModelFlowHistory;
  flowNode: ModelFlowNode;
  flowNodeHistory: ModelFlowNodeHistory;
}
/** model: end */
/** atom: begin */
export * from '../atom/flowDef.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'a-flow:flowDef': never;
  }
}
declare module 'vona-module-a-flow' {
  export interface AtomFlowDef {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }
}
/** atom: end */
/** bean: begin */
export * from '../bean/bean.flow.js';
export * from '../bean/bean.flowDef.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-flow' {
  export interface BeanFlow {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface BeanFlowDef {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }
}
/** bean: end */
/** bean: begin */
import { BeanFlow } from '../bean/bean.flow.js';
import { BeanFlowDef } from '../bean/bean.flowDef.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    flow: BeanFlow;
    flowDef: BeanFlowDef;
  }
}
/** bean: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-flow:redlock': never;
  }
}
declare module 'vona-module-a-flow' {
  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** service: begin */
export * from '../service/flow.js';
export * from '../service/flowDef.js';
export * from '../service/localFlow.js';
export * from '../service/localFlowEdge.js';
export * from '../service/localFlowListener.js';
export * from '../service/localFlowNode.js';
export * from '../service/procedure.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-flow:flow': never;
    'a-flow:flowDef': never;
    'a-flow:localFlow': never;
    'a-flow:localFlowEdge': never;
    'a-flow:localFlowListener': never;
    'a-flow:localFlowNode': never;
    'a-flow:procedure': never;
  }
}
declare module 'vona-module-a-flow' {
  export interface ServiceFlow {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ServiceFlowDef {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ServiceLocalFlow {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ServiceLocalFlowEdge {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ServiceLocalFlowListener {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ServiceLocalFlowNode {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ServiceProcedure {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }
}
/** service: end */
/** service: begin */
import { ServiceFlow } from '../service/flow.js';
import { ServiceFlowDef } from '../service/flowDef.js';
import { ServiceLocalFlow } from '../service/localFlow.js';
import { ServiceLocalFlowEdge } from '../service/localFlowEdge.js';
import { ServiceLocalFlowListener } from '../service/localFlowListener.js';
import { ServiceLocalFlowNode } from '../service/localFlowNode.js';
import { ServiceProcedure } from '../service/procedure.js';
export interface IModuleService {
  flow: ServiceFlow;
  flowDef: ServiceFlowDef;
  localFlow: ServiceLocalFlow;
  localFlowEdge: ServiceLocalFlowEdge;
  localFlowListener: ServiceLocalFlowListener;
  localFlowNode: ServiceLocalFlowNode;
  procedure: ServiceProcedure;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-flow.service.flow': ServiceFlow;
    'a-flow.service.flowDef': ServiceFlowDef;
    'a-flow.service.localFlow': ServiceLocalFlow;
    'a-flow.service.localFlowEdge': ServiceLocalFlowEdge;
    'a-flow.service.localFlowListener': ServiceLocalFlowListener;
    'a-flow.service.localFlowNode': ServiceLocalFlowNode;
    'a-flow.service.procedure': ServiceProcedure;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/flow.js';
export * from '../controller/flowDef.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-flow:flow': IDecoratorControllerOptions;
    'a-flow:flowDef': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-flow' {
  export interface ControllerFlow {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }

  export interface ControllerFlowDef {
    /** @internal */
    get scope(): ScopeModuleAFlow;
  }
}
/** controller: end */
/** constant: begin */
export * from '../config/constants.js';
import { constants } from '../config/constants.js';
/** constant: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** scope: begin */
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
  TypeModuleConstants,
} from 'vona';

@Scope()
export class ScopeModuleAFlow extends BeanScopeBase {}

export interface ScopeModuleAFlow {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  constant: TypeModuleConstants<typeof constants>;
  entity: IModuleEntity;
  model: IModuleModel;
  redlock: MetaRedlock;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-flow': ScopeModuleAFlow;
  }

  export interface IBeanScopeContainer {
    flow: ScopeModuleAFlow;
  }

  export interface IBeanScopeLocale {
    'a-flow': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-flow:${K}` {
  return `a-flow:${key}`;
}
/** scope: end */
