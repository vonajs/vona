module.exports = class VersionTest {
  async run(options) {
    // why add these test codes
    //   - for force flowTaskHistory.id !== flowTask.id
    // flowTaskHistory
    const res = await this.ctx.model.flowTaskHistory.insert({});
    await this.ctx.model.flowTaskHistory.delete({ id: res.insertId });
  }
};
