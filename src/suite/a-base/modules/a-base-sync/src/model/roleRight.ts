module.exports = class RoleRight extends module.meta.class.Model {
  constructor() {
    super({ table: 'aRoleRight', options: { disableDeleted: true } });
  }
};
