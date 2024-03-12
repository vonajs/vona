import { EntityShare } from '../index.js';
import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

@Bean()
export class BeanShare extends BeanBase<ScopeModule> {
  get modelShare() {
    return this.scope.model.share;
  }

  get modelShareRecordPV() {
    return this.scope.model.shareRecordPV;
  }

  get modelShareRecordUV() {
    return this.scope.model.shareRecordUV;
  }

  async generate({ host, atomId, url, user }: any) {
    const userId = user.id;
    // get
    let item = await this.modelShare.get({
      host,
      atomId,
      url,
      userId,
    });
    // insert
    if (!item) {
      item = {
        uuid: this.ctx.bean.util.uuidv4(),
        atomId,
        userId,
        host,
        url,
      } as EntityShare;
      const res = await this.modelShare.insert(item);
      item.id = parseInt(res[0]);
    }
    // link
    const link = this._combine_shareLink(item.uuid);
    // ok
    return { link, uuid: item.uuid };
  }

  async shareGo({ uuid, user }: any) {
    const userId = user.id;
    // get share
    const item = await this.modelShare.get({ uuid });
    if (!item) this.ctx.throw(404);
    // anonymous
    if (user.anonymous) {
      // redirect to login
      const shareLink = this._combine_shareLink(uuid);
      const url = this.ctx.bean.base.getAbsoluteUrl(`/#!${shareLink}`);
      this.ctx.redirect(url);
      return;
    }
    // not self
    if (item.userId !== userId) {
      await this._share_record({ item, user });
    }
    // redirect to original url
    const url = item.url.indexOf('http') === 0 ? item.url : this.ctx.bean.base.getAbsoluteUrl(`/#!${item.url}`);
    // redirect
    this.ctx.redirect(url);
  }

  _combine_shareLink(uuid) {
    return this.ctx.bean.base.getAbsoluteUrl(`/api/a/share/go/${uuid}`);
  }

  async _share_record({ item, user }: any) {
    const userId = user.id;
    // aShareRecordPV
    await this.ctx.bean.event.invoke({
      module: __ThisModule__,
      name: 'shareRecordPV',
      data: { share: item, user },
      next: async (context, next) => {
        // record
        const res = await this.modelShareRecordPV.insert({
          shareId: item.id,
          userId,
        });
        context.result = {
          recordId: res[0],
        };
        // next
        await next();
      },
    });
    // aShareRecordUV
    const uvData = {
      atomId: item.atomId,
      userIdSource: item.userId,
      userIdTarget: userId,
    };
    const uv = await this.modelShareRecordUV.get(uvData);
    if (!uv) {
      await this.ctx.bean.event.invoke({
        module: __ThisModule__,
        name: 'shareRecordUV',
        data: { share: item, user },
        next: async (context, next) => {
          // record
          const res = await this.modelShareRecordUV.insert(uvData);
          context.result = {
            recordId: res[0],
          };
          // next
          await next();
        },
      });
    }
  }
}
