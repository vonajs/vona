const moduleInfo = module.info;
module.exports = class Stats {
  async execute(context) {
    const { user } = context;
    // stats
    let stats;
    // labels
    stats = await this.ctx.bean.stats._get({
      module: moduleInfo.relativeName,
      fullName: 'labels',
      user,
    });
    if (!stats) {
      stats = {
        red: 0,
        orange: 0,
      };
    }
    // stars
    const stars = await this.ctx.bean.stats._get({
      module: moduleInfo.relativeName,
      fullName: 'stars',
      user,
    });
    stats.gray = stars || 0;
    // ok
    return stats;
  }
};
