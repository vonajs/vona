const moduleInfo = module.info;
module.exports = class FlowTaskHistory extends module.meta.class.ModelCache {
  constructor() {
    super({
      table: 'aFlowTaskHistory',
      options: {
        disableDeleted: false,
        cacheName: { module: moduleInfo.relativeName, name: 'modelFlowTaskHistory' },
      },
    });
  }
};
