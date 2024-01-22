const moduleInfo = module.info;
module.exports = class Stats {
  async execute(context) {
    const { user } = context;
    const modelAtom = this.ctx.model.module(moduleInfo.relativeName).atom;
    const count = await modelAtom.count({
      userIdUpdated: user.id,
      atomStage: 0,
      atomClosed: 0,
      atomFlowId: {
        op: '>',
        val: 0,
      },
    });
    return count;
  }
};
