import { Atom } from 'vona-module-a-base';
import { BeanAtomCmsBase } from 'vona-module-a-cms';

@Atom()
export class AtomParty extends BeanAtomCmsBase {
  get model() {
    return this.scope.model.party;
  }

  async default({ atomClass, item, options, user }: any) {
    // party default
    const data = await this.model.default();
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

  async read({ atomClass, options, key, user }: any) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // read
    await this._getMeta(item, options);
    // ok
    return item;
  }

  async select({ atomClass, options, items, user }: any) {
    // super
    await super.select({ atomClass, options, items, user });
    // select
    for (const item of items) {
      await this._getMeta(item, options);
    }
  }

  async create({ atomClass, item, options, user }: any) {
    // super
    const data = await super.create({ atomClass, item, options, user });
    // atomState
    if (item.atomStage === 1) {
      await this.app.bean.atom.atomState({
        key: { atomId: data.atomId },
        atom: { atomState: 0 }, // ongoing
      });
    }
    // add party
    data.itemId = await this.model.create(data);
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // super
    const data = await super.write({ atomClass, target, key, item, options, user });
    // update party
    if (key.atomId !== 0) {
      await this.model.write(data);
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }: any) {
    // super
    await super.delete({ atomClass, key, options, user });
    // delete party
    await this.model.delete({
      id: key.itemId,
    });
  }

  async checkRightAction({ atom, atomClass, action, options, user }: any) {
    // super
    return await super.checkRightAction({ atom, atomClass, action, options, user });
  }

  async performAction({ key, atomClass, action, item, options, user }: any) {
    // super
    await super.performAction({ key, atomClass, action, item, options, user });
    // partyOver
    // if (action === 'partyOver') {
    // }
  }

  async performActionBulk({ keys, atomClass, action, item, options, user }: any) {
    // super
    return await super.performActionBulk({
      keys,
      atomClass,
      action,
      item,
      options,
      user,
      fnBefore: async ({ key, actionItem }) => {
        if (actionItem === 'partyOver') {
          // write
          await this.app.bean.atom.write({ key, atomClass, item, options: { formAction: actionItem }, user });
        }
      },
    });
  }

  async _getMeta(item, options) {
    // layout: list/table/mobile/pc
    const layout = options && options.layout;
    // meta
    const meta = this._ensureItemMeta(item);
    // meta.flags
    if (layout !== 'table' && item.personCount) {
      meta.flags.push(item.personCount + this.app.text('PartyPersonCountFlag'));
    }
    // meta.summary
    if (item.partyTypeCode) {
      if (layout !== 'table') {
        meta.summary = `${item._partyTypeCodeOptions.emoji}${item._partyTypeCodeTitleLocale}`;
      }
    }
  }
}
