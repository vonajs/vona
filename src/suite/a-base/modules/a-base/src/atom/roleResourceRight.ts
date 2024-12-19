import { Atom } from '../lib/atom.js';
import { BeanAtomBase } from '../bean/bean.atomBase.js';

@Atom()
export class AtomRoleResourceRight extends BeanAtomBase {
  get model() {
    return this.scope.model.resourceRole;
  }

  async default({ atomClass, item, options, user }: any) {
    // resourceRole default
    const data = await this.model.default();
    data.atomIdTarget = 0;
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

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
    let data = await super.create({ atomClass, item, options, user });
    // atomIdMain
    const atomIdMain = options.atomIdMain;
    // add resourceRole
    const roleAtomId = atomIdMain;
    const role = await this.app.bean.role._forceRole({ roleAtomId });
    const atomIdBak = data.atomId;
    data = Object.assign(data, {
      roleAtomId: atomIdMain,
      roleId: role!.id,
      atomId: data.atomIdTarget,
    });
    data.itemId = await this.model.create(data);
    data.atomId = atomIdBak;
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // super
    let data = await super.write({ atomClass, target, key, item, options, user });
    // update resourceRole
    if (key.atomId !== 0) {
      const atomIdBak = data.atomId;
      data = Object.assign(data, {
        atomId: data.atomIdTarget,
      });
      await this.model.write(data);
      data.atomId = atomIdBak;
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }: any) {
    // super
    await super.delete({ atomClass, key, options, user });
    // delete resourceRole
    await this.model.delete({
      id: key.itemId,
    });
  }

  _getMeta(item, options) {
    item;
    options;
    // layout: list/table/mobile/pc
    // const layout = options && options.layout;
    // meta
    // const meta = this._ensureItemMeta(item);
  }
}
