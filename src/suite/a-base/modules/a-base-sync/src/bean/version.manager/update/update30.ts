module.exports = class VersionUpdate {
  async run(options) {
    // aAtomActin: code:16 name: workflowFormal -> viewWorkflow
    const sql = `
        update aAtomAction set name='viewWorkflow' where code=16
      `;
    await this.ctx.model.query(sql);
  }
};
