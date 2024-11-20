import { ScopeModule } from '../.metadata/this.js';
import { Atom } from 'vona';
import { BeanAtomBase } from 'vona-module-a-base';

@Atom()
export class AtomDict extends BeanAtomBase<ScopeModule> {
  get model() {
    return this.scope.model.dict;
  }

  get modelDictContent() {
    return this.scope.model.dictContent;
  }

  async default({ atomClass, item, options, user }: any) {
    // dict default
    const data = await this.model.default();
    data.dictItems = '[]';
    data.dictLocales = '{}';
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

  async read({ atomClass, options, key, user }: any) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // meta
    await this._getMeta(item);
    // ok
    return item;
  }

  async select({ atomClass, options, items, user }: any) {
    // super
    await super.select({ atomClass, options, items, user });
    // meta
    for (const item of items) {
      await this._getMeta(item);
    }
  }

  async create({ atomClass, item, options, user }: any) {
    // super
    const data = await super.create({ atomClass, item, options, user });
    // add dict
    data.itemId = await this.model.create(data);
    // add content
    if (!data.dictItems) {
      data.dictItems = '[]';
      data.dictLocales = '{}';
    }
    await this.modelDictContent.create(data);
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // check demo
    this.app.bean.util.checkDemoForAtomWrite();
    // info
    const atomStaticKey = item.atomStaticKey;
    const atomStage = item.atomStage;
    // super
    const data = await super.write({ atomClass, target, key, item, options, user });
    // update dict
    if (key.atomId !== 0) {
      await this.model.write(data);
      // update content
      if (data.dictItems !== undefined) {
        await this.modelDictContent.update(
          {
            dictItems: data.dictItems,
            dictLocales: data.dictLocales,
          },
          {
            where: {
              atomId: key.atomId,
            },
          },
        );
      }
      // remove dict cache
      if (atomStage === 1) {
        this.ctx.tail(() => {
          this.app.bean.dict.dictCacheRemove({ dictKey: atomStaticKey });
        });
      }
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }: any) {
    const item = await this.app.bean.atom.modelAtom.get({ id: key.atomId });
    const atomStaticKey = item!.atomStaticKey;
    const atomStage = item!.atomStage;
    // super
    await super.delete({ atomClass, key, options, user });
    // delete dict
    await this.model.delete({
      id: key.itemId,
    });
    // delete content
    await this.modelDictContent.delete({
      itemId: key.itemId,
    });
    // remove dict cache
    if (atomStage === 1) {
      this.ctx.tail(() => {
        this.app.bean.dict.dictCacheRemove({ dictKey: atomStaticKey });
      });
    }
  }

  async _getMeta(item) {
    // translate
    await this._getMetaTranslate(item);
    // meta
    const meta = this._ensureItemMeta(item);
    // meta.flags
    // meta.summary
    meta.summary = item.description;
  }

  async _getMetaTranslate(item) {
    if (['a-dictbooster:dictMode', 'a-base:dictRoleType'].includes(item.atomStaticKey)) {
      item._dictModeTitle = 'Array';
      item._dictModeTitleLocale = this.app.text('Array');
      return;
    }
    await this._dictTranslateField({
      item,
      fieldName: 'dictMode',
      code: item.dictMode,
      field: {
        dictKey: 'a-dictbooster:dictMode',
      },
    });
  }
}
