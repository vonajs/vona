import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { cast } from 'vona';
import { BeanFlowNodeBase } from 'vona-module-a-flow';
import { TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult } from './queue.startEventTimer.js';
import { TypeQueueJob } from 'vona-module-a-queue';

@BeanTemp({ scene: 'flow.node' })
export class FlowNodeStartEventTimer extends BeanFlowNodeBase {
  async deploy({ deploy, flowDefId, node }: any) {
    if (deploy) {
      await this._addSchedule({ flowDefId, node });
    } else {
      await this._deleteSchedule2({ flowDefId, node });
    }
  }

  async _addSchedule({ flowDefId, node }: any) {
    const repeat = this._getJobRepeat(node);
    if (!repeat) return;
    if (!repeat.every && !repeat.pattern) return;
    // push
    const jobName = this._getJobName(flowDefId, node);
    this.scope.queue.startEventTimer.push(
      {
        flowDefId,
        node,
      },
      {
        jobName,
        jobOptions: {
          jobId: jobName,
          repeat,
        },
      },
    );
  }

  async _runSchedule(
    data: TypeQueueStartEventTimerJobData,
    job?: TypeQueueJob<TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>,
  ) {
    const { flowDefId, node } = data;
    // ignore on test
    if (this.ctx.app.meta.isTest) return;
    // check if valid
    if (job && !(await this._checkJobValid(data, job))) {
      await this._deleteSchedule(job);
      return;
    }
    // bean/parameterExpression
    const bean = node.options && node.options.bean;
    const parameterExpression = node.options && node.options.parameterExpression;
    if (bean) {
      // bean
      const parameter = this.app.bean.flow.evaluateExpression({
        expression: parameterExpression,
        globals: null,
      });
      await this.app.bean.flow.executeService({
        bean,
        parameter: { flowDefId, node, parameter },
        globals: null,
      });
    } else {
      // start
      await this.app.bean.flow.startById({ flowDefId, startEventId: node.id });
    }
  }

  async _checkJobValid(
    data: TypeQueueStartEventTimerJobData,
    job: TypeQueueJob<TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>,
  ) {
    const { flowDefId, node } = data;
    // flowDef
    const flowDef = await this.app.bean.flowDef.getById({ flowDefId });
    if (!flowDef) return false;
    // atomDisabled
    if (flowDef.atomDisabled === 1) return false;
    // content
    const content = flowDef.content ? JSON.parse(flowDef.content) : null;
    if (!content) return false;
    const nodeConfig = content.process.nodes.find(item => item.id === node.id);
    if (!nodeConfig) return false;
    // check if changed
    const jobKeyActive = this.$scope.queue.service.queue.getRepeatKey(
      job.data!.options!.jobName!,
      job.data!.options!.jobOptions!.repeat!,
    );
    const jobKeyConfig = this.$scope.queue.service.queue.getRepeatKey(
      this._getJobName(flowDefId, nodeConfig),
      this._getJobRepeat(nodeConfig),
    );
    if (jobKeyActive !== jobKeyConfig) return false;
    // ok
    return true;
  }

  async _deleteSchedule(job: TypeQueueJob<TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>) {
    const jobKeyActive = this.$scope.queue.service.queue.getRepeatKey(job.name, job.opts.repeat!);
    const repeat = await cast(job).queue.repeat;
    await repeat.removeRepeatableByKey(jobKeyActive);
  }

  // cannot remove job, because no job info
  async _deleteSchedule2({ flowDefId: _flowDefId, node: _node }: any) {
    // const jobKeyActive = this.$scope.queue.service.queue.getRepeatKey(
    //   this._getJobName(flowDefId, node),
    //   this._getJobRepeat(node),
    // );
    // const queue = this.scope.queue.startEventTimer.getQueue();
    // const repeat = await queue.repeat;
    // await repeat.removeRepeatableByKey(jobKeyActive);
  }

  _getJobName(flowDefId, node) {
    return `${flowDefId}.${node.id}`.replace(/:/g, '.');
  }
  _getJobRepeat(node) {
    return node.options && node.options.repeat;
  }
}
