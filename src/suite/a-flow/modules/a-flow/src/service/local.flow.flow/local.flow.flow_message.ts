import { LocalFlowFlowNextEdges } from './local.flow.flow_nextEdges.js';

export class LocalFlowFlowMessage extends LocalFlowFlowNextEdges {
  async _publishMessageFlowEnd({ flowUserId, user }: any) {
    if (!this.context._flow.flowAtomId) {
      // only support business flow
      return;
    }
    if (flowUserId === user.id) {
      // only send message to others
      return;
    }
    // publish uniform message
    const userFlow = await this.app.bean.user.get({ id: flowUserId });
    if (!userFlow) {
      return;
    }
    const title = `${this.app.text.locale(userFlow.locale as any, 'FlowTitle')} - ${this.app.text.locale(
      userFlow.locale as any,
      this.context._flow.flowRemark || 'End',
    )}`;
    const actionPath = `/a/flowtask/flow?flowId=${this.context._flowId}`;
    const message = {
      userIdTo: flowUserId,
      content: {
        issuerId: userFlow.id,
        issuerName: userFlow.userName,
        issuerAvatar: userFlow.avatar,
        title,
        body: this.context._flow.flowName,
        actionPath,
        params: {
          flowId: this.context._flowId,
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
