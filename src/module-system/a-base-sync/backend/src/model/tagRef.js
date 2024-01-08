module.exports = class TagRef extends module.meta.class.Model {
  constructor() {
    super({ table: 'aTagRef', options: { disableDeleted: true } });
  }
};
