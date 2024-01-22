const moduleInfo = module.info;
module.exports = class Stats {
  async execute(context) {
    const { user } = context;
    const modelFlowTask = this.ctx.model.module(moduleInfo).flowTask;
    const count = await modelFlowTask.count({
      userIdAssignee: user.id,
      flowTaskStatus: 0,
      timeClaimed: { op: 'notNull' },
    });
    return count;
  }
};
