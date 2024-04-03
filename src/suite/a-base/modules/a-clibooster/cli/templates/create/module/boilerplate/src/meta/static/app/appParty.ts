const info = {
  // layout: null,
  // menu: {
  //   layout: null,
  // },
  home: {
    mode: 'dashboard', // dashboard/page
    dashboard: 'test-party:dashboardTest',
    page: null,
  },
  mine: {
    layout: true,
  },
};
const content = {
  presets: {
    anonymous: {
      mobile: info,
      pc: info,
    },
    authenticated: {
      mobile: info,
      pc: info,
    },
  },
};
const _app = {
  atomName: 'Party',
  atomStaticKey: 'appParty',
  atomRevision: 2,
  atomCategoryId: 'Demonstration',
  description: '',
  appIcon: ':business:party',
  appIsolate: false,
  content: JSON.stringify(content),
  resourceRoles: 'authenticated',
  appSorting: 0,
};
export default _app;
