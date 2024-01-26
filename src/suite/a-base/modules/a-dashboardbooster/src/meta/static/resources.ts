const resources = [
  // widget
  {
    atomName: 'InfoBox',
    atomStaticKey: 'widgetInfoBox',
    atomRevision: 1,
    atomCategoryId: 'a-dashboard:widget.Template',
    resourceType: 'a-dashboard:widget',
    resourceConfig: JSON.stringify({
      module: __ThisModule__,
      component: 'widgetInfoBox',
    }),
    resourceRoles: 'root',
  },
];
export default resources;
