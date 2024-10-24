import { __ThisModule__ } from '../../../../.metadata/this.js';

// actionPath
const actionPath = '/a/basefront/atom/draftTabs';
// resource
const resource = {
  atomName: 'Drafts',
  atomStaticKey: 'mineAtomDrafts',
  atomRevision: 3,
  atomCategoryId: 'a-base:mine.Atom',
  resourceType: 'a-base:mine',
  resourceConfig: JSON.stringify({
    actionPath,
    stats: {
      params: {
        module: __ThisModule__,
        name: 'drafts',
      },
      color: 'orange',
    },
  }),
  resourceIcon: ':outline:draft-outline',
  appKey: 'a-app:appDefault',
  resourceRoles: 'root',
  resourceSorting: 1,
};
export default resource;
