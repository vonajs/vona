import { ServiceLocalFlow } from '../../index.js';
import { BeanFlowQuery } from './bean.flow_query.js';

export class BeanFlowStart extends BeanFlowQuery {
  async startByKey({ flowDefKey, flowAtomId, flowAtomClassId, flowVars, flowUserId, startEventId }: any) {
    // fullKey
    const { fullKey } = this.ctx.bean.flowDef._combineFullKey({ flowDefKey });
    // get flow def
    const flowDef = await this.ctx.bean.flowDef.getByKey({ flowDefKey });
    if (!flowDef) this.scope.error.FlowDefinitionNotFound__.throw(fullKey);
    if (flowDef.atomDisabled === 1) this.scope.error.FlowDefinitionDisabled__.throw(fullKey);
    return await this._start({ flowDef, flowAtomId, flowAtomClassId, flowVars, flowUserId, startEventId });
  }

  async startById({ flowDefId, flowAtomId, flowAtomClassId, flowVars, flowUserId, startEventId }: any) {
    // get flow def
    const flowDef = await this.ctx.bean.flowDef.getById({ flowDefId });
    if (!flowDef) this.scope.error.FlowDefinitionNotFound__.throw(flowDefId);
    if (flowDef.atomDisabled === 1) this.scope.error.FlowDefinitionDisabled__.throw(flowDef.atomStaticKey);
    return await this._start({ flowDef, flowAtomId, flowAtomClassId, flowVars, flowUserId, startEventId });
  }

  async _start({ flowDef, flowAtomId, flowAtomClassId, flowVars, flowUserId, startEventId }: any) {
    // flowInstance
    const flowInstance = this._createFlowInstance({ flowDef });
    // start
    await flowInstance.start({ flowAtomId, flowAtomClassId, flowVars, flowUserId, startEventId });
    // ok
    return flowInstance;
  }

  _createFlowInstance({ flowDef }: any) {
    const flowInstance = this.ctx.bean._newBean(ServiceLocalFlow, {
      flowDef,
    });
    return flowInstance;
  }
}
