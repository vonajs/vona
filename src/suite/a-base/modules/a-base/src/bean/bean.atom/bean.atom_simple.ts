import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtomFormal } from './bean.atom_formal.js';

export class BeanAtomSimple extends BeanAtomFormal {
  async _switchToSimple({ atomClass, atomClassBase, atom, user }: any) {
    let atomIdDraft;
    let atomIdFormal;
    if (atom.atomStage === 0) {
      // is draft
      atomIdDraft = atom.id;
      atomIdFormal = atom.atomIdFormal;
      if (!atomIdFormal) {
        // formal/history not exists, so copy it
        // create formal
        const srcItem = await this.app.bean.atom.read({ key: { atomId: atomIdDraft }, user });
        srcItem.atomSimple = 1; // important
        const keyFormal = await this.self._copy({
          target: 'formal',
          atomClass,
          srcKey: { atomId: atomIdDraft },
          srcItem,
          destKey: null,
          options: null,
          user,
        });
        atomIdFormal = keyFormal.atomId;
      }
    } else {
      // is formal/history
      atomIdDraft = atom.atomIdDraft;
      atomIdFormal = atom.atomStage === 1 ? atom.id : atom.atomIdFormal;
    }
    // update history
    await this.modelAtom.update(
      {
        atomSimple: 1,
        atomIdDraft: 0,
      },
      {
        where: {
          atomStage: 2,
          atomIdFormal,
        },
      },
    );
    // update formal
    await this.modelAtom.update({
      id: atomIdFormal,
      atomSimple: 1,
      atomIdDraft: 0,
    });
    // delete draft
    if (atomIdDraft) {
      const atomDraft = atom.atomStage === 0 ? atom : await this.modelAtom.get({ id: atomIdDraft });
      const keyDraft = { atomId: atomDraft.id, itemId: atomDraft.itemId };
      const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName);
      await beanInstance.delete({ atomClass, key: keyDraft, user });
      // notify to change draft stats
      this.self._notifyDraftsDrafting(null, atomClass);
    }
    // ok
    if (atom.atomStage === 0) {
      // fetch formal
      return await this.modelAtom.get({ id: atomIdFormal });
    }
    atom.atomSimple = 1;
    return atom;
  }

  async _switchToSimpleZero({ /* atomClass, atomClassBase,*/ atom, user }: any) {
    const atomIdFormal = atom.atomStage === 1 ? atom.id : atom.atomIdFormal;
    // update history's atomSimple
    await this.modelAtom.update(
      {
        atomSimple: 0,
      },
      {
        where: {
          atomStage: 2,
          atomIdFormal,
        },
      },
    );
    // update formal's atomSimple
    await this.modelAtom.update({
      id: atomIdFormal,
      atomSimple: 0,
    });
    // ** create draft from formal
    const keyDraft = await this._createDraftFromFormal({ atomIdFormal, user });
    // update draft's atomClosed
    await this.modelAtom.update({
      id: keyDraft.atomId,
      atomClosed: 1,
    });
    // ok
    atom.atomSimple = 0;
    return atom;
  }

  async _checkSimpleSwitch({ atomClass, atomClassBase, atom, user }: any) {
    // the same mode
    if (Boolean(atom.atomSimple) === Boolean(atomClassBase.simple)) return atom;
    // -> simple
    if (atomClassBase.simple) {
      return await this._switchToSimple({ atomClass, atomClassBase, atom, user });
    }
    // -> not simple
    return await this._switchToSimpleZero({ atomClass, atomClassBase, atom, user });
  }
}
