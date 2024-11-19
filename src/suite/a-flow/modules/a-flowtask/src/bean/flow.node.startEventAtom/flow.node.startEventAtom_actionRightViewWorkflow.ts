import { FlowNodeStartEventAtomFlowActions } from './flow.node.startEventAtom_flowActions.js';

export class FlowNodeStartEventAtomActionRightViewWorkflow extends FlowNodeStartEventAtomFlowActions {
  async _deploy_actionRightViewWorkflow({ atomClass }: any) {
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
    await this.app.bean.role.addRoleRightBatch({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      roleRights,
    });
  }
}
