import { __ThisModule__ } from '../../../resource/this.js';

const tableNameDefault = function ({ action }) {
  if (action === 'read' || action === 'select') {
    return `
      (select 
        __a.id,__a.createdAt,__a.updatedAt,__a.deleted,__a.iid,__a.roleId,
        __a.atomClassId as atomClassIdTarget,__a.fieldsRight,__a.roleAtomId,
        __b.module as moduleTarget,__b.atomClassName as atomClassNameTarget 
      from aRoleFieldsRight __a
      left join aAtomClass __b on __a.atomClassId=__b.id
    )
    `;
  }
};

export default {
  info: {
    bean: 'roleFieldsRight',
    title: 'RoleFieldsRight',
    model: 'roleFieldsRight',
    tableName: 'aRoleFieldsRight',
    tableNameModes: {
      default: tableNameDefault,
    },
    inner: true,
    itemOnly: true,
    detail: {
      inline: false,
      atomClassMain: {
        module: __ThisModule__,
        atomClassName: 'role',
      },
    },
    enableRight: false,
    fields: {
      mappings: {
        atomIdMain: 'roleAtomId',
        atomName: 'atomClassNameTarget',
      },
    },
    layout: {
      config: {
        atomList: 'a-baseadmin:layoutAtomListRoleFieldsRight',
      },
    },
  },
  actions: {
    create: {
      rightInherit: 'fieldsAuthorizations',
      createDelay: true,
    },
    read: {
      rightInherit: 'fieldsAuthorizations',
    },
    write: {
      rightInherit: 'fieldsAuthorizations',
    },
    delete: {
      rightInherit: 'fieldsAuthorizations',
    },
    clone: {
      rightInherit: 'fieldsAuthorizations',
    },
    deleteBulk: {
      rightInherit: 'fieldsAuthorizations',
    },
    spreadsBulk: {
      code: 101,
      title: 'RoleFieldsRightSpread',
      actionModule: 'a-base',
      actionComponent: 'action',
      actionName: 'openDetailList',
      icon: { f7: ':tools:spreadsheet' },
      bulk: true,
      select: false,
      params: {
        atomClass: {
          module: 'a-base',
          atomClassName: 'roleFieldsRightSpread',
        },
        atomMainFrom: 'dataOptions',
      },
    },
  },
  validator: {
    module: 'a-baseadmin',
    name: 'roleFieldsRight',
  },
  search: {
    validator: {
      module: 'a-baseadmin',
      name: 'roleFieldsRightSearch',
    },
  },
};
