import { BeanAtom0 } from './bean.atom_0.js';

export class BeanAtomUtils extends BeanAtom0 {
  async _prepareAtomClassAndAtomClassBase({ key, atomClass, throwWhenEmpty = true }: any) {
    const atomId = key.atomId;
    // atomClass
    if (!atomClass) {
      atomClass = await this.app.bean.atomClass.getByAtomId({ atomId });
      if (!atomClass) {
        if (throwWhenEmpty) {
          throw new Error(`atomClass not found for atom: ${atomId}`);
        } else {
          return null;
        }
      }
    } else {
      atomClass = await this.app.bean.atomClass.get(atomClass);
      if (!atomClass) this.scope.error.ElementDoesNotExist.throw();
    }
    // atomClassBase
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // ok
    return { atomClass, atomClassBase };
  }

  async _prepareKeyAndAtomAndAtomClass({
    key: keyOuter,
    atomClass: atomClassOuter,
    options,
    throwWhenEmpty = true,
  }: any) {
    if (!options) options = {};
    // using the same options is better
    // options = Object.assign({}, options);
    const res = await this._prepareAtomClassAndAtomClassBase({
      key: keyOuter,
      atomClass: atomClassOuter,
      throwWhenEmpty,
    });
    if (!res) {
      return { key: keyOuter, atom: undefined, atomClass: undefined, atomClassBase: undefined };
    }
    const { atomClass, atomClassBase } = res;
    // prepare atom
    const { key, atom } = await this._prepareKeyAndAtom({ key: keyOuter, atomClass, atomClassBase, throwWhenEmpty });
    // patch atomIdMain of options
    if (atomClassBase.detail) {
      const atomIdMainField = atomClassBase.fields?.mappings?.atomIdMain;
      if (key.atomId === 0) {
        // create delay
        //   just use options.atomIdMain
      } else {
        // for safety: must use atomIdMain from main atom
        if (!atom) this.app.throw(403);
        options.atomIdMain = atom[atomIdMainField!];
      }
    }
    // ok
    return { key, atom, atomClass, atomClassBase, options };
  }

  async _prepareKeyAndAtom({ key: keyOuter, atomClass, atomClassBase, throwWhenEmpty = true }: any) {
    // prepare
    let { key, atom } = await this._prepareKeyAndAtom_inner({ key: keyOuter, atomClass, atomClassBase });
    // check if empty
    if (!atom && throwWhenEmpty) {
      this.scope.error.ElementDoesNotExist.throw();
    }
    if (!atom) return { key, atom };
    // patch
    atom = this._patchAtom({ atom, key, atomClass });
    // ok
    return { key, atom };
  }

  async _prepareKeyAndAtom_inner({ key: keyOuter, atomClass, atomClassBase }: any) {
    const atomId = keyOuter.atomId;
    let atom, key;
    // check if empty
    if (!atomId) {
      return { key: keyOuter, atom: null };
    }
    // get
    if (atomClassBase.itemOnly) {
      key = { atomId, itemId: atomId };
      if (atomClassBase.model) {
        const modelItem = this.getScope(atomClass.module).model[atomClassBase.model];
        atom = await modelItem.get({ id: atomId });
      } else {
        // not use .read for infinite loop
        atom = await this.self._get({ key, atomClass });
      }
    } else {
      atom = await this.modelAtom.get({ id: atomId, atomClassId: atomClass.id });
      if (!atom) {
        return { key: keyOuter, atom: null };
      }
      // check if valid
      if (atom.atomClassId !== atomClass.id) this.app.throw(403);
      key = { atomId, itemId: atom.itemId };
    }
    return { key, atom };
  }

  _patchAtom({ atom, key, atomClass }: any) {
    let atomId;
    let itemId;
    if (key) {
      atomId = key.atomId;
      itemId = key.itemId;
    } else {
      atomId = atom.id;
      itemId = atom.itemId || atomId;
    }
    return {
      ...atom,
      atomId,
      itemId,
      atomClassId: atomClass.id,
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
    };
  }

  _patchCreateWriteData({ data, atomClassBase }: any) {
    if (data.itemId === undefined) {
      data.itemId = 0;
    }
    // patch data
    if (atomClassBase.itemOnly) {
      data.atomId = data.itemId;
    }
    data.id = data.itemId;
    // key
    return { atomId: data.atomId, itemId: data.itemId };
  }

  // forAtomUser
  _checkForAtomUser(atomClass) {
    return atomClass && atomClass.module === 'a-base' && atomClass.atomClassName === 'user';
  }
}
