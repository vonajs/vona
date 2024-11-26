/** beans: begin */
export * from '../bean/bean.flowTask.js';
export * from '../bean/flow.node.activityUserTask.js';
export * from '../bean/flow.node.endEventAtom.js';
export * from '../bean/flow.node.startEventAtom.js';
export * from '../bean/io.message.workflow.js';
export * from '../bean/stats.taskClaimings.js';
export * from '../bean/stats.taskHandlings.js';
export * from '../bean/version.manager.js';
import { BeanFlowTask } from '../bean/bean.flowTask.js';
import { FlowNodeActivityUserTask } from '../bean/flow.node.activityUserTask.js';
import { FlowNodeEndEventAtom } from '../bean/flow.node.endEventAtom.js';
import { FlowNodeStartEventAtom } from '../bean/flow.node.startEventAtom.js';
import { IoMessageWorkflow } from '../bean/io.message.workflow.js';
import { StatsTaskClaimings } from '../bean/stats.taskClaimings.js';
import { StatsTaskHandlings } from '../bean/stats.taskHandlings.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    flowTask: BeanFlowTask;
  }

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
/** beans: end */
/** controllers: begin */
export * from '../controller/flow.js';
export * from '../controller/flowTask.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/flowNodeStartEventAtomCondition.js';
export * from '../entity/flowTask.js';
export * from '../entity/flowTaskHistory.js';
/** entities: end */
/** models: begin */
export * from '../model/flowNodeStartEventAtomCondition.js';
export * from '../model/flowTask.js';
export * from '../model/flowTaskHistory.js';
import { ModelFlowNodeStartEventAtomCondition } from '../model/flowNodeStartEventAtomCondition.js';
import { ModelFlowTask } from '../model/flowTask.js';
import { ModelFlowTaskHistory } from '../model/flowTaskHistory.js';
export interface IModuleModel {
  flowNodeStartEventAtomCondition: ModelFlowNodeStartEventAtomCondition;
  flowTask: ModelFlowTask;
  flowTaskHistory: ModelFlowTaskHistory;
}
/** models: end */
/** services: begin */
export * from '../service/flow.js';
export * from '../service/flowTask.js';
export * from '../service/localFlowTask.js';
export * from '../service/procedure.js';
export * from '../service/right.js';
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
/** services: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAFlowtask extends BeanScopeBase {}

export interface ScopeModuleAFlowtask
  extends TypeModuleResource<
    never,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    never,
    IModuleService,
    IModuleModel
  > {}

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
