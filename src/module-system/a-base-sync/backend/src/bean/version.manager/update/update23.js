module.exports = class VersionUpdate {
  async run() {
    // aAtomClass: drop atomClassIdParent
    const sql = `
        ALTER TABLE aAtomClass
          DROP COLUMN atomClassIdParent
                  `;
    await this.ctx.model.query(sql);
  }
};
