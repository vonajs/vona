module.exports = class UserRole extends module.meta.class.Model {
  constructor() {
    super({ table: 'aUserRole', options: { disableDeleted: true } });
  }
};
