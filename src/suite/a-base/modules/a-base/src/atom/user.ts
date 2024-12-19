import { Atom } from '../lib/atom.js';
import { BeanAtomBase } from '../bean/bean.atomBase.js';

@Atom()
export class AtomUser extends BeanAtomBase {
  get model() {
    return this.scope.model.user;
  }

  get beanUser() {
    return this.app.bean.user;
  }

  async default({ atomClass, item, options, user }: any) {
    // user default
    const data = await this.model.default();
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

  async read({ atomClass, options, key, user }: any) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // meta
    await this._getMeta(options, item);
    // ok
    return item;
  }

  async select({ atomClass, options, items, user }: any) {
    // super
    await super.select({ atomClass, options, items, user });
    // meta
    for (const item of items) {
      await this._getMeta(options, item);
    }
  }

  async create({ atomClass, item, options, user }: any) {
    // only support atomStage=1
    if (item.atomStage !== 1) throw new Error('user only support atomStage=1');
    // fields
    const disabled = item.disabled || 0;
    const anonymous = item.anonymous || 0;
    // super
    let data = await super.create({ atomClass, item, options, user });
    // add user
    //   item.itemId only be set from inner access
    let itemId = item.itemId;
    if (!itemId) {
      data = Object.assign(data, {
        disabled,
        anonymous,
        userName: data.atomName,
      });
      itemId = data.itemId = await this.model.create(data);
    } else {
      data = Object.assign(data, { id: itemId, disabled, anonymous });
      await this.model.write(data);
    }
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // check demo
    this.app.bean.util.checkDemoForAtomWrite();
    // super
    const data = await super.write({ atomClass, target, key, item, options, user });
    // update user
    if (key.atomId !== 0) {
      delete data.disabled;
      delete data.anonymous;
      if (data.atomName) data.userName = data.atomName;
      await this.model.write(data);
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }: any) {
    const userId = key.itemId;
    // super
    await super.delete({ atomClass, key, options, user });

    await this.app.bean.role.deleteAllUserRoles({ userId });
    await this.app.bean.user.modelAuth.delete({ userId });

    // delete user
    await this.model.delete({ id: userId });
  }

  async enable({ atomClass, key, options, user }: any) {
    // super
    await super.enable({ atomClass, key, options, user });
    // enable
    await this.model.update({
      id: key.itemId,
      disabled: 0,
    });
  }

  async disable({ atomClass, key, options, user }: any) {
    // super
    await super.disable({ atomClass, key, options, user });
    // disable
    await this.model.update({
      id: key.itemId,
      disabled: 1,
    });
  }

  async checkRightAction({ atom, atomClass, action, options, user }: any) {
    // super
    const res = await super.checkRightAction({ atom, atomClass, action, options, user });
    if (!res) return res;
    if (atom.atomStage !== 1) return res;
    // write/enable/disable
    if (![3, 6, 7].includes(action)) return res;
    // item
    const item = await this.model.get({ id: atom.itemId });
    if (!item || item.anonymous) return null;
    // default
    return res;
  }

  async _getMeta(_options, item) {
    // meta
    const meta = this._ensureItemMeta(item);
    // meta.summary
    meta.summary = item.motto;
  }
}
