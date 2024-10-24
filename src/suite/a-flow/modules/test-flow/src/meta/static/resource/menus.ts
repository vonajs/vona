import { __ThisModule__ } from '../../../.metadata/this.js';

const resources = [
  // menu: purchase order
  {
    atomName: 'Create Purchase Order',
    atomStaticKey: 'createPurchaseOrder',
    atomRevision: 2,
    atomCategoryId: 'a-base:menu.PurchaseOrder',
    resourceType: 'a-base:menu',
    resourceConfig: JSON.stringify({
      module: __ThisModule__,
      atomClassName: 'purchaseOrder',
      atomAction: 'create',
    }),
    resourceIcon: '::add',
    appKey: 'test-flow:appPurchaseOrder',
    resourceRoles: 'authenticated',
  },
  {
    atomName: 'Purchase Order List',
    atomStaticKey: 'listPurchaseOrder',
    atomRevision: 2,
    atomCategoryId: 'a-base:menu.PurchaseOrder',
    resourceType: 'a-base:menu',
    resourceConfig: JSON.stringify({
      module: __ThisModule__,
      atomClassName: 'purchaseOrder',
      atomAction: 'read',
    }),
    resourceIcon: ':outline:data-list-outline',
    appKey: 'test-flow:appPurchaseOrder',
    resourceRoles: 'authenticated',
  },
  // menu: product
  {
    atomName: 'Create Product',
    atomStaticKey: 'createProduct',
    atomRevision: 1,
    atomCategoryId: 'a-base:menu.Product',
    resourceType: 'a-base:menu',
    resourceConfig: JSON.stringify({
      module: __ThisModule__,
      atomClassName: 'product',
      atomAction: 'create',
    }),
    resourceIcon: '::add',
    appKey: 'test-flow:appPurchaseOrder',
    resourceRoles: 'authenticated',
  },
  {
    atomName: 'Product List',
    atomStaticKey: 'listProduct',
    atomRevision: 1,
    atomCategoryId: 'a-base:menu.Product',
    resourceType: 'a-base:menu',
    resourceConfig: JSON.stringify({
      module: __ThisModule__,
      atomClassName: 'product',
      atomAction: 'read',
    }),
    resourceIcon: ':outline:data-list-outline',
    appKey: 'test-flow:appPurchaseOrder',
    resourceRoles: 'authenticated',
  },
];
export default resources;
