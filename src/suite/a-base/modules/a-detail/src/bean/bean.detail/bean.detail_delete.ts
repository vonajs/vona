import { BeanDetailCopy } from './bean.detail_copy.js';

export class BeanDetailDelete extends BeanDetailCopy {
  async _deleteDetails({ atomClass, atomKey, user }: any) {
    await this._loopDetailClasses({
      atomClass,
      fn: async ({ atomClassDetail, atomClassBaseDetail }) => {
        await this._deleteDetails_Class({ atomClassDetail, atomClassBaseDetail, atomClass, atomKey, user });
      },
    });
  }

  async _deleteDetails_Class({ atomClassDetail, /* atomClassBaseDetail, atomClass,*/ atomKey, user }: any) {
    // select all details
    const details = await this.ctx.bean.atom.select({
      atomClass: atomClassDetail,
      options: {
        atomIdMain: atomKey.atomId,
        // mode: 'full',
      },
    });
    // loop
    for (const detail of details) {
      const detailKey = {
        atomId: detail.atomId,
        itemId: detail.itemId,
      };
      // delete
      await this.ctx.bean.atom.delete({
        key: detailKey,
        atomClass: atomClassDetail,
        user,
      });
    }
  }

  async _deleteDetailBase({ atomClass, key, options: _options, user: _user }: any) {
    await this.modelDetailBase.delete({
      detailId: key.atomId,
      detailClassId: atomClass.id,
    });
  }
}
