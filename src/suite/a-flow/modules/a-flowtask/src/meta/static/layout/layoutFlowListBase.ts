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
  atomStaticKey: 'layoutFlowListBase',
  atomRevision: 1,
  description: '',
  layoutTypeCode: 9,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
module.exports = layout;
