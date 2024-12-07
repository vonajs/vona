/** controller: begin */
export * from '../controller/flow.js';
export * from '../controller/flowDef.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-flowchart:flow': IDecoratorControllerOptions;
    'a-flowchart:flowDef': IDecoratorControllerOptions;
  }
}
/** controller: end */
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

export interface ScopeModuleAFlowchart
  extends TypeModuleResource<never, never, never, never, never, IModuleService, never, never, never> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-flowchart': ScopeModuleAFlowchart;
  }

  export interface IBeanScopeContainer {
    flowchart: ScopeModuleAFlowchart;
  }
}

/** scope: end */
