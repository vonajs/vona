const resources = [
  // menu
  {
    atomName: 'Create FlowDefinition',
    atomStaticKey: 'createFlowDef',
    atomRevision: -1,
    atomCategoryId: 'a-base:menu.BasicProfile',
    resourceType: 'a-base:menu',
    resourceConfig: JSON.stringify({
      module: __ThisModule__,
      atomClassName: 'flowDef',
      atomAction: 'create',
    }),
    resourceIcon: '::flow-chart',
    appKey: 'a-appbooster:appSystem',
    resourceRoles: 'template.system',
  },
  {
    atomName: 'FlowDefinitions',
    atomStaticKey: 'listFlowDef',
    atomRevision: 2,
    atomCategoryId: 'a-base:menu.BasicProfile',
    resourceType: 'a-base:menu',
    resourceConfig: JSON.stringify({
      module: __ThisModule__,
      atomClassName: 'flowDef',
      atomAction: 'read',
    }),
    resourceIcon: '::flow-chart',
    appKey: 'a-appbooster:appSystem',
    resourceRoles: 'template.system',
  },
];
export default resources;
