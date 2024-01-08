module.exports = class CommentView extends module.meta.class.Model {
  constructor() {
    super({ table: 'aViewComment', options: { disableDeleted: false } });
  }
};
