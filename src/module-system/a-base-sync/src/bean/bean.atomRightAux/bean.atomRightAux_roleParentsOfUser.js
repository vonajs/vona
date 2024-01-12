const moduleInfo = module.info;
module.exports = class AtomRightAux {
  async getRoleParentsOfUser({ userId }) {
    // cache
    return await this.ctx.bean.summer.get({ module: moduleInfo.relativeName, name: 'roleParentsOfUser' }, { userId });
  }

  async clearSummer_roleParentsOfUser() {
    await this.ctx.bean.summer.clear({ module: moduleInfo.relativeName, name: 'roleParentsOfUser' });
  }

  async __getRoleParentsOfUserRaw({ userId }) {
    return await this.ctx.model.query(
      `
          select a.roleId,b.roleName,b.roleTypeCode from aUserRole a
            inner join aRole b on a.roleId=b.id
            where a.iid=? and a.userId=?
            order by a.roleId desc
        `,
      [this.ctx.instance.id, userId]
    );
  }
};
