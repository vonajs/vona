import { Atom } from '@cabloy/core';
import { BeanAtomBase } from '../bean/virtual.atomBase.js';

import AtomBase from './bean.atomBase.js';

@Atom()
export class AtomRoleRight extends BeanAtomBase {
  get model() {
    return this.ctx.model.module(__ThisModule__).roleRight;
  }

  async default({ atomClass, item, options, user }) {
    // roleRight default
    const data = await this.model.default();
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

  async read({ atomClass, options, key, user }) {
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

  async selectQuery({ atomClass, options, user }) {
    options.orders = [
      //
      ['f.moduleTarget', 'asc'],
      ['f.atomClassIdTarget', 'asc'],
      ['f.action', 'asc'],
    ];
    // super
    return await super.selectQuery({ atomClass, options, user });
  }

  async select({ atomClass, options, items, user }) {
    // super
    await super.select({ atomClass, options, items, user });
    // adjust
    await this.ctx.bean.role._adjustItems({ items });
    // meta
    for (const item of items) {
      this._getMeta(item, options);
    }
  }

  async create({ atomClass, item, options, user }) {
    // super
    const data = await super.create({ atomClass, item, options, user });
    // atomIdMain
    const atomIdMain = options.atomIdMain;
    // add roleRight
    const roleAtomId = atomIdMain;
    data.itemId = await this.ctx.bean.role.addRoleRight({
      roleAtomId,
      atomClassId: data.atomClassIdTarget,
      action: data.action,
      scope: data.scope,
      user,
    });
    data.roleAtomId = roleAtomId;
    // data
    return data;
    // const res = await this.ctx.model.insert({
    //   roleAtomId: atomIdMain,
    //   roleId: role.id,
    //   scope: '[]',
    // });
  }

  async write({ atomClass, target, key, item, options, user }) {
    // super
    const data = await super.write({ atomClass, target, key, item, options, user });
    // update roleRight
    if (key.atomId !== 0) {
      const roleRightId = key.itemId;
      await this.ctx.bean.role.addRoleRight({
        atomClassId: data.atomClassIdTarget,
        action: data.action,
        scope: data.scope,
        user,
        roleRightId,
      });
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }) {
    // super
    await super.delete({ atomClass, key, options, user });
    // delete roleRight
    const roleRightId = key.itemId;
    await this.ctx.bean.role.deleteRoleRight({ roleRightId, user });
  }

  _getMeta(item, options) {
    if (item.scope) {
      item.scope = JSON.parse(item.scope);
    }
    // layout: list/table/mobile/pc
    // const layout = options && options.layout;
    // meta
    // const meta = this._ensureItemMeta(item);
  }
}
