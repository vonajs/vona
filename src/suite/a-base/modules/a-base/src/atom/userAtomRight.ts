import { Atom } from '@cabloy/core';
import { BeanAtomBase } from '../bean/virtual.atomBase.js';

@Atom()
export class AtomUserAtomRight extends BeanAtomBase {
  async read({ atomClass, options, key, user }: any) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // adjust
    await this.ctx.bean.role._adjustItems({ items: [item] });
    // meta
    this._getMeta(item, options);
    // ok
    return item;
  }

  async selectQuery({ atomClass, options, user }: any) {
    options.orders = [
      //
      ['f.moduleTarget', 'asc'],
      ['f.atomClassIdTarget', 'asc'],
      ['f.action', 'asc'],
    ];
    // super
    return await super.selectQuery({ atomClass, options, user });
  }

  async select({ atomClass, options, items, user }: any) {
    // super
    await super.select({ atomClass, options, items, user });
    // adjust
    await this.ctx.bean.role._adjustItems({ items });
    // meta
    for (const item of items) {
      this._getMeta(item, options);
    }
  }

  async create({ atomClass, item, options, user }: any) {
    // super
    await super.create({ atomClass, item, options, user });
    // donot go here
    this.ctx.throw(403);
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // super
    await super.write({ atomClass, target, key, item, options, user });
    // donot go here
    this.ctx.throw(403);
  }

  async delete({ atomClass, key, options, user }: any) {
    // super
    await super.delete({ atomClass, key, options, user });
    // donot go here
    this.ctx.throw(403);
  }

  _getMeta(item, _options) {
    if (item.scope) {
      item.scope = JSON.parse(item.scope);
    }
    // layout: list/table/mobile/pc
    // const layout = options && options.layout;
    // meta
    // const meta = this._ensureItemMeta(item);
  }
}
