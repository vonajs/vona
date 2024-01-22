module.exports = class RoleRef extends module.meta.class.Model {
  constructor() {
    super({ table: 'aRoleRef', options: { disableDeleted: true } });
  }

  async getParent({ roleId, level = 1 }) {
    const roleRef = await this.get({
      roleId,
      level,
    });
    return roleRef;
  }
};
