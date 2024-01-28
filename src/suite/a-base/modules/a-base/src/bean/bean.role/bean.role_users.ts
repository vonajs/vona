import { Cast } from '@cabloy/core';
import { __ThisModule__ } from '../../resource/this.js';
import { BeanRoleOthers } from './bean.role_others.js';
import { BeanRoleResourceRights } from './bean.role_resourceRights.js';

const __atomClassRole = {
  module: __ThisModule__,
  atomClassName: 'role',
};
const __atomClassUser = {
  module: __ThisModule__,
  atomClassName: 'user',
};

export class BeanRoleUsers extends BeanRoleResourceRights {
  async roleUsers({ roleAtomId, roleId, page, user }: any) {
    // user, should check user right scope
    // user = { id: 0 };
    // roleId
    roleId = await Cast<BeanRoleOthers>(this)._forceRoleId({ roleAtomId, roleId });
    page = this.ctx.bean.util.page(page, false);
    // select
    const list = await this.ctx.bean.atom.select({
      atomClass: __atomClassUser,
      options: {
        orders: [['f.userName', 'asc']],
        page,
        stage: 'formal',
        role: roleId,
        // where,
      },
      user,
    });
    return list;
  }

  async userRoles({ userAtomId, userId, page, user }: any) {
    // user, should check user right scope
    // user = { id: 0 };
    userId = await this.ctx.bean.user._forceUserId({ userAtomId, userId });
    page = this.ctx.bean.util.page(page, false);
    // where
    const where = { 'f.userIdWho': userId };
    // select
    const list = await this.ctx.bean.atom.select({
      atomClass: __atomClassRole,
      options: {
        orders: [['f.roleName', 'asc']],
        page,
        stage: 'formal',
        where,
        mode: 'userRoles',
      },
      user,
    });
    return list;
  }

  // add user role
  async addUserRole({ roleAtomId, roleId, userAtomId, userId, user }: any) {
    // role
    const _role = await this._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role.id;
    // user
    const _user = await this.ctx.bean.user._forceUserAndCheckRightRead({ userAtomId, userId, user });
    userId = _user.id;
    // check if exists
    const item = await this.modelUserRole.get({
      userId,
      roleId,
    });
    if (item) return item.id;
    // insert
    const res = await this.modelUserRole.insert({
      userId,
      roleId,
    });
    // clear summer
    await this.ctx.bean.atomRightAux.clearSummersOfUser();
    // await this.ctx.bean.atomRightAux.clearSummersOfRole();
    // await this.ctx.bean.fields.clearSummer_fieldsRightOfAtomClass();
    await this.ctx.bean.fields.clearSummer_fieldsRightOfUser();
    // ok
    return res.insertId;
  }

  async deleteUserRole({ roleAtomId, roleId, userAtomId, userId, user }: any) {
    // role
    const _role = await this._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role.id;
    // user
    const _user = await this.ctx.bean.user._forceUserAndCheckRightRead({ userAtomId, userId, user });
    userId = _user.id;
    // clear summer
    await this.ctx.bean.atomRightAux.clearSummersOfUser();
    // await this.ctx.bean.atomRightAux.clearSummersOfRole();
    // await this.ctx.bean.fields.clearSummer_fieldsRightOfAtomClass();
    await this.ctx.bean.fields.clearSummer_fieldsRightOfUser();
    // delete
    await this.modelUserRole.delete({
      userId,
      roleId,
    });
  }

  async deleteAllUserRoles({ userId }: any) {
    await this.modelUserRole.delete({ userId });
  }
}
