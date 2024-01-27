export default {
  info: {
    bean: 'resource',
    title: 'GeneralResource',
    tableName: 'aResource',
    tableNameModes: {
      default: 'aResourceView',
    },
    inner: true,
    category: true,
    tag: true,
    resource: true,
    comment: false,
    attachment: false,
    layout: {
      config: {
        atomList: 'a-baseadmin:layoutAtomListResource',
      },
    },
  },
  actions: {
    write: {
      enableOnStatic: null,
    },
  },
  validator: 'resource',
  search: {
    validator: 'resourceSearch',
  },
};
