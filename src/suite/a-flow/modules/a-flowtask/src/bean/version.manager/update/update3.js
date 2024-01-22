module.exports = class VersionUpdate {
  async run(options) {
    // aFlowNodeStartEventAtomCondition
    const sql = `
      ALTER TABLE aFlowNodeStartEventAtomCondition
        ADD COLUMN atomStage int(11) DEFAULT '0'
            `;
    await this.ctx.model.query(sql);
  }
};
