import { __ThisModule__ } from '../../.metadata/this.js';

const resources = [
  // menu
  {
    atomName: 'Create App',
    atomStaticKey: 'createApp',
    atomRevision: -1,
    atomCategoryId: 'a-base:menu.BasicProfile',
    resourceType: 'a-base:menu',
    resourceConfig: JSON.stringify({
      module: __ThisModule__,
      atomClassName: 'app',
      atomAction: 'create',
    }),
    resourceIcon: ':outline:apps-outline',
    appKey: 'a-appbooster:appSystem',
    resourceRoles: 'template.system',
  },
  {
    atomName: 'Apps',
    atomStaticKey: 'listApp',
    atomRevision: 3,
    atomCategoryId: 'a-base:menu.BasicProfile',
    resourceType: 'a-base:menu',
    resourceConfig: JSON.stringify({
      module: __ThisModule__,
      atomClassName: 'app',
      atomAction: 'read',
    }),
    resourceIcon: ':outline:apps-outline',
    appKey: 'a-appbooster:appSystem',
    resourceRoles: 'template.system',
  },
];
export default resources;
