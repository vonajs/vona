const content = {
  info: {
    layout: {
      viewSize: {
        view: {
          small: 'default',
          medium: 'default',
          large: 'default',
        },
        edit: {
          small: 'default',
          medium: 'default',
          large: 'default',
        },
      },
    },
    attachment: true,
    comment: true,
  },
  layouts: {
    base: {
      blocks: {
        main: {
          component: {
            module: 'a-flowtask',
            name: 'atomLayoutBlockDefaultMain',
          },
        },
      },
    },
    default: {},
  },
};
const layout = {
  atomName: 'Base',
  atomStaticKey: 'layoutFlowTaskAtomBase',
  atomRevision: 1,
  description: '',
  layoutTypeCode: 12,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
module.exports = layout;
