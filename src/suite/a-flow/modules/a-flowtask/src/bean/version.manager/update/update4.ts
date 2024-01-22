module.exports = class VersionUpdate {
  async run(options) {
    let sql;

    // aFlowTask
    sql = `
          ALTER TABLE aFlowTask
            ADD COLUMN allowViewWorkflow int(11) DEFAULT '1'
                `;
    await this.ctx.model.query(sql);

    // aFlowTaskHistory
    sql = `
          ALTER TABLE aFlowTaskHistory
            ADD COLUMN allowViewWorkflow int(11) DEFAULT '1'
                `;
    await this.ctx.model.query(sql);

    // aFlowNodeStartEventAtomCondition
    sql = `
          ALTER TABLE aFlowNodeStartEventAtomCondition
            DROP COLUMN atomStage
                `;
    await this.ctx.model.query(sql);
  }
};
