const moduleInfo = module.info;
module.exports = class FlowTask extends module.meta.class.ModelCache {
  constructor() {
    super({
      table: 'aFlowTask',
      options: {
        disableDeleted: true,
        cacheName: { module: moduleInfo.relativeName, name: 'modelFlowTask' },
      },
    });
  }
};
