module.exports = class AtomLabel extends module.meta.class.Model {
  constructor() {
    super({ table: 'aAtomLabel', options: { disableDeleted: true } });
  }
};
