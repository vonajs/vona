module.exports = {
  info: {
    bean: 'role',
    title: 'Role',
    tableName: 'aRole',
    tableNameModes: {
      default: 'aRoleView',
      includes: 'aRoleIncludesView',
      userRoles: 'aRoleUserRolesView',
    },
    resource: true,
    simple: true,
    history: false,
    inner: true,
    comment: false,
    attachment: false,
    fields: {
      dicts: {
        roleTypeCode: {
          translate: false,
          // dictKey: 'a-base:dictRoleType',
        },
      },
    },
    layout: {
      config: {
        atomList: 'a-baseadmin:layoutAtomListRole',
        atomItem: 'a-baseadmin:layoutAtomItemRole',
      },
    },
  },
  actions: {
    write: {
      enableOnStatic: null,
    },
    delete: {
      actionModule: 'a-baseadmin',
      actionComponent: 'actionRole',
    },
    clone: {
      actionModule: 'a-baseadmin',
      actionComponent: 'actionRole',
    },
    move: {
      code: 101,
      title: 'Move',
      actionModule: 'a-baseadmin',
      actionComponent: 'actionRole',
      icon: { f7: ':outline:folder-transfer-outline' },
    },
    addChild: {
      code: 102,
      title: 'AddChild',
      actionModule: 'a-baseadmin',
      actionComponent: 'actionRole',
      icon: { f7: ':outline:add-circle-outline' },
      enableOnStatic: null,
    },
    roleUsers: {
      code: 103,
      title: 'Users',
      actionModule: 'a-baseadmin',
      actionComponent: 'actionRole',
      icon: { f7: ':outline:group-outline' },
      enableOnStatic: null,
    },
    includes: {
      code: 104,
      title: 'Inherits',
      actionModule: 'a-baseadmin',
      actionComponent: 'actionRole',
      icon: { f7: ':role:role' },
      enableOnStatic: null,
    },
    resourceAuthorizations: {
      code: 105,
      title: 'RoleResourceRight',
      actionModule: 'a-base',
      actionComponent: 'action',
      actionName: 'openDetailList',
      icon: { f7: ':outline:archive-lock-outline' },
      enableOnStatic: null,
      params: {
        atomClass: {
          module: 'a-base',
          atomClassName: 'roleResourceRight',
        },
      },
    },
    atomAuthorizations: {
      code: 106,
      title: 'RoleAtomRight',
      actionModule: 'a-base',
      actionComponent: 'action',
      actionName: 'openDetailList',
      icon: { f7: ':outline:database-lock-outline' },
      enableOnStatic: null,
      params: {
        atomClass: {
          module: 'a-base',
          atomClassName: 'roleRight',
        },
      },
    },
    fieldsAuthorizations: {
      code: 107,
      title: 'RoleFieldsRight',
      actionModule: 'a-base',
      actionComponent: 'action',
      actionName: 'openDetailList',
      icon: { f7: '::text-fields' },
      enableOnStatic: null,
      params: {
        atomClass: {
          module: 'a-base',
          atomClassName: 'roleFieldsRight',
        },
      },
    },
    // buildBulk: {
    //   code: 201,
    //   title: 'Build',
    //   actionModule: 'a-baseadmin',
    //   actionComponent: 'actionRole',
    //   icon: { f7: ':outline:build-circle-outline' },
    //   bulk: true,
    //   select: false,
    //   stage: 'formal',
    // },
  },
  validator: 'role',
  search: {
    validator: 'roleSearch',
  },
};
