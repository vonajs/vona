module.exports = class Comment extends module.meta.class.Model {
  constructor() {
    super({ table: 'aComment', options: { disableDeleted: false } });
  }
};
