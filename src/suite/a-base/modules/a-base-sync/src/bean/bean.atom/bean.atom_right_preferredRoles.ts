module.exports = class Atom {
  // preferred roles
  async preferredRoles({ atomClass, user, disableAuthOpenCheck }) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    // normal check
    const roles = await this._preferredRoles_normal({ atomClass, user });
    if (!roles || roles.length === 0) return roles;
    // auth open check
    if (!disableAuthOpenCheck) {
      const resAuthOpenCheck = await this.ctx.bean.authOpen.checkRightAtomAction({ atomClass, action: 'create' });
      if (!resAuthOpenCheck) return [];
    }
    // ok
    return roles;
  }

  // preferred roles
  async _preferredRoles_normal({ atomClass, user }) {
    // 1. roleWhos
    const roleWhos = await this.ctx.bean.atomRightAux.getRoleWhosOfAtomClassAction({ atomClass, action: 1 });
    // 2. roleParents
    const roleParents = await this.ctx.bean.atomRightAux.getRoleParentsOfUser({ userId: user.id });
    // 3. filter
    let roles = roleParents.filter(item => {
      return [0, 1, 2, 3, 4].includes(item.roleTypeCode) && !!roleWhos.find(item2 => item2.roleIdWho === item.roleId);
    });
    // 4. map
    roles = roles.map(item => {
      return {
        roleIdWho: item.roleId,
        roleNameWho: item.roleName,
        roleNameWhoLocale: this.ctx.text(item.roleName),
        userId: user.id,
      };
    });
    return roles;
    // const roles = await this.ctx.model.query(
    //   `select distinct a.iid,a.roleIdWho,b.userId,c.roleName as roleNameWho from aViewRoleRightAtomClass a
    //     inner join aUserRole b on a.roleIdWho=b.roleId
    //     inner join aRole c on a.roleIdWho=c.id
    //     where a.iid=? and a.atomClassId=? and a.action=1 and b.userId=? and c.roleTypeCode in (0, 1, 2, 3, 4)
    //     order by a.roleIdWho desc`,
    //   [this.ctx.instance.id, atomClass.id, user.id]
    // );
    // return roles;
  }

  async preferredRole({ atomClass, user, disableAuthOpenCheck }) {
    const roles = await this.preferredRoles({ atomClass, user, disableAuthOpenCheck });
    return !roles || roles.length === 0 ? null : roles[0];
  }

  async preferredRoleId({ atomClass, user, disableAuthOpenCheck }) {
    const role = await this.preferredRole({ atomClass, user, disableAuthOpenCheck });
    return role ? role.roleIdWho : 0;
  }

  // undefined: not support
  // null: invalid
  async checkRightPreferredRole({ roleIdOwner, atomClass, user, options, disableAuthOpenCheck }) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // check
    const enableRightRoleScopes = atomClassBase.enableRight?.role?.scopes;
    if (!enableRightRoleScopes) {
      return undefined;
    }
    // atomClassId
    const atomClassId = atomClass.id;
    // roleIdOwner
    if (roleIdOwner) {
      // check
      const res = await this.ctx.bean.atom.checkRightCreateRole({
        atomClass: {
          id: atomClassId,
        },
        roleIdOwner,
        user,
        options,
        disableAuthOpenCheck,
      });
      if (!res) {
        return null;
      }
    } else {
      // retrieve default one, must exists
      roleIdOwner = await this.ctx.bean.atom.preferredRoleId({
        atomClass: {
          id: atomClassId,
        },
        user,
        disableAuthOpenCheck,
      });
      if (roleIdOwner === 0) {
        return null;
      }
    }
    return roleIdOwner;
  }
};
