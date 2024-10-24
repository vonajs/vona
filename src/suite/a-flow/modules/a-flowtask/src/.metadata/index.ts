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
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    flowTask: BeanFlowTask;
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
export * from '../service/procedure.js';
export * from '../service/right.js';
import { ServiceFlow } from '../service/flow.js';
import { ServiceFlowTask } from '../service/flowTask.js';
import { ServiceProcedure } from '../service/procedure.js';
import { ServiceRight } from '../service/right.js';
export interface IModuleService {
  flow: ServiceFlow;
  flowTask: ServiceFlowTask;
  procedure: ServiceProcedure;
  right: ServiceRight;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'a-flowtask.service.flow': ServiceFlow;
    'a-flowtask.service.flowTask': ServiceFlowTask;
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
  extends TypeModuleResource<any, typeof Errors, (typeof locales)[TypeLocaleBase], any, IModuleService, IModuleModel> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-flowtask': ScopeModuleAFlowtask;
  }

  export interface IBeanScopeLocale {
    'a-flowtask': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
