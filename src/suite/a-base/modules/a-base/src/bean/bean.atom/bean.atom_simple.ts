import { Cast } from '@cabloy/core';
import { BeanAtomClone } from './bean.atom_clone.js';
import { BeanAtomFormal } from './bean.atom_formal.js';
import { BeanAtomNotify } from './bean.atom_notify.js';

import * as ModuleInfo from '@cabloy/module-info';

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
        const srcItem = await this.ctx.bean.atom.read({ key: { atomId: atomIdDraft }, user });
        srcItem.atomSimple = 1; // important
        const keyFormal = await Cast<BeanAtomClone>(this)._copy({
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
    await this.ctx.model.query(
      `
          update aAtom set atomSimple=1, atomIdDraft=0 
            where iid=? and deleted=0 and atomStage=2 and atomIdFormal=?
        `,
      [this.ctx.instance.id, atomIdFormal],
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
      const _moduleInfo = ModuleInfo.parseInfo(atomClass.module)!;
      const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
      await this.ctx.meta.util.executeBeanAuto({
        beanModule: _moduleInfo.relativeName,
        beanFullName,
        context: { atomClass, key: keyDraft, user },
        fn: 'delete',
      });
      // notify to change draft stats
      Cast<BeanAtomNotify>(this)._notifyDraftsDrafting(null, atomClass);
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
    await this.ctx.model.query(
      `
          update aAtom set atomSimple=0
            where iid=? and deleted=0 and atomStage=2 and atomIdFormal=?
        `,
      [this.ctx.instance.id, atomIdFormal],
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
