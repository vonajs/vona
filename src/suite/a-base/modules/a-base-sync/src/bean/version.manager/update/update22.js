module.exports = class VersionUpdate {
  async run() {
    const sql = `
        update aAtom set atomFlowId=0 where atomStage in (1,2)
      `;
    await this.ctx.model.query(sql);
  }
};
