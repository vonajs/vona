module.exports = class Stats {
  async execute(context) {
    const { user } = context;
    const count = await this.ctx.bean.atom.count({
      options: {
        star: 1,
      },
      user,
    });
    return count;
  }
};
