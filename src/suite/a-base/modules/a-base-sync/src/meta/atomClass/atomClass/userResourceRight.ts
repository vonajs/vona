const tableNameDefault = function ({ ctx, action }) {
  const locale = ctx.locale;
  if (action === 'read' || action === 'select') {
    return `
      (select 
        concat_ws(':',__a.roleExpandId,__a.resourceRoleId) as id,
        __a.iid,__a.roleExpandId,__a.resourceRoleId,0 as deleted,
        __a.userIdWho,__a.roleId,__a.roleIdBase, 
        __a.resourceAtomId as atomIdTarget,
        __b.atomName,__b.atomDisabled,__b.atomCategoryId,
        __b.atomClassId as atomClassIdTarget, 
        __f.categoryName as atomCategoryName,
        __c.module as moduleTarget,__c.atomClassName as atomClassNameTarget,
        __d.atomNameLocale,
        __e.resourceType,
        __h.roleName as roleNameBase,
        __g.atomId as userAtomId
      from aViewUserRightResource __a
        inner join aAtom __b on __a.resourceAtomId=__b.id and __b.deleted=0 and __b.atomStage=1
        inner join aAtomClass __c on __b.atomClassId=__c.id
        inner join aUser __g on __g.id=__a.userIdWho
        left join aResourceLocale __d on __a.resourceAtomId=__d.atomId and __d.locale='${locale}'
        left join aResource __e on __a.resourceAtomId=__e.atomId
        left join aCategory __f on __b.atomCategoryId=__f.id
        left join aRole __h on __a.roleIdBase=__h.id
      )
    `;
  }
};

module.exports = {
  info: {
    bean: 'userResourceRight',
    title: 'UserResourceRight',
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
        module: moduleInfo.relativeName,
        atomClassName: 'user',
      },
    },
    enableRight: false,
    fields: {
      mappings: {
        atomIdMain: 'userAtomId',
      },
    },
    layout: {
      config: {
        atomList: 'a-baseadmin:layoutAtomListRoleResourceRight',
      },
    },
  },
  actions: {
    read: {
      rightInherit: 'resourceAuthorizations',
    },
  },
  validator: {
    module: 'a-baseadmin',
    name: 'roleResourceRight',
  },
  search: {
    validator: {
      module: 'a-baseadmin',
      name: 'roleResourceRightSearch',
    },
  },
};
