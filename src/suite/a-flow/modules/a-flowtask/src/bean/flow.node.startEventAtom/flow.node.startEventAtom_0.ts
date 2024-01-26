import { __ThisModule__ } from '../../resource/this.js';
import FlowNodeActivityUserTaskBase from '../../common/flowNodeActivityUserTaskBase.js';

export class FlowNodeStartEventAtom0 extends FlowNodeActivityUserTaskBase {
  atomStateDefault: any;

  constructor(options) {
    super(options);
    this.atomStateDefault = 1;
  }

  get modelCondition() {
    return this.ctx.model.module(__ThisModule__).flowNodeStartEventAtomCondition;
  }

  get modelRoleRight() {
    return this.ctx.model.module('a-base').roleRight;
  }

  get modelRoleRightRef() {
    return this.ctx.model.module('a-base').roleRightRef;
  }

  async deploy({ deploy, flowDefId, node, deleting, flowDef, content }) {
    // atomClass
    const { atomClass } = await this._getAtomClass({ flowDefId, node });
    // condition
    await this._deploy_condition({ atomClass, deploy, flowDefId, node });
    // flow actions
    await this._deploy_flowActions({ atomClass, flowDefId, node, deleting, flowDef, content });
    // action right: viewWorkflow
    await this._deploy_actionRightViewWorkflow({ atomClass });
    // return
    return { atomClass };
  }

  async onNodeDoing() {
    // super
    await super.onNodeDoing();
    // auto handle
    await this._autoHandle();
    // break
    return false;
  }

  async _autoHandle() {
    const flowId = this.context._flowId;
    // select
    const tasks = await this.ctx.bean.flowTask.select({
      options: {
        where: {
          'a.flowId': flowId,
          'a.flowTaskStatus': 0,
        },
        history: 0,
      },
    });
    const task = tasks[0];
    const flowTaskId = task.id;
    const user = { id: task.userIdAssignee };
    // complete automatically only on first-in
    if (this.contextNode._flowNode.flowNodeIdPrev === 0) {
      //  claim automatically
      await this.ctx.bean.flowTask.claim({ flowTaskId, user });
      await this.ctx.bean.flowTask.complete({
        flowTaskId,
        handle: { status: 1 },
        user,
      });
    }
  }
}
