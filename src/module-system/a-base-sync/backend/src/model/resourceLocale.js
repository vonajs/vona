module.exports = class ResourceLocale extends module.meta.class.Model {
  constructor() {
    super({ table: 'aResourceLocale', options: { disableDeleted: true } });
  }
};
