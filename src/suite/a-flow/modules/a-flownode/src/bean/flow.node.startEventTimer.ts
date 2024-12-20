import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanFlowNodeBase } from 'vona-module-a-flow';
import { TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult } from './queue.startEventTimer.js';
import { IQueueRecord, TypeQueueJob } from 'vona-module-a-queue';

@BeanTemp({ scene: 'flow.node' })
export class FlowNodeStartEventTimer extends BeanFlowNodeBase {
  // todo: 将参数列表改为分体式
  async deploy({ deploy, flowDefId, node }: any) {
    if (deploy) {
      await this._addSchedule(flowDefId, node);
    } else {
      await this._deleteSchedule(flowDefId, node);
    }
  }

  async _addSchedule(flowDefId: string, node) {
    const repeat = this._getJobRepeat(node);
    if (!repeat) return;
    if (!repeat.every && !repeat.pattern) return;
    // push
    const scheduleKey = this._getScheduleKey(flowDefId, node);
    const queueName = this._getQueueName();
    const queue = this._getQueue();
    const data = this.$scope.queue.service.queue.prepareJobInfo(
      queueName,
      { flowDefId, node },
      {
        subdomain: this.ctx.subdomain,
        queueNameSub: scheduleKey,
        jobOptions: {
          repeat,
        },
      },
    );
    await this._deleteSchedule(flowDefId, node);
    await queue.upsertJobScheduler(scheduleKey, repeat, { data });
  }

  async _runSchedule(
    data: TypeQueueStartEventTimerJobData,
    job?: TypeQueueJob<TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>,
  ) {
    const { flowDefId, node } = data;
    // ignore on test
    if (this.ctx.app.meta.isTest) return;
    // check if valid
    if (job && !(await this._checkScheduleValid(data, job))) {
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

  async _checkScheduleValid(
    data: TypeQueueStartEventTimerJobData,
    job: TypeQueueJob<TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>,
  ) {
    const { flowDefId, node } = data;
    // flowDef
    const flowDef = await this.app.bean.flowDef.getById({ flowDefId });
    if (!flowDef) {
      await this._deleteSchedule(job);
      return false;
    }
    // atomDisabled
    if (flowDef.atomDisabled === 1) {
      await this._deleteSchedule(job);
      return false;
    }
    // content
    const content = flowDef.content ? JSON.parse(flowDef.content) : null;
    if (!content) {
      await this._deleteSchedule(job);
      return false;
    }
    const nodeConfig = content.process.nodes.find(item => item.id === node.id);
    if (!nodeConfig) {
      await this._deleteSchedule(job);
      return false;
    }
    // check if changed
    const jobKeyActive = this.$scope.queue.service.queue.getRepeatKey(job.name, job.data!.options!.jobOptions!.repeat!);
    const jobKeyConfig = this.$scope.queue.service.queue.getRepeatKey(
      this._getScheduleKey(flowDefId, nodeConfig),
      this._getJobRepeat(nodeConfig),
    );
    if (jobKeyActive !== jobKeyConfig) return false; // not delete schedule
    // ok
    return true;
  }

  async _deleteSchedule(flowDefId: string, node): Promise<boolean>;
  async _deleteSchedule(
    job: TypeQueueJob<TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>,
  ): Promise<boolean>;
  async _deleteSchedule(flowDefId: any, node?: any): Promise<boolean> {
    if (typeof flowDefId === 'string') {
      const scheduleKey = this._getScheduleKey(flowDefId, node);
      const queue = this._getQueue();
      return await queue.removeJobScheduler(scheduleKey);
    } else {
      const job = flowDefId;
      const queue = this.$scope.queue.service.queue.getQueue(job.data.queueName, job.data.options!.subdomain);
      return await queue.removeJobScheduler(job.name);
    }
  }

  _getQueueName() {
    return 'a-flownode:startEventTimer' as keyof IQueueRecord;
  }
  _getQueue() {
    return this.$scope.queue.service.queue.getQueue(this._getQueueName(), this.ctx.subdomain);
  }
  _getScheduleKey(flowDefId, node) {
    return `${flowDefId}.${node.id}`.replace(/:/g, '.');
  }
  _getJobRepeat(node) {
    return node.options && node.options.repeat;
  }
}
