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
        title: {
          component: {
            module: 'a-flowtask',
            name: 'flowLayoutBlockDefaultTitle',
          },
        },
        main: {
          component: {
            module: 'a-flowtask',
            name: 'flowLayoutBlockDefaultMain',
          },
        },
      },
    },
    default: {},
  },
};
const layout = {
  atomName: 'Base',
  atomStaticKey: 'layoutFlowItemBase',
  atomRevision: 4,
  description: '',
  layoutTypeCode: 10,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
module.exports = layout;
