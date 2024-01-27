import { __ThisModule__ } from '../resource/this.js';
import { Atom } from '@cabloy/core';
import { BeanAtomBase } from 'cabloy-module-api-a-base';

@Atom()
export class AtomUserOnlineHistory extends BeanAtomBase {
  get model() {
    return this.ctx.model.module(__ThisModule__).userOnlineHistory;
  }

  async default({ atomClass, item, options, user }: any) {
    // userOnlineHistory default
    const data = await this.model.default();
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

  async read({ atomClass, options, key, user }: any) {
    // check demo
    this.ctx.bean.util.checkDemoForAtomRead();
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // meta
    this._getMeta(item, options);
    // ok
    return item;
  }

  async select({ atomClass, options, items, user }: any) {
    // check demo
    this.ctx.bean.util.checkDemoForAtomSelect();
    // super
    await super.select({ atomClass, options, items, user });
    // meta
    for (const item of items) {
      this._getMeta(item, options);
    }
  }

  async create({ atomClass, item, options, user }: any) {
    // super
    const data = await super.create({ atomClass, item, options, user });
    // add userOnlineHistory
    data.itemId = await this.model.create(data);
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // super
    const data = await super.write({ atomClass, target, key, item, options, user });
    // update userOnlineHistory
    if (key.atomId !== 0) {
      await this.model.write(data);
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }: any) {
    // super
    await super.delete({ atomClass, key, options, user });
    // delete userOnlineHistory
    await this.model.delete({
      id: key.itemId,
    });
  }

  _getMeta(item, options) {
    // layout: list/table/mobile/pc
    const layout = options && options.layout;
    // meta
    const meta = this._ensureItemMeta(item);
    // media
    meta.media = item._userIdAvatar;
    meta.atomName = item._userIdName;
    if (layout === 'list') {
      // meta.flags
      meta.flags.push(item.onlineIP);
      meta.flags.push(item._isLoginTitleLocale);
      // meta.summary
      // meta.summary = item.onlineIP;
    }
  }
}
