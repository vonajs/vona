// const moduleInfo = module.info;

const content = {
  info: {
    layout: {
      viewSize: {
        small: 'list',
        medium: 'list',
        large: 'list',
      },
    },
  },
  layouts: {
    base: {
      blocks: {},
    },
    list: {},
  },
};
const layout = {
  atomName: 'Base',
  atomStaticKey: 'layoutFlowTaskListBase',
  atomRevision: 1,
  description: '',
  layoutTypeCode: 11,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
module.exports = layout;
