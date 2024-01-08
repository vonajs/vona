module.exports = class VersionUpdate {
  async run() {
    // aAtom: atomIdArchive -> atomIdFormal
    const sql = `
        ALTER TABLE aAtom
          CHANGE COLUMN atomIdArchive atomIdFormal int(11) DEFAULT '0'
                  `;
    await this.ctx.model.query(sql);
  }
};
