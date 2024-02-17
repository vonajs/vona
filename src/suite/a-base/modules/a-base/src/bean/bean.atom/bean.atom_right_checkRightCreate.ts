import { BeanAtomRightCheckRightActionEnable } from './bean.atom_right_checkRightActionEnable.js';

export class BeanAtomRightCheckRightCreate extends BeanAtomRightCheckRightActionEnable {
  async checkRightCreate({ atomClass, user, options }: any) {
    return await this.checkRightActionBulk({ atomClass, action: 1, user, options });
  }

  // atomClass: { id, module, atomClassName }
  async checkRightCreateRole({ atomClass, roleIdOwner, user, options, disableAuthOpenCheck }: any) {
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    // normal check
    const res = await this._checkRightCreateRole_normal({ atomClass, roleIdOwner, user, options });
    if (!res) return res;
    // auth open check
    if (!disableAuthOpenCheck) {
      const resAuthOpenCheck = await this.ctx.bean.authOpen.checkRightAtomAction({ atomClass, action: 'create' });
      if (!resAuthOpenCheck) return null;
    }
    // ok
    return res;
  }

  async _checkRightCreateRole_normal({ atomClass, roleIdOwner, user, options }: any) {
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // check detail
    const detailRightInherit = await this.self._checkDetailRightInherit({
      atomClass,
      atomClassBase,
      action: 'create',
      user,
      options,
    });
    if (!detailRightInherit) return null;
    // ignore itemOnly and detail
    if (atomClassBase.itemOnly) {
      return true;
    }
    // roleIdOwner not empty
    if (!roleIdOwner) return null;
    // check
    const debug = this.ctx.app.bean.debug.get('atom:right');
    debug('_checkRightCreateRole_normal: ', roleIdOwner);
    // 1. roleWhos
    const roleWhos = await this.ctx.bean.atomRightAux.getRoleWhosOfAtomClassAction({ atomClass, action: 1 });
    // 2. check roleIdOwner in roleWhos
    const checkRoleIdOwner = roleWhos.find(item => item.roleIdWho === roleIdOwner);
    if (!checkRoleIdOwner) return null;
    // 3. roleParents
    const roleParents = await this.ctx.bean.atomRightAux.getRoleParentsOfUser({ userId: user.id });
    // 4. check roleIdOwner in roleParents
    const checkRoleParents = roleParents.find(item => item.roleId === roleIdOwner);
    if (!checkRoleParents) return null;
    debug('_checkRightCreateRole_normal end: ', roleIdOwner);
    // ok
    return true;
  }
}
