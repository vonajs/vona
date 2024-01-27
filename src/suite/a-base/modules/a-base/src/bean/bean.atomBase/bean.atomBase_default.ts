import { BeanAtomBaseCreate } from './bean.atomBase_create.js';
import { BeanAtomBaseRead } from './bean.atomBase_read.js';

const __create_atom_basic_fields = [
  'atomStage',
  'atomName',
  'atomStaticKey',
  'roleIdOwner',
  'atomLanguage',
  'atomCategoryId',
];

export class BeanAtomBaseDefault extends BeanAtomBaseCreate {
  async default({ atomClass, data, item, options, user }: any) {
    data = data || {};
    // atomClass
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // validate data
    data = await this._default_validate({ atomClass, data, options, user });
    // itemOnly
    if (atomClassBase.itemOnly) {
      // item not used
      //   for safety, data is not relative with item
      item = {};
      data = await this._default_prepareItemOnly({ data, atomClassBase, atomClass, item, options, user });
    } else {
      // merge aAtom
      data = await this.ctx.bean.atom.model.default(data);
      // prepare
      // item = item;
      data = await this._default_prepareItem({ data, atomClassBase, atomClass, item, options, user });
    }
    // merge general data
    const dataGeneral = this._default_general_data({ atomClassBase, atomClass, user });
    data = Object.assign(data, dataGeneral);
    // translate
    await (this as unknown as BeanAtomBaseRead)._read_handleTranslate({ item: data, atomClass, options, user });
    // ok
    return data;
  }

  async _default_validate({ atomClass, data, options, user }: any) {
    // schema
    const atomSchema = await this.ctx.bean.atom._prepareAtomSchema({
      mode: options.containerMode || 'view',
      atomClass,
      options,
      user,
    });
    options.schema = atomSchema.schema;
    // validate
    return await (this as unknown as BeanAtomBaseRead)._readValidate_schema({ schema: atomSchema.schema, item: data });
  }

  _default_general_data({ atomClassBase, atomClass, user }: any) {
    const data: any = {
      id: 0,
      atomId: 0,
      itemId: 0,
      deleted: 0,
      iid: atomClass.iid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (!atomClassBase.itemOnly) {
      const userId = user ? user.id : 0;
      data.userIdCreated = userId;
      data.userIdUpdated = userId;
      data.atomCreatedAt = new Date();
      data.atomUpdatedAt = new Date();
    }
    return data;
  }

  async _default_prepareItemOnly({ data, atomClassBase, item, options, user }: any) {
    // userIdCreated
    await this._create_prepareItemOnly_userIdCreated({ data, atomClassBase, item, options, user });
    // detail
    if (atomClassBase.detail) {
      // atomIdMain
      await this._create_prepareDetail_atomIdMain({ data, atomClassBase, item, options, user });
      // lineNo: need not
      // await this._create_prepareDetail_lineNo({ data, atomClassBase, atomClass, item, options, user });
    }
    // ok
    return data;
  }

  async _default_prepareItem({ data, atomClassBase, atomClass, item, options, user }: any) {
    // merge
    for (const field of __create_atom_basic_fields) {
      if (item[field] !== undefined) {
        data[field] = item[field];
      }
    }
    // atomName
    await this._create_prepareItem_atomName({ atomClassBase, atomClass, data, options, user });
    // atomStaticKey: need not
    // await this._create_prepareItem_atomStaticKey({ atomClassBase, atomClass, data, options, user });
    // atomSimple
    await this._create_prepareItem_atomSimple({ atomClassBase, atomClass, data, options, user });
    // roleIdOwner
    await this._create_prepareItem_roleIdOwner({ atomClassBase, atomClass, data, options, user });
    // atomCategoryId
    await this._create_prepareItem_atomCategoryId({ atomClassBase, atomClass, data, options, user });
    // ok
    return data;
  }
}
