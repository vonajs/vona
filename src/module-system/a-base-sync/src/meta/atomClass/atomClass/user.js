module.exports = {
  info: {
    bean: 'user',
    title: 'User',
    tableName: 'aUser',
    tableNameModes: {},
    resource: false,
    simple: true,
    history: false,
    inner: true,
    comment: false,
    attachment: false,
    // fields: {
    //   custom: ['disabled', 'anonymous', 'activated', 'emailConfirmed', 'mobileVerified'],
    // },
    layout: {
      config: {
        atomList: 'a-baseadmin:layoutAtomListUser',
        atomItem: 'a-baseadmin:layoutAtomItemUser',
      },
    },
  },
  actions: {
    userRoles: {
      code: 101,
      title: 'Roles',
      actionModule: 'a-baseadmin',
      actionComponent: 'actionUser',
      icon: { f7: ':role:role' },
    },
    resourceAuthorizations: {
      code: 102,
      title: 'UserResourceRight',
      actionModule: 'a-base',
      actionComponent: 'action',
      actionName: 'openDetailList',
      icon: { f7: ':outline:archive-lock-outline' },
      params: {
        atomClass: {
          module: 'a-base',
          atomClassName: 'userResourceRight',
        },
      },
    },
    atomAuthorizations: {
      code: 103,
      title: 'UserAtomRight',
      actionModule: 'a-base',
      actionComponent: 'action',
      actionName: 'openDetailList',
      icon: { f7: ':outline:database-lock-outline' },
      params: {
        atomClass: {
          module: 'a-base',
          atomClassName: 'userAtomRight',
        },
      },
    },
    fieldsAuthorizations: {
      code: 104,
      title: 'UserFieldsRight',
      actionModule: 'a-base',
      actionComponent: 'action',
      actionName: 'openDetailList',
      icon: { f7: '::text-fields' },
      params: {
        atomClass: {
          module: 'a-base',
          atomClassName: 'userFieldsRight',
        },
      },
    },
  },
  validator: 'userAdmin',
  search: {
    validator: 'userAdminSearch',
  },
};
