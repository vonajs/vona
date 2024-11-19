import { BeanAtomBaseWrite } from './bean.atomBase_write.js';

export class BeanAtomBaseDelete extends BeanAtomBaseWrite {
  async delete({ atomClass, key, options, user }: any) {
    // atomClass
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // general
    await this._delete_general({ atomClassBase, atomClass, key, options, user });
    // detail
    await this._delete_detail({ atomClassBase, atomClass, key, options, user });
  }

  async _delete_general({ atomClassBase, atomClass, key, options: _options, user }: any) {
    const atomId = key.atomId;
    // details
    await this.app.bean.detail._deleteDetails({ atomClass, atomKey: { atomId }, user });
    // tag
    if (!atomClassBase.itemOnly && atomClassBase.tag) {
      const _atomOld = await this.app.bean.atom.modelAtom.get({ id: atomId });
      if (_atomOld && _atomOld.atomTags) {
        // stage
        const atomStage = _atomOld.atomStage;
        await this.app.bean.tag.deleteTagRefs({ atomId });
        if (atomStage === 1) {
          await this.app.bean.tag.setTagAtomCount({ tagsNew: null, tagsOld: _atomOld.atomTags });
        }
      }
    }
    // delete
    if (!atomClassBase.itemOnly) {
      await this.app.bean.atom._delete({
        atomClass,
        atom: { id: atomId },
        user,
      });
    }
  }

  async _delete_detail({ atomClassBase, atomClass, key, options, user }: any) {
    if (atomClassBase.detail) {
      await this.app.bean.detail._deleteDetailBase({ atomClassBase, atomClass, key, options, user });
    }
  }
}
