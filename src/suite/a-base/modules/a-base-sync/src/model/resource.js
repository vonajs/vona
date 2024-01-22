module.exports = class Resource extends module.meta.class.Model {
  constructor() {
    super({ table: 'aResource', options: { disableDeleted: false } });
  }
};
