import { LocalFlowTaskSchema } from './local.flow.task_schema.js';

export class LocalFlowTaskActions extends LocalFlowTaskSchema {
  async _actions() {
    // user
    const user = this.contextTask._user;
    // flowTask
    const flowTask = this.contextTask._flowTask;
    // check right
    await this.localRight.viewAtom({ flowTask, user });
    // actions
    const nodeInstances = this.ctx.bean.flowTask._flowData_task_nodeInstancesBox();
    const actions = await this.ctx.bean.flowTask._flowData_task_actions({
      nodeInstances,
      tasks: null,
      task: flowTask,
      user,
    });
    return actions;
  }
}
