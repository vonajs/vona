import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanAtomBase1 } from './bean.atomBase_1.js';

const __create_atom_basic_fields = [
  'atomStage',
  'atomName',
  'atomStatic',
  'atomStaticKey',
  'roleIdOwner',
  'atomLanguage',
  'atomCategoryId',
];

export class BeanAtomBaseCreate extends BeanAtomBase1 {
  async create({ atomClass, item, options, user }: any) {
    // dataWrite
    const dataWrite = options.__createDelayData;
    // atomClass
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // itemOnly
    let data;
    if (atomClassBase.itemOnly) {
      // item not used
      //   for safety, data is not relative with item
      item = dataWrite || {};
      data = await this._create_prepareItemOnly({ atomClassBase, atomClass, item, options, user });
      // merge
      if (dataWrite) {
        data = Object.assign(data, dataWrite);
      }
    } else {
      // prepare
      item = dataWrite ? Object.assign({}, item, dataWrite) : item;
      data = await this._create_prepareItem({ atomClassBase, atomClass, item, options, user });
      // merge
      if (dataWrite) {
        data = Object.assign(data, dataWrite);
      }
      // add
      data.atomId = await this.app.bean.atom._add({ atomClass, atom: data, user });
    }
    // ok
    return data;
  }

  async _create_prepareItemOnly({ atomClassBase, atomClass, item, options, user }: any) {
    const data = { iid: atomClass.iid };
    // userIdCreated
    await this._create_prepareItemOnly_userIdCreated({ data, atomClassBase, item, options, user });
    // detail
    if (atomClassBase.detail) {
      // atomIdMain
      await this._create_prepareDetail_atomIdMain({ data, atomClassBase, item, options, user });
      // lineNo
      await this._create_prepareDetail_lineNo({ data, atomClassBase, atomClass, item, options, user });
    }
    // ok
    return data;
  }

  async _create_prepareItemOnly_userIdCreated({ data, atomClassBase, item, options: _options, user }: any) {
    const userIdCreatedField = atomClassBase.fields?.mappings?.userIdCreated;
    if (!userIdCreatedField) return;
    if (item[userIdCreatedField]) {
      data[userIdCreatedField] = item[userIdCreatedField];
    } else {
      data[userIdCreatedField] = user ? user.id : 0;
    }
  }

  async _create_prepareDetail_atomIdMain({ data, atomClassBase, item, options, user: _user }: any) {
    // atomIdMain
    const atomIdMainField = atomClassBase.fields?.mappings?.atomIdMain;
    if (item[atomIdMainField]) {
      data[atomIdMainField] = item[atomIdMainField];
    } else {
      data[atomIdMainField] = options.atomIdMain;
    }
  }

  async _create_prepareDetail_lineNo({ data, atomClassBase, atomClass, item, options, user }: any) {
    // detailLineNo
    const fieldNameLineNo = atomClassBase.fields?.mappings?.lineNo;
    if (!fieldNameLineNo) return;
    if (item[fieldNameLineNo]) {
      data[fieldNameLineNo] = item[fieldNameLineNo];
    } else {
      const detailLineNo = await this._create_prepareDetail_detailLineNo({
        atomClassBase,
        atomClass,
        options,
        user,
      });
      data[fieldNameLineNo] = detailLineNo;
    }
  }

  async _create_prepareItem({ atomClassBase, atomClass, item, options, user }: any) {
    const data = { iid: atomClass.iid };
    // merge
    for (const field of __create_atom_basic_fields) {
      if (item[field] !== undefined) {
        data[field] = item[field];
      }
    }
    // donot check basic fields when clone
    const createOptions = options.createOptions;
    if (createOptions) return data;
    // atomName
    await this._create_prepareItem_atomName({ atomClassBase, atomClass, data, options, user });
    // atomStaticKey
    await this._create_prepareItem_atomStaticKey({ atomClassBase, atomClass, data, options, user });
    // atomSimple
    await this._create_prepareItem_atomSimple({ atomClassBase, atomClass, data, options, user });
    // roleIdOwner
    await this._create_prepareItem_roleIdOwner({ atomClassBase, atomClass, data, options, user });
    // atomCategoryId
    await this._create_prepareItem_atomCategoryId({ atomClassBase, atomClass, data, options, user });
    // ok
    return data;
  }

  async _create_prepareItem_atomName({ atomClassBase, atomClass, data, options: _options, user: _user }: any) {
    // atomName
    if (data.atomName) return;
    // sequence
    const sequence = this.app.bean.sequence.module(__ThisModule__);
    // user
    if (atomClass.module === 'a-base' && atomClass.atomClassName === 'user') {
      const draftId = await sequence.next('draft');
      data.atomName = `${this.app.text('User')}__${draftId}`;
      return;
    }
    // atomName
    const atomName = !atomClassBase.simple ? this.app.text('Draft') : this.app.text('Unnamed');
    if (!this.configModuleBase.draft.sequence) {
      data.atomName = atomName;
      return;
    }
    const draftId = await sequence.next('draft');
    data.atomName = `${atomName}-${draftId}`;
  }

  async _create_prepareItem_atomStaticKey({ data, options: _options, user: _user }: any) {
    if (!data.atomStaticKey) {
      data.atomStaticKey = this.app.bean.util.uuidv4();
    }
  }

  async _create_prepareItem_atomSimple({ atomClassBase, data, options: _options, user: _user }: any) {
    if (atomClassBase.simple) {
      data.atomSimple = 1;
      data.atomStage = 1;
    } else {
      data.atomSimple = 0;
      // data.atomStage = data.atomStage;
    }
  }

  async _create_prepareItem_roleIdOwner({ atomClassBase, atomClass, data, options, user }: any) {
    const bAtomClassRole = atomClass && atomClass.module === 'a-base' && atomClass.atomClassName === 'role';
    if (bAtomClassRole) return;
    if (data.roleIdOwner) return;
    // enableRightRoleScopes
    const enableRightRoleScopes = atomClassBase.enableRight?.role?.scopes;
    if (!enableRightRoleScopes) {
      data.roleIdOwner = 0;
      return;
    }
    // preferredRole / builtIn
    let roleId;
    if (options.preferredRole) {
      roleId = await this.app.bean.atom.preferredRoleId({ atomClass, user, disableAuthOpenCheck: true });
      if (!roleId) {
        this.app.throw(403);
      }
    } else {
      const roleName = 'authenticated.builtIn';
      const role = await this.app.bean.role.parseRoleName({ roleName });
      roleId = role.id;
    }
    data.roleIdOwner = roleId;
  }

  async _create_prepareItem_atomCategoryId({ atomClass, data, options: _options, user: _user }: any) {
    if (data.atomCategoryId && typeof data.atomCategoryId === 'string') {
      const category = await this.app.bean.category.parseCategoryName({
        atomClass,
        language: data.atomLanguage,
        categoryName: data.atomCategoryId,
        force: false, // not force, because this api maybe called by normal user
      });
      if (!category) {
        throw new Error(`Category not found: ${data.atomCategoryId}`);
      }
      data.atomCategoryId = category.id;
    }
  }

  async _create_prepareDetail_detailLineNo({ atomClassBase, options, user: _user }: any) {
    if (!atomClassBase.detail) return undefined;
    // field lineNo
    const fieldNameLineNo = atomClassBase.fields?.mappings?.lineNo;
    if (!fieldNameLineNo) return undefined;
    // atomIdMain
    const atomIdMain = options.atomIdMain;
    // table
    const tableName = atomClassBase.tableName;
    // field: atomIdMain
    const fieldNameAtomIdMain = atomClassBase.fields?.mappings?.atomIdMain;
    // query max
    const res = await this.bean.model
      .builderSelect(tableName)
      .max(fieldNameLineNo)
      .where({
        [fieldNameAtomIdMain]: atomIdMain,
      });
    const detailLineNo = this.bean.model.extractFirstNumber(res, 0).plus(1);
    return detailLineNo.toNumber();
  }
}
