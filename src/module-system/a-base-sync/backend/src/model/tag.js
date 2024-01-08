module.exports = class Tag extends module.meta.class.Model {
  constructor() {
    super({ table: 'aTag', options: { disableDeleted: false } });
  }
};
