module.exports = class Startup {
  async execute() {
    await this.app.meta._loadSchedules({ ctx: this.ctx });
  }
};
