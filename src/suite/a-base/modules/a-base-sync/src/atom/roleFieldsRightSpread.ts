import { Atom } from '@cabloy/core';
import { BeanAtomBase } from '../bean/virtual.atomBase.js';

import AtomBase from './bean.atomBase.js';

//

@Atom()
export class AtomRoleFieldsRightSpread extends BeanAtomBase {
  async read({ atomClass, options, key, user }) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // adjust
    await this.ctx.bean.fields._fieldsRightLocale({ items: [item] });
    // meta
    this._getMeta(item, options);
    // ok
    return item;
  }

  async selectQuery({ atomClass, options, user }) {
    options.orders = [
      //
      ['f.moduleTarget', 'asc'],
      ['f.atomClassIdTarget', 'asc'],
    ];
    // super
    return await super.selectQuery({ atomClass, options, user });
  }

  async select({ atomClass, options, items, user }) {
    // super
    await super.select({ atomClass, options, items, user });
    // adjust
    await this.ctx.bean.fields._fieldsRightLocale({ items });
    // meta
    for (const item of items) {
      this._getMeta(item, options);
    }
  }

  async create({ atomClass, item, options, user }) {
    // super
    await super.create({ atomClass, item, options, user });
    // donot go here
    throw new Error(403);
  }

  async write({ atomClass, target, key, item, options, user }) {
    // super
    await super.write({ atomClass, target, key, item, options, user });
    // donot go here
    throw new Error(403);
  }

  async delete({ atomClass, key, options, user }) {
    // super
    await super.delete({ atomClass, key, options, user });
    // donot go here
    throw new Error(403);
  }

  _getMeta(/* item, options*/) {
    // layout: list/table/mobile/pc
    // const layout = options && options.layout;
    // meta
    // const meta = this._ensureItemMeta(item);
  }
}
