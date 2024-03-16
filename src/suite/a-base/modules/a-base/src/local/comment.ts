import { BeanBase, Local } from '@cabloy/core';

import trimHtml from '@zhennann/trim-html';
import { ScopeModule } from '../resource/this.js';
import { Knex } from 'cabloy-module-api-a-database';

@Local()
export class LocalComment extends BeanBase<ScopeModule> {
  get modelAtom() {
    return this.scope.model.atom;
  }

  get modelComment() {
    return this.scope.model.comment;
  }

  get modelCommentHeart() {
    return this.scope.model.commentHeart;
  }

  get modelCommentView() {
    return this.scope.model.commentView;
  }

  async list({ key, options, user }: any) {
    const self = this;
    const where = Object.assign({}, options.where, {
      'a.atomId': key.atomId,
    });
    const builder = this.bean.model
      .builderSelect('aViewComment as a')
      .select([
        'a.*',
        function (this: Knex.QueryBuilder) {
          return this.select('d2.heart')
            .from('aCommentHeart as d2')
            .where({
              'd2.iid': self.bean.model.ref('a.iid'),
              'd2.commentId': self.bean.model.ref('a.id'),
              'd2.userId': user.id,
            })
            .as('heart');
        },
      ])
      .where(where);
    this.bean.model.buildOrders(builder, options.orders);
    this.bean.model.buildPage(builder, options.page);
    return await builder;
  }

  async count({ key, options, user: _user }: any) {
    const where = Object.assign({}, options.where, {
      atomId: key.atomId,
    });
    const builder = this.bean.model.builderSelect('aViewComment as a').count().where(where);
    return this.bean.model.extractCount(await builder);
  }

  async item({ /* key,*/ data: { commentId }, user }) {
    const self = this;
    const where = {
      'a.id': commentId,
    };
    const builder = this.bean.model
      .builderSelect('aViewComment as a')
      .select([
        'a.*',
        function (this: Knex.QueryBuilder) {
          return this.select('d2.heart')
            .from('aCommentHeart as d2')
            .where({
              'd2.iid': self.bean.model.ref('a.iid'),
              'd2.commentId': self.bean.model.ref('a.id'),
              'd2.userId': user.id,
            })
            .as('heart');
        },
      ])
      .where(where)
      .limit(1);
    return (await builder)[0];
  }

  async save({ key, data, user }: any) {
    if (!data.commentId) {
      return await this.save_add({ key, data, user });
    }
    return await this.save_edit({ key, data, user });
  }

  async save_edit({ key, data: { commentId, content }, user }) {
    // comment
    const item = await this.modelCommentView.get({ id: commentId });
    if (!item) this.ctx.throw(403);
    if (key.atomId !== item.atomId || item.userId !== user.id) this.ctx.throw(403);
    // html
    const html = await this._renderContent({
      atomId: key.atomId,
      content,
      replyContent: item.replyContent,
      replyUserName: item.replyUserName,
    });
    // summary
    const summary = this._trimHtml(html);
    // update
    await this.modelComment.update({
      id: commentId,
      content,
      summary: summary.html,
      html,
      updatedAt: new Date(),
    });
    // publish
    await this._publish({
      atomId: key.atomId,
      commentId,
      replyId: item.replyId,
      replyUserId: item.replyUserId,
      user,
      mode: 'edit',
    });
    // ok
    return {
      action: 'update',
      atomId: key.atomId,
      commentId,
    };
  }

  async save_add({ key, data: { replyId, content }, user }) {
    // sorting
    const list = await this.bean.model.builderSelect('aComment').max('sorting').where({
      atomId: key.atomId,
    });
    const sorting = this.bean.model.extractFirstNumber(list, 0).plus(1);
    // reply
    let reply;
    if (replyId) {
      reply = await this.modelCommentView.get({ id: replyId });
    }
    // replyUserId
    const replyUserId = reply ? reply.userId : 0;
    // replyContent
    let replyContent = '';
    if (reply) {
      replyContent = this._fullContent({
        content: reply.content,
        replyContent: reply.replyContent,
        replyUserName: reply.replyUserName,
      });
    }
    // html
    const html = await this._renderContent({
      atomId: key.atomId,
      content,
      replyContent,
      replyUserName: reply && reply.userName,
    });
    // summary
    const summary = this._trimHtml(html);
    // create
    const res = await this.modelComment.insert({
      atomId: key.atomId,
      userId: user.id,
      sorting,
      heartCount: 0,
      replyId,
      replyUserId,
      replyContent,
      content,
      summary: summary.html,
      html,
    });
    const commentId = res[0];
    // commentCount
    await this.ctx.bean.atom.comment({ key, atom: { comment: 1 }, user });
    // publish
    await this._publish({ atomId: key.atomId, commentId, replyId, replyUserId, user, mode: 'add' });
    // ok
    return {
      action: 'create',
      atomId: key.atomId,
      commentId,
    };
  }

  async delete({ key, data: { commentId }, user }) {
    // comment
    const item = await this.modelComment.get({ id: commentId });
    if (!item) this.ctx.throw(403);
    // check right
    let canDeleted: any = key.atomId === item.atomId && item.userId === user.id;
    if (!canDeleted) {
      canDeleted = await this.ctx.bean.resource.checkRightResource({
        atomStaticKey: 'a-base:deleteComment',
        user,
      });
    }
    if (!canDeleted) this.ctx.throw(403);
    // delete hearts
    await this.modelCommentHeart.delete({ commentId });
    // delete comment
    await this.modelCommentHeart.delete({ id: commentId });
    // commentCount
    await this.ctx.bean.atom.comment({ key, atom: { comment: -1 }, user });
    // ok
    return {
      action: 'delete',
      atomId: key.atomId,
      commentId,
    };
  }

  async heart({ key, data: { commentId, heart }, user }) {
    let diff = 0;
    // check if exists
    const _heart = await this.modelCommentHeart.get({
      userId: user.id,
      atomId: key.atomId,
      commentId,
    });
    if (_heart && !heart) {
      diff = -1;
      // delete
      await this.modelCommentHeart.delete({
        id: _heart.id,
      });
    } else if (!_heart && heart) {
      diff = 1;
      // new
      await this.modelCommentHeart.insert({
        userId: user.id,
        atomId: key.atomId,
        commentId,
        heart: 1,
      });
    }
    // get
    const item = await this.modelComment.get({ id: commentId });
    if (!item) this.ctx.throw(403);
    let heartCount = item.heartCount;
    if (diff !== 0) {
      heartCount += diff;
      await this.modelComment.update({
        id: commentId,
        heartCount,
      });
    }
    // ok
    return {
      action: 'heart',
      atomId: key.atomId,
      commentId,
      heart,
      heartCount,
    };
  }

  // publish
  async _publish({ atomId, commentId, replyId, replyUserId, user, mode }: any) {
    const userIdsTo: any = {};
    // 1. atom.userIdUpdated
    const atom = await this.modelAtom.get({ id: atomId });
    if (!atom) this.ctx.throw(403);
    const userIdUpdated = atom.userIdUpdated;
    if (userIdUpdated !== user.id) {
      const title = await this._publishTitle({ userId: userIdUpdated, replyId: 0, mode });
      userIdsTo[userIdUpdated] = { title };
    }
    // 2. replyUser
    if (replyUserId && replyUserId !== user.id) {
      const title = await this._publishTitle({ userId: replyUserId, replyId, mode });
      userIdsTo[replyUserId] = { title };
    }
    // actionPath
    const actionPath = `/a/basefront/comment/list?atomId=${atomId}&commentId=${commentId}`;
    // publish
    for (const userIdTo in userIdsTo) {
      const info = userIdsTo[userIdTo];
      const message = {
        userIdTo,
        content: {
          issuerId: user.id,
          issuerName: user.userName,
          issuerAvatar: user.avatar,
          title: info.title,
          body: atom.atomName,
          actionPath,
          params: {
            atomId,
            commentId,
            replyId,
          },
        },
      };
      await this.ctx.bean.io.publish({
        message,
        messageClass: {
          module: 'a-base',
          messageClassName: 'comment',
        },
      });
    }
  }

  async _publishTitle({ userId, replyId, mode }: any) {
    const user = await this.ctx.bean.user.get({ id: userId });
    const locale = user?.locale;
    let title;
    if (mode === 'add') {
      // add
      if (replyId === 0) {
        title = this.ctx.text.locale(locale, 'CommentPublishTitleNewComment');
      } else {
        title = this.ctx.text.locale(locale, 'CommentPublishTitleReplyComment');
      }
    } else {
      // edit
      if (replyId === 0) {
        title = this.ctx.text.locale(locale, 'CommentPublishTitleEditComment');
      } else {
        title = this.ctx.text.locale(locale, 'CommentPublishTitleEditReplyComment');
      }
    }
    return title;
  }

  _fullContent({ content, replyContent, replyUserName }: any) {
    if (!replyContent) return content;
    const sep = this._getMarkdownSep(replyContent);
    return `${content}

> \`${replyUserName}\`:

${sep} comment-quot
${replyContent}
${sep}

`;
  }

  _getMarkdownSep(replyContent) {
    const posA = replyContent.indexOf(':::');
    if (posA === -1) return ':::';
    let posB = posA + 3;
    while (replyContent[posB] === ':') {
      ++posB;
    }
    return ':'.repeat(posB - posA + 1);
  }

  async _renderContent({ atomId, content, replyContent, replyUserName }: any) {
    const fullContent = this._fullContent({ content, replyContent, replyUserName });
    return (<any>await this.ctx.bean).markdown.render({
      host: { atomId },
      content: fullContent,
      locale: this.ctx.locale,
    });
  }

  _trimHtml(html) {
    return trimHtml(html, this.ctx.config.comment.trim);
  }
}
