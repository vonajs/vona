module.exports = class UserAgent extends module.meta.class.Model {
  constructor() {
    super({ table: 'aUserAgent', options: { disableDeleted: true } });
  }
};
