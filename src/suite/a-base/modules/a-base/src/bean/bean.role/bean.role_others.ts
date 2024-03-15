import { IModelSelectParamsJoin, IModelSelectParamsOrder } from 'cabloy-module-api-a-database';
import { BeanRoleIncludes } from './bean.role_includes.js';

//

export class BeanRoleOthers extends BeanRoleIncludes {
  async getUserRolesDirect({ userId }: any) {
    const list = await this.modelRole.select({
      alias: 'a',
      joins: [['leftJoin', 'aUserRole as b', { 'a.id': 'b.roleId' }]],
      where: {
        'b.userId': userId,
      },
    });
    return list;
  }

  async getUserRolesParent({ userId }: any) {
    const list = await this.modelRole.select({
      alias: 'a',
      joins: [['leftJoin', 'aViewUserRoleRef as b', { 'a.id': 'b.roleIdParent' }]],
      where: {
        'b.userId': userId,
      },
    });
    return list;
  }

  async getUserRolesExpand({ userId }: any) {
    const list = await this.modelRole.select({
      alias: 'a',
      joins: [['leftJoin', 'aViewUserRoleExpand as b', { 'a.id': 'b.roleIdBase' }]],
      where: {
        'b.userId': userId,
      },
    });
    return list;
  }

  async userInRoleDirect({ userId, roleId }: any) {
    const count = await this.modelUserRole.count({
      where: {
        userId,
        roleId,
      },
    });
    return count.gt(0);
  }

  async userInRoleParent({ userId, roleId }: any) {
    const count = await this.bean.model.count(
      'aViewUserRoleRef',
      {
        where: {
          userId,
          roleIdParent: roleId,
        },
      },
      { disableDeleted: true },
    );
    return count.gt(0);
  }

  async userInRoleExpand({ userId, roleId }: any) {
    const count = await this.bean.model.count(
      'aViewUserRoleExpand',
      {
        where: {
          userId,
          roleIdBase: roleId,
        },
      },
      { disableDeleted: true },
    );
    return count.gt(0);
  }

  async usersOfRoleDirect({ roleId, disabled, page, removePrivacy }: any) {
    // page
    page = this.ctx.bean.util.page(page, false);
    // fields
    const fields = await this.ctx.bean.user.getFieldsSelect({ removePrivacy, alias: 'a' });
    // joins
    const joins: IModelSelectParamsJoin[] = [['innerJoin', 'aUserRole as b', { 'a.id': 'b.userId' }]];
    // where
    const where: any = {
      'b.roleId': roleId,
    };
    if (disabled !== undefined) {
      where['a.disabled'] = parseInt(disabled);
    }
    // orders
    const orders: IModelSelectParamsOrder[] = [['a.userName']];
    // select
    const items = await this.bean.user.model.select({
      alias: 'a',
      columns: fields,
      joins,
      where,
      orders,
      page,
    });
    return items;
  }

  async usersOfRoleParent({ roleId, disabled, page, removePrivacy, query }: any) {
    // page
    page = this.ctx.bean.util.page(page, false);
    // fields
    const fields = await this.ctx.bean.user.getFieldsSelect({ removePrivacy, alias: 'a' });
    // joins
    const joins: IModelSelectParamsJoin[] = [['innerJoin', 'aViewUserRoleRef as b', { 'a.id': 'b.userId' }]];
    // where
    const where: any = {
      'b.roleIdParent': roleId,
    };
    if (disabled !== undefined) {
      where['a.disabled'] = parseInt(disabled);
    }
    if (query) {
      where.__or__ = [
        { 'a.userName': { op: 'like', val: query } },
        { 'a.realName': { op: 'like', val: query } },
        { 'a.mobile': { op: 'like', val: query } },
      ];
    }
    // orders
    const orders: IModelSelectParamsOrder[] = [['a.userName']];
    // select
    const items = await this.bean.user.model.select({
      alias: 'a',
      columns: fields,
      joins,
      where,
      orders,
      page,
    });
    return items;
  }

  async usersOfRoleExpand({ roleId, disabled, page, removePrivacy }: any) {
    // page
    page = this.ctx.bean.util.page(page, false);
    // fields
    const fields = await this.ctx.bean.user.getFieldsSelect({ removePrivacy, alias: 'a' });
    // joins
    const joins: IModelSelectParamsJoin[] = [['innerJoin', 'aViewUserRoleExpand as b', { 'a.id': 'b.userId' }]];
    // where
    const where: any = {
      'b.roleIdBase': roleId,
    };
    if (disabled !== undefined) {
      where['a.disabled'] = parseInt(disabled);
    }
    // orders
    const orders: IModelSelectParamsOrder[] = [['a.userName']];
    // select
    const items = await this.bean.user.model.select({
      alias: 'a',
      columns: fields,
      joins,
      where,
      orders,
      page,
    });
    return items;
  }

  async _forceRoleAtomId({ roleAtomId, roleId }: any) {
    if (!roleAtomId) {
      const item = await this.get({ id: roleId });
      roleAtomId = item!.atomId;
    }
    return roleAtomId;
  }

  async _forceRoleId({ roleAtomId, roleId }: any) {
    if (!roleId) {
      const item = await this.get({ atomId: roleAtomId });
      roleId = item!.id;
    }
    return roleId;
  }

  async _forceRole({ roleAtomId, roleId }: any) {
    if (roleAtomId) {
      return await this.get({ atomId: roleAtomId });
    }
    return await this.get({ id: roleId });
  }

  async _forceRoleAndCheckRightRead({ roleAtomId, roleId, user }: any) {
    const role = await this._forceRole({ roleAtomId, roleId });
    if (!role) this.ctx.throw(403);
    if (!user || user.id === 0) return role;
    // check
    const res = await this.ctx.bean.atom.checkRightRead({
      atom: { id: role.atomId },
      user,
    });
    if (!res) this.ctx.throw(403);
    return role;
  }

  async _checkRightActionOfRole({ roleAtomId, roleId, action, user }: any) {
    if (!user || user.id === 0) return true;
    // roleId
    roleAtomId = await this._forceRoleAtomId({ roleAtomId, roleId });
    // check
    const res = await this.ctx.bean.atom.checkRightAction({
      atom: { id: roleAtomId },
      action,
      user,
    });
    return !!res;
  }
}
