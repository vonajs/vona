/** beans: begin */
export * from '../bean/flow.node.activityUserTask.js';
export * from '../bean/flow.node.endEventAtom.js';
export * from '../bean/flow.node.startEventAtom.js';
export * from '../bean/io.message.workflow.js';
export * from '../bean/stats.taskClaimings.js';
export * from '../bean/stats.taskHandlings.js';
export * from '../bean/version.manager.js';
import { FlowNodeActivityUserTask } from '../bean/flow.node.activityUserTask.js';
import { FlowNodeEndEventAtom } from '../bean/flow.node.endEventAtom.js';
import { FlowNodeStartEventAtom } from '../bean/flow.node.startEventAtom.js';
import { IoMessageWorkflow } from '../bean/io.message.workflow.js';
import { StatsTaskClaimings } from '../bean/stats.taskClaimings.js';
import { StatsTaskHandlings } from '../bean/stats.taskHandlings.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-flowtask.flow.node.activityUserTask': FlowNodeActivityUserTask;
    'a-flowtask.flow.node.endEventAtom': FlowNodeEndEventAtom;
    'a-flowtask.flow.node.startEventAtom': FlowNodeStartEventAtom;
    'a-flowtask.io.message.workflow': IoMessageWorkflow;
    'a-flowtask.stats.taskClaimings': StatsTaskClaimings;
    'a-flowtask.stats.taskHandlings': StatsTaskHandlings;
    'a-flowtask.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-flowtask' {
  export interface FlowNodeActivityUserTask {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface FlowNodeEndEventAtom {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface FlowNodeStartEventAtom {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface IoMessageWorkflow {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface StatsTaskClaimings {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface StatsTaskHandlings {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/flowNodeStartEventAtomCondition.js';
export * from '../entity/flowTask.js';
export * from '../entity/flowTaskHistory.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-flowtask:flowNodeStartEventAtomCondition': IDecoratorEntityOptions;
    'a-flowtask:flowTask': IDecoratorEntityOptions;
    'a-flowtask:flowTaskHistory': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-flowtask' {}
/** entity: end */
/** entity: begin */
import { EntityFlowNodeStartEventAtomCondition } from '../entity/flowNodeStartEventAtomCondition.js';
import { EntityFlowTask } from '../entity/flowTask.js';
import { EntityFlowTaskHistory } from '../entity/flowTaskHistory.js';
export interface IModuleEntity {
  flowNodeStartEventAtomCondition: EntityFlowNodeStartEventAtomCondition;
  flowTask: EntityFlowTask;
  flowTaskHistory: EntityFlowTaskHistory;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-flowtask' {
  export interface EntityFlowNodeStartEventAtomCondition {
    column: <K extends keyof Omit<EntityFlowNodeStartEventAtomCondition, 'column' | 'columns' | 'table'>>(
      column: K,
    ) => K;
    columns: <K extends keyof Omit<EntityFlowNodeStartEventAtomCondition, 'column' | 'columns' | 'table'>>(
      ...columns: K[]
    ) => K[];
  }

  export interface EntityFlowTask {
    column: <K extends keyof Omit<EntityFlowTask, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFlowTask, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityFlowTaskHistory {
    column: <K extends keyof Omit<EntityFlowTaskHistory, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityFlowTaskHistory, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/flowNodeStartEventAtomCondition.js';
export * from '../model/flowTask.js';
export * from '../model/flowTaskHistory.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-flowtask:flowNodeStartEventAtomCondition': IDecoratorModelOptions;
    'a-flowtask:flowTask': IDecoratorModelOptions;
    'a-flowtask:flowTaskHistory': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-flowtask' {
  export interface ModelFlowNodeStartEventAtomCondition {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface ModelFlowTask {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface ModelFlowTaskHistory {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }
}
/** model: end */
/** model: begin */
import { ModelFlowNodeStartEventAtomCondition } from '../model/flowNodeStartEventAtomCondition.js';
import { ModelFlowTask } from '../model/flowTask.js';
import { ModelFlowTaskHistory } from '../model/flowTaskHistory.js';
export interface IModuleModel {
  flowNodeStartEventAtomCondition: ModelFlowNodeStartEventAtomCondition;
  flowTask: ModelFlowTask;
  flowTaskHistory: ModelFlowTaskHistory;
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.flowTask.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-flowtask' {
  export interface BeanFlowTask {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }
}
/** bean: end */
/** bean: begin */
import { BeanFlowTask } from '../bean/bean.flowTask.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    flowTask: BeanFlowTask;
  }
}
/** bean: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-flowtask:redlock': never;
  }
}
declare module 'vona-module-a-flowtask' {
  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** service: begin */
export * from '../service/flow.js';
export * from '../service/flowTask.js';
export * from '../service/localFlowTask.js';
export * from '../service/procedure.js';
export * from '../service/right.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-flowtask:flow': never;
    'a-flowtask:flowTask': never;
    'a-flowtask:localFlowTask': never;
    'a-flowtask:procedure': never;
    'a-flowtask:right': never;
  }
}
declare module 'vona-module-a-flowtask' {
  export interface ServiceFlow {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface ServiceFlowTask {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface ServiceLocalFlowTask {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface ServiceProcedure {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface ServiceRight {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }
}
/** service: end */
/** service: begin */
import { ServiceFlow } from '../service/flow.js';
import { ServiceFlowTask } from '../service/flowTask.js';
import { ServiceLocalFlowTask } from '../service/localFlowTask.js';
import { ServiceProcedure } from '../service/procedure.js';
import { ServiceRight } from '../service/right.js';
export interface IModuleService {
  flow: ServiceFlow;
  flowTask: ServiceFlowTask;
  localFlowTask: ServiceLocalFlowTask;
  procedure: ServiceProcedure;
  right: ServiceRight;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-flowtask.service.flow': ServiceFlow;
    'a-flowtask.service.flowTask': ServiceFlowTask;
    'a-flowtask.service.localFlowTask': ServiceLocalFlowTask;
    'a-flowtask.service.procedure': ServiceProcedure;
    'a-flowtask.service.right': ServiceRight;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/flow.js';
export * from '../controller/flowTask.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-flowtask:flow': IDecoratorControllerOptions;
    'a-flowtask:flowTask': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-flowtask' {
  export interface ControllerFlow {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }

  export interface ControllerFlowTask {
    /** @internal */
    get scope(): ScopeModuleAFlowtask;
  }
}
/** controller: end */
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
} from 'vona';

@Scope()
export class ScopeModuleAFlowtask extends BeanScopeBase {}

export interface ScopeModuleAFlowtask {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
  redlock: MetaRedlock;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-flowtask': ScopeModuleAFlowtask;
  }

  export interface IBeanScopeContainer {
    flowtask: ScopeModuleAFlowtask;
  }

  export interface IBeanScopeLocale {
    'a-flowtask': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-flowtask:${K}` {
  return `a-flowtask:${key}`;
}
/** scope: end */
