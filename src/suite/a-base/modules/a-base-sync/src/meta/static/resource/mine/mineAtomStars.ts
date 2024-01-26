import { __ThisModule__ } from '../../../../resource/this.js';

// actionPath
const actionPath = '/a/basefront/atom/starTabs';
// resource
const resource = {
  atomName: 'StarsLabels',
  atomStaticKey: 'mineAtomStars',
  atomRevision: 9,
  atomCategoryId: 'a-base:mine.Atom',
  resourceType: 'a-base:mine',
  resourceConfig: JSON.stringify({
    actionPath,
    stats: {
      params: {
        module: __ThisModule__,
        name: 'starsLabels',
      },
      color: 'auto',
    },
  }),
  resourceIcon: ':outline:star-outline',
  appKey: 'a-app:appDefault',
  resourceRoles: 'root',
  resourceSorting: 2,
};
export default resource;
