module.exports = class AtomLabelRef extends module.meta.class.Model {
  constructor() {
    super({ table: 'aAtomLabelRef', options: { disableDeleted: true } });
  }
};
