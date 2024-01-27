import { BeanBase, Local } from '@cabloy/core';
import { __ThisModule__ } from '../resource/this.js';

@Local()
export class LocalDashboard extends BeanBase {
  get atomClass() {
    return {
      module: __ThisModule__,
      atomClassName: 'dashboard',
    };
  }

  get sequence() {
    return this.ctx.bean.sequence.module(__ThisModule__);
  }

  async itemByKey({ atomStaticKey, user }: any) {
    if (!atomStaticKey) return this.ctx.throw.module('a-base', 1002);
    // get atomId
    const atomClass = await this.ctx.bean.atomClass.get(this.atomClass);
    const atom = await this.ctx.bean.atom.modelAtom.get({
      atomClassId: atomClass.id,
      atomStaticKey,
      atomStage: 1,
    });
    if (!atom) return this.ctx.throw.module('a-base', 1002);
    const atomId = atom.id;
    // check resource right
    const res = await this.ctx.bean.resource.checkRightResource({ resourceAtomId: atomId, user });
    if (!res) this.ctx.throw(403);
    // item
    return await this.item({ dashboardAtomId: atomId, user });
  }

  async item({ dashboardAtomId, dashboardUserCheck = true, user }: any) {
    // try get default of dashboardUser
    if (dashboardUserCheck) {
      const dashboardUser = await this.ctx.model.dashboardUser.get({
        dashboardAtomId,
        dashboardDefault: 1,
        userId: user.id,
      });
      if (dashboardUser) {
        return { dashboardUser };
      }
    }
    // get system
    const dashboardSystem = await this.ctx.bean.resource.read({
      key: { atomId: dashboardAtomId },
      user,
    });
    // ok
    return { dashboardSystem };
  }

  async loadItemUser({ dashboardUserId, user }: any) {
    return await this.ctx.model.dashboardUser.get({
      id: dashboardUserId,
      userId: user.id,
    });
  }

  async saveItemUser({ dashboardUserId, content, user }: any) {
    await this.ctx.model.dashboardUser.update(
      {
        content,
      },
      {
        where: {
          id: dashboardUserId,
          userId: user.id,
        },
      },
    );
  }

  async changeItemUserName({ dashboardUserId, dashboardName, user }: any) {
    await this.ctx.model.dashboardUser.update(
      {
        dashboardName,
      },
      {
        where: {
          id: dashboardUserId,
          userId: user.id,
        },
      },
    );
  }

  async deleteItemUser({ dashboardUserId, user }: any) {
    await this.ctx.model.dashboardUser.delete({
      id: dashboardUserId,
      userId: user.id,
    });
  }

  async createItemUser({ dashboardAtomId, user }: any) {
    // get system
    const dashboardSystem = await this.ctx.bean.resource.read({
      key: { atomId: dashboardAtomId },
      user,
    });
    // name
    const id = await this.sequence.next('dashboard');
    const dashboardName = `${dashboardSystem.atomNameLocale}-${id}`;
    // update old default
    await this.ctx.model.dashboardUser.update(
      {
        dashboardDefault: 0,
      },
      {
        where: {
          userId: user.id,
          dashboardAtomId,
        },
      },
    );
    // insert
    const data = {
      userId: user.id,
      dashboardDefault: 1,
      dashboardAtomId,
      dashboardName,
      content: dashboardSystem.content,
    };
    const res = await this.ctx.model.dashboardUser.insert(data);
    data.id = res.insertId;
    // ok
    return data;
  }

  async itemUsers({ dashboardAtomId, user }: any) {
    return await this.ctx.model.dashboardUser.select({
      columns: [
        'id',
        'createdAt',
        'updatedAt',
        'deleted',
        'iid',
        'userId',
        'dashboardDefault',
        'dashboardAtomId',
        'dashboardName',
      ],
      where: {
        userId: user.id,
        dashboardAtomId,
      },
      orders: [['dashboardName', 'asc']],
    });
  }

  async changeItemUserDefault({ dashboardAtomId, dashboardUserId, user }: any) {
    await this.ctx.model.dashboardUser.update(
      {
        dashboardDefault: 0,
      },
      {
        where: {
          userId: user.id,
          dashboardAtomId,
        },
      },
    );
    await this.ctx.model.dashboardUser.update({
      id: dashboardUserId,
      dashboardDefault: 1,
    });
  }
}
