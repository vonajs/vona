import BeanAtomBaseWrite from './bean.atomBase_write.js';

export class BeanAtomBaseDelete extends BeanAtomBaseWrite {
  async delete({ atomClass, key, options, user }) {
    // atomClass
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // general
    await this._delete_general({ atomClassBase, atomClass, key, options, user });
    // detail
    await this._delete_detail({ atomClassBase, atomClass, key, options, user });
  }

  async _delete_general({ atomClassBase, atomClass, key, options, user }) {
    const atomId = key.atomId;
    // details
    await this.ctx.bean.detail._deleteDetails({ atomClass, atomKey: { atomId }, user });
    // tag
    if (!atomClassBase.itemOnly && atomClassBase.tag) {
      const _atomOld = await this.ctx.bean.atom.modelAtom.get({ id: atomId });
      if (_atomOld.atomTags) {
        // stage
        const atomStage = _atomOld.atomStage;
        await this.ctx.bean.tag.deleteTagRefs({ atomId });
        if (atomStage === 1) {
          await this.ctx.bean.tag.setTagAtomCount({ tagsNew: null, tagsOld: _atomOld.atomTags });
        }
      }
    }
    // delete
    if (!atomClassBase.itemOnly) {
      await this.ctx.bean.atom._delete({
        atomClass,
        atom: { id: atomId },
        user,
      });
    }
  }

  async _delete_detail({ atomClassBase, atomClass, key, options, user }) {
    if (atomClassBase.detail) {
      await this.ctx.bean.detail._deleteDetailBase({ atomClassBase, atomClass, key, options, user });
    }
  }
}
