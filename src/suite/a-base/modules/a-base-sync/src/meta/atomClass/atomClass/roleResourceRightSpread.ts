const tableNameDefault = function ({ ctx, action }) {
  const locale = ctx.locale;
  if (action === 'read' || action === 'select') {
    return `
      (select 
        concat_ws(':',__g.id,__a.id) as id,
        __g.id as roleExpandId,
        __g.createdAt,__g.updatedAt,__g.deleted,__g.iid,__g.roleId,__g.roleAtomId,__g.roleIdBase,
        __a.id as resourceRoleId,__a.atomId as atomIdTarget,
        __b.atomName,__b.atomDisabled,__b.atomCategoryId,
        __b.atomClassId as atomClassIdTarget, 
        __f.categoryName as atomCategoryName,
        __c.module as moduleTarget,__c.atomClassName as atomClassNameTarget,
        __d.atomNameLocale,
        __e.resourceType,
        __h.roleName as roleNameBase
      from aResourceRole __a
        inner join aAtom __b on __a.atomId=__b.id and __b.deleted=0 and __b.atomStage=1
        inner join aAtomClass __c on __b.atomClassId=__c.id
        left join aResourceLocale __d on __a.atomId=__d.atomId and __d.locale='${locale}'
        left join aResource __e on __a.atomId=__e.atomId
        left join aCategory __f on __b.atomCategoryId=__f.id
        left join aRoleExpand __g on __a.roleId=__g.roleIdBase
        left join aRole __h on __g.roleIdBase=__h.id
      )
    `;
  }
};

export default {
  info: {
    bean: 'roleResourceRightSpread',
    title: 'RoleResourceRightSpread',
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
