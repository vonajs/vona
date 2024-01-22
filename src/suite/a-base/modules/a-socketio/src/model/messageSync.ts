module.exports = class MessageSync extends module.meta.class.Model {
  constructor() {
    super({ table: 'aSocketIOMessageSync', options: { disableDeleted: false } });
  }
};
