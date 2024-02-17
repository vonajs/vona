import { BeanAtom0Default } from './bean.atom_0_default.js';
import * as ModuleInfo from '@cabloy/module-info';

export class BeanAtom0Delete extends BeanAtom0Default {
  // deleteBulk
  async deleteBulk({ atomClass, keys, options: _options, user }: any) {
    const resKeys: any[] = [];
    for (const key of keys) {
      const res = await this._deleteBulk_item({ atomClass, key, user });
      if (res) {
        resKeys.push(key);
      }
    }
    return { keys: resKeys };
  }

  // delete
  async delete({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user }: any) {
    // atomClass
    const { key, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    // atom bean
    const _moduleInfo = ModuleInfo.parseInfo(atomClass.module)!;
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    // atom
    let _atom;
    if (!atomClassBase.itemOnly) {
      _atom = await this.modelAtom.get({ id: key.atomId });
      key.itemId = _atom.itemId;
    } else {
      key.itemId = key.atomId;
    }
    // itemOnly
    if (atomClassBase.itemOnly) {
      // delete as formal
      await this.ctx.meta.util.executeBeanAuto({
        beanFullName,
        context: { atomClass, key, options, user },
        fn: 'delete',
      });
      return;
    }
    // atom
    if (_atom.atomStage === 0) {
      // close draft
      await this.self.closeDraft({ key });
    } else if (_atom.atomStage === 1) {
      // delete history
      const listHistory = await this.modelAtom.select({
        where: {
          atomStage: 2,
          atomIdFormal: _atom.id,
        },
      });
      for (const item of listHistory) {
        await this.ctx.meta.util.executeBeanAuto({
          beanFullName,
          context: { atomClass, key: { atomId: item.id, itemId: item.itemId }, options, user },
          fn: 'delete',
        });
      }
      // delete draft
      const itemDraft = await this.modelAtom.get({
        atomStage: 0,
        atomIdFormal: _atom.id,
      });
      if (itemDraft) {
        await this.ctx.meta.util.executeBeanAuto({
          beanFullName,
          context: { atomClass, key: { atomId: itemDraft.id, itemId: itemDraft.itemId }, options, user },
          fn: 'delete',
        });
        // notify
        this.self._notifyDraftsDrafting(null, atomClass);
      }
      // delete formal
      await this.ctx.meta.util.executeBeanAuto({
        beanFullName,
        context: { atomClass, key: { atomId: _atom.id, itemId: _atom.itemId }, options, user },
        fn: 'delete',
      });
    } else if (_atom.atomStage === 2) {
      // delete history self
      await this.ctx.meta.util.executeBeanAuto({
        beanFullName,
        context: { atomClass, key: { atomId: _atom.id, itemId: _atom.itemId }, options, user },
        fn: 'delete',
      });
    }
  }

  async _delete({ /* atomClass,*/ atom, user: _user }: any) {
    // stars
    await this._delete_stars({ atomId: atom.id });
    // labels
    await this._delete_labels({ atomId: atom.id });
    // aFile
    await this.modelFile.delete({ atomId: atom.id });
    // aAtom
    await this.modelAtom.delete(atom);
  }

  async _delete_stars({ atomId }: any) {
    const items = await this.modelAtomStar.select({
      where: { atomId, star: 1 },
    });
    for (const item of items) {
      this.self._notifyStars({ id: item.userId });
    }
    if (items.length > 0) {
      await this.modelAtomStar.delete({ atomId });
    }
  }

  async _delete_labels({ atomId }: any) {
    const items = await this.modelAtomLabel.select({
      where: { atomId },
    });
    for (const item of items) {
      this.self._notifyLabels({ id: item.userId });
    }
    if (items.length > 0) {
      await this.modelAtomLabel.delete({ atomId });
      await this.modelAtomLabelRef.delete({ atomId });
    }
  }

  async _deleteBulk_item({ atomClass, key, user }: any) {
    // check right
    const res = await this.ctx.bean.atom.checkRightAction({
      atom: { id: key.atomId },
      atomClass,
      action: 4,
      user,
    });
    if (!res) return false;
    // delete
    await this.delete({ atomClass, key, user });
    // ok
    return true;
  }
}
