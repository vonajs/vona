import { LocalFlowFlow } from '../../index.js';
import { __ThisModule__ } from '../../resource/this.js';
import { BeanFlowQuery } from './bean.flow_query.js';

export class BeanFlowStart extends BeanFlowQuery {
  async startByKey({ flowDefKey, flowAtomId, flowAtomClassId, flowVars, flowUserId, startEventId }: any) {
    // fullKey
    const { fullKey } = this.ctx.bean.flowDef._combineFullKey({ flowDefKey });
    // get flow def
    const flowDef = await this.ctx.bean.flowDef.getByKey({ flowDefKey });
    if (!flowDef) this.ctx.throw.module(__ThisModule__, 1001, fullKey);
    if (flowDef.atomDisabled === 1) this.ctx.throw.module(__ThisModule__, 1002, fullKey);
    return await this._start({ flowDef, flowAtomId, flowAtomClassId, flowVars, flowUserId, startEventId });
  }

  async startById({ flowDefId, flowAtomId, flowAtomClassId, flowVars, flowUserId, startEventId }: any) {
    // get flow def
    const flowDef = await this.ctx.bean.flowDef.getById({ flowDefId });
    if (!flowDef) this.ctx.throw.module(__ThisModule__, 1001, flowDefId);
    if (flowDef.atomDisabled === 1) this.ctx.throw.module(__ThisModule__, 1002, flowDef.atomStaticKey);
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
    const flowInstance = this.ctx.bean._newBean(LocalFlowFlow, {
      flowDef,
    });
    return flowInstance;
  }
}
