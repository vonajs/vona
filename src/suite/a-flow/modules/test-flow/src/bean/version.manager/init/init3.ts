import { BeanBase } from 'vona';
import { __ThisModule__ } from '../../../.metadata/this.js';

export class VersionInit extends BeanBase {
  async run(_options) {
    // draft:
    //   Review: tom(father)
    // formal:
    //   Review: tom(father)
    //   PayMoney: jane(mother)
    //   ReceiveGoods: jannie(daughter)
    let roleRights: any[] = [
      {
        roleName: 'family.father',
        flowKey: 'test-flow:set04_atomState',
        nodeDefId: 'activity_1',
        scopeNames: 'authenticated', // 'family',
      },
      {
        roleName: 'family.mother',
        flowKey: 'test-flow:set04_atomState',
        nodeDefId: 'activity_2',
        scopeNames: 'authenticated', // 'family',
      },
      {
        roleName: 'family.daughter',
        flowKey: 'test-flow:set04_atomState',
        nodeDefId: 'activity_3',
        scopeNames: 'authenticated', // 'family',
      },
    ];
    await this.app.bean.role.addRoleRightBatchByModeFlow({
      module: __ThisModule__,
      atomClassName: 'purchaseOrder',
      roleRights,
    });
    // add role rights
    roleRights = [
      //
      { roleName: 'family', action: 'read', scopeNames: 'authenticated' },
    ];
    await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'purchaseOrder', roleRights });
  }
}
