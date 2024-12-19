import { Atom } from 'vona-module-a-base';
import { BeanAtomCmsBase } from '../bean/bean.atomCmsBase.js';

@Atom()
export class AtomArticle extends BeanAtomCmsBase {
  async default({ atomClass, item, options, user }: any) {
    // super
    return await super.default({ atomClass, item, options, user });
  }

  async read({ atomClass, options, key, user }: any) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // ok
    return item;
  }

  async select({ atomClass, options, items, user }: any) {
    // super
    await super.select({ atomClass, options, items, user });
  }

  async create({ atomClass, item, options, user }: any) {
    // super
    return await super.create({ atomClass, item, options, user });
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // super
    return await super.write({ atomClass, target, key, item, options, user });
  }

  async delete({ atomClass, key, options, user }: any) {
    // super
    await super.delete({ atomClass, key, options, user });
  }
}
