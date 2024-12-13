import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceFlowTask extends BeanBase {
  get localRight() {
    return this.scope.service.right;
  }

  get modelFlowTask() {
    return this.scope.model.flowTask;
  }

  async select({ options, user }: any) {
    return await this.app.bean.flowTask.select({ options, user });
  }

  async count({ options, user }: any) {
    return await this.app.bean.flowTask.count({ options, user });
  }

  async claim({ flowTaskId, user }: any) {
    return await this.app.bean.flowTask.claim({ flowTaskId, user });
  }

  async complete({ flowTaskId, handle, formAtom, user }: any) {
    return await this.app.bean.flowTask.complete({ flowTaskId, handle, formAtom, user });
  }

  async appendHandleRemark({ flowTaskId, handle, user }: any) {
    return await this.app.bean.flowTask.appendHandleRemark({ flowTaskId, handle, user });
  }

  async assignees({ flowTaskId, user }: any) {
    return await this.app.bean.flowTask.assignees({ flowTaskId, user });
  }

  async assigneesConfirmation({ flowTaskId, handle, user }: any) {
    return await this.app.bean.flowTask.assigneesConfirmation({ flowTaskId, handle, user });
  }

  async recall({ flowTaskId, user }: any) {
    return await this.app.bean.flowTask.recall({ flowTaskId, user });
  }

  async cancelFlow({ flowTaskId, handle, user }: any) {
    return await this.app.bean.flowTask.cancelFlow({ flowTaskId, handle, user });
  }

  async viewAtom({ flowTaskId, user }: any) {
    return await this.app.bean.flowTask.viewAtom({ flowTaskId, user });
  }

  async editAtom({ flowTaskId, user }: any) {
    return await this.app.bean.flowTask.editAtom({ flowTaskId, user });
  }

  async userSelectForward({ flowTaskId, params, user }: any) {
    // check right
    const flowTask = await this.modelFlowTask.get({ id: flowTaskId });
    await this.localRight.forward({ flowTask, user });
    // users
    return await this.app.bean.user.selectGeneral({ params, user });
  }

  async forward({ flowTaskId, handle, user }: any) {
    return await this.app.bean.flowTask.forward({ flowTaskId, handle, user });
  }

  async forwardRecall({ flowTaskId, user }: any) {
    return await this.app.bean.flowTask.forwardRecall({ flowTaskId, user });
  }

  async userSelectSubstitute({ flowTaskId, params, user }: any) {
    // check right
    const flowTask = await this.modelFlowTask.get({ id: flowTaskId });
    await this.localRight.substitute({ flowTask, user });
    // users
    return await this.app.bean.user.selectGeneral({ params, user });
  }

  async substitute({ flowTaskId, handle, user }: any) {
    return await this.app.bean.flowTask.substitute({ flowTaskId, handle, user });
  }

  async substituteRecall({ flowTaskId, user }: any) {
    return await this.app.bean.flowTask.substituteRecall({ flowTaskId, user });
  }

  async actions({ flowTaskId, user }: any) {
    return await this.app.bean.flowTask.actions({ flowTaskId, user });
  }
}
