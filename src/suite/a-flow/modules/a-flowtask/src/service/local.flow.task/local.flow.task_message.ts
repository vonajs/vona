import { LocalFlowTaskNotify } from './local.flow.task_notify.js';

export class LocalFlowTaskMessage extends LocalFlowTaskNotify {
  async _publishMessageTaskInit({ flowTaskId, userIdAssignee, user }: any) {
    if (!this.context._flow.flowAtomId) {
      // only support business flow
      return;
    }
    if (userIdAssignee === user.id) {
      // only send message to others
      return;
    }
    // publish uniform message
    const userFlow = await this.app.bean.user.get({ id: this.context._flow.flowUserId });
    if (!userFlow) {
      return;
    }
    const userAssignee = await this.app.bean.user.get({ id: userIdAssignee });
    if (!userAssignee) {
      return;
    }
    const title = `${this.app.text.locale(userAssignee.locale as any, 'Task')} - ${this.app.text.locale(
      userAssignee.locale as any,
      this.contextNode._flowNode.flowNodeName,
    )}`;
    const actionPath = `/a/flowtask/flow?flowId=${this.context._flowId}&flowTaskId=${flowTaskId}`;
    const message = {
      userIdTo: userIdAssignee,
      content: {
        issuerId: userFlow.id,
        issuerName: userFlow.userName,
        issuerAvatar: userFlow.avatar,
        title,
        body: this.context._flow.flowName,
        actionPath,
        params: {
          flowId: this.context._flowId,
          flowTaskId,
        },
      },
    };
    // jump out of the transaction
    this.ctx.tail(async () => {
      await this.app.bean.io.publish({
        message,
        messageClass: {
          module: 'a-flow',
          messageClassName: 'workflow',
        },
      });
    });
  }
}
