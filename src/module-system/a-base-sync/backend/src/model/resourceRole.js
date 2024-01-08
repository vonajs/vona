module.exports = class ResourceRole extends module.meta.class.Model {
  constructor() {
    super({ table: 'aResourceRole', options: { disableDeleted: true } });
  }
};
