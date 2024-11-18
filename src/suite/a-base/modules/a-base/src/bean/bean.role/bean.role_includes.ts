import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanRoleBuild } from './bean.role_build.js';

const __atomClassRole = {
  module: __ThisModule__,
  atomClassName: 'role',
};

export class BeanRoleIncludes extends BeanRoleBuild {
  // includes
  async includes({ roleAtomId, roleId, page, user }: any) {
    // user, should check user right scope
    // user = { id: 0 };
    //
    roleId = await this.self._forceRoleId({ roleAtomId, roleId });
    page = this.ctx.bean.util.page(page, false);
    // where
    const where = { 'f.roleIdWho': roleId };
    // select
    const list = await this.ctx.bean.atom.select({
      atomClass: __atomClassRole,
      options: {
        orders: [['f.roleName', 'asc']],
        page,
        stage: 'formal',
        where,
        mode: 'includes',
      },
      user,
    });
    return list;
  }

  // add role include
  async addRoleInc({ roleAtomId, roleId, roleIdInc, user }: any) {
    // role
    const _role = await this.self._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role!.id;
    // role inc
    const _roleInc = await this.self._forceRoleAndCheckRightRead({
      roleAtomId: null,
      roleId: roleIdInc,
      user,
    });
    roleIdInc = _roleInc!.id;
    // check if exists
    const item = await this.modelRoleInc.get({
      roleId,
      roleIdInc,
    });
    if (item) return item.id;
    // insert
    const res = await this.modelRoleInc.insert({
      roleId,
      roleIdInc,
    });
    const id = res[0];

    // set dirty
    await this.setDirty(true);

    return id;
  }

  // remove role include
  async removeRoleInc({ roleAtomId, roleId, roleIdInc, user }: any) {
    // role
    const _role = await this.self._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role!.id;
    // role inc
    const _roleInc = await this.self._forceRoleAndCheckRightRead({
      roleAtomId: null,
      roleId: roleIdInc,
      user,
    });
    roleIdInc = _roleInc!.id;

    // delete
    await this.modelRoleInc.delete({ roleId, roleIdInc });

    // set dirty
    await this.setDirty(true);
  }
}

// // includes
// async includes({ roleAtomId, roleId, page, user }: any) {
//   roleId = await this.self._forceRoleId({ roleAtomId, roleId });
//   page = this.ctx.bean.util.page(page, false);
//   const _limit = this.bean.model._limit(page.size, page.index);
//   const list = await this.bean.model.query(
//     `
//     select a.*,b.roleName from aRoleInc a
//       left join aRole b on a.roleIdInc=b.id
//         where a.iid=? and a.roleId=?
//         ${_limit}
//     `,
//     [this.ctx.instance.id, roleId]
//   );
//   return list;
// }
