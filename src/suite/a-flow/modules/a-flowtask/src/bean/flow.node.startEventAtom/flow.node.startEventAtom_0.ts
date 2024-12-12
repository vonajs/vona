import { cast } from 'vona';
import { ScopeModule } from '../../.metadata/this.js';
import FlowNodeActivityUserTaskBase from '../../common/flowNodeActivityUserTaskBase.js';
import { FlowNodeStartEventAtom } from '../flow.node.startEventAtom.js';

export class FlowNodeStartEventAtom0 extends FlowNodeActivityUserTaskBase {
  atomStateDefault: any;

  constructor() {
    super();
    this.atomStateDefault = 1;
  }

  get self() {
    return cast<FlowNodeStartEventAtom>(this);
  }

  get modelCondition() {
    return this.scope.model.flowNodeStartEventAtomCondition;
  }

  get modelRoleRight() {
    return this.$scope.base.model.roleRight;
  }

  get modelRoleRightRef() {
    return this.$scope.base.model.roleRightRef;
  }

  async deploy({ deploy, flowDefId, node, deleting, flowDef, content }: any) {
    // atomClass
    const { atomClass } = await this.self._getAtomClass({ flowDefId, node });
    // condition
    await this.self._deploy_condition({
      atomClass,
      deploy,
      flowDefId,
      node,
    });
    // flow actions
    await this.self._deploy_flowActions({
      atomClass,
      flowDefId,
      node,
      deleting,
      flowDef,
      content,
    });
    // action right: viewWorkflow
    await this.self._deploy_actionRightViewWorkflow({
      atomClass,
    });
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
    const tasks = await this.app.bean.flowTask.select({
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
      await this.app.bean.flowTask.claim({ flowTaskId, user });
      await this.app.bean.flowTask.complete({
        flowTaskId,
        handle: { status: 1 },
        user,
      });
    }
  }
}
