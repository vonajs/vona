module.exports = class UserRoleIncRef extends module.meta.class.Model {
  constructor() {
    super({ table: 'aUserRoleIncRef', options: { disableDeleted: true } });
  }
};
