import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../.metadata/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestMultilevelAuthorizationRole extends BeanBase<ScopeModule> {
  async role() {
    // userIds
    const userIds = this.ctx.cache.mem.get('userIds');
    // // roleIds
    // const roleIds = this.ctx.cache.mem.get('roleIds');

    const dataTests = [
      {
        userName: 'root',
        childrenTop: {
          count: 1,
          roleNames: 'root',
        },
        children: {
          count: 2,
          roleNames: 'anonymous,authenticated',
        },
      },
      {
        userName: 'Tomson',
        childrenTop: {
          count: 0,
          roleNames: '',
        },
        children: {
          count: 2,
          roleNames: 'anonymous,authenticated',
        },
      },
      {
        userName: 'Tom',
        childrenTop: {
          count: 1,
          roleNames: 'organization',
        },
        children: {
          count: 2,
          roleNames: 'internal,external',
        },
      },
    ];
    const roleTypes = [0, 1, 2, 3, 4];
    for (const dataTest of dataTests) {
      // childrenTop
      const userName = dataTest.userName;
      const userId = userIds[userName];
      let list = await this.ctx.bean.role.childrenTop({
        roleTypes,
        page: null,
        user: { id: userId },
      });
      assert.equal(list.length, dataTest.childrenTop.count, userName);
      assert.equal(list.map(item => item.roleName).join(','), dataTest.childrenTop.roleNames, userName);

      if (list.length > 0) {
        const roleOne = list[0];
        list = await this.ctx.bean.role.children({ roleTypes, roleId: roleOne.id, page: null, user: { id: userId } });
        assert.equal(list.length, dataTest.children.count, userName);
        assert.equal(list.map(item => item.roleName).join(','), dataTest.children.roleNames, userName);
      }
    }

    // done
    this.ctx.success();
  }
}
