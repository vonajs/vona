const tableNameDefault = function ({ ctx, action }) {
  const locale = ctx.locale;
  if (action === 'read' || action === 'select') {
    return `
      (select 
        __a.id,__a.createdAt,__a.updatedAt,__a.deleted,__a.iid,__a.roleId,__a.roleAtomId,
        __a.atomId as atomIdTarget,
        __b.atomName,__b.atomDisabled,__b.atomCategoryId,
        __b.atomClassId as atomClassIdTarget, 
        __f.categoryName as atomCategoryName,
        __c.module as moduleTarget,__c.atomClassName as atomClassNameTarget,
        __d.atomNameLocale,
        __e.resourceType
      from aResourceRole __a
        inner join aAtom __b on __a.atomId=__b.id and __b.deleted=0 and __b.atomStage=1
        inner join aAtomClass __c on __b.atomClassId=__c.id
        left join aResourceLocale __d on __a.atomId=__d.atomId and __d.locale='${locale}'
        left join aResource __e on __a.atomId=__e.atomId
        left join aCategory __f on __b.atomCategoryId=__f.id
      )
    `;
  }
};

module.exports = {
  info: {
    bean: 'roleResourceRight',
    title: 'RoleResourceRight',
    model: 'resourceRole',
    tableName: 'aResourceRole',
    tableNameModes: {
      default: tableNameDefault,
    },
    inner: true,
    itemOnly: true,
    detail: {
      inline: false,
      atomClassMain: {
        module: moduleInfo.relativeName,
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
    create: {
      rightInherit: 'resourceAuthorizations',
      actionModule: 'a-baseadmin',
      actionComponent: 'actionRoleResource',
    },
    read: {
      rightInherit: 'resourceAuthorizations',
    },
    // write: {
    //   rightInherit: 'resourceAuthorizations',
    // },
    delete: {
      rightInherit: 'resourceAuthorizations',
    },
    // clone: {
    //   rightInherit: 'resourceAuthorizations',
    // },
    deleteBulk: {
      rightInherit: 'resourceAuthorizations',
    },
    spreadsBulk: {
      code: 101,
      title: 'RoleResourceRightSpread',
      actionModule: 'a-base',
      actionComponent: 'action',
      actionName: 'openDetailList',
      icon: { f7: ':tools:spreadsheet' },
      bulk: true,
      select: false,
      params: {
        atomClass: {
          module: 'a-base',
          atomClassName: 'roleResourceRightSpread',
        },
        atomMainFrom: 'dataOptions',
      },
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
