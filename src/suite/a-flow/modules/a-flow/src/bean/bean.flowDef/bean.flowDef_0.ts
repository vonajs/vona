import { __ThisModule__ } from '../../resource/this.js';
import { BeanBase } from '@cabloy/core';

export class BeanFlowDef0 extends BeanBase {
  get modelFlowDef() {
    return this.ctx.model.module(__ThisModule__).flowDef;
  }
  get modelFlowDefContent() {
    return this.ctx.model.module(__ThisModule__).flowDefContent;
  }
  get modelFlowDefFull() {
    return this.ctx.model.module(__ThisModule__).flowDefFull;
  }
  get atomClass() {
    return {
      module: __ThisModule__,
      atomClassName: 'flowDef',
    };
  }

  async getByKey({ flowDefKey }) {
    return await this._getByKey({ flowDefKey, atomStage: 'formal' });
  }

  async getById({ flowDefId }) {
    // get
    return await this._getById({ flowDefId });
  }

  async getByKeyAndRevision({ flowDefKey, flowDefRevision }) {
    // get from formal
    let flowDef = await this._getByKey({ flowDefKey, flowDefRevision, atomStage: 'formal' });
    if (flowDef) return flowDef;
    // get from history
    flowDef = await this._getByKey({ flowDefKey, flowDefRevision, atomStage: 'history' });
    if (flowDef) return flowDef;
    // not found
    return null;
  }

  async _getById({ flowDefId }) {
    return await this.ctx.bean.atom.read({ key: { atomId: flowDefId } });
  }

  async _getByKey({ flowDefKey, flowDefRevision, atomStage }) {
    // fullKey
    const { fullKey } = this._combineFullKey({ flowDefKey });
    // from db
    return await this.ctx.bean.atom.readByStaticKey({
      atomClass: this.atomClass,
      atomStaticKey: fullKey,
      atomRevision: flowDefRevision,
      atomStage,
    });
  }
}
