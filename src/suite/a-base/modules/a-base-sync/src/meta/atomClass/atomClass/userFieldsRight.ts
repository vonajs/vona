const tableNameDefault = async function ({ ctx }) {
  const roleRoot = await ctx.bean.role.getSystemRole({ roleName: 'root' });
  const roleRootId = roleRoot.id;
  return `
    (select
      concat_ws(':',__a.roleExpandId,__a.roleFieldsRightId) as id,
      __a.iid,__a.roleExpandId,__a.roleFieldsRightId,0 as deleted,
      __a.userIdWho,__a.roleId,__a.roleIdBase, 
      __a.atomClassId as atomClassIdTarget,__a.fieldsRight, 
      __b.module as moduleTarget,__b.atomClassName as atomClassNameTarget,
      __e.roleName as roleNameBase,__e.atomId as roleAtomIdBase,
      __g.atomId as userAtomId,
      __h.level
      from aViewUserRightFields __a
        inner join aAtomClass __b on __a.atomClassId=__b.id
        inner join aRole __e on __a.roleIdBase=__e.id
        inner join aUser __g on __g.id=__a.userIdWho
        inner join aRoleRef __h on __a.roleIdBase=__h.roleId and __h.roleIdParent=${roleRootId}
    )
  `;
};

export default {
  info: {
    bean: 'userFieldsRight',
    title: 'UserFieldsRight',
    model: null,
    tableName: null,
    tableNameModes: {
      default: tableNameDefault,
    },
    inner: true,
    itemOnly: true,
    detail: {
      inline: false,
      atomClassMain: {
        module: __ThisModule__,
        atomClassName: 'user',
      },
    },
    enableRight: false,
    fields: {
      mappings: {
        atomIdMain: 'userAtomId',
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
