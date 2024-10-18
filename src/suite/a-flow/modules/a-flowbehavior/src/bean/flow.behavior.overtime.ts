import { __ThisModule__ } from '../resource/this.js';
import { Bean } from 'vona';
import { BeanFlowBehaviorBase } from 'vona-module-a-flow';

@Bean({ scene: 'flow.behavior' })
export class FlowBehaviorOvertime extends BeanFlowBehaviorBase {
  async enter(_context, next) {
    // addJob
    const flowId = this.context._flowId;
    const flowNodeId = this.contextNode._flowNodeId;
    const behaviorDefId = this._behaviorDef.id;
    await this._addJob({ flowId, flowNodeId, behaviorDefId });
    // next
    return await next();
  }

  async clear(_context, next) {
    // deleteJob
    const flowId = this.context._flowId;
    const flowNodeId = this.contextNode._flowNodeId;
    const behaviorDefId = this._behaviorDef.id;
    await this._deleteJob({ flowId, flowNodeId, behaviorDefId });
    // next
    return await next();
  }

  async _addJob({ flowId, flowNodeId, behaviorDefId }: any) {
    const options = this.nodeInstance.getBehaviorDefOptions({ behaviorDefId });
    if (!options.timeDuration && !options.timeDate) {
      // do nothing
      return;
    }
    // delay
    let delay;
    if (options.timeDuration) {
      delay = options.timeDuration;
    } else {
      delay = options.timeDate - new Date().valueOf();
    }
    // push
    const jobName = this._getJobName({ flowId, flowNodeId, behaviorDefId });
    const jobId = jobName;
    this.ctx.meta.util.queuePush({
      module: __ThisModule__,
      queueName: 'overtime',
      queueNameSub: flowId,
      jobName,
      jobOptions: {
        delay,
        jobId,
      },
      data: {
        flowId,
        flowNodeId,
        behaviorDefId,
      },
    });
  }

  async _deleteJob({ flowId, flowNodeId, behaviorDefId }: any) {
    const jobId = this._getJobName({ flowId, flowNodeId, behaviorDefId });
    const queue = this.ctx.app.meta.queue._getQueue({
      subdomain: this.ctx.subdomain,
      module: __ThisModule__,
      queueName: 'overtime',
    });
    await queue.remove(jobId);
  }

  async _runJob(context) {
    const { flowNodeId, behaviorDefId } = context.data;
    // load flow node
    let nodeInstance;
    try {
      nodeInstance = await this.ctx.bean.flow._loadFlowNodeInstance({ flowNodeId });
    } catch (err) {}
    if (!nodeInstance) {
      // here means done, so do nothing
      return;
    }
    // options
    const options = nodeInstance.getBehaviorDefOptions({ behaviorDefId });
    if (options.cancelActivity) {
      // clear
      const remark = 'Overtime';
      await nodeInstance.clear({ flowNodeHandleStatus: 3, flowNodeRemark: remark });
    }
    // nextEdges
    await nodeInstance.flowInstance.nextEdges({ nodeInstance, behaviorDefId });
  }

  _getJobName({ flowId, flowNodeId, behaviorDefId }: any) {
    return `${flowId}.${flowNodeId}.${behaviorDefId}`.replace(/:/g, '.');
  }
}
