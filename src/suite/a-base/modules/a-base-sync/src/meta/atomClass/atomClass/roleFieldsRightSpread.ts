const tableNameDefault = function ({ ctx, action }) {
  if (action === 'read' || action === 'select') {
    return `
      (select
        concat_ws(':',__d.id,__a.id) as id,
        __d.id as roleExpandId,
        __d.createdAt,__d.updatedAt,__d.deleted,__d.iid,__d.roleId,__d.roleAtomId,__d.roleIdBase,
        __a.id as roleFieldsRightId,__a.atomClassId as atomClassIdTarget,__a.fieldsRight,
        __b.module as moduleTarget,__b.atomClassName as atomClassNameTarget,
        __e.roleName as roleNameBase,__e.atomId as roleAtomIdBase 
      from aRoleFieldsRight __a
      inner join aAtomClass __b on __a.atomClassId=__b.id
      inner join aRoleExpand __d on __a.roleId=__d.roleIdBase
      inner join aRole __e on __d.roleIdBase=__e.id
    )
    `;
  }
};

export default {
  info: {
    bean: 'roleFieldsRightSpread',
    title: 'RoleFieldsRightSpread',
    model: 'roleExpand',
    tableName: 'aRoleExpand',
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
    read: {
      rightInherit: 'fieldsAuthorizations',
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
