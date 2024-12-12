import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanAtomActionBase } from './bean.atomAction_base.js';

export class BeanAtomActionFlow extends BeanAtomActionBase {
  async selectFlowActions({ atomClass, flowKey }: any) {
    atomClass = await this.app.bean.atomClass.get(atomClass);
    return await this.model.select({
      where: {
        atomClassId: atomClass.id,
        flowKey,
      },
    });
  }

  async getByModeFlow({ id, atomClassId, flowKey, nodeDefId, nodeDefName }: any) {
    const data = id ? { id } : { atomClassId, flowKey, nodeDefId };
    const res = await this.model.get(data);
    if (res) return res;
    // lock
    return await this.self.scope.redlock.lockIsolate('atomAction.register', async () => {
      return await this._registerLockByModeFlow({ atomClassId, flowKey, nodeDefId, nodeDefName });
    });
  }

  async _registerLockByModeFlow({ atomClassId, flowKey, nodeDefId, nodeDefName }: any) {
    return await this._registerLockByModeFlow_inner({ atomClassId, flowKey, nodeDefId, nodeDefName });
  }

  async _registerLockByModeFlow_inner({ atomClassId, flowKey, nodeDefId, nodeDefName }: any) {
    // get
    const res = await this.model.get({ atomClassId, flowKey, nodeDefId });
    if (res) return res;
    // code
    const sequence = this.app.bean.sequence.module(__ThisModule__);
    const flowActionCode = await sequence.next('flowAction');
    const data: any = {
      atomClassId,
      code: flowActionCode,
      name: nodeDefName,
      bulk: 0,
      actionMode: 1,
      flowKey,
      nodeDefId,
    };
    // insert
    const res2 = await this.model.insert(data);
    data.id = res2[0];
    // role right
    const roleRights = [
      {
        roleName: 'template.system',
        flowKey,
        nodeDefId,
        nodeDefName,
        scopeNames: [],
      },
    ];
    await this.app.bean.role.addRoleRightBatchByModeFlow({
      atomClassId,
      roleRights,
    });
    // ok
    return data;
  }
}
