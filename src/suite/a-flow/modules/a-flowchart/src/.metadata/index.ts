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
declare module 'vona-module-a-flowchart' {
  export interface ControllerFlow {
    get scope(): ScopeModuleAFlowchart;
  }

  export interface ControllerFlowDef {
    get scope(): ScopeModuleAFlowchart;
  }
}
/** controller: end */
/** service: begin */
export * from '../service/flow.js';
export * from '../service/flowDef.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-flowchart:flow': never;
    'a-flowchart:flowDef': never;
  }
}
declare module 'vona-module-a-flowchart' {
  export interface ServiceFlow {
    get scope(): ScopeModuleAFlowchart;
  }

  export interface ServiceFlowDef {
    get scope(): ScopeModuleAFlowchart;
  }
}
/** service: end */
/** service: begin */
import { ServiceFlow } from '../service/flow.js';
import { ServiceFlowDef } from '../service/flowDef.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-flowchart.service.flow': ServiceFlow;
    'a-flowchart.service.flowDef': ServiceFlowDef;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil } from 'vona';

@Scope()
export class ScopeModuleAFlowchart extends BeanScopeBase {}

export interface ScopeModuleAFlowchart {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

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
