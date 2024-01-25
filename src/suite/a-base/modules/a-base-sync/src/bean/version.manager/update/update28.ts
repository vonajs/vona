module.exports = class VersionUpdate {
  get modelResourceRole() {
    return this.ctx.model.module(moduleInfo.relativeName).resourceRole;
  }

  async run(options) {
    // aResourceRole: add roleAtomId
    const sql = `
        ALTER TABLE aResourceRole
          Add COLUMN roleAtomId int(11) DEFAULT '0'
                  `;
    await this.ctx.model.query(sql);
    // adjustRoleRights
    await this._adjustResourceRoles(options);
  }

  async _adjustResourceRoles(options) {
    // all instances
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async ({ ctx }) => {
          const selfInstance = ctx.bean._newBean(VersionUpdate);
          await selfInstance._adjustResourceRolesInstance();
        },
      });
    }
  }

  async _adjustResourceRolesInstance() {
    // select all resource roles
    const resourceRoles = await this.modelResourceRole.select();
    for (const resourceRole of resourceRoles) {
      const roleId = resourceRole.roleId;
      const role = await this.ctx.bean.role.get({ id: roleId });
      const roleAtomId = role.atomId;
      await this.modelResourceRole.update({ id: resourceRole.id, roleAtomId });
    }
  }
};
