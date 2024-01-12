module.exports = class RoleRightRef extends module.meta.class.Model {
  constructor() {
    super({ table: 'aRoleRightRef', options: { disableDeleted: true } });
  }
};
