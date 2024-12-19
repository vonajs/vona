import { BeanAtomBase } from '../bean/bean.atomBase.js';
import { Atom } from '../lib/atom.js';

@Atom()
export class AtomResource extends BeanAtomBase {
  get model() {
    return this.scope.model.resource;
  }

  get modelResourceLocale() {
    return this.scope.model.resourceLocale;
  }

  async default({ atomClass, item, options, user }: any) {
    // resource default
    const data = await this.model.default();
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

  async read({ atomClass, options, key, user }: any) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // meta
    this._getMeta(options, item, true);
    // ok
    return item;
  }

  async select({ atomClass, options, items, user }: any) {
    // super
    await super.select({ atomClass, options, items, user });
    // meta
    const showSorting = !!(options && options.category);
    for (const item of items) {
      this._getMeta(options, item, showSorting);
    }
  }

  async create({ atomClass, item, options, user }: any) {
    // super
    const data = await super.create({ atomClass, item, options, user });
    // add resource
    data.itemId = await this.model.create(data);
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // check demo
    this.app.bean.util.checkDemoForAtomWrite();
    // super
    const data = await super.write({ atomClass, target, key, item, options, user });
    // update resource
    if (key.atomId !== 0) {
      await this.model.write(data);
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }: any) {
    // super
    await super.delete({ atomClass, key, options, user });
    // delete resource role
    await this.app.bean.resource.deleteByResource({ atomId: key.atomId, user: null });
    // delete resource locales
    await this.modelResourceLocale.delete({
      atomId: key.atomId,
    });
    // delete resource
    await this.model.delete({
      id: key.itemId,
    });
  }

  _getMeta(_options, item, showSorting) {
    // resourceTypes
    const resourceTypes = this.app.bean.base.resourceTypes();
    const resourceType = resourceTypes[item.resourceType];
    if (resourceType) {
      item.resourceTypeLocale = resourceType.titleLocale;
    }
    // locale of appName
    if (item.appName) {
      item.appNameLocale = this.app.text(item.appName);
    }
    // locale of atomCategoryName
    item.atomCategoryNameLocale = this.app.text(item.atomCategoryName);
    // meta
    const meta = this._ensureItemMeta(item);
    // meta.flags
    if (showSorting) {
      meta.flags.push(item.resourceSorting);
    }
    // meta.summary
    meta.summary = item.description;
  }
}
