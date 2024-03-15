import { __ThisModule__ } from '../../resource/this.js';
import { BeanRoleAtomRights } from './bean.role_atomRights.js';

export class BeanRoleBuild extends BeanRoleAtomRights {
  // set dirty
  async setDirty(dirty) {
    // when build done, clear summer
    if (!dirty) {
      await this.ctx.bean.atomRightAux.clearSummersOfRole();
      await this.ctx.bean.atomRightAux.clearSummersOfUser();
      // await this.ctx.bean.fields.clearSummer_fieldsRightOfAtomClass();
      await this.ctx.bean.fields.clearSummer_fieldsRightOfUser();
    }
    // status
    await this.ctx.bean.status.module(__ThisModule__).set('roleDirty', dirty);
  }

  async getDirty() {
    return await this.ctx.bean.status.module(__ThisModule__).get('roleDirty');
  }

  // build roles
  async build(options?) {
    options = options || {};
    const progressId = options.progressId;
    // check dirty
    const dirty = await this.getDirty();
    if (!dirty) {
      // done
      if (progressId) {
        await this.ctx.bean.progress.done({ progressId });
      }
      return;
    }
    // queue
    await this.ctx.meta.util.queuePushAsync({
      module: __ThisModule__,
      queueName: 'roleBuild',
      data: { options },
    });
  }

  async _buildQueue(options) {
    options = options || {};
    const progressId = options.progressId;
    // check dirty again
    const dirty = await this.getDirty();
    if (!dirty) {
      // done
      if (progressId) {
        await this.ctx.bean.progress.done({ progressId });
      }
      return;
    }
    // total
    let total: number = 0;
    if (progressId) {
      total = (await this.model.count()).toNumber();
    }
    // progress
    const progress = { progressId, total, progress: 0 };
    try {
      // iid
      const iid = this.ctx.instance.id;
      // remove
      await this._buildRolesRemove();
      // add
      await this._buildRolesAdd({ iid, roleIdParent: 0 }, progress);
      // setDirty
      await this.setDirty(false);
      // done
      if (progressId) {
        await this.ctx.bean.progress.done({ progressId });
      }
    } catch (err: any) {
      // error
      if (progressId) {
        await this.ctx.bean.progress.error({ progressId, message: err.message });
      }
      throw err;
    }
  }

  async _buildRolesRemove() {
    await this.modelRoleRef.delete();
    await this.modelRoleIncRef.delete();
    await this.modelRoleExpand.delete();
  }

  async _buildRolesAdd({ iid, roleIdParent }, progress) {
    const list = await this.modelRole.select({
      columns: ['id', 'roleName', 'catalog', 'atomId'],
      where: { roleIdParent },
    });
    for (const item of list) {
      // info
      const roleId = item.id;
      const roleAtomId = item.atomId;
      const catalog = item.catalog;
      // build
      await this._buildRoleRef({ iid, roleId });
      await this._buildRoleIncRef({ iid, roleId });
      await this._buildRoleExpand({ iid, roleId, roleAtomId });
      // catalog
      if (catalog === 1) {
        await this._buildRolesAdd({ iid, roleIdParent: roleId }, progress);
      }
      // progress
      if (progress.progressId) {
        await this.ctx.bean.progress.update({
          progressId: progress.progressId,
          progressNo: 0,
          total: progress.total,
          progress: progress.progress++,
          text: item.roleName,
        });
      }
    }
  }

  async _buildRoleRef({ iid, roleId }: any) {
    let level = 0;
    let roleIdParent = roleId;
    // loop
    while (level !== -1) {
      await this.bean.model.query(
        `insert into aRoleRef(iid,roleId,roleIdParent,level)
             values(${iid},${roleId},${roleIdParent},${level})
          `,
      );
      const item = await this.bean.model.queryOne(
        `select a.roleIdParent from aRole a where a.iid=${iid} and a.id=${roleIdParent}`,
      );
      if (!item || !item.roleIdParent) {
        level = -1;
      } else {
        roleIdParent = item.roleIdParent;
        level++;
      }
    }
  }

  async _buildRoleIncRef({ iid, roleId }: any) {
    await this.bean.model.query(
      `insert into aRoleIncRef(iid,roleId,roleIdInc,roleIdSrc)
            select ${iid},${roleId},a.roleIdInc,a.roleId from aRoleInc a
              where a.iid=${iid} and a.roleId in (select b.roleIdParent from aRoleRef b where b.iid=${iid} and b.roleId=${roleId})
        `,
    );
  }

  async _buildRoleExpand({ iid, roleId, roleAtomId }: any) {
    await this.bean.model.query(
      `insert into aRoleExpand(iid,roleAtomId,roleId,roleIdBase)
            select a.iid,${roleAtomId},a.roleId,a.roleIdParent from aRoleRef a
              where a.iid=${iid} and a.roleId=${roleId}
        `,
    );
    await this.bean.model.query(
      `insert into aRoleExpand(iid,roleAtomId,roleId,roleIdBase)
            select a.iid,${roleAtomId},a.roleId,a.roleIdInc from aRoleIncRef a
              where a.iid=${iid} and a.roleId=${roleId}
        `,
    );
  }
}
