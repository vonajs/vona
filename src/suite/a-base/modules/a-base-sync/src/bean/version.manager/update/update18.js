module.exports = class VersionUpdate {
  async run() {
    // aUser
    const sql = `
      ALTER TABLE aUser
        Add COLUMN allowChangeUserName int(11) DEFAULT '1',
        Add COLUMN lastTimeChangeUserName timestamp DEFAULT NULL
                `;
    await this.ctx.model.query(sql);
  }
};
