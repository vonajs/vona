module.exports = class RoleInc extends module.meta.class.Model {
  constructor() {
    super({ table: 'aRoleInc', options: { disableDeleted: true } });
  }
};
