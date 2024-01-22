module.exports = class Message extends module.meta.class.Model {
  constructor() {
    super({ table: 'aSocketIOMessage', options: { disableDeleted: false } });
  }
};
