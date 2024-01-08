module.exports = class UserRoleRef extends module.meta.class.Model {
  constructor() {
    super({ table: 'aUserRoleRef', options: { disableDeleted: true } });
  }
};
