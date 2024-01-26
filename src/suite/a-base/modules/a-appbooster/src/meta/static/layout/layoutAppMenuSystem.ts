import { __ThisModule__ } from '../../../resource/this.js';

const content = {
  layouts: {
    list: {
      blocks: {
        items: {
          component: {
            module: __ThisModule__,
            name: 'appSystemMenuLayoutBlockListItems',
          },
        },
      },
    },
  },
};
const layout = {
  atomName: 'System',
  atomStaticKey: 'layoutAppMenuSystem',
  atomRevision: 2,
  description: '',
  layoutTypeCode: 13,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
export default layout;
