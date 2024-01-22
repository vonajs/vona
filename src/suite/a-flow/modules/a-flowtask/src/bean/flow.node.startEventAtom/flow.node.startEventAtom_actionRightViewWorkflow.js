// const moduleInfo = module.info;
module.exports = class FlowNode {
  async _deploy_actionRightViewWorkflow({ atomClass }) {
    // check if any role exists
    const right = await this.modelRoleRight.get({
      atomClassId: atomClass.id,
      action: 16, // viewWorkflow
    });
    if (right) return;
    // always add role of template.system when no records
    const roleRights = [
      { roleName: 'template.system', action: 'viewWorkflow', scopeNames: 'authenticated' }, //
    ];
    await this.ctx.bean.role.addRoleRightBatch({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      roleRights,
    });
  }
};
