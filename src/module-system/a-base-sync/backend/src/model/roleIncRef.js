module.exports = class RoleIncRef extends module.meta.class.Model {
  constructor() {
    super({ table: 'aRoleIncRef', options: { disableDeleted: true } });
  }
};
