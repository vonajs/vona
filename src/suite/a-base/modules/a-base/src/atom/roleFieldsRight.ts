import { Atom } from '../lib/atom.js';
import { BeanAtomBase } from '../bean/bean.atomBase.js';

@Atom()
export class AtomRoleFieldsRight extends BeanAtomBase {
  get model() {
    return this.scope.model.roleFieldsRight;
  }

  async default({ atomClass, item, options, user }: any) {
    // roleFieldsRight default
    const data = await this.model.default();
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

  async read({ atomClass, options, key, user }: any) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // adjust
    await this.app.bean.fields._fieldsRightLocale({ items: [item] });
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
    ];
    // super
    return await super.selectQuery({ atomClass, options, user });
  }

  async select({ atomClass, options, items, user }: any) {
    // super
    await super.select({ atomClass, options, items, user });
    // adjust
    await this.app.bean.fields._fieldsRightLocale({ items });
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
    // add roleFieldsRight
    const roleAtomId = atomIdMain;
    const role = await this.app.bean.role._forceRole({ roleAtomId });
    if (!role) this.app.throw(403);
    data = Object.assign(data, {
      roleAtomId: atomIdMain,
      roleId: role!.id,
      atomClassId: data.atomClassIdTarget,
      // fieldsRight: data.fieldsRight,
    });
    data.itemId = await this.model.create(data);
    data.atomClassId = atomClass.id;
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // super
    let data = await super.write({ atomClass, target, key, item, options, user });
    // update roleFieldsRight
    if (key.atomId !== 0) {
      data = Object.assign(data, {
        atomClassId: data.atomClassIdTarget,
        // fieldsRight: data.fieldsRight,
      });
      await this.model.write(data);
      data.atomClassId = atomClass.id;
      // clear summer
      await this.app.bean.fields.clearSummer_fieldsRightOfAtomClass();
      await this.app.bean.fields.clearSummer_fieldsRightOfUser();
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }: any) {
    // super
    await super.delete({ atomClass, key, options, user });
    // delete roleFieldsRight
    await this.model.delete({
      id: key.itemId,
    });
    // clear summer
    await this.app.bean.fields.clearSummer_fieldsRightOfAtomClass();
    await this.app.bean.fields.clearSummer_fieldsRightOfUser();
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
