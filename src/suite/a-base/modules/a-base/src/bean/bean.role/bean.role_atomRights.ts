import { BeanRoleBase } from './bean.role_base.js';

export class BeanRoleAtomRights extends BeanRoleBase {
  // add role right
  async addRoleRight({ roleAtomId, roleId, atomClass, atomClassId, action, scope, user, roleRightId }: any) {
    // atomClassId
    if (!atomClassId) {
      atomClass = await this.ctx.bean.atomClass.get(atomClass);
      atomClassId = atomClass.id;
    }
    // check atomClass/action
    const _check = await this.ctx.bean.atomClass.checkRightAtomClassActionOfUser({
      atomClass: { id: atomClassId },
      action,
      user,
    });
    if (!_check) this.ctx.throw(403);
    // check role right
    if (roleRightId) {
      // update
      const item = await this.modelRoleRight.get({ id: roleRightId });
      roleAtomId = item.roleAtomId;
      roleId = item.roleId; // maybe empty when create
    }
    const _role = await this.self._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role.id; // force exists: support create
    roleAtomId = _role.atomId; // force exists: support create
    // scope: allowed [] / 0
    if (scope === undefined || scope === null) {
      scope = [];
    }
    if (scope) {
      if (typeof scope === 'string') {
        scope = scope.split(',');
      } else if (!Array.isArray(scope)) {
        scope = [scope];
      }
      // check right
      for (const roleIdScope of scope) {
        await this.self._forceRoleAndCheckRightRead({
          roleAtomId: null,
          roleId: roleIdScope,
          user,
        });
      }
    }

    // force action exists in db
    await this.ctx.bean.atomAction.get({ atomClassId, code: action });

    // roleRight
    if (roleRightId) {
      // update
      await this.modelRoleRight.update({
        id: roleRightId,
        roleAtomId,
        roleId,
        atomClassId,
        action,
        scope: JSON.stringify(scope),
      });
      // delete ref
      await this.modelRoleRightRef.delete({ roleRightId });
    } else {
      // create
      const res = await this.modelRoleRight.insert({
        roleAtomId,
        roleId,
        atomClassId,
        action,
        scope: JSON.stringify(scope),
      });
      roleRightId = res.insertId;
    }
    // roleRightRef
    if (scope) {
      for (const roleIdScope of scope) {
        await this.modelRoleRightRef.insert({
          roleRightId,
          roleId,
          atomClassId,
          action,
          roleIdScope,
        });
      }
    }
    // clear summer
    await this.ctx.bean.atomRightAux.clearSummersOfRole();
    await this.ctx.bean.atomRightAux.clearSummersOfUser();
    // ok
    return roleRightId;
  }

  // delete role right
  async deleteRoleRight({ roleRightId, user }: any) {
    // role right
    const item = await this.modelRoleRight.get({ id: roleRightId });
    const { roleAtomId, roleId } = item;
    // check right
    await this.self._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    // check right of scope
    const scope = JSON.parse(item.scope);
    if (scope) {
      // check right
      for (const roleIdScope of scope) {
        await this.self._forceRoleAndCheckRightRead({
          roleAtomId: null,
          roleId: roleIdScope,
          user,
        });
      }
    }
    // // id + roleId for safety
    // await this.modelRoleRight.delete({ id: roleRightId, roleId });
    // await this.modelRoleRightRef.delete({ roleRightId, roleId });
    // id
    await this.modelRoleRight.delete({ id: roleRightId });
    await this.modelRoleRightRef.delete({ roleRightId });
    // clear summer
    await this.ctx.bean.atomRightAux.clearSummersOfRole();
    await this.ctx.bean.atomRightAux.clearSummersOfUser();
  }

  async deleteRoleRightByAction({ atomClassId, action }: any) {
    await this.modelRoleRight.delete({ atomClassId, action });
    await this.modelRoleRightRef.delete({ atomClassId, action });
    // clear summer
    await this.ctx.bean.atomRightAux.clearSummersOfRole();
    await this.ctx.bean.atomRightAux.clearSummersOfUser();
  }

  // const roleRights = [
  //   { roleName: 'cms-writer', action: 'create' },
  //   { roleName: 'cms-writer', action: 'write', scopeNames: 0 },
  //   { roleName: 'cms-writer', action: 'delete', scopeNames: 0 },
  //   { roleName: 'cms-writer', action: 'read', scopeNames: 'authenticated' },
  //   { roleName: 'root', action: 'read', scopeNames: 'authenticated' },
  // ];
  async addRoleRightBatch({ module, atomClassName, roleRights }: any) {
    // module
    module = module || this.moduleScope;
    // const _module = this.ctx.app.meta.modules[module];
    // atomClass
    const atomClass = await this.ctx.bean.atomClass.get({ module, atomClassName });
    // roleRights
    if (!roleRights || !roleRights.length) return;
    for (const roleRight of roleRights) {
      // role
      let role;
      if (roleRight.roleAtomId || roleRight.roleId) {
        role = await this.self._forceRole({
          roleAtomId: roleRight.roleAtomId,
          roleId: roleRight.roleId,
        });
      } else {
        role = await this.parseRoleName({ roleName: roleRight.roleName, force: true });
      }
      // scope
      const scope = await this._parseScopeNames({ scopeNames: roleRight.scopeNames });
      // add role right
      const actionCode = this.ctx.bean.atomAction.parseActionCode({
        action: roleRight.action,
        atomClass: {
          module,
          atomClassName,
        },
      });
      await this.addRoleRight({
        roleId: role.id,
        atomClassId: atomClass.id,
        action: actionCode,
        scope,
      });
    }
  }

  async _parseScopeNames({ scopeNames }: any) {
    let scope;
    if (scopeNames === undefined || scopeNames === null) {
      scope = [];
    } else if (scopeNames === 0) {
      scope = 0;
    } else {
      scope = [];
      const _scopeNames = Array.isArray(scopeNames) ? scopeNames : scopeNames.split(',');
      for (const scopeName of _scopeNames) {
        let roleScopeId;
        if (typeof scopeName === 'number') {
          roleScopeId = scopeName;
        } else {
          const roleScope = await this.parseRoleName({ roleName: scopeName, force: false });
          roleScopeId = roleScope.id;
        }
        scope.push(roleScopeId);
      }
    }
    return scope;
  }

  // role rights
  async roleRights({ roleAtomId, roleId, page }: any) {
    roleId = await this.self._forceRoleId({ roleAtomId, roleId });
    page = this.ctx.bean.util.page(page, false);
    const _limit = this.ctx.model._limit(page.size, page.index);
    const items = await this.ctx.model.query(
      `
        select 
          a.*,
          b.module,b.atomClassName,
          c.name as actionName,c.bulk as actionBulk,c.actionMode,
          d.atomName as flowDefName 
        from aRoleRight a
          inner join aAtomClass b on a.atomClassId=b.id
          inner join aAtomAction c on a.atomClassId=c.atomClassId and a.action=c.code
          left join aAtom d on c.flowKey=d.atomStaticKey and d.atomStage=1
        where a.iid=? and a.roleId=?
        order by b.module,a.atomClassId,a.action
        ${_limit}
        `,
      [this.ctx.instance.id, roleId],
    );
    // adjust
    await this._adjustItems({ items });
    // ok
    return items;
  }

  // role spreads
  async roleSpreads({ roleAtomId, roleId, page }: any) {
    roleId = await this.self._forceRoleId({ roleAtomId, roleId });
    page = this.ctx.bean.util.page(page, false);
    const _limit = this.ctx.model._limit(page.size, page.index);
    const items = await this.ctx.model.query(
      `
        select 
          d.*,
          d.id as roleExpandId,
          a.id as roleRightId,a.scope,
          b.module,b.atomClassName,
          c.code as actionCode,c.name as actionName,c.bulk as actionBulk,c.actionMode,
          e.roleName as roleNameBase,
          f.atomName as flowDefName 
        from aRoleRight a
          inner join aAtomClass b on a.atomClassId=b.id
          inner join aAtomAction c on a.atomClassId=c.atomClassId and a.action=c.code
          inner join aRoleExpand d on a.roleId=d.roleIdBase
          inner join aRole e on d.roleIdBase=e.id
          left join aAtom f on c.flowKey=f.atomStaticKey and f.atomStage=1
        where d.iid=? and d.roleId=?
        order by b.module,a.atomClassId,a.action
        ${_limit}
        `,
      [this.ctx.instance.id, roleId],
    );
    // adjust
    await this._adjustItems({ items });
    // ok
    return items;
  }

  // atom rights of user
  async atomRightsOfUser({ userAtomId, userId, page }: any) {
    userId = await this.ctx.bean.user._forceUserId({ userAtomId, userId });
    page = this.ctx.bean.util.page(page, false);
    const _limit = this.ctx.model._limit(page.size, page.index);
    const items = await this.ctx.model.query(
      `
        select 
          a.*,
          b.module,b.atomClassName,
          c.code as actionCode,c.name as actionName,c.bulk as actionBulk,c.actionMode,
          e.roleName as roleNameBase,
          f.atomName as flowDefName 
        from aViewUserRightAtomClass a
          inner join aAtomClass b on a.atomClassId=b.id
          inner join aAtomAction c on a.atomClassId=c.atomClassId and a.action=c.code
          inner join aRole e on a.roleIdBase=e.id
          left join aAtom f on c.flowKey=f.atomStaticKey and f.atomStage=1 
        where a.iid=? and a.userIdWho=?
        order by b.module,a.atomClassId,a.action
        ${_limit}
        `,
      [this.ctx.instance.id, userId],
    );
    // adjust
    await this._adjustItems({ items });
    // ok
    return items;
  }

  async _adjustItems({ items, actionNameKey = 'actionName' }: any) {
    // scope
    await this._adjustAtomRightsScopeRoles({ items });
    // locale
    await this._adjustAtomRightsLocale({ items });
    // actionFlows
    await this._adjustFlowActionsLocale({ items, actionNameKey });
  }

  async _adjustAtomRightsScopeRoles({ items }: any) {
    for (const item of items) {
      const scope = JSON.parse(item.scope);
      item.scopeRoles = await this._scopeRoles({ scope });
    }
  }

  async _adjustAtomRightsLocale({ items }: any) {
    for (const item of items) {
      // roleNameBase
      if (item.roleNameBase) {
        item.roleNameBaseLocale = this.ctx.text(item.roleNameBase);
      }
    }
  }

  async _scopeRoles({ scope }: any) {
    if (!scope || scope.length === 0) return null;
    const items = await this.ctx.model.query(
      `
            select a.* from aRole a
              where a.iid=? and a.id in (${scope.join(',')})
            `,
      [this.ctx.instance.id],
    );
    return this._translateRoleNamesLocale({ items });
  }

  _translateRoleNamesLocale({ items }: any) {
    for (const item of items) {
      item.roleNameLocale = this.ctx.text(item.roleName);
    }
    return items;
  }

  // actionFlows
  async _adjustFlowActionsLocale({ items, actionNameKey }: any) {
    for (const item of items) {
      if (item.actionMode === 1) {
        item[`${actionNameKey}Locale`] = this.ctx.text(item[actionNameKey] || 'Unnamed');
        item.flowDefNameLocale = this.ctx.text(item.flowDefName);
      }
    }
  }
}
