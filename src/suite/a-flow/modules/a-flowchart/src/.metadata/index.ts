/** controllers: begin */
export * from '../controller/flow.js';
export * from '../controller/flowDef.js';
/** controllers: end */
/** services: begin */
export * from '../service/flow.js';
export * from '../service/flowDef.js';
import { ServiceFlow } from '../service/flow.js';
import { ServiceFlowDef } from '../service/flowDef.js';
export interface IModuleService {
  flow: ServiceFlow;
  flowDef: ServiceFlowDef;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-flowchart.service.flow': ServiceFlow;
    'a-flowchart.service.flowDef': ServiceFlowDef;
  }
}
/** services: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAFlowchart extends BeanScopeBase {}

export interface ScopeModuleAFlowchart extends TypeModuleResource<any, any, any, any, IModuleService, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-flowchart': ScopeModuleAFlowchart;
  }

  export interface BeanBase {
    $scopeFlowchart: ScopeModuleAFlowchart;
  }
}
/** scope: end */
