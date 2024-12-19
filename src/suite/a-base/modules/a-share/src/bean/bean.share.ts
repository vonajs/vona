import { Bean } from 'vona-module-a-bean';
import { EntityShare } from '../index.js';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';

@Bean()
export class BeanShare extends BeanBase {
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
        uuid: this.app.bean.util.uuidv4(),
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
    let item = await this.modelShare.get({ uuid });
    if (!item) this.app.throw(404);
    item = item!;
    // anonymous
    if (user.anonymous) {
      // redirect to login
      const shareLink = this._combine_shareLink(uuid);
      const url = this.app.bean.base.getAbsoluteUrl(`/#!${shareLink}`);
      this.ctx.redirect(url);
      return;
    }
    // not self
    if (item.userId !== userId) {
      await this._share_record({ item, user });
    }
    // redirect to original url
    const url = item.url.indexOf('http') === 0 ? item.url : this.app.bean.base.getAbsoluteUrl(`/#!${item.url}`);
    // redirect
    this.ctx.redirect(url);
  }

  _combine_shareLink(uuid) {
    return this.app.bean.base.getAbsoluteUrl(`/api/a/share/go/${uuid}`);
  }

  async _share_record({ item, user }: any) {
    const userId = user.id;
    // aShareRecordPV
    await this.scope.event.shareRecordPV.emit({ share: item, user }, async () => {
      // record
      const res = await this.modelShareRecordPV.insert({
        shareId: item.id,
        userId,
      });
      return {
        recordId: res[0],
      };
    });
    // aShareRecordUV
    const uvData = {
      atomId: item.atomId,
      userIdSource: item.userId,
      userIdTarget: userId,
    };
    const uv = await this.modelShareRecordUV.get(uvData);
    if (!uv) {
      await this.scope.event.shareRecordUV.emit({ share: item, user }, async () => {
        // record
        const res = await this.modelShareRecordUV.insert(uvData);
        return {
          recordId: res[0],
        };
      });
    }
  }
}
