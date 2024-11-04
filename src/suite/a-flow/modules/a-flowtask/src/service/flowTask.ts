import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Service()
export class ServiceFlowTask extends BeanBase<ScopeModule> {
  get localRight() {
    return this.scope.service.right;
  }

  get modelFlowTask() {
    return this.scope.model.flowTask;
  }

  async select({ options, user }: any) {
    return await this.ctx.bean.flowTask.select({ options, user });
  }

  async count({ options, user }: any) {
    return await this.ctx.bean.flowTask.count({ options, user });
  }

  async claim({ flowTaskId, user }: any) {
    return await this.ctx.bean.flowTask.claim({ flowTaskId, user });
  }

  async complete({ flowTaskId, handle, formAtom, user }: any) {
    return await this.ctx.bean.flowTask.complete({ flowTaskId, handle, formAtom, user });
  }

  async appendHandleRemark({ flowTaskId, handle, user }: any) {
    return await this.ctx.bean.flowTask.appendHandleRemark({ flowTaskId, handle, user });
  }

  async assignees({ flowTaskId, user }: any) {
    return await this.ctx.bean.flowTask.assignees({ flowTaskId, user });
  }

  async assigneesConfirmation({ flowTaskId, handle, user }: any) {
    return await this.ctx.bean.flowTask.assigneesConfirmation({ flowTaskId, handle, user });
  }

  async recall({ flowTaskId, user }: any) {
    return await this.ctx.bean.flowTask.recall({ flowTaskId, user });
  }

  async cancelFlow({ flowTaskId, handle, user }: any) {
    return await this.ctx.bean.flowTask.cancelFlow({ flowTaskId, handle, user });
  }

  async viewAtom({ flowTaskId, user }: any) {
    return await this.ctx.bean.flowTask.viewAtom({ flowTaskId, user });
  }

  async editAtom({ flowTaskId, user }: any) {
    return await this.ctx.bean.flowTask.editAtom({ flowTaskId, user });
  }

  async userSelectForward({ flowTaskId, params, user }: any) {
    // check right
    const flowTask = await this.modelFlowTask.get({ id: flowTaskId });
    await this.localRight.forward({ flowTask, user });
    // users
    return await this.ctx.bean.user.selectGeneral({ params, user });
  }

  async forward({ flowTaskId, handle, user }: any) {
    return await this.ctx.bean.flowTask.forward({ flowTaskId, handle, user });
  }

  async forwardRecall({ flowTaskId, user }: any) {
    return await this.ctx.bean.flowTask.forwardRecall({ flowTaskId, user });
  }

  async userSelectSubstitute({ flowTaskId, params, user }: any) {
    // check right
    const flowTask = await this.modelFlowTask.get({ id: flowTaskId });
    await this.localRight.substitute({ flowTask, user });
    // users
    return await this.ctx.bean.user.selectGeneral({ params, user });
  }

  async substitute({ flowTaskId, handle, user }: any) {
    return await this.ctx.bean.flowTask.substitute({ flowTaskId, handle, user });
  }

  async substituteRecall({ flowTaskId, user }: any) {
    return await this.ctx.bean.flowTask.substituteRecall({ flowTaskId, user });
  }

  async actions({ flowTaskId, user }: any) {
    return await this.ctx.bean.flowTask.actions({ flowTaskId, user });
  }
}
