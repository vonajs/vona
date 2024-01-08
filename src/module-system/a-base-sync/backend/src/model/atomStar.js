module.exports = class AtomStar extends module.meta.class.Model {
  constructor() {
    super({ table: 'aAtomStar', options: { disableDeleted: true } });
  }
};
