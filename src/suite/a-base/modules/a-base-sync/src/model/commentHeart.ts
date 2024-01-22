module.exports = class CommentHeart extends module.meta.class.Model {
  constructor() {
    super({ table: 'aCommentHeart', options: { disableDeleted: true } });
  }
};
