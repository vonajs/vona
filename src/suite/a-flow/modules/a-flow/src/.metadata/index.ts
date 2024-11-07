/** beans: begin */
export * from '../bean/bean.flow.js';
export * from '../bean/bean.flowDef.js';
export * from '../bean/flow.behavior.base.js';
export * from '../bean/stats.flowInitiateds.js';
export * from '../bean/version.manager.js';
import { BeanFlow } from '../bean/bean.flow.js';
import { BeanFlowDef } from '../bean/bean.flowDef.js';
import { FlowBehaviorBase } from '../bean/flow.behavior.base.js';
import { StatsFlowInitiateds } from '../bean/stats.flowInitiateds.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    flow: BeanFlow;
    flowDef: BeanFlowDef;
  }

  export interface IBeanRecordGeneral {
    'a-flow.flow.behavior.base': FlowBehaviorBase;
    'a-flow.stats.flowInitiateds': StatsFlowInitiateds;
    'a-flow.version.manager': VersionManager;
  }
}
/** beans: end */
/** atoms: begin */
export * from '../atom/flowDef.js';
/** atoms: end */
/** controllers: begin */
export * from '../controller/flow.js';
export * from '../controller/flowDef.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/flow.js';
export * from '../entity/flowDef.js';
export * from '../entity/flowDefContent.js';
export * from '../entity/flowDefFull.js';
export * from '../entity/flowHistory.js';
export * from '../entity/flowNode.js';
export * from '../entity/flowNodeHistory.js';
/** entities: end */
/** models: begin */
export * from '../model/flow.js';
export * from '../model/flowDef.js';
export * from '../model/flowDefContent.js';
export * from '../model/flowDefFull.js';
export * from '../model/flowHistory.js';
export * from '../model/flowNode.js';
export * from '../model/flowNodeHistory.js';
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
/** models: end */
/** services: begin */
export * from '../service/flow.js';
export * from '../service/flowDef.js';
export * from '../service/localFlow.js';
export * from '../service/localFlowEdge.js';
export * from '../service/localFlowListener.js';
export * from '../service/localFlowNode.js';
export * from '../service/procedure.js';
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
/** services: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAFlow extends BeanScopeBase {}

export interface ScopeModuleAFlow
  extends TypeModuleResource<
    any,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants,
    IModuleService,
    IModuleModel
  > {}

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
/** scope: end */
