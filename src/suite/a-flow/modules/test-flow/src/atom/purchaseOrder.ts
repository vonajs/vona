import { __ThisModule__ } from '../resource/this.js';
import { Atom } from '@cabloy/core';
import { BeanAtomBase } from 'cabloy-module-api-a-base';

@Atom()
export class AtomPurchaseOrder extends BeanAtomBase {
  get model() {
    return this.bean.model.module(__ThisModule__).purchaseOrder;
  }

  async default({ atomClass, item, options, user }: any) {
    // purchaseOrder default
    const data = await this.model.default();
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

  async read({ atomClass, options, key, user }: any) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // meta
    this._getMeta(item);
    // ok
    return item;
  }

  async select({ atomClass, options, items, user }: any) {
    // super
    await super.select({ atomClass, options, items, user });
    // meta
    for (const item of items) {
      this._getMeta(item);
    }
  }

  async create({ atomClass, item, options, user }: any) {
    // super
    const data = await super.create({ atomClass, item, options, user });
    // add purchaseOrder
    data.itemId = await this.model.create(data);
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // super
    const data = await super.write({ atomClass, target, key, item, options, user });
    // update purchaseOrder
    if (key.atomId !== 0) {
      await this.model.write(data);
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }: any) {
    // super
    await super.delete({ atomClass, key, options, user });
    // delete purchaseOrder
    await this.model.delete({
      id: key.itemId,
    });
  }

  _getMeta(item) {
    const meta = this._ensureItemMeta(item);
    // meta.flags
    if (item.detailsCount > 0) {
      meta.flags.push(item.detailsCount);
    }
    const detailsAmount = (item.detailsAmount / 100).toFixed(2);
    meta.flags.push(detailsAmount);
    // meta.summary
    meta.summary = item.description;
  }
}
