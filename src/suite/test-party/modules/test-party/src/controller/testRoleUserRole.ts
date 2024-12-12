import { BeanBase, Controller } from 'vona';
import assert from 'assert';

@Controller()
export class ControllerTestRoleUserRole extends BeanBase {
  async userRole() {
    // userIds
    const userIds = this.ctx.cache.mem.get('userIds');
    // roleIds
    const roleIds = this.ctx.cache.mem.get('roleIds');

    // direct
    let list = await this.app.bean.role.getUserRolesDirect({ userId: userIds.root });
    assert.equal(list.length, 1);
    // parent
    list = await this.app.bean.role.getUserRolesParent({ userId: userIds.root });
    assert.equal(list.length, 3);
    // expand
    list = await this.app.bean.role.getUserRolesExpand({ userId: userIds.root });
    assert(list.length > 3);

    // direct
    let res = await this.app.bean.role.userInRoleDirect({
      userId: userIds.root,
      roleId: roleIds.superuser,
    });
    assert.equal(res, true);
    // parent
    res = await this.app.bean.role.userInRoleParent({
      userId: userIds.root,
      roleId: roleIds.root,
    });
    assert.equal(res, true);
    // expand
    res = await this.app.bean.role.userInRoleExpand({
      userId: userIds.root,
      roleId: roleIds.system,
    });
    assert.equal(res, true);

    // done
    this.app.success();
  }
}
