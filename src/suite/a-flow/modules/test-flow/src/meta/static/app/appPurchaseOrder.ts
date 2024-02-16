const content = {
  presets: {
    anonymous: {},
    authenticated: {},
  },
};
const _app = {
  atomName: 'Purchase Order',
  atomStaticKey: 'appPurchaseOrder',
  atomRevision: 0,
  atomCategoryId: 'Demonstration',
  description: '',
  appIcon: ':business:purchase',
  appIsolate: false,
  content: JSON.stringify(content),
  resourceRoles: 'authenticated',
  appSorting: 0,
};
export default _app;
