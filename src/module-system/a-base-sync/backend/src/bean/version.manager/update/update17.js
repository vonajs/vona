module.exports = class VersionUpdate {
  async run() {
    // aStatus
    const sql = `
        delete from aStatus where name like 'user-layoutConfig:%'
      `;
    await this.ctx.model.query(sql);
  }
};
