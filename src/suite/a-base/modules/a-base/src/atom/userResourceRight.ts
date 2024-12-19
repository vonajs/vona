import { Atom } from '../lib/atom.js';
import { BeanAtomBase } from '../bean/bean.atomBase.js';

@Atom()
export class AtomUserResourceRight extends BeanAtomBase {
  async read({ atomClass, options, key, user }: any) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // adjust
    await this.app.bean.resource._resourceRightsLocale({ items: [item] });
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
      ['f.resourceType', 'asc'],
      ['f.atomCategoryId', 'asc'],
    ];
    // super
    return await super.selectQuery({ atomClass, options, user });
  }

  async select({ atomClass, options, items, user }: any) {
    // super
    await super.select({ atomClass, options, items, user });
    // adjust
    await this.app.bean.resource._resourceRightsLocale({ items });
    // meta
    for (const item of items) {
      this._getMeta(item, options);
    }
  }

  async create({ atomClass, item, options, user }: any) {
    // super
    await super.create({ atomClass, item, options, user });
    // donot go here
    this.app.throw(403);
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // super
    await super.write({ atomClass, target, key, item, options, user });
    // donot go here
    this.app.throw(403);
  }

  async delete({ atomClass, key, options, user }: any) {
    // super
    await super.delete({ atomClass, key, options, user });
    // donot go here
    this.app.throw(403);
  }

  _getMeta(_item, _options) {
    // layout: list/table/mobile/pc
    // const layout = options && options.layout;
    // meta
    // const meta = this._ensureItemMeta(item);
  }
}
