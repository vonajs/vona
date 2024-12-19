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
    /** @internal */
    get scope(): ScopeModuleAFlowchart;
  }

  export interface ServiceFlowDef {
    /** @internal */
    get scope(): ScopeModuleAFlowchart;
  }
}
/** service: end */
/** service: begin */
import { ServiceFlow } from '../service/flow.js';
import { ServiceFlowDef } from '../service/flowDef.js';
export interface IModuleService {
  flow: ServiceFlow;
  flowDef: ServiceFlowDef;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-flowchart.service.flow': ServiceFlow;
    'a-flowchart.service.flowDef': ServiceFlowDef;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/flow.js';
export * from '../controller/flowDef.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-flowchart:flow': IDecoratorControllerOptions;
    'a-flowchart:flowDef': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-flowchart' {
  export interface ControllerFlow {
    /** @internal */
    get scope(): ScopeModuleAFlowchart;
  }

  export interface ControllerFlowDef {
    /** @internal */
    get scope(): ScopeModuleAFlowchart;
  }
}
/** controller: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleAFlowchart extends BeanScopeBase {}

export interface ScopeModuleAFlowchart {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  service: IModuleService;
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
