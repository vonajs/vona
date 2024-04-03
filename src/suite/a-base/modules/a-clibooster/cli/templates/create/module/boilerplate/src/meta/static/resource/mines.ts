import { __ThisModule__ } from '../../../resource/this.js';

const resources = [
  {
    atomName: 'Kitchen-sink',
    atomStaticKey: 'mineKitchenSink',
    atomRevision: 1,
    atomCategoryId: 'a-base:mine.Tools',
    resourceType: 'a-base:mine',
    resourceConfig: JSON.stringify({
      actionModule: __ThisModule__,
      actionPath: 'kitchen-sink/index',
    }),
    resourceIcon: ':business:kitchen-set',
    appKey: 'test-party:appParty',
    resourceRoles: 'root,RoleScopeCliDevelopment',
    resourceSorting: 1,
  },
];
export default resources;
