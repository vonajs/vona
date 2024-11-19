import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtom0Select } from './bean.atom_0_select.js';

export class BeanAtom0Write extends BeanAtom0Select {
  // write
  //   target: should be null for frontend call
  async write({
    key: keyOuter,
    atomClass: atomClassOuter,
    options: optionsOuter,
    target,
    atomStage,
    roleIdOwner,
    item,
    user,
  }: any) {
    if (!keyOuter) {
      keyOuter = { atomId: 0, itemId: 0 };
    }
    // atomClass
    let {
      key,
      atom: _atomBasic,
      atomClass,
      atomClassBase,
      options,
    } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
      throwWhenEmpty: false,
    });
    if (!atomClassBase) this.app.throw(403);
    atomClassBase = atomClassBase!;
    // support formal flow
    // if (_atomBasic.atomStage !== _atomBasic.atomSimple) this.app.throw(403);
    // isCreateDelay
    const isCreateDelay = key.atomId === 0;
    // atomSimple
    const atomSimple = Number(Boolean(atomClassBase.simple));
    // item
    item = item || {};
    if (isCreateDelay && !atomClassBase.itemOnly) {
      item.atomStage = atomStage !== undefined ? atomStage : atomSimple;
      item.roleIdOwner = roleIdOwner;
    }
    // formal -> history
    if (!isCreateDelay) {
      if (!atomClassBase.itemOnly) {
        if (_atomBasic.atomSimple) {
          if (atomClassBase.history !== false) {
            //  formal -> history
            await this.self._copy({
              target: 'history',
              atomClass,
              srcKey: { atomId: key.atomId },
              srcItem: null,
              destKey: null,
              options,
              user,
            });
          }
        }
      }
    }
    // write draft/formal(simple)
    //   for safety: force set some fields value
    let itemWrite;
    if (!isCreateDelay) {
      // normal
      if (!atomClassBase.itemOnly) {
        itemWrite = Object.assign({}, item, {
          atomId: key.atomId,
          itemId: key.itemId,
          atomSimple: _atomBasic.atomSimple,
          atomStage: _atomBasic.atomSimple ? 1 : _atomBasic.atomStage,
        });
      } else {
        itemWrite = Object.assign({}, item, {
          atomId: key.atomId,
          itemId: key.itemId,
        });
      }
    } else {
      // create delay
      if (!atomClassBase.itemOnly) {
        const atomSimple = Number(Boolean(atomClassBase.simple));
        itemWrite = Object.assign({}, item, {
          atomId: 0,
          itemId: 0,
          atomSimple,
          // atomStage:item.atomStage , // has handled before
        });
      } else {
        itemWrite = Object.assign({}, item, {
          atomId: 0,
          itemId: 0,
        });
      }
    }
    // write
    const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName as any);
    const data = await beanInstance.write({ atomClass, target, key, item: itemWrite, options, user });
    // patch data
    key = this._patchCreateWriteData({ data, atomClassBase });
    // create after
    if (isCreateDelay) {
      // create after
      await this._create_after({ key, atomClass, atomClassBase });
    }
    // update formal version for simple
    if (!isCreateDelay) {
      if (!atomClassBase.itemOnly) {
        if (_atomBasic.atomSimple) {
          await this.modelAtom.update({
            id: key.atomId,
            atomRevision: _atomBasic.atomRevision + 1,
          });
        }
      }
    }
    // ok
    return await this._create_result({ key, atomClass, options, user });
  }

  async _update({ atom }: any) {
    await this.modelAtom.update(atom);
  }
}
