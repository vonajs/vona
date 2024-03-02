import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aComment
    await this.bean.model.schema.createTable('aComment', function (table) {
      table.basicFields();
      table.atomId();
      table.userId();
      table.int0('sorting');
      table.int0('heartCount');
      table.int0('replyId');
      table.int0('replyUserId');
      table.text('replyContent');
      table.text('content');
      table.text('summary');
      table.text('html');
    });

    // aViewComment
    await this.bean.model.schema.createView('aViewComment', view => {
      view.as(
        this.bean.model
          .builder('aComment as a')
          .select(['a.*', 'b.userName', 'b.avatar', 'c.userName as replyUserName'])
          .leftJoin('aUser as b', { 'a.userId': 'b.id' })
          .leftJoin('aUser as c', { 'a.replyUserId': 'c.id' }),
      );
    });

    // aCommentHeart
    await this.bean.model.schema.createTable('aCommentHeart', function (table) {
      table.basicFields();
      table.userId();
      table.atomId();
      table.int0('commentId');
      table.int1('heart');
    });

    // aAtom
    await this.bean.model.schema.alterTable('aAtom', function (table) {
      table.int1('allowComment');
      table.int0('starCount');
      table.int0('commentCount');
      table.int0('attachmentCount');
      table.int0('readCount');
    });
  }
}
