export * from '../bean/version.manager.js';
export * from '../bean/stats.flowInitiateds.js';
export * from '../bean/flow.behavior.base.js';
export * from '../bean/bean.flowDef.js';
export * from '../bean/bean.flow.js';

import { BeanFlowDef } from '../bean/bean.flowDef.js';
import { BeanFlow } from '../bean/bean.flow.js';

export interface IBeanRecord {
  flowDef: BeanFlowDef;
  flow: BeanFlow;
}
