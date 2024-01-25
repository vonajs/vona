import FlowNodeStartEventAtomMatch from './flow.node.startEventAtom_match.js';

export class FlowNodeStartEventAtomFlowActions extends FlowNodeStartEventAtomMatch {
  async _deploy_flowActions({ atomClass, /* flowDefId,*/ node, deleting, flowDef, content }) {
    if (deleting) {
      await this._deploy_flowActions_deleting({ atomClass, flowDef });
    } else {
      await this._deploy_flowActions_modifing({ atomClass, node, flowDef, content });
    }
  }

  async _deploy_flowActions_modifing({ atomClass, node, flowDef, content }) {
    // nodeTasks
    const checked = {};
    const nodeTasks = await this._deploy_flowActions_findNodeTasks({ content, nodeStart: node });
    // flowActions
    const flowActions = await this.ctx.bean.atomAction.selectFlowActions({ atomClass, flowKey: flowDef.atomStaticKey });
    // loop one
    for (const flowAction of flowActions) {
      const nodeTask = nodeTasks.find(item => item.id === flowAction.nodeDefId);
      if (!nodeTask) {
        // delete roleRight/action
        await this.ctx.bean.atomAction.delete({
          atomClassId: atomClass.id,
          code: flowAction.code,
        });
      } else {
        // check action name
        if (nodeTask.name !== flowAction.name) {
          await this.ctx.bean.atomAction.update({ id: flowAction.id, name: nodeTask.name });
        }
        // flag
        checked[nodeTask.id] = true;
      }
    }
    // loop two
    for (const nodeTask of nodeTasks) {
      if (checked[nodeTask.id]) continue;
      // just create action
      await this.ctx.bean.atomAction.getByModeFlow({
        atomClassId: atomClass.id,
        flowKey: flowDef.atomStaticKey,
        nodeDefId: nodeTask.id,
        nodeDefName: nodeTask.name,
      });
      // need not to invoke addRoleRightBatchByModeFlow, because called by _registerLockByModeFlow_inner
      // // role right
      // const roleRights = [
      //   {
      //     roleName: 'template.system',
      //     flowKey: flowDef.atomStaticKey,
      //     nodeDefId: nodeTask.id,
      //     nodeDefName: nodeTask.name,
      //     scopeNames: [],
      //   },
      // ];
      // await this.ctx.bean.role.addRoleRightBatchByModeFlow({
      //   module: atomClass.module,
      //   atomClassName: atomClass.atomClassName,
      //   roleRights,
      // });
    }
  }

  async _deploy_flowActions_findNodeTasks({ content, nodeStart: node }) {
    return await this.ctx.bean.flowDef._loopNodes({
      content,
      nodeIdStart: node.id,
      fn: async ({ nodes, node }) => {
        // check if endEvent
        if (node.type.indexOf('endEvent') > -1) {
          return;
        }
        // check if activityUserTask
        if (node.type.indexOf('activityUserTask') > -1) {
          // check if auto
          let _vars = this.ctx.bean.util.getProperty(node, 'options.assignees.vars');
          if (_vars) {
            if (typeof _vars === 'string') {
              _vars = _vars.split(',');
            }
            if (_vars.includes('auto')) {
              nodes.push(node);
            }
          }
        }
      },
    });
  }

  async _deploy_flowActions_deleting({ atomClass, flowDef }) {
    // flowActions
    const flowActions = await this.ctx.bean.atomAction.selectFlowActions({ atomClass, flowKey: flowDef.atomStaticKey });
    // loop one
    for (const flowAction of flowActions) {
      // delete roleRight/action
      await this.ctx.bean.atomAction.delete({
        atomClassId: atomClass.id,
        code: flowAction.code,
      });
    }
  }
}
