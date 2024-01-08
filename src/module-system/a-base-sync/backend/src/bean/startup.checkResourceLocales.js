module.exports = class Startup {
  async execute() {
    await this.ctx.bean.resource.checkLocales();
  }
};
