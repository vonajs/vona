import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanFieldsParseSchema } from './bean.fields_parseSchema.js';

const __atomClass_userFieldsRight = {
  module: 'a-base',
  atomClassName: 'userFieldsRight',
};

export class BeanFieldsFieldsRight extends BeanFieldsParseSchema {
  // atomClass: only main (exluding detail)
  async getPreferredFieldsRightOfUser({ atomClass, user }: any) {
    if (!user || user.id === 0) return null;
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    // 1. fieldsRightOfAtomClass
    const exists = await this.ctx.bean.summer.get(
      { module: __ThisModule__, name: 'fieldsRightOfAtomClass' },
      { atomClassId: atomClass.id },
    );
    if (!exists) return null;
    // 2. fieldsRightOfUser
    const fieldsRight = await this.ctx.bean.summer.get(
      { module: __ThisModule__, name: 'fieldsRightOfUser' },
      { atomClassId: atomClass.id, userId: user.id },
    );
    return fieldsRight;
  }

  async clearSummer_fieldsRightOfAtomClass() {
    await this.ctx.bean.summer.clear({ module: __ThisModule__, name: 'fieldsRightOfAtomClass' });
  }

  async clearSummer_fieldsRightOfUser() {
    await this.ctx.bean.summer.clear({ module: __ThisModule__, name: 'fieldsRightOfUser' });
  }

  async __getFieldsRightOfAtomClassRaw({ atomClassId }: any) {
    const item = await this.modelRoleFieldsRight.get({ atomClassId });
    return !!item; // exists: true/false
  }

  async __getFieldsRightOfUserRaw({ atomClassId, userId }: any) {
    const options = {
      page: { index: 0, size: 1 },
      where: {
        atomClassIdTarget: atomClassId,
      },
    };
    const items = await this.ctx.bean.atom.select({
      atomClass: __atomClass_userFieldsRight,
      options,
      user: { id: userId },
    });
    const item = items[0];
    return item?.fieldsRight ? JSON.parse(item.fieldsRight) : null;
  }

  async _fieldsRightLocale({ items }: any) {
    for (const item of items) {
      // roleNameBase
      if (item.roleNameBase) {
        item.roleNameBaseLocale = this.ctx.text(item.roleNameBase);
      }
    }
  }
}
