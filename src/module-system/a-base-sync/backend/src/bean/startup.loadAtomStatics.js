module.exports = class Startup {
  async execute() {
    await this.ctx.bean.atomStatic.loadAllAtomStatics();
  }
};
