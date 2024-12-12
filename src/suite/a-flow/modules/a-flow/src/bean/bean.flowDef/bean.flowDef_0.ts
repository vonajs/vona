import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanBase, cast } from 'vona';
import { BeanFlowDef } from '../bean.flowDef.js';

export class BeanFlowDef0 extends BeanBase {
  get self() {
    return cast<BeanFlowDef>(this);
  }

  get modelFlowDef() {
    return this.self.scope.model.flowDef;
  }
  get modelFlowDefContent() {
    return this.self.scope.model.flowDefContent;
  }
  get modelFlowDefFull() {
    return this.self.scope.model.flowDefFull;
  }
  get atomClass() {
    return {
      module: __ThisModule__,
      atomClassName: 'flowDef',
    };
  }

  async getByKey({ flowDefKey }: any) {
    return await this._getByKey({ flowDefKey, atomStage: 'formal' });
  }

  async getById({ flowDefId }: any) {
    // get
    return await this._getById({ flowDefId });
  }

  async getByKeyAndRevision({ flowDefKey, flowDefRevision }: any) {
    // get from formal
    let flowDef = await this._getByKey({ flowDefKey, flowDefRevision, atomStage: 'formal' });
    if (flowDef) return flowDef;
    // get from history
    flowDef = await this._getByKey({ flowDefKey, flowDefRevision, atomStage: 'history' });
    if (flowDef) return flowDef;
    // not found
    return null;
  }

  async _getById({ flowDefId }: any) {
    return await this.app.bean.atom.read({ key: { atomId: flowDefId } });
  }

  async _getByKey({ flowDefKey, flowDefRevision, atomStage }: any) {
    // fullKey
    const { fullKey } = this.self._combineFullKey({ flowDefKey });
    // from db
    return await this.app.bean.atom.readByStaticKey({
      atomClass: this.atomClass,
      atomStaticKey: fullKey,
      atomRevision: flowDefRevision,
      atomStage,
    });
  }
}
